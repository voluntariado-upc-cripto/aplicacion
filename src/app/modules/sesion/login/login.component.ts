import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../../interfaces/login';
import { LoginService } from '../../../services/login.service';
import { AuthService } from '../../../services/auth.service';

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

  constructor(private fb: FormBuilder, private router: Router,private loginService:LoginService,private auth:AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required]]
    });
  }
  accounts:Login[]=[];
  ngOnInit(): void {
    this.loginService.getAccounts().subscribe(acc=>this.accounts=acc);
  }
  onSubmit() {
    if (this.loginForm.valid) {
      const login: Login = {
        _id:'',
        email: this.loginForm.value.email,
        pass: this.loginForm.value.pass
      };

      this.loginService.login(login).subscribe(
        next=>{
          const account=this.accounts.find(a=>a.email === login.email)
          if (account) {
            this.loginFailed = false;
            this.router.navigate(['administrador']);
            this.auth.setSession(account);
          }
        },
        error=>{
          console.error("eror",error);
          this.loginFailed = true;
        });
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
