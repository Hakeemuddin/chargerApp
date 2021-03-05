import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileReadComponent } from './user-profile-read.component';

describe('UserProfileReadComponent', () => {
  let component: UserProfileReadComponent;
  let fixture: ComponentFixture<UserProfileReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
