
import { ICategory } from '@models/product.model';
import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';

export const loadingSpinner = createAction(
  '[SHOW LOADING SPINNER] Loading',
  props<{ status: boolean }>());

export const openSnackBar = createAction(
  '[OPEN SNACKBAR] Open snackbar',
  props<{
    payload: string | { message: string; duration?: number; type?: string };
  }>()
);

export const showMessage = createAction(
  '[SHOW MESSAGE] Message',
  props<{ message: string }>()
);

export const sharedActions = createActionGroup({
  source: 'Category Actions',
  events: {
    getCategories: emptyProps(),
    getCategoriesSuccess: props<{
      categories: ICategory[];
    }>(),
    getSubCategories: emptyProps(),
    getSubCategoriesSuccess: props<{
      children: ICategory[];
    }>(),
    getSizes: emptyProps(),
    getSizesSuccess: props<{
      sizes: Array<{ name: string; id: number }>;
    }>(),
    addCategory: props<{
      newCategory: ICategory;
    }>(),
    addCategorySuccess: emptyProps(),
    addSubCategory: props<{
      newSubCategory: ICategory;
    }>(),
    addSubCategorySuccess: emptyProps(),
    valueChanged: props<{
      value: number;
    }>(),
    categoryChagedSuccess: emptyProps(),
  },
});
