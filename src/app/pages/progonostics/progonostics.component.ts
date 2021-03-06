import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../api-service';

@Component({
    templateUrl: './progonostics.component.html'
})

export class ProgonosticsComponent {
	constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, private apiService: ApiService) { }

    ngOnInit(): void {

        this.apiService.Progonostics().subscribe((data: any[]) => {
		
            
            let resulltsdt = data["data"]["results"];
            for (let item of resulltsdt) {
                this.skillListData.push({
                    "id": item.id,
                    "name": item.name,
                    "team_awaylogo": item.team_away["logo"],
                    "team_homelogo": item.team_home["logo"],
                    "start_time": new Date(item.start_time * 1000).toLocaleDateString("en-us"),
                    "team_awayname": item.team_away["name"],
                    "team_homename": item.team_home["name"],

                });
            }

		}, err => {

		});
    }
    skillListData = [

    ]
    //skillListData = ['Sketch', 'Marvel', 'Photoshop', 'Illustrator', 'Web Design', 'Mobile App Design', 'User Interface', 'User Experience']

    //expListData = [
    //    {
    //        img: 'assets/images/others/adobe-thumb.png',
    //        title: 'UI/UX Designer',
    //        company: 'Adobe Inc.',
    //        date: 'Jul 2018'
    //    },
    //    {
    //        img: 'assets/images/others/amazon-thumb.png',
    //        title: 'Product Developer',
    //        company: 'Amazon.com Inc.',
    //        date: 'Jul-2017 - Jul 2018'
    //    },
    //    {
    //        img: 'assets/images/others/nvidia-thumb.png',
    //        title: 'Interface Designer',
    //        company: 'Nvidia Corporation',
    //        date: 'Jul-2016 - Jul 2017'
    //    }
    //]

    //eduListData = [
    //    {
    //        img: 'assets/images/others/cambridge-thumb.png',
    //        degree: 'MSt in Social Innovation',
    //        school: 'Cambridge University',
    //        date: 'Jul-2012 - Jul 2016'
    //    },
    //    {
    //        img: 'assets/images/others/phillips-academy-thumb.png',
    //        degree: '',
    //        school: 'Phillips Academy',
    //        date: 'Jul-2005 - Jul 2011'
    //    }  
    //]

    //connectedListData = [
    //    {
    //        name: 'Erin Gonzales',
    //        src: 'assets/images/avatars/thumb-1.jpg',
    //        title: 'UI/UX Designer'
    //    },
    //    {
    //        name: 'Darryl Day',
    //        src: 'assets/images/avatars/thumb-2.jpg',
    //        title: 'Software Engineer'
    //    },
    //    {
    //        name: 'Marshall Nichols',
    //        src: 'assets/images/avatars/thumb-3.jpg',
    //        title: 'Product Manager'
    //    },
    //    {
    //        name: 'Riley Newman',
    //        src: 'assets/images/avatars/thumb-6.jpg',
    //        title: 'Data Analyst'
    //    }
    //];

    //projectListData = [
    //    {
    //        name: 'Coffee Finder App',
    //        img: 'assets/images/others/coffee-app-thumb.jpg',
    //        desc: 'It is a long established fact that a reader will be distracted by the readable content.',
    //        status: 'In Progress',
    //        participate: [
    //            {
    //                name: 'Eugene Jordan',
    //                img: 'assets/images/avatars/thumb-6.jpg'
    //            },
    //            {
    //                name: 'Pamela',
    //                img: 'assets/images/avatars/thumb-7.jpg'
    //            }
    //        ]    
    //    },
    //    {
    //        name: 'Weather App',
    //        img: 'assets/images/others/weather-app-thumb.jpg',
    //        desc: 'It is a long established fact that a reader will be distracted by the readable content.',
    //        status: 'Completed',
    //        participate: [
    //            {
    //                name: 'Lillian Stone',
    //                img: 'assets/images/avatars/thumb-8.jpg'
    //            },
    //            {
    //                name: 'Victor Terry',
    //                img: 'assets/images/avatars/thumb-9.jpg'
    //            },
    //            {
    //                name: 'Wilma Young',
    //                img: 'assets/images/avatars/thumb-10.jpg'
    //            }
    //        ]    
    //    },
    //    {
    //        name: 'Music App',
    //        img: 'assets/images/others/music-app-thumb.jpg',
    //        desc: 'Protein, iron, and calcium are some of the nutritional benefits associated with cheeseburgers.',
    //        status: 'Completed',
    //        participate: [
    //            {
    //                name: 'Lillian Stone',
    //                img: 'assets/images/avatars/thumb-2.jpg'
    //            },
    //            {
    //                name: 'Wilma Young',
    //                img: 'assets/images/avatars/thumb-4.jpg'
    //            }
    //        ]    
    //    }
    //];

    //reviewListData = [
    //    {
    //        name: 'Lillian Stone',
    //        img: 'assets/images/avatars/thumb-8.jpg',
    //        date: '28th Jul 2018',
    //        rating: 5,
    //        review: 'The palatable sensation we lovingly refer to as The Cheeseburger has a distinguished and illustrious history. It was born from humble roots, only to rise to well-seasoned greatness.'
    //    },
    //    {
    //        name: 'Victor Terry',
    //        img: 'assets/images/avatars/thumb-9.jpg',
    //        date: '28th Jul 2018',
    //        rating: 4,
    //        review: 'The palatable sensation we lovingly refer to as The Cheeseburger has a distinguished and illustrious history. It was born from humble roots, only to rise to well-seasoned greatness.'
    //    },
    //    {
    //        name: 'Wilma Young',
    //        img: 'assets/images/avatars/thumb-10.jpg',
    //        date: '28th Jul 2018',
    //        rating: 5,
    //        review: 'The palatable sensation we lovingly refer to as The Cheeseburger has a distinguished and illustrious history. It was born from humble roots, only to rise to well-seasoned greatness.'
    //    }
    //]
}    