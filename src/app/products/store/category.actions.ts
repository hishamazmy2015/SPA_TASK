import { createAction, props } from "@ngrx/store";
import { Category } from "../models/category";

export const loadCategories = createAction(
  "[Category List Component] Load Products"
);

export const loadCategorySuccess = createAction(
  "[Category Effect] Load Products Success",
  props<{ categories: Category[] }>()
);

export const loadCategoryFailure = createAction(
  "[Category Effect] Load Categories Failure",
  props<{ error: any }>()
);
