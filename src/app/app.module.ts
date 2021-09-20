import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { ProductComponent } from "./products/components/product/product.component";
import { ProductAddComponent } from "./products/components/product-add/product-add.component";
import { ProductEditComponent } from "./products/components/product-edit/product-edit.component";
import { ProductListComponent } from "./products/components/product-list/product-list.component";
import { HomeComponent } from "./pages/home/home.component";

import { AppRoutingModule } from "./app-routing.module";
import { SharedModule } from "./shared/shared.module";
import { ProductsModule } from "./products/products.module";
import { CateogriesModule } from "../app/category/CateogriesModule.module";

import { StoreModule } from "@ngrx/store";
import { reducers, metaReducers } from "./reducers";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";

import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { EffectsModule } from "@ngrx/effects";
import { AppEffects } from "./app.effects";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    ProductsModule,
    CateogriesModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([AppEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
