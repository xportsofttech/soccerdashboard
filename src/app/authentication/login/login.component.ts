import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../api-service';
@Component({
	templateUrl: './login.component.html'
})

export class LoginComponent {
	loginForm: FormGroup;
	public msg: boolean = false;
	pushtoken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwaG9uZV9udW1iZXIiOiIrNzIwNjM4ODQ3OCIsImV4cCI6MTYyOTk3ODQ3OCwib3JpZ19pYXQiOjE2MjkzNzM2Nzh9.FCI_EmRgjJj3aQIE2anrLdgeuTbvyq2tEJaoHFEyoUE";
	res: any = [];
	constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, private apiService: ApiService) { }

	ngOnInit(): void {
		this.loginForm = this.fb.group({
			phonenumber: [null, [Validators.required]]

		});
	}
	submitForm(): void {

		this.msg = false;
		let phonenumber = this.loginForm.controls.phonenumber.value;

		this.apiService.UserAuthentication(phonenumber, this.pushtoken)
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
}    