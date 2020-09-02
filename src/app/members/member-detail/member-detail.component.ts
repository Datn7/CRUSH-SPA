import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
})
export class MemberDetailComponent implements OnInit {
  detailUser: User;

  constructor(
    private _userService: UserService,
    private _alertify: AlertifyService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this._route.data.subscribe((data) => {
      this.detailUser = data['user'];
    });
  }

  getImages() {
    const imageUrls = [];
    for (const photo of this.detailUser.photos) {
      imageUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url,
        description: photo.description,
      });
    }
    return imageUrls;
  }

  loadUser() {
    this._userService.getUser(+this._route.snapshot.params['id']).subscribe(
      (user: User) => {
        this.detailUser = user;
      },
      (error) => {
        this._alertify.error(error);
      }
    );
  }
}
