import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
user: Object;
  constructor(private authservice : AuthService, private router : Router) { }

  ngOnInit() {
    this.authservice.getProfile().subscribe(data => {
      this.user = data;
    },
    err => {
      //If unauthorized or other errors
      //this.router.navigate(['login']);
      return false;
    });
  }


  

}
