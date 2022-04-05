import { Component, OnInit } from "@angular/core";

@Component({
	selector: "app-dashbaord",
	templateUrl: "./dashbaord.component.html",
	styleUrls: ["./dashbaord.component.css"],
})
export class DashbaordComponent implements OnInit {
	storage: Storage = sessionStorage;

	isAdmin: boolean = this.storage.getItem("isAdmin") === "true";
	constructor() {}

	ngOnInit(): void {
		console.log("");
	}
}
