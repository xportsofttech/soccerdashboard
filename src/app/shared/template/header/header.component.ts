import { Component } from '@angular/core';
import { ThemeConstantService } from '../../services/theme-constant.service';
import { ApiService } from '../../../api-service';
import { Router } from '@angular/router';
import { UserLoginModel } from '../../../models/userinfo';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent{

    searchVisible : boolean = false;
    quickViewVisible : boolean = false;
    isFolded : boolean;
    isExpand: boolean;
    model: UserLoginModel = new UserLoginModel();

	constructor(private themeService: ThemeConstantService, private apiService: ApiService, private router: Router) {}

    ngOnInit(): void {
        this.apiService.Profile().subscribe(res => {

            if (res["success"] == true) {

                var result = res["data"];
                this.model.name = result.first_name;
                this.model.surname = result.last_name;
                this.model.email = result.email;
                this.model.profilepicture = result.profile_picture;
                

            }


        }, err => {

        });
        this.themeService.isMenuFoldedChanges.subscribe(isFolded => this.isFolded = isFolded);
        this.themeService.isExpandChanges.subscribe(isExpand => this.isExpand = isExpand);
    }

    toggleFold() {
        this.isFolded = !this.isFolded;
        this.themeService.toggleFold(this.isFolded);
    }

    toggleExpand() {
        this.isFolded = false;
        this.isExpand = !this.isExpand;
        this.themeService.toggleExpand(this.isExpand);
        this.themeService.toggleFold(this.isFolded);
    }

    searchToggle(): void {
        this.searchVisible = !this.searchVisible;
    }

    quickViewToggle(): void {
        this.quickViewVisible = !this.quickViewVisible;
	}

	logOut() {
		
		localStorage.removeItem("code");
		localStorage.removeItem("push_token");
		localStorage.removeItem("phone_number");
		localStorage.clear();
		//this.apiService.LogOut();
		this.router.navigate(['/authentication/login']);
		
	}

    notificationList = [
        {
            title: 'You received a new message',
            time: '8 min',
            icon: 'mail',
            color: 'ant-avatar-' + 'blue'
        },
        {
            title: 'New user registered',
            time: '7 hours',
            icon: 'user-add',
            color: 'ant-avatar-' + 'cyan'
        },
        {
            title: 'System Alert',
            time: '8 hours',
            icon: 'warning',
            color: 'ant-avatar-' + 'red'
        },
        {
            title: 'You have a new update',
            time: '2 days',
            icon: 'sync',
            color: 'ant-avatar-' + 'gold'
        }
    ];
}
