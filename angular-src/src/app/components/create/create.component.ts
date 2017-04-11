import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
jsonUser: string;  
user: any;
newObj : Object;
createprofileForm : FormGroup;
yearsofExp: Array<number>;


  constructor(private authservice: AuthService, private router: Router,private flashmessagesservice: FlashMessagesService) { }

  ngOnInit() {
    this.authservice.getProfile().subscribe(data => {
      this.user = data;
    })

    

    //Reactive forms
    this.createprofileForm = new FormGroup({
      'generalinfo': new FormGroup({
         'phone' : new FormControl(null, Validators.required),
         'linkedin': new FormControl(null),
         'twitter': new FormControl(null),
          'facebook': new FormControl(null),
          'website': new FormControl(null)
      }),
      'address': new FormGroup({
        'city': new FormControl(null,Validators.required),
         'state': new FormControl('',Validators.required),
         'country': new FormControl('',Validators.required)
      }),

      'title': new FormControl(null, Validators.required),
      'yearsofexp': new FormControl('',Validators.required),
      'emptype': new FormControl(null),
      'relocate': new FormControl(null),
      'salary': new FormControl(null),
      'hourly': new FormControl(null),
      'workexperience': new FormArray([]),
      'topskills': new FormArray([])
    });

   
  }

  createProfile() {
   this.createprofileForm.value.userid = this.user._id;
    this.authservice.createProfile(this.createprofileForm.value).subscribe(data => {
      if(data.success) {
        this.flashmessagesservice.show(data.message, { cssClass: 'alert-success', timeout: 1000});
        this.router.navigate(['/profile']);
      } else {
         this.flashmessagesservice.show(data.message, { cssClass: 'alert-danger', timeout: 1000});
      }
    })
    //console.log(this.createprofileForm);
  }

  addMore() {
    (<FormArray>this.createprofileForm.get('workexperience')).push(
      new FormGroup({
        'wetitle': new FormControl(null, Validators.required),
        'wecompany': new FormControl(null, Validators.required),
        'wefrom': new FormControl('', Validators.required),
         'weto': new FormControl('', Validators.required)
      })
   );
  }

  deleteExp(item: number){
    (<FormArray>this.createprofileForm.get('workexperience')).removeAt(item)
  }

  addSkills() {
    (<FormArray>this.createprofileForm.get('topskills')).push(
      new FormGroup({
        'skills': new FormControl(null),
        'years': new FormControl('')
      })
    )
  }

  deleteSkills(item: number){
    (<FormArray>this.createprofileForm.get('topskills')).removeAt(item);
  }

back() {
  this.router.navigate(['profile']);
}
  

}
