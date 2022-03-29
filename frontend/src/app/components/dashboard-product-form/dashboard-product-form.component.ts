import { Component, OnInit } from "@angular/core";
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Product } from "src/app/common/product";
import { ProductService } from "src/app/services/product.service";
@Component({
	selector: "app-dashboard-product-form",
	templateUrl: "./dashboard-product-form.component.html",
	styleUrls: ["./dashboard-product-form.component.css"],
})
export class DashboardProductFormComponent implements OnInit {
	productFormGroup: FormGroup;
	product: Product = new Product();

	tempImgUrl: string = "assets/images/products/placeholder.png";

	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private productService: ProductService,
		private router: Router
	) {}

	isUpdate: boolean = false;

	ngOnInit(): void {
		const productId: number = +this.route.snapshot.paramMap.get("id");
		this.route.paramMap.subscribe(() => {
			if (productId > 0) {
				this.isUpdate = true;
				this.getProductdetails();
			} else {
				this.isUpdate = false;
				this.productFormGroup = this.formBuilder.group({
					sku: new FormControl("", [Validators.required]),
					name: new FormControl("", [Validators.required]),
					description: new FormControl("", [Validators.required]),
					unitPrice: new FormControl("", [Validators.required]),
					imageUrl: new FormControl("", [Validators.required]),
					active: new FormControl("", [Validators.required]),
					unitsInStock: new FormControl("", [Validators.required]),
				});
			}
		});
	}

	onSubmit() {
		console.log(this.productFormGroup.value);
	}

	getProductdetails() {
		const productId: number = +this.route.snapshot.paramMap.get("id");

		this.productService.getProduct(productId).subscribe((data) => {
			this.product = data;
			this.productFormGroup = this.formBuilder.group({
				sku: new FormControl(this.product.sku, [Validators.required]),
				name: new FormControl(this.product.name, [Validators.required]),
				description: new FormControl(this.product.description, [
					Validators.required,
				]),
				unitPrice: new FormControl(this.product.unitPrice, [
					Validators.required,
				]),
				imageUrl: new FormControl("", [Validators.required]),
				active: new FormControl(true, [Validators.required]),
				unitsInStock: new FormControl(this.product.unitsInStock, [
					Validators.required,
				]),
			});
		});
		// UNDERSTAND
		console.log(this.product.active);
	}
}
