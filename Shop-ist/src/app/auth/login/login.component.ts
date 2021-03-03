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
  loading = false;
  login = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  constructor(private authSvc: AuthService, private router:Router) {}

  async onGoogleLogin(){
    //service
    
    try {
      this.loading = true;
      const user = await this.authSvc.loginGoogle();
      if(user){
        //redirect /profile
        this.router.navigate(['/profile']);
      }
      this.loading = false;
      
      
    } catch (error) {
      console.log(error);
      
    }
    
  }
  ngOnInit(): void {
  }
  async onLogin(){
    this.loading = true;
    const {email, password} = this.login.value;
    try {
      const user = await this.authSvc.login(email,password);
      if(user){
        //redirect /profile
        this.router.navigate(['/profile']);
        this.loading = false;
      }
    } catch (error) {
      console.log(error);
      
    }
    
  }
}
