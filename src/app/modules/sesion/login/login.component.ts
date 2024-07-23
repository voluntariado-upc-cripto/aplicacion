import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../../interfaces/login';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  loginForm: FormGroup;
  hide = signal(true);
  loginFailed = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const login: Login = {
        email: this.loginForm.value.email,
        pass: this.loginForm.value.pass
      };

      // Aquí va tu lógica de autenticación
      // Si la autenticación falla, establece loginFailed a true.
      this.loginFailed = false;  // Cambia esto según tu lógica

      this.router.navigate(['']);
    } else {
      this.loginFailed = true;
    }
  }

  controlHasError(control: string, error: string): boolean {
    return this.loginForm.controls[control].hasError(error);
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
