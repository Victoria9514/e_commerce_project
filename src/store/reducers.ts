import { combineReducers, createReducer, on } from '@ngrx/store';
import { adminReducer } from '../components/admin/store/admin.reducer';
import { authReducer } from '../components/auth/store/auth.reducer';
import { cartReducer } from '../components/cart/store/reducer';
import { productReducer } from '../components/product/store/product.reducer';
import { userReducer } from '../components/user/store/user.reducer';
import { sharedState } from '../models/states.models';
import { CategoryActions, loadingSpinner, showMessage } from './actions';

const sharedReducer = createReducer(
  sharedState,
  on(loadingSpinner, (state, action) => {
    return { ...state, loading: action.status };
  }),
  on(showMessage, (state, action) => {
    return { ...state, message: action.message };
  }),
  on(CategoryActions.getCategoriesSuccess, (state, action) => {
    return {
      ...state,
      categories: {
        categories: action.categories.categories,
        message: action.categories.message,
      },
    };
  }),
  on(CategoryActions.getSubCategoriesSuccess, (state, action) => {
    return {
      ...state,
      sub_categories: {
        sub_categories: action.sub_categories.sub_categories,
        message: action.sub_categories.message,
      },
    };
  }),
  on(CategoryActions.addCategory, (state, action) => {
    return {
      ...state,
      categories: {
        categories: [
          ...state.categories.categories,
          {
            name: action.newCategory.name,
            id: action.newCategory.id,
            desc: action.newCategory.desc,
          },
        ],
        message: state.message,
      },
    };
  }),
  on(CategoryActions.addSubCategory, (state, action) => {
    return {
      ...state,
      sub_categories: {
        sub_categories: [
          ...state.sub_categories.sub_categories,
          {
            name: action.newSubCategory.name,
            id: action.newSubCategory.id,
            desc: action.newSubCategory.desc,
            categoryId: action.newSubCategory.categoryId
          },
        ],
        message: state.message,
      },
    };
  }),
  on(CategoryActions.valueChaged, (state, action) => {
    return {
      ...state,
      categoryOptions:  action.value
    };
  })
);

export const reducers = combineReducers({
  userState: userReducer,
  productsState: productReducer,
  authState: authReducer,
  adminState: adminReducer,
  sharedState: sharedReducer,
  cartState: cartReducer,
});

export const initialdFeatureKey = 'project';
