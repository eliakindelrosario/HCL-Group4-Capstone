import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
	selector: "app-dashbaord",
	templateUrl: "./dashbaord.component.html",
	styleUrls: ["./dashbaord.component.css"],
})
export class DashbaordComponent implements OnInit {
	storage: Storage = sessionStorage;

	isAdmin: boolean = this.storage.getItem("isAdmin") === "true";
	constructor(public router: Router) {}

	ngOnInit(): void {
		console.log("");
		if (!this.isAdmin){
			this.router.navigateByUrl("/products");
		}
	}
}
