import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { UIService } from '../ui.service';



@Injectable()
export class AuthGaurd implements CanActivate {
  constructor(
    private afAuth: AngularFireAuth,
    private uiService: UIService
    ) {}

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const user = await this.afAuth.currentUser;
    const isLoggedIn = !!user;
    if (!isLoggedIn) {
      this.uiService.authError();
    }
    return isLoggedIn;
  }
}
