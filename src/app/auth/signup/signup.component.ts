import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  isLoading = false;
  serverMessage: string;

  constructor(
    private router: Router,
    public afAuth: AngularFireAuth
    ) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl('', {validators: [Validators.required, Validators.email]}),
      password: new FormControl('', {validators: [Validators.required, Validators.minLength(6)]}),
      passwordConfirm: new FormControl('')
    });
  }

  async onSubmit(form: FormGroup) {
    if (!form) {
      return;
    }
    this.isLoading = true;
    const email = this.email.value;
    const password = this.password.value;

    try {
      await this.afAuth.createUserWithEmailAndPassword(email, password);
      this.router.navigate(['/todos']);
    } catch (err) {
      this.serverMessage = err;
    }
    form.reset();
    this.isLoading = false;
  }


  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get passwordConfirm() {
    return this.signupForm.get('passwordConfirm');
  }

  get passwordDoesMatch() {
      return this.password.value === this.passwordConfirm.value;
    }


}
