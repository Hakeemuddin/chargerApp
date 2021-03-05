import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StationModel, UserModel } from 'src/app/shared/models';
import { StationManagementService } from 'src/app/shared/services/station-management.service';
import { UserManagementService } from 'src/app/shared/services/user-management.service';

@Component({
  selector: 'app-user-profile-read',
  templateUrl: './user-profile-read.component.html',
  styleUrls: ['./user-profile-read.component.scss'],
})
export class UserProfileReadComponent implements OnInit {
  user?: UserModel;
  favoriteStations$?: Observable<StationModel[]>;
  constructor(
    private router: Router,
    private stationManagementService: StationManagementService,
    private userManagementService: UserManagementService
  ) {}

  ngOnInit(): void {
    const user = this.userManagementService?.user;
    if(!user) {
      this.router.navigate(['/']);
    }
    if (user) {
      this.user = { ...user };
    }
  }

  onEdit() {
    this.router.navigate(['/user-profile/edit']);
  }

  getFavoriteStations(stationIds: string[]) {
    this.favoriteStations$ = this.stationManagementService.getStationsByIds(
      stationIds
    );
  }
}
