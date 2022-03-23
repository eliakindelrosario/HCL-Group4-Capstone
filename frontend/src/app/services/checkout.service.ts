import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { PaymentInfo } from "../common/payment-info";
import { Purchase } from "../common/purchase";

@Injectable({
	providedIn: "root",
})
export class CheckoutService {
	private luv2ShopUrl = environment.luv2ShopApiUrl + "/checkout/purchase";

	private paymentIntentUrl =
		environment.luv2ShopApiUrl + "/checkout/payment-intent";

	constructor(private http: HttpClient) {}

	placeOrder(purchase: Purchase): Observable<any> {
		return this.http.post<Purchase>(this.luv2ShopUrl, purchase);
	}

	createPaymentIntent(paymentInfo: PaymentInfo): Observable<any> {
		return this.http.post<PaymentInfo>(this.paymentIntentUrl, paymentInfo);
	}
}
