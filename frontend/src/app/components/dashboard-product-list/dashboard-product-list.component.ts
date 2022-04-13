import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/common/product";
import { ProductService } from "src/app/services/product.service";

@Component({
	selector: "app-dashboard-product-list",
	templateUrl: "./dashboard-product-list.component.html",
	styleUrls: ["./dashboard-product-list.component.css"],
})
export class DashboardProductListComponent implements OnInit {
	products: Product[] = [];

	pageNumber: number = 1;
	pageSize: number = 10;
	totalElements: number = 0;

	constructor(private productService: ProductService) {}

	ngOnInit(): void {
		this.handleListProducts();
	}

	handleListProducts() {
		this.productService
			.getAllProductPaginate(this.pageNumber - 1, this.pageSize)
			.subscribe(this.processResult());
	}

	processResult() {
		return (data) => {
			this.products = data._embedded.products;
			this.pageNumber = data.page.number + 1;
			this.pageSize = data.page.size;
			this.totalElements = data.page.totalElements;
		};
	}

	updatePageSize(event: Event) {
		const userPageSize = +(event.target as HTMLTextAreaElement).value;
		this.pageSize = userPageSize;
		this.pageNumber = 1;
		this.handleListProducts();
	}

	upDateProduct(productID) {
		console.log("update ", productID);
	}

	deleteProduct(productID) {
		console.log("delete ", productID);
	}
}
