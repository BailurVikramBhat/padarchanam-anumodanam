import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IVisit } from './visit.service';

@Injectable({
  providedIn: 'root',
})
export class DatamodeService {
  private useMock = true;

  private mockBase = '/assets/mock-data';
  private realBase = 'https://api.yourdomain.com';

  constructor(private http: HttpClient) {}

  setMockMode(flag: boolean) {
    this.useMock = flag;
  }

  get mockMode() {
    return this.useMock;
  }

  private base() {
    return this.useMock ? this.mockBase : this.realBase;
  }

  getVisitsForDate(date: string): Observable<IVisit[]> {
    if (this.useMock) {
      return this.http
        .get<IVisit[]>(`${this.mockBase}/visits.json`)
        .pipe(map((visits) => visits.filter((v) => v.visitDate === date)));
    } else {
      return this.http.get<IVisit[]>(`${this.realBase}/visits`, {
        params: { date },
      });
    }
  }
}
