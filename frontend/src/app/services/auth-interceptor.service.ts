import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { OKTA_AUTH } from "@okta/okta-angular";
import { OktaAuth } from "@okta/okta-auth-js";
import { from, lastValueFrom, Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: "root",
})
export class AuthInterceptorService implements HttpInterceptor {
	constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {}

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		return from(this.handleAccess(request, next));
	}

	private async handleAccess(
		request: HttpRequest<any>,
		next: HttpHandler
	): Promise<HttpEvent<any>> {
		const luv2ShopUrlOrders = environment.luv2ShopApiUrl + "/orders";
		const luv2ShopUrlCreateNew = environment.luv2ShopApiUrl + "/dashboard";
		const securedEndpoints = [luv2ShopUrlOrders,luv2ShopUrlCreateNew];

		if (
			securedEndpoints.some((url) => request.urlWithParams.includes(url))
		) {
			const accessToken = await this.oktaAuth.getAccessToken();
			request = request.clone({
				setHeaders: {
					Authorization: "Bearer " + accessToken,
				},
			});
		}

		return await lastValueFrom(next.handle(request));
	}
}
