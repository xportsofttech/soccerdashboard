import { Component } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../api-service';

@Component({
    templateUrl: './members.component.html'
})

export class MembersComponent {
	constructor(private http: HttpClient, private apiService: ApiService) { }
	ngOnInit(): void {

		this.apiService.Members().subscribe((data: any[]) => {
			console.log(data);
			//var date = new Date(timestamp).toLocaleDateString("en-us")
			//this.products = data["data"]["results"];
			let resulltsdt = data["data"]["results"];
			for (let item of resulltsdt) {
                this.followlist.push({
					"name": item.first_name + " " + item.last_name,
                    "img": item.profile_picture ? item.profile_picture :"~/../assets/images/avatars/avatar.png",
                    "classification": item.classification,
                    "country": item.country,
					
					
				});
			}

		})


	}
    followlist = [];
    //memberList = [
    //    {
    //        name: 'Erin Gonzales',
    //        img: 'assets/images/avatars/thumb-1.jpg',
    //        mail: 'erin.gon@gmail.com'
    //    },
    //    {
    //        name: 'Darryl Day',
    //        img: 'assets/images/avatars/thumb-2.jpg',
    //        mail: 'darryl.d@gmail.com'
    //    },
    //    {
    //        name: 'Marshall Nichols',
    //        img: 'assets/images/avatars/thumb-3.jpg',
    //        mail: 'marshalln@gmail.com'
    //    },
    //    {
    //        name: 'Virgil Gonzales',
    //        img: 'assets/images/avatars/thumb-4.jpg',
    //        mail: 'virgil14@gmail.com'
    //    },
    //    {
    //        name: 'Nicole Wyne',
    //        img: 'assets/images/avatars/thumb-5.jpg',
    //        mail: 'nicolew@gmail.com'
    //    },
    //    {
    //        name: 'Riley Newman',
    //        img: 'assets/images/avatars/thumb-6.jpg',
    //        mail: 'rileyn93@gmail.com'
    //    },
    //    {
    //        name: 'Pamela Wanda',
    //        img: 'assets/images/avatars/thumb-7.jpg',
    //        mail: 'pamelaw@gmail.com'
    //    }
    //]
}