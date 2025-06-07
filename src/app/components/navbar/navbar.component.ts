import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule, ConfirmModalComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isConfModalVisible = false;
  constructor(private auth: AuthService, private router: Router) {}

  isMenuActive = false;

  toggleMenu(): void {
    this.isMenuActive = !this.isMenuActive;
  }

  collapseMenu(): void {
    this.isMenuActive = false;
  }

  private logout(): void {
    console.log('Logging user out. :)');

    this.auth.logout();
    this.router.navigate(['/login']);
  }
  showConfirmationModal() {
    this.isConfModalVisible = true;
  }
  respondOnDialogResponse(resp: boolean) {
    this.isConfModalVisible = false;
    if (resp) {
      this.logout();
    }
  }
}
