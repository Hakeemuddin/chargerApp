import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileEditViewComponent } from './user-profile-edit-view.component';

describe('UserProfileEditViewComponent', () => {
  let component: UserProfileEditViewComponent;
  let fixture: ComponentFixture<UserProfileEditViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileEditViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileEditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
