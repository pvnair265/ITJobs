import { Component, OnInit } from '@angular/core';
import { AuthService } from  '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  firstname: String;
  lastname : String;
  email: String;
  password: String;
  role: String;

  constructor(private authservice: AuthService, 
  private validateservice: ValidateService,
  private flashmessagesservice: FlashMessagesService,
  private router: Router) { }

  ngOnInit() {
  }

  onRegister() {
    const user = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      role: this.role
    }
    

    //Flash Message - Validate required fields
    if(!this.validateservice.validateRegisterForm(user)){
      this.flashmessagesservice.show('All fields are required', { cssClass: 'alert-danger', timeout: 1000 });
      return false;
    }

     if(!this.validateservice.validateEmail(user.email)){
      this.flashmessagesservice.show('Invalid Email address',{cssClass: 'alert-danger', timeout: 1000});
      return false;
    }


    //Send to service
    this.authservice.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashmessagesservice.show(data.message, { cssClass: 'alert-success', timeout: 1000});
        this.router.navigate(['/login']);
      } else {
        this.flashmessagesservice.show(data.message, { cssClass: 'alert-danger', timeout: 1000});
      }
    });

      
  }

}
