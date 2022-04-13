import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
	providedIn: "root",
})
export class ImageService {
	imageBaseDir: string = "/assets/images/products";

	constructor(private http: HttpClient) {}

	public uploadImage(image: File): Observable<string | any> {
		const formData = new FormData();
		formData.append("image", image);
		console.log("Trying Image Upload", formData);
		return this.http
			.post(this.imageBaseDir, formData)
			.pipe(map((json: any) => json.imageUrl));
	}
}
