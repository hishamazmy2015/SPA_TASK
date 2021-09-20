import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";

import {
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on,
} from "@ngrx/store";
import { environment } from "../../../environments/environment";
import { Category } from "../models/category";
import { Product } from "../models/product";
import { loadCategoryFailure, loadCategorySuccess } from "./category.actions";
import { loadProductsFailure, loadProductsSuccess } from "./product.actions";

export const productStateFeatureKey = "productState";
export const categoryStateFeatureKeys = "categoryState";

export interface ProductState extends EntityState<Product> {
  error: any;
}
export interface CategoryState extends EntityState<Category> {
  error: any;
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>();

export const adapterCategory: EntityAdapter<Category> =
  createEntityAdapter<Category>();

export const initialState = adapter.getInitialState({
  error: undefined,
});

export const initialState2 = adapterCategory.getInitialState({
  error: undefined,
});

export const reducers = createReducer(
  initialState2,
  on(loadCategorySuccess, (state, action) => {
    return adapterCategory.addAll(action.categories, state);
  }),
  on(loadCategoryFailure, (state, action) => {
    return {
      error: action.error,
    };
  })
);

export const reducers2 = createReducer(
  initialState,
  on(loadProductsSuccess, (state, action) => {
    return adapter.addAll(action.products, state);
  }),
  on(loadProductsFailure, (state, action) => {
    return {
      error: action.error,
    };
  })
);
export const selectProductsFeature = createFeatureSelector<ProductState>(
  productStateFeatureKey
);

export const selectCategoriesFeature = createFeatureSelector<CategoryState>(
  categoryStateFeatureKeys
);

export const selectProducts = createSelector(
  selectProductsFeature,
  adapter.getSelectors().selectAll
);
export const selectCategories = createSelector(
  selectCategoriesFeature,
  adapterCategory.getSelectors().selectAll
);

export const selectError = createSelector(
  selectProductsFeature,
  (state: ProductState) => state.error
);

export const selectErrorCat = createSelector(
  selectCategoriesFeature,
  (state: CategoryState) => state.error
);

export const metaReducers: MetaReducer<ProductState>[] = !environment.production
  ? []
  : [];

export const metaReducers2: MetaReducer<CategoryState>[] =
  !environment.production ? [] : [];
