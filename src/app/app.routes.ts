import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SelectionComponent } from './components/selection/selection.component';
import { FullDashboardComponent } from './pages/full-dashboard/full-dashboard.component';
import { DelayGuard } from './guards/delay.guard';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { AlreadyAuthGuard } from './guards/already-auth.guard';
import { SettingsComponent } from './pages/settings/settings.component';
import { DataPreferencesComponent } from './pages/settings/data-preferences/data-preferences.component';
import { AccountSettingsComponent } from './pages/settings/account-settings/account-settings.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AlreadyAuthGuard] },

  {
    path: 'select-mode',
    component: SelectionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'today', pathMatch: 'full' },
      { path: 'today', component: DashboardComponent },
      { path: 'full', component: FullDashboardComponent },
      {
        path: 'settings',
        component: SettingsComponent,
      },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
