import { Component, OnInit } from "@angular/core";
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Product } from "src/app/common/product";
import { ImageService } from "src/app/services/image-service.service";
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
		private router: Router,
		private imageService: ImageService
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
		if (this.isUpdate) {
			// PUT
			const productId: number = +this.route.snapshot.paramMap.get("id");
			console.log("Update ", productId);
		} else {
			// POST
			console.log("Add New Product");
		}
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
				active: new FormControl(this.product.active, [
					Validators.required,
				]),
				unitsInStock: new FormControl(this.product.unitsInStock, [
					Validators.required,
				]),
			});
		});
		// UNDERSTAND
		console.log(this.product.active);
	}

	processImage(e) {
		if (e.target.files) {
			const reader = new FileReader();
			reader.readAsDataURL(e.target.files[0]);
			reader.onload = (event: any) => {
				this.tempImgUrl = event.target.result;
			};

			this.imageService.uploadImage(e.target.files[0]).subscribe(
				(res) => {},
				(err) => {}
			);
		}
	}
}
