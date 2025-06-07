import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  showAlert = false;
  alertMessage: string = '';
  alertHeader: string = 'Feature not yet available!';
  constructor(private auth: AuthService) {}

  showNotAvailableAlert(feature: 'data' | 'account') {
    if (feature === 'data') {
      this.alertMessage =
        'Data Preferences: Switching to Mock DB will use an in-memory dataset; Actual DB reads/writes real data.';
    } else {
      this.alertMessage =
        'Account Settings: Change your username or password here. Choose a strong password (≥8 chars, mix of letters & numbers).';
    }

    this.showAlert = true;

    setTimeout(() => (this.showAlert = false), 5000);
  }
}
