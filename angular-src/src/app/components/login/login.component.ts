import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 email: String;
 password: String;

  constructor(private authservice: AuthService, 
  private validateservice: ValidateService,
  private flashmessagesservice: FlashMessagesService,
  private router: Router) { }

  ngOnInit() {
  }

  onLogin() {
    const user = {
      email: this.email,
      password: this.password
    };

    //Client side validation
    if(!this.validateservice.validateLoginForm(user)) {
      this.flashmessagesservice.show('All fields are required',{cssClass: 'alert-danger', timeout: 1000});
      return false;
    }

    if(!this.validateservice.validateEmail(user.email)){
      this.flashmessagesservice.show('Invalid Email address',{cssClass: 'alert-danger', timeout: 1000});
      return false;
    }
    //send to service
    this.authservice.loginUser(user).subscribe(data => {
      if(data.success){
        this.authservice.storeuserData(data.token,data.user);
        this.flashmessagesservice.show(data.message, {cssClass: 'alert-success', timeout: 1000});
        this.router.navigate(['/profile']);  
      } else {
        this.flashmessagesservice.show(data.message, {cssClass: 'alert-danger', timeout: 1000});
        this.router.navigate(['login']);
      }
    })
  }

}
