import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { ICategory } from '../models/states.models';

export const loadingSpinner = createAction(
  '[SHOW LOADING SPINNER] Loading',
  props<{ status: boolean }>()
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
      children:   ICategory[];
    }>(),
    addCategory: props<{
      newCategory: ICategory;
    }>(),
    addCategorySuccess: emptyProps(),
    addSubCategory: props<{
      newSubCategory: ICategory;
    }>(),
    addSubCategorySuccess: emptyProps(),
    valueChaged: props<{
      value: number;
    }>(),
    categoryChagedSuccess: emptyProps(),
  },
});
