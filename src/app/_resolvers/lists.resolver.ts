import { User } from '../_models/User';
import { Injectable } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class ListsResolver implements Resolve<User[]> {
    pageSize = 5;
    pageNumber = 1;
    likesParm = 'Likers';

    constructor(private userService: UserService,
         private alertify: AlertifyService,
         private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        return this.userService.getUsers(this.pageNumber, this.pageSize, null, this.likesParm).catch(error => {
            this.alertify.error('Problem retrieving data');
            this.router.navigate(['/home']);
            return Observable.of(null);
        });
    }

}
