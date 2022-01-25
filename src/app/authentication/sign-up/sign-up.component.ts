import { Component } from '@angular/core'
import { FormBuilder, FormControl, FormGroup,  Validators } from '@angular/forms';
import { ApiService } from '../../api-service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
    templateUrl: './sign-up.component.html'
})

export class SignUpComponent {

	constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, private apiService: ApiService) { }

    signUpForm: FormGroup;
	public msg: boolean = false;
	public message: string;
	pushtoken = "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwaG9uZV9udW1iZXIiOiIrOTE3MjA2Mzg4NDc4IiwiZXhwIjoxNjM0NzMzNDEyLCJvcmlnX2lhdCI6MTYzNDEyODYxMn0.BmfDYQPx3S4pEF95D34h_aJ_SPSjqNuxDWw9CqL - foo";
    submitForm(): void {
        for (const i in this.signUpForm.controls) {
            this.signUpForm.controls[ i ].markAsDirty();
            this.signUpForm.controls[ i ].updateValueAndValidity();
		}

		this.msg = false;
		
		let firstname = this.signUpForm.controls.firstname.value;
		let lastname = this.signUpForm.controls.lastname.value;
		let username = this.signUpForm.controls.username.value;
		let emailid = this.signUpForm.controls.emailid.value;
		let phonenumber = this.signUpForm.controls.phonenumber.value;
		let birthdate = this.signUpForm.controls.birthdate.value;
		let country = this.signUpForm.controls.country.value;
		let city = this.signUpForm.controls.city.value;

		this.apiService.Register(phonenumber, firstname, lastname, username, emailid, birthdate,country,city)
			.subscribe(res => {

				if ((res["success"] == true)) {
					
					
					localStorage.setItem("code", res["data"].code);
					localStorage.setItem("phone_number", phonenumber);
					this.msg = false;
					this.router.navigate(['/authentication/validate']);
					

				} else {
					this.msg = true;
				}

			}, err => {
				this.msg = true;
			});
    }

   /* updateConfirmValidator(): void {
        Promise.resolve().then(() => this.signUpForm.controls.checkPassword.updateValueAndValidity());
    }

    confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { required: true };
        } else if (control.value !== this.signUpForm.controls.password.value) {
            return { confirm: true, error: true };
        }
    }
*/
    

    ngOnInit(): void {
        this.signUpForm = this.fb.group({
			firstname         : [ null, [ Validators.required ] ],
			lastname: [null, [Validators.required]],
			username: [null, [Validators.required]],
			emailid: [null, [Validators.required]],
			phonenumber: [null, [Validators.required]],
			country: [null, [Validators.required]],
			city: [null, [Validators.required]],
			birthdate: [null, [Validators.required]],
            agree            : [ false ]
        });
    }
}    