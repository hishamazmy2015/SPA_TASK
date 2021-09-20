import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Category } from "src/app/products/models/category";
import { CategoryService } from "src/app/products/services/CategoryService.service";
import {
  CategoryState,
  ProductState,
  selectCategories,
} from "src/app/products/store";
import * as fromActions from "../../products/store/category.actions";
// import {  selectPro } from "../../store";

@Component({
  selector: "app-category-list",
  templateUrl: "./category-list.component.html",
  styleUrls: ["./category-list.component.scss"],
})
export class CategoryListComponent implements OnInit {
  categories$: Observable<Category[]>;

  constructor(
    private categoryService: CategoryService,
    public router: Router,
    private store: Store<CategoryState>
  ) {}

  ngOnInit() {
    this.store.dispatch(fromActions.loadCategories());
    this.loadCategories();

  }

  loadCategories() {
    this.categories$ = this.store.pipe(select(selectCategories));
  }

  deleteCat(id: number) {
    const categoriesObserver = {
      next: () => {
        console.log("category Deleted");
        this.ngOnInit();
      },
      error: (err) => console.error(err),
    };
    this.categoryService.deleteCategory(id).subscribe(categoriesObserver);
  }
}
