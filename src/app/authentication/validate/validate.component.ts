import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../api-service';
@Component({
	templateUrl: './validate.component.html'
})

export class ValidateComponent {
	loginForm: FormGroup;
	public msg: boolean = false;
	pushtoken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwaG9uZV9udW1iZXIiOiIrNzIwNjM4ODQ3OCIsImV4cCI6MTYyOTk3ODQ3OCwib3JpZ19pYXQiOjE2MjkzNzM2Nzh9.FCI_EmRgjJj3aQIE2anrLdgeuTbvyq2tEJaoHFEyoUE";
	res: any = [];
	
	constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, private apiService: ApiService) { }

	ngOnInit(): void {
		this.loginForm = this.fb.group({
			code: [null, [Validators.required]]

		});
	}
	submitForm(): void {

		this.msg = false;
		let code = this.loginForm.controls.code.value;
		let phonenumber = localStorage.getItem("phone_number");
		this.apiService.ValidateCode(code, phonenumber)
			.subscribe(res => {
				
				if ((res["success"] == true)) {
					//localStorage.setItem("push_token", res["data"].token);
					localStorage.setItem("push_token", JSON.stringify("JWT "+ res["data"].token));
					this.msg = false;
					this.router.navigate(['/dashboard/default']);
				} else {
					this.msg = true;
				}

			}, err => {
				this.msg = true;
			});

	}
}    