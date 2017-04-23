import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TruncatePipe } from '../../truncate.pipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
allJobs : Object;
  constructor(private authservice: AuthService) { }

  ngOnInit() {
    this.authservice.getallJobs().subscribe(data => {
      this.allJobs = data;
    })
  }

}
