import { Component, OnInit } from "@angular/core";
// import { NgForm } from "@angular/forms";
import { ProductService } from "../../services/product.service";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Product } from "../../models/product";
import { Observable } from "rxjs";
import { Category } from "../../models/category";
import { CategoryService } from "../../services/CategoryService.service";
import { Store } from "@ngrx/store";
import { CategoryState } from "src/app/products/store";
import * as fromActions from "../../../products/store/category.actions";
import { select } from "@ngrx/store";
import { ProductState, selectCategories } from "src/app/products/store";
@Component({
  selector: "app-product-add",
  templateUrl: "./product-add.component.html",
  styleUrls: ["./product-add.component.scss"],
})
export class ProductAddComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private router: Router,
    private categoryService: CategoryService,
    private store: Store<CategoryState>
  ) {}
  productForm: FormGroup;
  isSubmitted: boolean = false;
  categories$: Observable<Category[]>;

  ngOnInit() {
    this.store.dispatch(fromActions.loadCategories());
    this.loadCategories();

    this.productForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      code: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      category: new FormControl(null, [Validators.required]),
    });
  }
  get gfc() {
    return this.productForm.controls;
  }

  onSubmit() {
    console.log(this.productForm);
    this.isSubmitted = true;
    if (!this.productForm.valid) {
      return;
    }

    const product: Product = {
      id: this.productForm.value.id,
      name: this.productForm.value.name,
      code: this.productForm.value.code,
      category: this.productForm.value.category,
    };

    const productObserver = {
      next: (product) => (
        this.router.navigate(["/product/list"]), console.log("success")
      ),
      error: (err) => console.error(err),
    };

    this.productService.createProduct(product).subscribe(productObserver);
  }

  loadCategories() {
    this.categories$ = this.store.pipe(select(selectCategories));
  }
}
