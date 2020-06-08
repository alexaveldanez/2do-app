import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

import { UIService } from 'src/app/ui.service';
import { AuthResponseData } from '../auth-response-data.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  isPasswordReset = false;
  serverMessage: string;

  constructor(
    private uiService: UIService,
    private router: Router,
    public afAuth: AngularFireAuth
    ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', {validators: [Validators.required]}),
      password: new FormControl('', {validators: [Validators.required]})
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
      await this.afAuth.signInWithEmailAndPassword(email, password);
      this.router.navigate(['/todos']);
    } catch (err) {
      this.serverMessage = err;
    }
    form.reset();
    this.isLoading = false;
  }


  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  async resetPassword() {
    // this.afAuth.sendPasswordResetEmail(this.email.value);
  }

  async onGoogleLogin() {
    await this.afAuth.onAuthStateChanged(user => {
      if (user) {
        this.router.navigate(['/todos']);
      }
    });
  }

  onResetPassword() {
    this.isPasswordReset = true;
  }

}
