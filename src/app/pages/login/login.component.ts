import { Component, signal, WritableSignal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TooltipComponent } from '../../components/tooltip/tooltip.component';

@Component({
  selector: 'app-login',
  imports: [CommonModule, RouterModule, ReactiveFormsModule, TooltipComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  form: FormGroup;
  loading: boolean = false;
  isIncorrectCreds: WritableSignal<boolean> = signal<boolean>(false);
  errorMessage: string = '';
  get tooltipMessage() {
    return 'Please contact superadmin to reset the password.';
  }

  constructor(
    fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submit() {
    this.loading = true;
    if (this.form.invalid) return;
    const { username, password } = this.form.value;
    console.log('username: ', username, ' password: ', password);
    this.auth.login(username, password).subscribe({
      next: () => this.router.navigate(['/select-mode']),
      error: (err: Error) => {
        this.isIncorrectCreds.set(true);
        this.errorMessage = err.message;
        this.loading = false;
      },
      complete: () => (this.loading = false),
    });
  }
}
