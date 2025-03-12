import { Route } from '@angular/router';
import { ProductAddFormComponent } from '../product/product-add-form/product-add-form.component';
import { DataTableListComponent } from './data-table-list/data-table-list.component';

export default  [
      { path: 'create-product', component: ProductAddFormComponent },
      { path: 'users', component: DataTableListComponent },
      { path: 'products', component: DataTableListComponent },
      // canActivate: [AdminGuard],

] satisfies Route[];
