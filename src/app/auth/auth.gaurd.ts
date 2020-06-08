import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { UIService } from '../ui.service';



@Injectable()
export class AuthGaurd implements CanActivate {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private snack: UIService
    ) {}

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const user = await this.afAuth.currentUser;
    const isLoggedIn = !!user;
    if (!isLoggedIn) {
      this.snack.authError();
    }
    return isLoggedIn;
  }
}
