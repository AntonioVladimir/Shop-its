import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  
  register = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  
  constructor(private authSvc: AuthService, private router:Router) { }

  ngOnInit(): void {
  }
  async onRegister(){
    const {email,password} =this.register.value;
    try {
      const user = await this.authSvc.register(email,password);
      if(user){
        this.router.navigate(['/profile']);
      }
    } catch (error) {
      console.log(error);
      
    } 
  }
}
