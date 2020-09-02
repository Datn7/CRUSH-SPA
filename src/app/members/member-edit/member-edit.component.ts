import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/_models/user';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent implements OnInit {
  editUser: User;
  @ViewChild('editForm') editForm: NgForm;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private _route: ActivatedRoute,
    private _alertify: AlertifyService,
    private _userService: UserService,
    private _authService: AuthService
  ) {}

  ngOnInit() {
    this._route.data.subscribe((data) => {
      this.editUser = data['user'];
    });
  }

  updateUser() {
    this._userService
      .updateUser(this._authService.decodedToken.nameid, this.editUser)
      .subscribe(
        (next) => {
          this._alertify.success('პროფილი წარმატებით შეიცვალა');
          this.editForm.reset(this.editUser);
        },
        (error) => {
          this._alertify.error(error);
        }
      );
  }
}
