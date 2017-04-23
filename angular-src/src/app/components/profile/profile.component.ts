import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TruncatePipe } from '../../truncate.pipe';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
user: Object;
profile: Object;
jobs: Object;
role: Number;
alreadyExist: boolean = false;
jobsExist: boolean = false;

  constructor(private authservice : AuthService, private router : Router) { }

  ngOnInit() {
    this.authservice.getProfile().subscribe(data => {
      this.user = data;
      this.role = data.role;
      this.getProfileData(this.user['_id']);
      this.getPostedJobs(this.user['_id']);
    },
    err => {
      //If unauthorized or other errors
      //this.router.navigate(['login']);
      return false;
    });
  }

  getProfileData(id){
    this.authservice.getProfileData(id).subscribe(data => {
      this.profile = data;
      if(this.profile!==null){
        this.alreadyExist = true;
      }
   })
  }

  //Get Posted Jobs

  getPostedJobs(id) {
    this.authservice.getPostedData(id).subscribe(data => {
      console.log(data);
      this.jobs = data;
      this.jobsExist = true;
    })
  }
  

}
