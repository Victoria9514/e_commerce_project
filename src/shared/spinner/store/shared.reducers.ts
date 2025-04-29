import { sharedState } from '@models/states.models';
import { combineReducers, createReducer, on } from '@ngrx/store';
import { adminReducer } from '../../../components/admin/store/admin.reducer';
import { authReducer } from '../../../components/auth/store/auth.reducer';
import { cartReducer } from '../../../components/cart/store/cart.reducer';
import { productReducer } from '../../../components/product/store/product.reducer';
import { userReducer } from '../../../components/user/store/user.reducer';
import { loadingSpinner, sharedActions, showMessage } from './shared.actions';

const sharedReducer = createReducer(
  sharedState,
  on(loadingSpinner, (state, action) => {
    return { ...state, loading: action.status };
  }),
  on(showMessage, (state, action) => {
    return { ...state, message: action.message };
  }),
  on(sharedActions.getCategoriesSuccess, (state, action) => {
    console.log(action)
    return {
      ...state,
      categories: action?.categories,
    };
  }),
  on(sharedActions.getSizesSuccess, (state, action) => {
    return {
      ...state,
      sizes: action?.sizes,
    };
  }),
  // on(sharedActions.getSubCategoriesSuccess, (state, action) => {
  //   return {
  //     ...state,
  //     children: {
  //       children: action.children,
  //     },
  //   };
  // }),
  // on(sharedActions.addCategory, (state, action) => {
  //   return {
  //     ...state,
  //     categories: [
  //       {
  //         type: action.newCategory.type,
  //         id: action.newCategory.id,
  //         desc: action.newCategory.desc,
  //         children: action.newCategory,

  //         message: state.message,
  //       },
  //     ],
  //   };
  // }),
  on(sharedActions.addSubCategory, (state, action) => {
    return {
      ...state,
      sub_categories: {
        sub_categories: [
          ...state.categories,
          {
            type: action.newSubCategory?.type,
            id: action.newSubCategory?.id,
            desc: action.newSubCategory.desc,
            categoryId: action.newSubCategory.categoryId,
          },
        ],
      },
    };
  }),
  on(sharedActions.valueChanged, (state, action) => {
    return {
      ...state,
      categoryOptions: action.value,
    };
  })
  // on(sharedActions.loadSideBarNavigationSucces, (state, action) => {
  //   return {
  //     ...state,
  //     nodes: [...action.nodes],
  //   };
  // })
);

export const reducers = combineReducers({
  userState: userReducer,
  productState: productReducer,
  authState: authReducer,
  adminState: adminReducer,
  sharedState: sharedReducer,
  cartState: cartReducer,
});

export const initialdFeatureKey = 'project';
