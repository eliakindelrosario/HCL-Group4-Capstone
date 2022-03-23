import { Component, OnInit } from "@angular/core";
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from "@angular/forms";
import { Country } from "src/app/common/country";
import { State } from "src/app/common/state";
import { Love2ShopFormService } from "src/app/services/love2-shop-form.service";
import { Luv2ShopValidators } from "src/app/validators/luv2-shop-validators";
import { CartService } from "src/app/services/cart.service";
import { CheckoutService } from "src/app/services/checkout.service";
import { Router } from "@angular/router";
import { Order } from "src/app/common/order";
import { OrderItem } from "src/app/common/order-item";
import { Purchase } from "src/app/common/purchase";
import { environment } from "src/environments/environment";
import { PaymentInfo } from "src/app/common/payment-info";

@Component({
	selector: "app-checkout",
	templateUrl: "./checkout.component.html",
	styleUrls: ["./checkout.component.css"],
})
export class CheckoutComponent implements OnInit {
	checkoutFormGroup: FormGroup;

	totalPrice: number = 0;
	totalQuantity: number = 0;

	creditCardYears: number[] = [];
	creditCardMonths: number[] = [];

	countries: Country[] = [];

	shippingAddressStates: State[] = [];
	billingAddressStates: State[] = [];

	storage: Storage = sessionStorage;

	stripe = Stripe(environment.stripePublishableKey);

	paymentInfo: PaymentInfo = new PaymentInfo();
	cardElement: any;
	displayError: any = "";

	customer_status: boolean = false;
	shipping_status: boolean = false;
	billing_status: boolean = false;
	credit_status: boolean = false;

	isDisabled: boolean = false;

	constructor(
		private formBuilder: FormBuilder,
		private luv2ShopFormService: Love2ShopFormService,
		private cartService: CartService,
		private checkoutService: CheckoutService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.setupStripePaymentForm();

		this.reviewCartDetails();
		const userEmail = JSON.parse(this.storage.getItem("userEmail"));

		this.checkoutFormGroup = this.formBuilder.group({
			customer: this.formBuilder.group({
				firstName: new FormControl("", [
					Validators.required,
					Validators.minLength(2),
					Luv2ShopValidators.notOnlyWhitespace,
				]),
				lastName: new FormControl("", [
					Validators.required,
					Validators.minLength(2),
					Luv2ShopValidators.notOnlyWhitespace,
				]),
				email: new FormControl(userEmail, [
					Validators.required,
					Validators.pattern(
						"^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"
					),
				]),
			}),
			shippingAddress: this.formBuilder.group({
				street: new FormControl("", [
					Validators.required,
					Validators.minLength(2),
					Luv2ShopValidators.notOnlyWhitespace,
				]),
				city: new FormControl("", [
					Validators.required,
					Validators.minLength(2),
					Luv2ShopValidators.notOnlyWhitespace,
				]),
				state: new FormControl("", [Validators.required]),
				country: new FormControl("", [Validators.required]),
				zipCode: new FormControl("", [
					Validators.required,
					Validators.minLength(2),
					Luv2ShopValidators.notOnlyWhitespace,
				]),
			}),
			billingAddress: this.formBuilder.group({
				street: new FormControl("", [
					Validators.required,
					Validators.minLength(2),
					Luv2ShopValidators.notOnlyWhitespace,
				]),
				city: new FormControl("", [
					Validators.required,
					Validators.minLength(2),
					Luv2ShopValidators.notOnlyWhitespace,
				]),
				state: new FormControl("", [Validators.required]),
				country: new FormControl("", [Validators.required]),
				zipCode: new FormControl("", [
					Validators.required,
					Validators.minLength(2),
					Luv2ShopValidators.notOnlyWhitespace,
				]),
			}),
			creditCard: this.formBuilder.group({}),
		});

		// populate countries
		this.luv2ShopFormService.getCountries().subscribe((data) => {
			console.log("Retrieved countries: " + data);
			this.countries = data;

			for (let country of this.countries) {
				console.log(country.name);
			}
		});
	}

	setupStripePaymentForm() {
		var elements = this.stripe.elements();
		this.cardElement = elements.create("card", { hidePostalCode: true });
		this.cardElement.mount("#card-element");
		this.cardElement.on("change", (event) => {
			this.displayError = document.getElementById("card-errors");

			if (event.complete) {
				this.displayError.textContent = "";
			} else if (event.error) {
				this.displayError.textContent = event.error.message;
			}
		});
	}

	reviewCartDetails() {
		this.cartService.totalQuantity.subscribe(
			(totalQuantity) => (this.totalQuantity = totalQuantity)
		);

		this.cartService.totalPrice.subscribe(
			(totalPrice) => (this.totalPrice = totalPrice)
		);
	}

	get firstName() {
		return this.checkoutFormGroup.get("customer.firstName");
	}
	get lastName() {
		return this.checkoutFormGroup.get("customer.lastName");
	}
	get email() {
		return this.checkoutFormGroup.get("customer.email");
	}

	get shippingAddressStreet() {
		return this.checkoutFormGroup.get("shippingAddress.street");
	}
	get shippingAddressCity() {
		return this.checkoutFormGroup.get("shippingAddress.city");
	}
	get shippingAddressState() {
		return this.checkoutFormGroup.get("shippingAddress.state");
	}
	get shippingAddressZipCode() {
		return this.checkoutFormGroup.get("shippingAddress.zipCode");
	}
	get shippingAddressCountry() {
		return this.checkoutFormGroup.get("shippingAddress.country");
	}

	get billingAddressStreet() {
		return this.checkoutFormGroup.get("billingAddress.street");
	}
	get billingAddressCity() {
		return this.checkoutFormGroup.get("billingAddress.city");
	}
	get billingAddressState() {
		return this.checkoutFormGroup.get("billingAddress.state");
	}
	get billingAddressZipCode() {
		return this.checkoutFormGroup.get("billingAddress.zipCode");
	}
	get billingAddressCountry() {
		return this.checkoutFormGroup.get("billingAddress.country");
	}

	get creditCardType() {
		return this.checkoutFormGroup.get("creditCard.cardType");
	}
	get creditCardNameOnCard() {
		return this.checkoutFormGroup.get("creditCard.nameOnCard");
	}
	get creditCardNumber() {
		return this.checkoutFormGroup.get("creditCard.cardNumber");
	}
	get creditCardSecurityCode() {
		return this.checkoutFormGroup.get("creditCard.securityCode");
	}

	copyShippingAddressToBillingAddress(event) {
		if (event.target.checked) {
			this.checkoutFormGroup.controls["billingAddress"].setValue(
				this.checkoutFormGroup.controls["shippingAddress"].value
			);

			this.billingAddressStates = this.shippingAddressStates;
		} else {
			this.checkoutFormGroup.controls["billingAddress"].reset();

			this.billingAddressStates = [];
		}
	}

	onSubmit() {
		if (this.checkoutFormGroup.invalid) {
			this.checkoutFormGroup.markAllAsTouched();
			return;
		}

		let order = new Order();
		order.totalPrice = this.totalPrice;
		order.totalQuantity = this.totalQuantity;

		const cartItems = this.cartService.cartItems;

		let orderItems: OrderItem[] = cartItems.map(
			(tempCartItem) => new OrderItem(tempCartItem)
		);

		let purchase = new Purchase();

		purchase.customer = this.checkoutFormGroup.controls["customer"].value;

		purchase.shippingAddress =
			this.checkoutFormGroup.controls["shippingAddress"].value;
		const shippingState: State = JSON.parse(
			JSON.stringify(purchase.shippingAddress.state)
		);
		const shippingCountry: Country = JSON.parse(
			JSON.stringify(purchase.shippingAddress.country)
		);
		purchase.shippingAddress.state = shippingState.name;
		purchase.shippingAddress.country = shippingCountry.name;

		purchase.billingAddress =
			this.checkoutFormGroup.controls["billingAddress"].value;
		const billingState: State = JSON.parse(
			JSON.stringify(purchase.billingAddress.state)
		);
		const billingCountry: Country = JSON.parse(
			JSON.stringify(purchase.billingAddress.country)
		);
		purchase.billingAddress.state = billingState.name;
		purchase.billingAddress.country = billingCountry.name;

		purchase.order = order;
		purchase.orderItems = orderItems;

		this.paymentInfo.amount = Math.round(this.totalPrice * 100);
		this.paymentInfo.currency = "USD";
		this.paymentInfo.receiptEmail = purchase.customer.email;

		if (
			!this.checkoutFormGroup.invalid &&
			this.displayError.textContent === ""
		) {
			this.isDisabled = true;

			this.checkoutService
				.createPaymentIntent(this.paymentInfo)
				.subscribe((paymentIntentResponse) => {
					this.stripe
						.confirmCardPayment(
							paymentIntentResponse.client_secret,
							{
								payment_method: {
									card: this.cardElement,
									billing_details: {
										email: purchase.customer.email,
										name: `${purchase.customer.firstName} ${purchase.customer.lastName}`,
										address: {
											line1: purchase.billingAddress
												.street,
											city: purchase.billingAddress.city,
											state: purchase.billingAddress
												.state,
											postal_code:
												purchase.billingAddress.zipCode,
											country:
												this.billingAddressCountry.value
													.code,
										},
									},
								},
							},
							{ handleActions: false }
						)
						.then(
							function (result) {
								if (result.error) {
									alert(
										`There was an error: ${result.error.message}`
									);
									this.isDisabled = false;
								} else {
									this.checkoutService
										.placeOrder(purchase)
										.subscribe({
											next: (response) => {
												alert(
													`Your order has been received.\nOrder tracking number: ${response.orderTrackingNumber}`
												);

												this.resetCart();
												this.isDisabled = false;
											},
											error: (err) => {
												alert(
													`There was an error: ${err.message}`
												);
												this.isDisabled = false;
											},
										});
								}
							}.bind(this)
						);
				});
		} else {
			this.checkoutFormGroup.markAllAsTouched();
			return;
		}
	}

	resetCart() {
		this.cartService.cartItems = [];
		this.cartService.totalPrice.next(0);
		this.cartService.totalQuantity.next(0);
		this.cartService.persistCartItems();

		this.checkoutFormGroup.reset();
		this.router.navigateByUrl("/products");
	}

	handleMonthsAndYears() {
		const creditCardFormGroup = this.checkoutFormGroup.get("creditCard");

		const currentYear: number = new Date().getFullYear();
		const selectedYear: number = Number(
			creditCardFormGroup.value.expirationYear
		);

		let startMonth: number;

		if (currentYear === selectedYear) {
			startMonth = new Date().getMonth() + 1;
		} else {
			startMonth = 1;
		}

		this.luv2ShopFormService
			.getCreditCardMonths(startMonth)
			.subscribe((data) => {
				console.log(
					"Retrieved credit card months: " + JSON.stringify(data)
				);
				this.creditCardMonths = data;
			});
	}

	getStates(formGroupName: string) {
		const formGroup = this.checkoutFormGroup.get(formGroupName);

		const countryCode = formGroup.value.country.code;
		const countryName = formGroup.value.country.name;

		console.log(`${formGroupName} country code: ${countryCode}`);
		console.log(`${formGroupName} country name: ${countryName}`);

		this.luv2ShopFormService.getStates(countryCode).subscribe((data) => {
			if (formGroupName === "shippingAddress") {
				this.shippingAddressStates = data;
			} else {
				this.billingAddressStates = data;
			}

			formGroup.get("state").setValue(data[0]);
		});
	}

	// TODO - Clean Up
	activeTab: number = 1;
	changeTab(tab: number) {
		if (
			tab === 2 &&
			this.firstName.value !== "" &&
			this.lastName.value !== "" &&
			this.email.value !== ""
		) {
			this.activeTab = tab;
			this.customer_status = true;
		} else if (
			tab === 3 &&
			this.shippingAddressStreet.value !== "" &&
			this.shippingAddressCity.value !== "" &&
			this.shippingAddressCountry.value.name !== "" &&
			this.shippingAddressZipCode.value !== "" &&
			this.shippingAddressState.value.name !== ""
		) {
			if (this.billingAddressCity.value !== "") {
				this.activeTab = tab + 1;
				this.shipping_status = true;
				this.billing_status = true;
				return;
			}
			this.activeTab = tab;
			this.shipping_status = true;
		} else if (
			tab === 4 &&
			this.billingAddressStreet.value !== "" &&
			this.billingAddressCity.value !== "" &&
			this.billingAddressCountry.value.name !== "" &&
			this.billingAddressZipCode.value !== "" &&
			this.billingAddressState.value.name !== ""
		) {
			this.activeTab = tab;
			this.billing_status = true;
		} else if (
			tab === 5 &&
			this.creditCardType.value !== "" &&
			this.creditCardNameOnCard.value !== "" &&
			this.creditCardNumber.value !== ""
		) {
			this.activeTab = tab;
			this.credit_status = true;
		}
	}
}
