import { Component, Inject, OnInit } from "@angular/core";
import { OktaAuthStateService, OKTA_AUTH } from "@okta/okta-angular";
import { OktaAuth } from "@okta/okta-auth-js";

@Component({
	selector: "app-login-status",
	templateUrl: "./login-status.component-eliakin.html",
	styleUrls: ["./login-status.component-eliakin.css"],
})
export class LoginStatusComponent implements OnInit {
	isAuthenticated: boolean = false;
	userFullName: string;

	storage: Storage = sessionStorage;

	menuStatus: boolean = false;
	isAdmin: boolean = false;

	constructor(
		private oktaAuthService: OktaAuthStateService,
		@Inject(OKTA_AUTH) private oktaAuth: OktaAuth
	) {}

	ngOnInit(): void {
		this.oktaAuthService.authState$.subscribe((result) => {
			this.isAuthenticated = result.isAuthenticated;
			this.getUserDetails();
		});
	}

	getUserDetails() {
		if (this.isAuthenticated) {
			this.oktaAuth.getUser().then((res) => {
				this.userFullName = res.name;

				const userEmail = res.email;
				this.storage.setItem("userEmail", JSON.stringify(userEmail));

				this.isAdmin = res["groups"].includes("Admin");
				this.storage.setItem("isAdmin", JSON.stringify(this.isAdmin));
			});
		}
	}

	logout() {
		this.oktaAuth.signOut();
		this.storage.clear();
	}

	toggleUserMenu() {
		this.menuStatus = !this.menuStatus;
		console.log("USER MENU", this.menuStatus);
	}
}
