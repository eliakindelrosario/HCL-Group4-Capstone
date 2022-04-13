import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import CouldinaryConfig from "../config/cloudaninary-config";

@Injectable({
	providedIn: "root",
})
export class FileUplaodService {
	constructor(private http: HttpClient) {}

	uploadImage(data): Observable<any> {
		return this.http.post(CouldinaryConfig.uploadUrl, data);
	}
}
