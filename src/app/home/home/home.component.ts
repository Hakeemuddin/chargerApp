import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserManagementService } from 'src/app/shared/services/user-management.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required]],
  });
  error: any;
  isNewUser = false;
  registrationSubscription?: Subscription;
  loginSubscription?: Subscription;
  constructor(
    private fb: FormBuilder,
    private userManagementService: UserManagementService,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    if (this.registrationSubscription) {
      this.registrationSubscription.unsubscribe();
    }
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    if (this.userManagementService.user) {
      this.userManagementService.user = undefined;
    }
  }

  onRegister() {
    this.isNewUser = true;
    this.loginForm.reset();
  }
  onLogin() {
    this.isNewUser = false;
    this.loginForm.reset();
  }

  onSubmit() {
    if (this.isNewUser) {
      this.registrationSubscription = this.userManagementService
        .register(this.loginForm?.value)
        .subscribe((user) => {
          if(user) {
            this.userManagementService.user = { ...user };
            this.router.navigate(['/user-profile']);
          }
          else{
            this.error = 'unexpected error occurred'
          }

        });
    } else {
      this.loginSubscription = this.userManagementService
        .login(this.loginForm?.value)
        .subscribe((user) => {
          if(user) {
            this.userManagementService.user = { ...user };
            this.router.navigate(['/user-profile']);
          }
          else{
            this.error = 'Invalid User Credentials'
          }
        });
    }
  }
}
