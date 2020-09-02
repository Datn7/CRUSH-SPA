import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  navModel: any = {};

  constructor(
    public _authService: AuthService,
    private _alertify: AlertifyService,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    this._authService.login(this.navModel).subscribe(
      (next) => {
        this._alertify.success('შეხვედი წარმატებით');
      },
      (error) => {
        this._alertify.error('მომხმარებელი ან პაროლი არასწორია');
      },
      () => {
        this._router.navigate(['/members']);
      }
    );
  }

  loggedIn() {
    return this._authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this._alertify.message('გახვედი');
    this._router.navigate(['']);
  }
}
