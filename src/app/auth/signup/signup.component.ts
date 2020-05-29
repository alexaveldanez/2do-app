import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { UIService } from '../../ui.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  isLoading = false;

  constructor(private authService: AuthService, private uiService: UIService, private router: Router ) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl('', {validators: [Validators.required, Validators.email]}),
      password: new FormControl('', {validators: [Validators.required]})
    });
  }

  onSubmit(form: FormGroup) {
    if (!form) {
      return;
    }
    const email = form.value.email;
    const password = form.value.email;

    this.isLoading = true;
    this.authService.signup(email, password).subscribe(resData => {
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
