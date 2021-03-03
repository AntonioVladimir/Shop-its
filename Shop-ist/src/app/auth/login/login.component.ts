import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {

  login = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  constructor(private authSvc: AuthService, private router:Router) {}

  onGoogleLogin(){
    //service
    try {
      this.authSvc.loginGoogle();
    } catch (error) {
      console.log(error);
      
    }
    
  }
  ngOnInit(): void {
  }
  async onLogin(){
    const {email, password} = this.login.value;
    try {
      const user = await this.authSvc.login(email,password);
      if(user){
        //redirect /profile
        this.router.navigate(['/profile']);
      }
    } catch (error) {
      console.log(error);
      
    }
    
  }
}
