import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from 'protractor';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: [ './register.component.css' ]
})
export class RegisterComponent implements OnInit {
	modelRegister: any = {};

	constructor(private _authService: AuthService, private _alertify: AlertifyService) {}

	ngOnInit(): void {}

	register() {
		this._authService.register(this.modelRegister).subscribe(
			() => {
				this._alertify.success('წარმატებით დარეგისტრირდით!');
			},
			(error) => {
				this._alertify.error(error);
			}
		);
	}
}
