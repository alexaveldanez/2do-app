import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { UIService } from 'src/app/ui.service';
import { AuthResponseData } from '../auth-response-data.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;

  constructor(private authService: AuthService, private uiService: UIService, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', {validators: [Validators.required]}),
      password: new FormControl('', {validators: [Validators.required]})
    });
  }

  onLogin(form: FormGroup) {
    if (!form) {
      return;
    }
    const email = form.value.email;
    const password = form.value.email;

    this.isLoading = true;
    this.authService.login(email, password).subscribe(resData => {
      console.log(resData);
      this.isLoading = false;
      this.authService.authSuccess();
    }, errorMessage => {
      this.uiService.showSnackBar(errorMessage, null, 5000);
      this.isLoading = false;
    });
    form.reset();
  }
}
