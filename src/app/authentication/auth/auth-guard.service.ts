import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationEnd } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    private previousUrl: string;
    private currentUrl: string;

	constructor(public auth: AuthService, public router: Router, private activatedRoute: ActivatedRoute) {
        
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
		
        if (!this.auth.isAuthenticated()) {
            if (this.router.url != 'authentication/login') {
                this.router.navigate(['authentication/login']);
            }
            return false;
        }
        else {
            //if (state.url == '/retailers' && this.apiService.GetLoginUserRoleId() == this.constant.Roles.supplier) {
            //    this.router.navigate([this.currentUrl]);
            //    return false;
            //}
            return true;
        }
    }

}
