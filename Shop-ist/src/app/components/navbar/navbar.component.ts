import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],

})
export class NavbarComponent implements OnInit {
  public user$: Observable<any> = this.authSvc.afAuth.user;

  constructor(private authSvc: AuthService, private router: Router) {}

  async ngOnInit() {
    /*
    console.log('nav->');
    this.user = await this.authSvc.getCurrentUser();
    if (this.user) {
      this.isLogged = true;
    }*/
  }

  async onLogout() {
    try {
      await this.authSvc.logout();
      this.router.navigate(['/home'])
    } catch (error) {console.log(error);
    }
    
  }
}
