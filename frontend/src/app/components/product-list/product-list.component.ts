import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CartItem } from "src/app/common/cart-item";
import { Product } from "src/app/common/product";
import { CartService } from "src/app/services/cart.service";
import { ProductService } from "src/app/services/product.service";

@Component({
	selector: "app-product-list",
	templateUrl: "./product-list.component-m2.html",
	styleUrls: ["./product-list.component-m2.css"],
})
export class ProductListComponent implements OnInit {
	products: Product[] = [];
	currentCategoryId: number = 1;
	previousCategoryId: number = 1;
	searchMode: boolean = false;

	pageNumber: number = 1;
	pageSize: number = 5;
	totalElements: number = 0;

	previousKeyword: string = null;

	constructor(
		private productService: ProductService,
		private cartService: CartService,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.route.paramMap.subscribe(() => {
			this.listProducts();
		});
		this.listProducts();
	}

	listProducts() {
		this.searchMode = this.route.snapshot.paramMap.has("keyword");
		if (this.searchMode) {
			this.handleSearchProducts();
		} else {
			this.handleListProducts();
		}
	}

	handleSearchProducts() {
		const keyword = this.route.snapshot.paramMap.get("keyword");

		if (this.previousKeyword != keyword) {
			this.pageNumber = 1;
		}

		this.previousKeyword = keyword;

		this.productService
			.searchProductsPaginate(this.pageNumber - 1, this.pageSize, keyword)
			.subscribe(this.processResult());
	}

	handleListProducts() {
		const hasCategoryId: boolean = this.route.snapshot.paramMap.has("id");

		if (hasCategoryId) {
			this.currentCategoryId = +this.route.snapshot.paramMap.get("id");
		} else {
			this.currentCategoryId = 1;
		}

		if (this.previousCategoryId != this.currentCategoryId) {
			this.pageNumber = 1;
		}

		this.previousCategoryId = this.currentCategoryId;

		this.productService
			.getProductListPaginate(
				this.pageNumber - 1,
				this.pageSize,
				this.currentCategoryId
			)
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
		this.listProducts();
	}

	addToCart(product: Product) {
		const cartItem = new CartItem(product);
		this.cartService.addToCart(cartItem);
	}
}
