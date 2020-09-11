import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';

@Component({
	selector: 'app-member-list',
	templateUrl: './member-list.component.html',
	styleUrls: [ './member-list.component.css' ]
})
export class MemberListComponent implements OnInit {
	usersList: User[];
	user: User = JSON.parse(localStorage.getItem('user'));
	genderList = [ { value: 'male', display: 'კაცები' }, { value: 'female', display: 'ქალები' } ];
	userParams: any = {};

	pagination: Pagination;

	constructor(
		private _userService: UserService,
		private _alertify: AlertifyService,
		private _route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this._route.data.subscribe((data) => {
			this.usersList = data['users'].result;
			this.pagination = data['users'].pagination;
		});
		/* this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female'; */
		this.userParams.minAge = 18;
		this.userParams.maxAge = 99;
		this.userParams.orderBy = 'lastActive';
	}

	pageChanged(event: any): void {
		this.pagination.currentPage = event.page;
		this.loadUsers();
	}

	resetFilters() {
		this.userParams.minAge = 18;
		this.userParams.maxAge = 99;
		this.loadUsers();
	}

	loadUsers() {
		this._userService
			.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
			.subscribe(
				(res: PaginatedResult<User[]>) => {
					this.usersList = res.result;
				},
				(error) => {
					this._alertify.error(error);
				}
			);
	}
}
