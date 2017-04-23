import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-postjobs',
  templateUrl: './postjobs.component.html',
  styleUrls: ['./postjobs.component.css']
})
export class PostjobsComponent implements OnInit {
@ViewChild('f') postjobForm: NgForm;
user: Object;
jobs: Object;
private state: String = "";
private country: String = "";

  constructor(private authservice: AuthService, private flashmessagesservice: FlashMessagesService, private router: Router) { }
  
  ngOnInit() {
    
    this.authservice.getProfile().subscribe(data => {
      this.user = data;
    })
  }

  postJobs(data){
    data.userid = this.user['_id'];
   this.authservice.postJobs(data).subscribe(data => {
     if(data.success){
      this.flashmessagesservice.show(data.message, { cssClass: 'alert-success', timeout: 1000});
      this.router.navigate(['/profile']);
     } else {
      this.flashmessagesservice.show(data.message, { cssClass: 'alert-danger', timeout: 1000});
      this.postjobForm.reset();
     }
   })
   
  }

back() {
  this.router.navigate(['profile']);
}

}
