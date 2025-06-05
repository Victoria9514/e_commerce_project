import {
  FilterOptions,
  FilterState
} from '@models/filter.models';

export const filterState: FilterState = {
  // query: '' || [],
  sortBy: [{ field: '', direction: 'asc' }],
  filterBy: [{ opt: '' as FilterOptions, values: null }],
  priceRange: { min: 0, max: 0 },
  filterBySelector: [{ prop: '', values: [] }],
  submit: false,
};
