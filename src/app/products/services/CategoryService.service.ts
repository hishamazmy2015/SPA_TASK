import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Category } from "../models/category";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  baseUrl: string = "http://localhost:3000/categories/";

  createCategory(model: Category) {
    return this.http.post(this.baseUrl, model);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl);
  }

  getCategory(CategoryId: string): Observable<Category> {
    return this.http.get<Category>(this.baseUrl + CategoryId);
  }

  editCategory(model: Category): Observable<Category> {
    return this.http.put<Category>(this.baseUrl + model.id, model);
  }

  deleteCategory(CategoryId: number) {
    return this.http.delete(this.baseUrl + CategoryId);
  }
}
