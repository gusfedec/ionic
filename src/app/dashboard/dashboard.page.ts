import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/authentication-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  constructor(public authService: AuthenticationService) {}

  user: String;

  ngOnInit() {
    this.user = this.authService.getUser();
    console.log(this.user);
  }
}
