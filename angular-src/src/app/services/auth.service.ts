import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  authToken: any;
  user:any;
  id:any;
  constructor(private http: Http) { }

      registerUser(user) {
        let header = new Headers();
        header.append('Content-Type','application/json');
        return this.http.post('http://localhost:3000/users/register',user,{headers:header})
        .map(res => res.json());
      }

      loginUser(user){
        let header= new Headers();
        header.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:3000/users/login', user, {headers: header})
        .map(res => res.json());
      }

      getProfile() {
        let header = new Headers();
        this.loadToken();
        header.append('Authorization',this.authToken);
        header.append('Content-Type','application/json');
        return this.http.get('http://localhost:3000/users/profile',{headers: header})
        .map(res=>res.json());
      }

      loadToken() {
        const token = localStorage.getItem('id_token');
        this.authToken = token;  
      }

      loggedIn() {
          return tokenNotExpired();
        }

      storeuserData(token, user){
        localStorage.setItem('id_token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.authToken = token;
        this.user = user;
      }

      logOut() {
        this.authToken = null;
        this.user = null;
        localStorage.clear();
      }

      //Create Profile 

      createProfile(data) {
        let header = new Headers();
        this.loadToken();
        header.append('Authorization',this.authToken);
        header.append('Content-Type','application/json');
         return this.http.post('http://localhost:3000/users/createprofile',data,{headers:header})
        .map(res => res.json());
      }

      getProfileData(id){
        let header = new Headers();
        header.append('Content-Type','application/json');
        return this.http.get('http://localhost:3000/users/getprofiledata?id='+id,{headers: header})
         .map(res => res.json());
      }

      postJobs(data){
        let header = new Headers();
        this.loadToken();
        header.append('Authorization', this.authToken);
        header.append('Content-Type','application/json');
        return this.http.post('http://localhost:3000/users/postjobs', data, {headers:header})
        .map(res => res.json());
      }

      getPostedData(id){
        let header = new Headers();
        header.append('Content-Type','application/json');
        return this.http.get('http://localhost:3000/users/getposteddata?id='+id,{headers: header})
                .map(res => res.json());
      }

      getallJobs() {
        let header = new Headers();
        header.append('Content-Type','application/json');
        return this.http.get('http://localhost:3000/users/getalldata', {headers: header})
                .map(res => res.json());
      }

      getjobDetail(id) {
        let header = new Headers();
        header.append('Content-Type','application/json');
        return this.http.get('http://localhost:3000/users/getjobdetail?id='+id, {headers: header})
                .map(res => res.json());
      }

}
