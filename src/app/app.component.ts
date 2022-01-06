import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isloggedin: any;

  constructor(private router: Router, public empservice: AuthenticationService) {}

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  ngOnInit(): void {
    if(this.empservice.isLoggedIn()) {
      this.isloggedin=true;
    } else {
      this.isloggedin=false;
      this.router.navigate(['/login']);
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.isloggedin=false;
  }
}
