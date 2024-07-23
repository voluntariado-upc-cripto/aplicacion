import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signUpForm!:FormGroup
  constructor(private router:Router,private fb:FormBuilder){
    this.signUpForm =this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
    },{validator:this.passwordMatchValidator});
  }

  controlHasError(control:string,error:string):boolean {
    return this.signUpForm.controls[control].hasError(error);
  }
  onSubmit(){

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

    return form.get('pass')?.value === form.get('confirmPass')?.value
      ? null : { 'mismatch': true };
  }
}
