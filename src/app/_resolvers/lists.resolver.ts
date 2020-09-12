import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ListsResolver implements Resolve<User[]> {
  pageNumber = 1;
  pageSize = 5;
  likesParam = 'Likers';

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _alertify: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
    return this._userService
      .getUsers(this.pageNumber, this.pageSize, null, this.likesParam)
      .pipe(
        catchError((error) => {
          this._alertify.error('ინფორმაცია ვერ მოდის');
          this._router.navigate(['']);
          return of(null);
        })
      );
  }
}
