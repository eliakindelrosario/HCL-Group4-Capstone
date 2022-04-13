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
import { Cloudinary, CloudinaryImage } from "@cloudinary/url-gen";
import cloudinaryConfig from "../../config/cloudaninary-config";
import { FileUplaodService } from "src/app/services/file-uplaod.service";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Component({
	selector: "app-dashboard-product-form",
	templateUrl: "./dashboard-product-form.component.html",
	styleUrls: ["./dashboard-product-form.component.css"],
})
export class DashboardProductFormComponent implements OnInit {
	private baseUrl = environment.luv2ShopApiUrl;

	productFormGroup: FormGroup;
	product: Product = new Product();

	tempImgUrl: string = "assets/images/products/placeholder.png";

	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private productService: ProductService,
		private router: Router,
		private uploadService: FileUplaodService,
		private http: HttpClient
	) {}

	isUpdate: boolean = false;

	ngOnInit(): void {
		// Create a Cloudinary instance and set your cloud name.
		const cld = new Cloudinary({
			cloud: {
				cloudName: cloudinaryConfig.cloudName,
			},
		});

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
					category: new FormControl("", [Validators.required]),
				});
			}
		});
	}

	getProductdetails() {
		const productId: number = +this.route.snapshot.paramMap.get("id");

		this.productService.getProduct(productId).subscribe((data) => {
			this.product = data;
			console.log(this.product);
			this.productFormGroup = this.formBuilder.group({
				sku: new FormControl(this.product.sku, [Validators.required]),
				name: new FormControl(this.product.name, [Validators.required]),
				description: new FormControl(this.product.description, [
					Validators.required,
				]),
				unitPrice: new FormControl(this.product.unitPrice, [
					Validators.required,
				]),
				imageUrl: new FormControl(this.product.imageUrl, [
					Validators.required,
				]),
				active: new FormControl(this.product.active, [
					Validators.required,
				]),
				unitsInStock: new FormControl(this.product.unitsInStock, [
					Validators.required,
				]),
				category: new FormControl("", [Validators.required]),
			});
		});
	}

	processImage(e) {
		if (e.target.files) {
			const reader = new FileReader();
			reader.readAsDataURL(e.target.files[0]);
			reader.onload = (event: any) => {
				this.tempImgUrl = event.target.result;
				this.product.imageUrl = event.target.result;
			};
		}
	}

	onSubmit() {
		if (this.isUpdate) {
			// console.log("is_update");
			// if image is new, upload it and save new image-url
			if (
				this.product.imageUrl !== this.productFormGroup.value.imageUrl
			) {
				const imageData = new FormData();
				imageData.append("file", this.tempImgUrl);
				imageData.append(
					"upload_preset",
					cloudinaryConfig.upload_preset
				);

				this.uploadService.uploadImage(imageData).subscribe((res) => {
					console.log(res.secure_url);
					this.productFormGroup.value.imageUrl = res.secure_url;

					// PUT
					const productId: number =
						+this.route.snapshot.paramMap.get("id");
					// console.log("Update Product", productId);
					const category = this.productFormGroup.value.category;
					let product = new Product();

					product.id = productId;
					product.sku = this.productFormGroup.value.sku;
					product.name = this.productFormGroup.value.name;
					product.description =
						this.productFormGroup.value.description;
					product.unitPrice = this.productFormGroup.value.unitPrice;
					product.imageUrl = this.productFormGroup.value.imageUrl;
					product.active = this.productFormGroup.value.active;
					product.unitsInStock =
						this.productFormGroup.value.unitsInStock;

					this.productService
						.updateProduct(product, category, productId)
						.subscribe({
							next: (response) => {},
							error: (err) => {},
						});
				});
			}
		} else {
			// POST
			// console.log("create-new");

			// Uplaod Image and get image url
			const imageData = new FormData();
			imageData.append("file", this.tempImgUrl);
			imageData.append("upload_preset", cloudinaryConfig.upload_preset);

			this.uploadService.uploadImage(imageData).subscribe((res) => {
				// console.log(res.secure_url);
				this.productFormGroup.value.imageUrl = res.secure_url;

				// console.log("new product", this.productFormGroup.value);
				// POST
				// Get Category
				const category = this.productFormGroup.value.category;
				let product = new Product();
				product.sku = this.productFormGroup.value.sku;
				product.name = this.productFormGroup.value.name;
				product.description = this.productFormGroup.value.description;
				product.unitPrice = this.productFormGroup.value.unitPrice;
				product.imageUrl = this.productFormGroup.value.imageUrl;
				product.active = this.productFormGroup.value.active;
				product.unitsInStock = this.productFormGroup.value.unitsInStock;

				this.productService
					.createNewProduct(product, category)
					.subscribe({
						next: (response) => {
							// alert();
						},
						error: (err) => {
							// alert();
						},
					});
			});
		}
	}
}
