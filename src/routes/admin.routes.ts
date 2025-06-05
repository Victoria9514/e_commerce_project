import { Route } from '@angular/router';
import { DataTableListComponent } from '../components/admin/data-table-list/data-table-list.component';
import { ProductAddFormComponent } from '../components/product/product-add-form/product-add-form.component';

export default  [
      { path: 'create-product', component: ProductAddFormComponent },
      { path: 'users', component: DataTableListComponent },
      { path: 'products', component: DataTableListComponent },
      // canActivate: [AdminGuard],

] satisfies Route[];
