import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { CategoryService } from "../services/CategoryService.service";
import * as fromCategoryActions from "./category.actions";

@Injectable()
export class CategoryEffects {
  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCategoryActions.loadCategories),
      mergeMap(() =>
        this.categoryService.getCategories().pipe(
          map((categories) =>
            fromCategoryActions.loadCategorySuccess({ categories })
          ),
          catchError((error) =>
            of(fromCategoryActions.loadCategoryFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private categoryService: CategoryService
  ) {}
}
