import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth = false;
  userSubscription: Subscription;

  constructor(private afAuth: AngularFireAuth, private router: Router ) { }

  ngOnInit(): void {
    this.afAuth.onAuthStateChanged(user => {
      if (user) {
        this.isAuth = true;
      }
    });
  }

  toggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.afAuth.signOut();
    this.router.navigate(['/login']);
    this.isAuth = false;
  }
}
