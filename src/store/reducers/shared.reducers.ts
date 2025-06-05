import { combineReducers, createReducer, on } from '@ngrx/store';
import { filterReducer } from 'src/store/reducers/filter.reducer';
import { navigationReducer } from 'src/store/reducers/navigation.reducer';
import { loadingSpinner, sharedActions, showMessage } from '../actions/shared.actions';
import { sharedState } from '../shared.store';
import { adminReducer } from './admin.reducer';
import { authReducer } from './auth.reducer';
import { cartReducer } from './cart.reducer';
import { productReducer } from './product.reducer';
import { userReducer } from './user.reducer';

const sharedReducer = createReducer(
  sharedState,
  on(loadingSpinner, (state, action) => {
    return { ...state, loading: action.status };
  }),
  on(showMessage, (state, action) => {
    return { ...state, message: action.message };
  }),
  on(sharedActions.getCategoriesSuccess, (state, action) => {
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
  productState: productReducer,
  filterState: filterReducer,
  sharedState: sharedReducer,
  userState: userReducer,
  authState: authReducer,
  adminState: adminReducer,
  cartState: cartReducer,
  navigationState: navigationReducer,
});

export const initialdFeatureKey = 'project';
