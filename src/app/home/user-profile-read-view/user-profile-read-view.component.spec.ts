import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileReadViewComponent } from './user-profile-read-view.component';

describe('UserProfileReadViewComponent', () => {
  let component: UserProfileReadViewComponent;
  let fixture: ComponentFixture<UserProfileReadViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileReadViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileReadViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
