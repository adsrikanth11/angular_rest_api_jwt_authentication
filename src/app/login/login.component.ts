import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginemp: FormGroup;
  tokens: any;
  token: any = localStorage.getItem('token')?.trim();


  constructor(private fb: FormBuilder, private router: Router, private empservice: AuthenticationService) { 
    this.loginemp = fb.group({
      username  : new FormControl('', Validators.required),
      password  : new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    if (this.token !== null || this.token !== '' || this.token !== ' ') {
      this.router.navigate(['/']);
    }
  } 

  login() {
    if(this.loginemp.valid === true) {
      this.empservice.login(this.loginemp.value).subscribe(res => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/']);
      },
      err => {
        alert(err.error.message);
        console.log(err);
      });
    } else {
      alert("All fields are required");
    }
  }

}
