import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { CategoryService } from "../products/services/CategoryService.service";
import * as fromCategoryState from "../products/store";
import { CategoryEffects } from "../products/store/category.effects";
import { CategoryListComponent } from "./category-list/category-list.component";
import { CategoryComponent } from "./category.component";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [CategoryComponent, CategoryListComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,

    StoreModule.forFeature(
      fromCategoryState.categoryStateFeatureKeys,
      fromCategoryState.reducers,
      { metaReducers: fromCategoryState.metaReducers }
    ),
    EffectsModule.forFeature([CategoryEffects]),
  ],
  providers: [CategoryService],
  exports: [CategoryComponent, CategoryListComponent],
})
export class CateogriesModule {}
