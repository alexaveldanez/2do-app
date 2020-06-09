import { Directive, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';


@Directive({
  selector: '[appGoogleSignin]'
})
export class GoogleSigninDirective {

  constructor(private afAuth: AngularFireAuth, private router: Router ) { }

  @HostListener('click')
  async onClick() {
    await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.router.navigate(['/todos']);
  }

}
