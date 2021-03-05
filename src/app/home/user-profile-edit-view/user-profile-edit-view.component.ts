import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { StationModel, UserModel } from 'src/app/shared/models';
import { UserManagementService } from 'src/app/shared/services/user-management.service';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-user-profile-edit-view',
  templateUrl: './user-profile-edit-view.component.html',
  styleUrls: ['./user-profile-edit-view.component.scss'],
})
export class UserProfileEditViewComponent implements OnInit, OnChanges {
  favoriteForm: FormGroup = this.fb.group({});
  showFavoriteForm: boolean = false;
  activeStationForm: FormGroup = this.fb.group({});
  showactiveStationForm: boolean = false;
  userProfileForm: FormGroup = this.fb.group({});
  user?: UserModel;
  @Input() stations?: StationModel[] | null = [];
  @Input() favoriteStations?: StationModel[] | null = [];
  favoriteStationList: StationModel[] = [];
  @Output() getFavoriteStations$ = new EventEmitter<string[]>();
  activeStations: StationModel[] = [];
  constructor(
    private fb: FormBuilder,
    private userManagementService: UserManagementService,
    private router: Router
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['stations'] && this.stations) {
      this.favoriteStationList = this.stations?.filter(
        (s) => !this.user?.favoriteStations?.includes(s.stationId)
      );
    }
  }

  ngOnInit(): void {
    this.userProfileForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: [''],
      email: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
    });
    const user = this.userManagementService?.user;
    if (!user) {
      this.router.navigate(['/']);
    }
    if (user) {
      this.user = { ...user };

      if (this.user && this.user?.favoriteStations) {
        this.getFavoriteStations$.emit(this.user.favoriteStations);
      }
      if (this.user?.activeStations) {
        this.activeStations = [...this.user?.activeStations];
      }
    }
    this.userProfileForm?.patchValue({ ...this.user });
  }

  addFavorite() {
    this.favoriteForm = this.fb.group({
      stationId: new FormControl('', [Validators.required]),
    });
    this.showFavoriteForm = true;
  }

  hideFavoriteForm() {
    this.showFavoriteForm = false;
  }

  saveFavorite() {
    const station = this.stations?.find(
      (s) => s.stationId === this.favoriteForm?.controls?.stationId?.value
    );

    if (!this.favoriteStations) {
      this.favoriteStations = [];
    }
    if (station) {
      this.favoriteStations?.push(station);
    }

    this.hideFavoriteForm();
  }

  removeFavorite(index: number) {
    this.favoriteStations?.splice(index, 1);
  }
  addActiveStation() {
    this.activeStationForm = this.fb.group({
      stationId: new FormControl('', [Validators.required]),
      chargingTime: new FormControl(''),
      powerCosumption: new FormControl(''),
      cost: new FormControl(''),
    });
    this.showactiveStationForm = true;
  }

  hideActiveStation() {
    this.showactiveStationForm = false;
  }
  removeActiveStation(index: number) {
    this.activeStations?.splice(index, 1);
  }
  saveActiveStation() {
    const station = this.stations?.find(
      (s) => s.stationId === this.activeStationForm?.controls?.stationId?.value
    );

    if (station) {
      this.activeStations?.push({
        ...station,
        ...this.activeStationForm?.value,
      });
    }

    this.hideActiveStation();
  }

  saveProfile() {
    const userProfile: UserModel = { ...this.userProfileForm?.value };
    if (this.favoriteStations) {
      userProfile.favoriteStations = this.favoriteStations?.map(
        (fs) => fs.stationId
      );
    }

    if (this.activeStations) {
      userProfile.activeStations = [...this.activeStations];
    }
    userProfile.userId = `${userProfile.email}-${userProfile.phoneNumber}`;

    this.userManagementService.updateProfile(userProfile).subscribe((user) => {
      this.userManagementService.user = { ...user };
      this.router.navigate(['/user-profile']);
    });
  }

  onCancel() {
    this.router.navigate(['/user-profile']);
  }

  logout() {
    if (this.user) {
      this.userManagementService.user = undefined;
      this.user = undefined;
      this.router.navigate(['/']);
    }
  }
}
