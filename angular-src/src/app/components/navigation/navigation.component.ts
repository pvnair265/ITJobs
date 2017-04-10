import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  //Mobile navigation
    isIn = false;
    toggleState() {
      this.isIn = !this.isIn;
    }

  //end

  constructor(private authservice: AuthService,
              private router: Router,
              private flashmessagesservice: FlashMessagesService) { }

  ngOnInit() {
  }

  onlogOut() {
    this.authservice.logOut();
    this.flashmessagesservice.show('You are logged out', {
      cssClass : 'alert-success',
      timeout: 3000
    })
    this.router.navigate(['home']);
    return false;

  }

}
