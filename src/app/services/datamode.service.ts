import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IVisit } from './visit.service';

@Injectable({
  providedIn: 'root',
})
export class DatamodeService {
  private useMock = true;
  private initialized = false;
  private STORAGE_KEY = 'visits-store';

  private mockBase = '/assets/mock-data';
  private realBase = 'https://api.yourdomain.com';
  private mockStore: Record<string, IVisit[]> = {};

  constructor(private http: HttpClient) {}

  /** Toggle between mock and real mode */
  setMockMode(flag: boolean): void {
    this.useMock = flag;
  }
  get mockMode(): boolean {
    return this.useMock;
  }

  /** Read persisted store from localStorage */
  private initializeMockStore(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      console.log('trying to fetch from localstorage.');

      try {
        this.mockStore = JSON.parse(stored);
      } catch (e) {
        console.warn('Invalid mock store in localStorage, resetting', e);
        this.mockStore = {};
      }
    }
  }

  /** Persist current store to localStorage */
  private persistMockStore(): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.mockStore));
    } catch (e) {
      console.error('Failed to persist mock store', e);
    }
  }

  /** Load initial JSON only once (skip if persisted data exists) */
  private loadInitialData(): Observable<void> {
    if (!this.useMock) return of(void 0);

    // Always rehydrate from localStorage
    this.initializeMockStore();

    if (this.initialized) {
      // We’ve already JSON-loaded on a previous run in this session,
      // so no need to hit the static file again
      return of(void 0);
    }

    this.initialized = true;
    // If after rehydration we have data, skip the JSON load
    if (Object.keys(this.mockStore).length > 0) {
      return of(void 0);
    }

    // Otherwise bootstrap from visits.json
    return new Observable<void>((obs) => {
      this.http.get<IVisit[]>(`${this.mockBase}/visits.json`).subscribe({
        next: (data) => {
          for (const visit of data) {
            const date = visit.visitDate;
            (this.mockStore[date] ||= []).push(visit);
          }
          this.persistMockStore();
          obs.next();
          obs.complete();
        },
        error: (err) => obs.error(err),
      });
    });
  }

  /** Fetch visits for a specific date */
  getVisitsForDate(date: string): Observable<IVisit[]> {
    if (this.useMock) {
      return new Observable<IVisit[]>((observer) => {
        this.loadInitialData().subscribe({
          next: () => {
            observer.next(this.mockStore[date] ?? []);
            observer.complete();
          },
          error: (err) => observer.error(err),
        });
      });
    } else {
      const url = `${this.realBase}/visits?date=${encodeURIComponent(date)}`;
      return this.http.get<IVisit[]>(url);
    }
  }

  /** Save a new visit and persist */
  saveVisit(visit: IVisit): Observable<void> {
    console.log('date came for saving: ' + visit);
    if (this.useMock) {
      const date = visit.visitDate;
      if (!this.mockStore[date]) this.mockStore[date] = [];
      this.mockStore[date].unshift(visit);
      this.persistMockStore();
      return of(void 0);
    } else {
      const url = `${this.realBase}/visits`;
      return this.http.post<void>(url, visit);
    }
  }
}
