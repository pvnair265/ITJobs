import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {
  user: any;
  constructor() { }

 validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

  validateRegisterForm(user) {
    if (user.firstname === undefined || user.lastname === undefined || user.email === undefined ||  user.password === undefined || user.role === undefined){
      return false;
    } else {
      return true;
    }
  };

  validateLoginForm(user){
    if(user.email === undefined || user.password === undefined) {
      return false;
    } else {
      return true;
    }

  }



}
