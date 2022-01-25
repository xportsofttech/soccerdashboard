import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
@Injectable({
	providedIn: 'root'
})
export class ApiService {
	API_URL = 'http://zewins.mixinsoftware.com/';// live do not use this for testing

	constructor(private http: HttpClient) { }
	GetHeader() {
		
		//var id = token.data;
		var headers = new HttpHeaders();
		headers.append("Content-Type", "application/json");
		//headers.append("Authorization-Token", id);
		return headers;

	}
	GetHeaderwithtoken() {
		var token = JSON.parse(localStorage.getItem('push_token'));
		
		var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
		
		return headers;

	}
	//login screen
	UserAuthentication(phonenumber, push_token) {

		return this.http.post(this.API_URL + "en/auth/login/", { "phone_number": phonenumber, "push_token": push_token }, { headers: this.GetHeader() });
	}
	//to check validate code
	ValidateCode(code, phonenumber ) {

		return this.http.post(this.API_URL + "en/auth/validate-code/", { "phone_number": phonenumber, "verification_code": code }, { headers: this.GetHeader() });
	}
	//sign up
	Register(phonenumber, firstname, lastname, emailid, username, birthdate,country,city) {
		return this.http.post(this.API_URL + "en/auth/register/", {
			"phone_number": phonenumber, "first_name": firstname, "last_name": lastname, "username": username, "email": emailid, "birth_date": birthdate, "country": "France", "city": "créteil", "push_token":"JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwaG9uZV9udW1iZXIiOiIrNzIwNjM4ODQ3OCIsImV4cCI6MTYzMTE4MTQxNywib3JpZ19pYXQiOjE2MzA1NzY2MTd9.LZrNN9oWHcuxrX - c0MynwlmhEhXEF7o9vTW8mWlj - qg" }, { headers: this.GetHeader() });

	}

	Events() {
		
		return this.http.get(this.API_URL + "en/events/?limit=100&offset=1",{ headers: this.GetHeaderwithtoken() });

	}
	Progonostics() {

		return this.http.get(this.API_URL + "en/users/me/tips/", { headers: this.GetHeaderwithtoken() });

	}

	Profile() {

		return this.http.get(this.API_URL + "/users/me/", { headers: this.GetHeaderwithtoken() });

	}

	Packages() {

		return this.http.get(this.API_URL + "en/credits/history/actions/?limit=100&offset=1", { headers: this.GetHeaderwithtoken() });

	}

	Members() {

		return this.http.get(this.API_URL + "en/users/?limit=100&offset=1", { headers: this.GetHeaderwithtoken() });

	}

	Tips(eventid,opinion) {

		return this.http.post(this.API_URL + "en/tips/", {
			
			"event": eventid,
				"prognostics": [
					{
						"home_score": 2,
						"away_score": 2,
						"winner": "HOME",
						"goals": "0-1",
						"faults": "0-5",
						"prognostic_type": "WINNER"
					}
				],
				"cost": 87,
			"opinion": opinion,
			
		}, { headers: this.GetHeader() });

	}


}
