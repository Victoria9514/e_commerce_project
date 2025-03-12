import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import {
  ICategory,
  ICategoryRes,
  ISubCategory,
  ISubCategoryRes,
} from '../models/states.models';

export const loadingSpinner = createAction(
  '[SHOW LOADING SPINNER] Loading',
  props<{ status: boolean }>()
);

export const showMessage = createAction(
  '[SHOW MESSAGE] Message',
  props<{ message: string }>()
);

export const CategoryActions = createActionGroup({
  source: 'Category Actions',
  events: {
    getCategories: emptyProps(),
    getCategoriesSuccess: props<{
      categories: ICategoryRes;
    }>(),
    getSubCategories: emptyProps(),
    getSubCategoriesSuccess: props<{
      sub_categories: ISubCategoryRes;
    }>(),
    addCategory: props<{
      newCategory: ICategory;
    }>(),
    addCategorySuccess: emptyProps(),
    addSubCategory: props<{
      newSubCategory: ISubCategory;
    }>(),
    addSubCategorySuccess: emptyProps(),
    valueChaged: props<{
      value: number;
    }>(),
    categoryChagedSuccess: emptyProps(),
  },
});
