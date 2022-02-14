import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  userSubscription: Subscription;

  isAuthenticated: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.userSubject.subscribe( user => {
      this.isAuthenticated = user ? true : false;
      console.log(this.isAuthenticated);
    })
  }

  onLogout() {
    this.authService.logout()
    this.router.navigate(["/auth"]);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
