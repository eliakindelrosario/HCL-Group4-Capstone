import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs"; // rxjs - Reactive Javascript
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Product } from "../common/product";
import { ProductCategory } from "../common/product-category";

@Injectable({
	providedIn: "root",
})
export class ProductService {
	private baseUrl = environment.luv2ShopApiUrl + "/products";
	private categoryUrl = environment.luv2ShopApiUrl + "/product-category";

	constructor(private http: HttpClient) {}

	getProductListPaginate(
		pageNumber: number,
		pageSize: number,
		catagoryId: number
	): Observable<GetResponseProducts> {
		const searchUrl =
			`${this.baseUrl}/search/findByCategoryId?id=${catagoryId}` +
			`&page=${pageNumber}&size=${pageSize}`;

		return this.http.get<GetResponseProducts>(searchUrl);
	}

	searchProductsPaginate(
		pageNumber: number,
		pageSize: number,
		keyword: string
	): Observable<GetResponseProducts> {
		const searchUrl =
			`${this.baseUrl}/search/findByNameContaining?name=${keyword}` +
			`&page=${pageNumber}&size=${pageSize}`;

		return this.http.get<GetResponseProducts>(searchUrl);
	}

	getProductList(catagoryId: number): Observable<Product[]> {
		const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${catagoryId}`;
		return this.http
			.get<GetResponseProducts>(searchUrl)
			.pipe(map((response) => response._embedded.products));
	}

	getProductCategories(): Observable<ProductCategory[]> {
		return this.http
			.get<GetResponseProductCategory>(this.categoryUrl)
			.pipe(map((response) => response._embedded.productCategory));
	}

	getProduct(productId: number): Observable<Product> {
		const productUrl = `${this.baseUrl}/${productId}`;
		return this.http.get<Product>(productUrl);
	}

	searchProducts(keyword: string): Observable<Product[]> {
		const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`;
		return this.http
			.get<GetResponseProducts>(searchUrl)
			.pipe(map((response) => response._embedded.products));
	}
}

// Rename from [GetResponse] to [GetResponseProduct]
interface GetResponseProducts {
	_embedded: {
		products: Product[];
	};
	page: {
		size: number;
		totalElements: number;
		totalPages: number;
		number: number;
	};
}

interface GetResponseProductCategory {
	_embedded: {
		productCategory: ProductCategory[];
	};
}
