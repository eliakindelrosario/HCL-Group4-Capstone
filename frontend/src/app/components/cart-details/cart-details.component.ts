import { Component, OnInit } from "@angular/core";
import { CartItem } from "src/app/common/cart-item";
import { CartService } from "src/app/services/cart.service";

@Component({
	selector: "app-cart-details",
	templateUrl: "./cart-details.component-eliakin.html",
	styleUrls: ["./cart-details.component-eliakin.css"],
})
export class CartDetailsComponent implements OnInit {
	cartItems: CartItem[] = [];

	totalQuantity: number = 0;
	totalPrice: number = 0;

	constructor(private cartService: CartService) {}

	ngOnInit(): void {
		this.listCartDetails();
	}

	listCartDetails() {
		this.cartItems = this.cartService.cartItems;
		this.cartService.totalPrice.subscribe(
			(data) => (this.totalPrice = data)
		);
		this.cartService.totalQuantity.subscribe(
			(data) => (this.totalQuantity = data)
		);
		this.cartService.computeCartTotals();
	}

	incrementQuantity(cartItem: CartItem) {
		this.cartService.addToCart(cartItem);
	}

	decrementQuantity(cartItem: CartItem) {
		this.cartService.decrementQuantity(cartItem);
	}

	remove(cartItem: CartItem) {
		this.cartService.removeCartItime(cartItem);
	}
}
