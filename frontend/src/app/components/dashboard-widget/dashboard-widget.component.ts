import { Component, OnInit } from "@angular/core";

@Component({
	selector: "app-dashboard-widget",
	templateUrl: "./dashboard-widget.component.html",
	styleUrls: ["./dashboard-widget.component.css"],
})
export class DashboardWidgetComponent implements OnInit {
	data: any = {
		title: "BALANCE",
		isMoney: true,
		link: "See details",
		// icon:
		//   <i class="fa-solid fa-truck icon"
		//     style={
		//       backgroundColor: "rgba(128, 0, 128, 0.2)",
		//       color: "purple",
		//     }
		//   ></i>
	};

	//temporary
	amount: number = 100;
	diff: number = 20;

	constructor() {}

	ngOnInit(): void {}
}
