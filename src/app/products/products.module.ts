import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ProductAddComponent } from "./components/product-add/product-add.component";
import { ProductEditComponent } from "./components/product-edit/product-edit.component";
import { ProductListComponent } from "./components/product-list/product-list.component";
import { ProductComponent } from "./components/product/product.component";
import { ProductsRoutingModule } from "./products-routing.module";
import { ProductService } from "./services/product.service";
import * as fromProductState from "./store";
import { ProductEffects } from "./store/product.effects";



@NgModule({
  declarations: [
    ProductComponent,
    ProductAddComponent,
    ProductEditComponent,
    ProductListComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(
      fromProductState.productStateFeatureKey,
      fromProductState.reducers2,
      { metaReducers: fromProductState.metaReducers }
    ),
    EffectsModule.forFeature([ProductEffects])
  ],
  providers: [ProductService],
  exports: [
    ProductComponent,
    ProductAddComponent,
    ProductEditComponent,
    ProductListComponent
  ]
})
export class ProductsModule {}
