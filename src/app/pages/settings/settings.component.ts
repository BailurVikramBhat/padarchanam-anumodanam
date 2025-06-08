import { Component, signal, WritableSignal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { AlertNotificationComponent } from '../../components/alert-notification/alert-notification.component';

@Component({
  selector: 'app-settings',
  imports: [AlertNotificationComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  showAlert: WritableSignal<boolean> = signal(false);
  constructor(private auth: AuthService) {}

  triggerAlert() {
    this.showAlert.set(true);
  }

  setValue() {
    this.showAlert.set(false);
  }
}
