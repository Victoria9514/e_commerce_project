import { FilterBrandTemplateComponent } from 'src/layout/filter/filter.brand.template';
import { FilterColorTemplateComponent } from 'src/layout/filter/filter.color.template';
import { FilterGenderTemplateComponent } from 'src/layout/filter/filter.gender.template';
import { FilterPriceTemplateComponent } from 'src/layout/filter/filter.price.template';
import { FilterSizeTemplateComponent } from 'src/layout/filter/filter.size.template';

export interface FilterState {
  // query: string[] | string;
  sortBy: { field: string; direction: 'asc' | 'desc' }[];
  filterBy: { opt: FilterOptions; values: string[] | null }[];
  priceRange: { min: number; max: number };
  filterBySelector: Array<FilterSelector> | [],
  submit :  boolean
}

export type Filter = {};

export enum FilterOptions {
  SIZE = 'size',
  PRICE = 'price',
  COLOR = 'color',
  GENDER = 'gender',
  CATEGORY = 'category',
  BRAND = 'title', // TODO FIX THIS
}

export const filterLabels = {
  size: FilterOptions.SIZE,
  price: FilterOptions.PRICE,
  color: FilterOptions.COLOR,
  title: FilterOptions.BRAND,
  gender: FilterOptions.GENDER,
};

export type FilterTypesComponents =
  | FilterColorTemplateComponent
  | FilterPriceTemplateComponent
  | FilterBrandTemplateComponent
  | FilterGenderTemplateComponent
  | FilterSizeTemplateComponent;

export interface IFilterTypes {
  type: FilterTypesComponents;
}

export interface FilterSelector {
  prop: FilterTypesComponents;
  values: string[];
}

export enum FilterBtnActions {
  FILTER = 'FILTER',
  CANCEL = 'CANCEL',
  DELETE = 'DELETE',
}
