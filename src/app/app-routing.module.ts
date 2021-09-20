import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CategoryListComponent } from "./category/category-list/category-list.component";
import { CategoryComponent } from "./category/category.component";
import { HomeComponent } from "./pages/home/home.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "product",
    loadChildren: "../app/products/products.module#ProductsModule",
  },
  { path: "category", component: CategoryComponent },
  { path: "category/list", component: CategoryListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
