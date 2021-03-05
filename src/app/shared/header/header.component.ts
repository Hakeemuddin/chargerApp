import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user?: UserModel;
  @Output() public sidenavToggle$ = new EventEmitter();

  constructor(private router: Router) {}

  ngOnInit(): void {


  }
  onToggleSidenav() {
    this.sidenavToggle$.emit();
  }
  logout() {

    if(this.user) {
      localStorage.removeItem('user');
    }
    this.router.navigate(['/home']);

  }
}
