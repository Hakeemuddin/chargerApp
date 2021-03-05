import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { UserProfileEditComponent } from './home/user-profile-edit/user-profile-edit.component';
import { UserProfileReadComponent } from './home/user-profile-read/user-profile-read.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  { path: 'user-profile', component: UserProfileReadComponent },
  { path: 'user-profile/edit', component: UserProfileEditComponent },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
