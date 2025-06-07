import { Component, HostListener } from '@angular/core';
import {
  NavigationEnd,
  NavigationStart,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { filter } from 'rxjs';
import { FooterComponent } from './components/footer/footer.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/interceptors';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    RouterModule,
    NavbarComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class AppComponent {
  title = 'padarchanam-anumodanam';
  public loading = false;
  showLayout: boolean = true;
  today: Date = new Date();
  showLogoutModal = false;

  constructor(private auth: AuthService, private router: Router) {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationStart))
      .subscribe(() => (this.loading = true));
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        this.loading = false;
        this.showLayout = e.urlAfterRedirects != '/login';
      });
  }

  @HostListener('window:storage', ['$event'])
  onStorageEvent(e: StorageEvent) {
    console.log('storage event', e.key, e.newValue);
    if (e.key === 'auth_token') {
      if (!e.newValue) {
        this.auth.logout();

        this.router.navigate(['/login']);
      }
    }
  }
  get todaysDate() {
    const t = this.today;
    const yyyy = t.getFullYear();
    const mm = String(t.getMonth() + 1).padStart(2, '0');
    const dd = String(t.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  get isAuthenticated() {
    return this.auth.isAuthenticated();
  }
}
