import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  usersList: User[];

  constructor(
    private _userService: UserService,
    private _alertify: AlertifyService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._route.data.subscribe((data) => {
      this.usersList = data['users'];
    });
  }

  loadUsers() {
    this._userService.getUsers().subscribe(
      (users: User[]) => {
        this.usersList = users;
      },
      (error) => {
        this._alertify.error(error);
      }
    );
  }
}
