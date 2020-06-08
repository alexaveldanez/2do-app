import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();
  isAuth = false;

  constructor(private afAuth: AngularFireAuth, private router: Router ) { }

  ngOnInit(): void {
    this.afAuth.onAuthStateChanged(user => {
      if (user) {
        this.isAuth = true;
      }
    });
  }

  onClose() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.onClose();
    this.afAuth.signOut();
    this.router.navigate(['/login']);
    this.isAuth = false;
  }
}
