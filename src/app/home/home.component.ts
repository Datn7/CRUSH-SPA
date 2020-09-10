import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../_services/auth.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit {
	registerMode = false;

	constructor(private _http: HttpClient, private _authService: AuthService) {}

	ngOnInit(): void {}

	registerToggle() {
		this.registerMode = true;
	}

	cancelRegisterMode(registerMode: boolean) {
		this.registerMode = registerMode;
	}

	loggedIn() {
		return this._authService.loggedIn();
	}
}
