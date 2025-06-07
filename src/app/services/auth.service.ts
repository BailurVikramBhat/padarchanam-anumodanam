import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import {
  delay,
  mapTo,
  mergeMap,
  Observable,
  tap,
  throwError,
  timer,
} from 'rxjs';
import { environment } from '../../environments/environment';
interface LoginResponse {
  token: string;
  message: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isAuthenticated: WritableSignal<boolean> = signal(
    !!localStorage.getItem('auth_token')
  );
  public isAuthenticated = this._isAuthenticated.asReadonly();
  private MOCK_URL = 'assets/mock-data';
  private AUTH_URL = '/api/login';
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<void> {
    const fakeLatency = 3000;
    if (
      username !== environment.username ||
      password !== environment.password
    ) {
      return timer(fakeLatency).pipe(
        mergeMap(() =>
          throwError(() => new Error('Invalid username or password'))
        )
      );
    }
    if (environment.useMockAuth) {
      return this.http.get<LoginResponse>('/assets/mock-data/login.json').pipe(
        tap((res) => {
          localStorage.setItem('auth_token', res.token);
          this._isAuthenticated.set(true);
        }),
        delay(3000),
        mapTo(void 0)
      );
    } else {
      return this.http
        .post<LoginResponse>('/api/login', { username, password })
        .pipe(
          tap((res) => {
            localStorage.setItem('auth_token', res.token);
            this._isAuthenticated.set(true);
          }),
          mapTo(void 0)
        );
    }
  }
  logout() {
    localStorage.removeItem('auth_token');
    this._isAuthenticated.set(false);
  }
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }
}
