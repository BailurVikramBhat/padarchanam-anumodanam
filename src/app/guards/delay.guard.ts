import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DelayGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return of(true).pipe(delay(2000));
  }
}
