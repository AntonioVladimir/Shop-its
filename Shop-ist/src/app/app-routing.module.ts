import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanEditGuard } from './auth/can-edit.guard';
import { CreateShopListComponent } from './components/create-shop-list/create-shop-list.component';
import { HomeComponent } from './components/home/home.component';
import { ListShopComponent } from './components/list-shop/list-shop.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  //login yet______________________________________________
  { path: ':uid/shop-list', component: ListShopComponent },
  { path: ':uid/add-new', component: CreateShopListComponent },
  { path: ':uid/edit/:id', component: CreateShopListComponent },
  { path: ':uid/profile', component: ProfileComponent},
  //-------------------------------------------------------
  { path: 'login', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule) },
  { path: 'register', loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterModule) },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
