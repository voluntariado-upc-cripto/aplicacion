import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../../interfaces/login';
import { SignupService } from '../../../services/signup.service';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signUpForm!:FormGroup
  constructor(private router:Router,private fb:FormBuilder,private signUpService:SignupService){
    this.signUpForm =this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(8)]],
      passConfirm: ['', [Validators.required, Validators.minLength(8)]]
    },{validator:this.passwordMatchValidator});
  }

  controlHasError(control:string,error:string):boolean {
    return this.signUpForm.controls[control].hasError(error);
  }
  loginSuccesful=true;
  onSubmit(){
    if (this.signUpForm.valid) {
      const newAcc:Login={
        _id:'',
        email: this.signUpForm.value.email,
        pass: this.signUpForm.value.pass
      }
      this.signUpService.signup(newAcc).subscribe(
        next=>{this.router.navigate([''])
          this.loginSuccesful=true;
        },

        error => {
          console.error("eror",error);
          this.loginSuccesful = false;
        })
    }
  }
  hide = true;
  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }
  hide2 = true;
  clickEvent2(event: MouseEvent) {
    this.hide2 = !this.hide2;
    event.stopPropagation();
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('pass')?.value === form.get('passConfirm')?.value
      ? null : { 'mismatch': true };
  }
}
