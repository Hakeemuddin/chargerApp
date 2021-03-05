import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { StationModel, UserModel } from 'src/app/shared/models';
import { UserManagementService } from 'src/app/shared/services/user-management.service';

@Component({
  selector: 'app-user-profile-read-view',
  templateUrl: './user-profile-read-view.component.html',
  styleUrls: ['./user-profile-read-view.component.scss'],
})
export class UserProfileReadViewComponent implements OnInit {
  @Output() onEdit$ = new EventEmitter<void>();
  @Output() getFavoriteStations$ = new EventEmitter<string[]>();
  @Input() user?: UserModel;
  @Input() favoriteStations?: StationModel[] | null = [];
  constructor(
    private router: Router,
    private userManagementService: UserManagementService
  ) {}

  ngOnInit(): void {

    if (this.user && this.user?.favoriteStations) {
      this.getFavoriteStations$.emit(this.user.favoriteStations);
    }
  }

  logout() {
    if (this.user) {
      this.userManagementService.user = undefined;
      this.user = undefined;
      this.router.navigate(['/']);
    }
  }
}
