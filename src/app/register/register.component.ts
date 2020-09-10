import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from 'protractor';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { User } from '../_models/user';
import { Router } from '@angular/router';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: [ './register.component.css' ]
})
export class RegisterComponent implements OnInit {
	modelRegister: User;
	registerForm: FormGroup;

	constructor(
		private _authService: AuthService,
		private _alertify: AlertifyService,
		private _fb: FormBuilder,
		private _router: Router
	) {}

	ngOnInit(): void {
		this.createRegisterForm();

		/*
		this.registerForm = new FormGroup(
			{
				username: new FormControl('', Validators.required),
				password: new FormControl('', [
					Validators.required,
					Validators.minLength(4),
					Validators.maxLength(8)
				]),
				confirmPassword: new FormControl('', Validators.required)
			},
			this.passwordMatchValidator
		);
	*/
	}

	createRegisterForm() {
		this.registerForm = this._fb.group(
			{
				gender: [ 'male' ],
				username: [ '', Validators.required ],
				knownAs: [ '', Validators.required ],
				dateOfBirth: [ null, Validators.required ],
				city: [ '', Validators.required ],
				country: [ '', Validators.required ],
				password: [ '', [ Validators.required, Validators.minLength(4), Validators.maxLength(8) ] ],
				confirmPassword: [ '', Validators.required ]
			},
			{ validator: this.passwordMatchValidator }
		);
	}

	passwordMatchValidator(g: FormGroup) {
		return g.get('password').value == g.get('confirmPassword').value ? null : { mismatch: true };
	}

	register() {
		if (this.registerForm.valid) {
			this.modelRegister = Object.assign({}, this.registerForm.value);
			this._authService.register(this.modelRegister).subscribe(
				() => {
					this._alertify.success('რეგისტრაცია გაიარეთ');
				},
				(error) => {
					this._alertify.error(error);
				},
				() => {
					this._authService.login(this.modelRegister).subscribe(() => {
						this._router.navigate([ '/members' ]);
					});
				}
			);
		}

		console.log(this.registerForm.value);
		/*
		this._authService.register(this.modelRegister).subscribe(
			() => {
				this._alertify.success('წარმატებით დარეგისტრირდით!');
			},
			(error) => {
				this._alertify.error(error);
			}
		);
	*/
	}
}
