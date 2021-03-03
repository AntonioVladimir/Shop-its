import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public isLogged =false;
  public user:any;
  uid!:string;
  constructor(private authSvc: AuthService, private rutaActiva: ActivatedRoute) { }

  async ngOnInit() {
    console.log('nav->');
    this.user = await this.authSvc.getCurrentUser()
    this.uid = this.rutaActiva.snapshot.params.uid;
    if(this.user){
      this.isLogged = true;
    }
  }

}
