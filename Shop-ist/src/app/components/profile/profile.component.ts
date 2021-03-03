import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public isLogged =false;
  public user:any;
  constructor(private authSvc: AuthService) { }

  async ngOnInit() {
    console.log('nav->');
    this.user = await this.authSvc.getCurrentUser()
    if(this.user){
      this.isLogged = true;
    }
  }

}
