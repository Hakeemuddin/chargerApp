import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileReadComponent } from './user-profile-read/user-profile-read.component';
import { UserProfileReadViewComponent } from './user-profile-read-view/user-profile-read-view.component';
import { UserProfileEditComponent } from './user-profile-edit/user-profile-edit.component';
import { UserProfileEditViewComponent } from './user-profile-edit-view/user-profile-edit-view.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [

    UserProfileReadComponent,
    UserProfileReadViewComponent,
    UserProfileEditComponent,
    UserProfileEditViewComponent,
    HomeComponent,
  ],
  imports: [CommonModule, SharedModule],
})
export class HomeModule {}
