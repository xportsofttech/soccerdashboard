import { Component } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../api-service';
import { progonistics, UserLoginModel } from '../../models/userinfo';
import { FormControl, FormGroup, Validators } from '@angular/forms';
declare var $;

interface DataItem {
    name: string;
    email: string;
    phone: string;
    adress: string;
    country: string;
    donation: number;
}


@Component({
    templateUrl: './default-dashboard.component.html',

})

export class DefaultDashboardComponent {
    loginForm: FormGroup;
    PopupModel: progonistics = new progonistics();

    public msg: boolean = false;
    res: any = [];
    products = [];
    scoreList: any = ['0', '1', '2', '3', '4', '5']
    constructor(private http: HttpClient, private apiService: ApiService) { }
    listOfData: any = [];
    model: UserLoginModel = new UserLoginModel();
    ngOnInit(): void {
        

        this.loginForm = new FormGroup({
            'leftscore': new FormControl(null), //note, can have up to 3 Constructor Params: default value, validators, AsyncValidators
            'rightscore': new FormControl(null),
            'opinion': new FormControl(null),
            'eventid': new FormControl(null)

        })

        this.apiService.Events().subscribe((data: any[]) => {
           
            console.log(data["data"]);
            let resulltsdt = data["data"]["results"];
            for (let item of resulltsdt) {
                this.products.push({
                    "id": item.id,
                    "leaguename": item.league.name,
                    "name": item.name,
                    "team_awaylogo": item.team_away["logo"],
                    "team_homelogo": item.team_home["logo"],
                    "start_time": new Date(item.start_time * 1000).toLocaleDateString("en-us"),
                    "team_awayname": item.team_away["name"],
                    "team_homename": item.team_home["name"],
                    "starting_time": item.start_time,
                    "end_time": item.end_time
                });
            }

        })


        this.apiService.Profile().subscribe(res => {

            if (res["success"] == true) {
               
                var result = res["data"];
                this.model.name = result.first_name;
                this.model.surname = result.last_name;
                this.model.email = result.email;
                this.model.profilepicture = result.profile_picture;
                this.model.country = result.country;
                this.model.city = result.city;
                this.model.app_points = result.app_points;
                this.model.status_progess = result.status_progress;
                this.model.last_status = result.last_status;
                this.model.tipstername = result.app_points > 5000 ? "Vipster" : "Tipster";
                this.model.influncername = result.app_points > 5000 ? "Influencer" : "Vipster";
                this.model.followers_count = result.followers_count;
                this.model.current_status = result.current_status;
                this.model.progonisticnumber = result.number_of_prognostics;
                this.model.performanceindicator = result.status_progress;
                this.model.globalranking = result.global_rank;
                this.model.tokenbalance = result.tokens_balance;
                localStorage.profilepic = result.profile_picture;

            }


        }, err => {

        });


    }
    submitForm(): void {

        this.msg = false;
        let opinion = this.loginForm.controls.opinion.value;
        let eventid = this.loginForm.controls.eventid.value;
       // $('#setpronostic').modal('hide');
        this.apiService.Tips(opinion, eventid)
            .subscribe(res => {

                if ((res["success"] == true)) {
                    
                    this.msg = false;
                   
                } else {
                    this.msg = true;
                }
                console.log(this.msg);

            }, err => {
                this.msg = true;
            });

    }
    SetPronostic(productd) {
        console.log("test", productd);

        this.PopupModel.id = productd.id ;
        this.PopupModel.name = productd.name;
        this.PopupModel.team_awaylogo = productd.team_awaylogo;
        this.PopupModel.team_awayname = productd.team_awayname;
        this.PopupModel.team_homelogo = productd.team_homelogo;
        this.PopupModel.team_homename = productd.team_homename;
        this.PopupModel.starting_time = productd.start_time;
        this.PopupModel.end_time = productd.end_time;
        $('#setpronostic').modal('show');
        //$("#setpronostic").model();
        
    }

    
    optionList = [

        { id: 1, name: '1' },
        { id: 2, name: '2' },
        { id: 3, name: '3' },

    ]

    //themeColors = this.colorConfig.get().colors;
    //blue = this.themeColors.blue;
    //blueLight = this.themeColors.blueLight;
    //cyan = this.themeColors.cyan;
    //cyanLight = this.themeColors.cyanLight;
    //gold = this.themeColors.gold;
    //purple = this.themeColors.purple;
    //purpleLight = this.themeColors.purpleLight;
    //red = this.themeColors.red;

    //taskListIndex: number = 0;

    //searchValue = '';
    //visible = false;
    //listOfData: DataItem[] = [
    //	{
    //		name: 'John Brown',
    //		email: 'j@gmail.com',
    //		phone: '01.00.00.20',
    //		adress: 'New York No. 1 Lake Park',
    //		country: 'USA',
    //		donation: 3000
    //	},


    //];





    //reset(): void {
    //	this.searchValue = '';
    //	this.search();
    //}

    //search(): void {
    //	this.visible = false;
    //	this.listOfDisplayData = this.listOfData.filter((item: DataItem) => item.name.indexOf(this.searchValue) !== -1);
    //}
}




