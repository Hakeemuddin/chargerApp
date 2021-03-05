import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StationModel } from 'src/app/shared/models';
import { StationManagementService } from 'src/app/shared/services/station-management.service';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.scss'],
})
export class UserProfileEditComponent implements OnInit {
  stations$?: Observable<StationModel[]>;
  favoriteStations$?: Observable<StationModel[]>;

  constructor(private stationManagementService: StationManagementService) {}

  ngOnInit(): void {
    this.stations$ = this.stationManagementService.getAllStations();
  }

  getFavoriteStations(stationIds: string[]) {
    this.favoriteStations$ = this.stationManagementService.getStationsByIds(
      stationIds
    );
  }
}
