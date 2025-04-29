import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';

import { MatTableDataSource } from '@angular/material/table';
import { Observable, map, of } from 'rxjs';

import { ActivatedRoute, RouterModule } from '@angular/router';
import { SpinnerComponent } from '@shared/spinner/spinner.component';

import { IProduct } from '@models/product.model';
import { UserTableModel } from '@models/user.model';
import { selectLoading } from '../../../shared/spinner/store/shared.selectors';
import { ProductsActions } from '../../product/store/product.actions';
import {
  selectProductPropsForColumnTable,
  selectProductPropsForTable,
} from '../../product/store/product.selector';
import { AdminActions } from '../store/admin.actions';
import {
  selectTableUsersProps,
  selectUserPropsForColumnTable,
} from '../store/admin.selectors';
import { DataTableComponent } from '../table-data/table-data';
import { DataSourceOption } from './enums';

export type DataTableTypes = IProduct | UserTableModel;

@Component({
    selector: 'app-data-table-list',
    imports: [
        DataTableComponent,
        PushPipe,
        MatSelectModule,
        MatFormFieldModule,
        FormsModule,
        RouterModule,
        SpinnerComponent
    ],
    templateUrl: './data-table-list.component.html',
    styleUrl: './data-table-list.component.scss'
})
export class DataTableListComponent implements OnInit {
  store = inject(Store);
  displayedColumns$: Observable<string[]> = of([]);
  columns$?: Observable<any>;
  data$?: Observable<MatTableDataSource<DataTableTypes>> | [];
  DataSourceOption = DataSourceOption;
  loading$ = this.store.select(selectLoading);
  private route = inject(ActivatedRoute);
  protected productsUrl?: boolean;
  protected usersUrl?: boolean;

  ngOnInit() {
    this.route.snapshot.url.map((url) => {
      if (url.path === 'products') this.productsUrl = true;
      if (url.path === 'users') this.usersUrl = true;
    });


    if (this.usersUrl) {
      this.store.dispatch(AdminActions.loadUsers());
      this.data$ = this.store?.select(selectTableUsersProps).pipe(
        map((data: DataTableTypes[]) => {
          return new MatTableDataSource(data);
        })
      );
      this.displayedColumns$ = this.store?.select(
        selectUserPropsForColumnTable
      );
    }
    if (this.productsUrl) {
      this.store.dispatch(ProductsActions.loadProducts());
      this.data$ = this.store
        ?.select(selectProductPropsForTable)
        .pipe(map((data: DataTableTypes[]) => new MatTableDataSource(data)));
      this.displayedColumns$ = this.store?.select(
        selectProductPropsForColumnTable
      );
    }
  }
}
