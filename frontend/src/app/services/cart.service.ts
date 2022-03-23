import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { CartItem } from "../common/cart-item";

@Injectable({
	providedIn: "root",
})
export class CartService {
	cartItems: CartItem[] = [];
	totalPrice: Subject<number> = new BehaviorSubject<number>(0);
	totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

	storage: Storage = sessionStorage;
	// storage: Storage = localStorage;

	constructor() {
		let data = JSON.parse(this.storage.getItem("cartItems"));

		if (data != null) {
			this.cartItems = data;
			this.computeCartTotals();
		}
	}

	addToCart(theCartItem: CartItem) {
		let alreadyExistsInCart: boolean = false;
		let existingCartItem: CartItem = undefined;

		if (this.cartItems.length > 0) {
			existingCartItem = this.cartItems.find(
				(temCartItem) => temCartItem.id === theCartItem.id
			);

			alreadyExistsInCart = existingCartItem != undefined;
		}

		if (alreadyExistsInCart) {
			existingCartItem.quantity++;
		} else {
			this.cartItems.push(theCartItem);
		}

		this.computeCartTotals();
	}

	computeCartTotals() {
		let totalPriceValue: number = 0;
		let totalQuantityValue: number = 0;

		for (let currentCartItem of this.cartItems) {
			totalPriceValue +=
				currentCartItem.quantity * currentCartItem.unitPrice;
			totalQuantityValue += currentCartItem.quantity;
		}

		this.totalPrice.next(totalPriceValue);
		this.totalQuantity.next(totalQuantityValue);

		this.logCartData(totalPriceValue, totalQuantityValue);

		this.persistCartItems();
	}

	decrementQuantity(cartItem: CartItem) {
		cartItem.quantity--;

		if (cartItem.quantity === 0) {
			this.removeCartItime(cartItem);
		} else {
			this.computeCartTotals();
		}
	}

	removeCartItime(cartItem: CartItem) {
		const itemIndex = this.cartItems.findIndex(
			(tempCartItem) => tempCartItem.id === cartItem.id
		);

		if (itemIndex > -1) {
			this.cartItems.splice(itemIndex, 1);

			this.computeCartTotals();
		}
	}

	logCartData(totalPriceValue: number, totalQuantityValue: number) {
		for (let tempCartItem of this.cartItems) {
			const subTotalPrice =
				tempCartItem.quantity * tempCartItem.unitPrice;
		}
	}

	persistCartItems() {
		this.storage.setItem("cartItems", JSON.stringify(this.cartItems));
	}
}
