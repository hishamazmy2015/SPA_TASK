import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { Validators } from "@angular/forms";
import { Category } from "../products/models/category";
import { Router } from "@angular/router";
import { CategoryService } from "../products/services/CategoryService.service";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"],
})
export class CategoryComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}
  productForm: FormGroup;
  isSubmitted: boolean = false;

  ngOnInit() {
    this.productForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      code: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  get gfc() {
    return this.productForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (!this.productForm.valid) {
      return;
    }

    const category: Category = {
      id: this.productForm.value.id,
      name: this.productForm.value.name,
      code: this.productForm.value.code,
    };

    const categoryObserver = {
      next: (category) => (
        this.router.navigate(["/category/list"]), console.log("success")
      ),
      error: (err) => console.error(err),
    };

    this.categoryService.createCategory(category).subscribe(categoryObserver);
  }
}
