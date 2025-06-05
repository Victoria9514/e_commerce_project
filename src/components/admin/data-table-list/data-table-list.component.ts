import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';

import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subject, map, of, takeUntil } from 'rxjs';

import { ActivatedRoute, RouterModule } from '@angular/router';
import { SpinnerComponent } from '@shared/spinner/spinner.component';

import {
  DataSourceOption,
  DataTableTypes,
} from '../../../models/data-source.models';
import { AdminActions } from '../../../store/actions/admin.actions';
import { ProductsActions } from '../../../store/actions/product.actions';
import {
  selectTableUsersProps,
  selectUserPropsForColumnTable,
} from '../../../store/selectors/admin.selectors';
import {
  selectProductPropsForColumnTable,
  selectProductPropsForTable,
} from '../../../store/selectors/product.selectors';
import { selectLoading } from '../../../store/selectors/shared.selectors';
import { DataTableComponent } from '../table-data/table-data';

@Component({
  selector: 'app-data-table-list',
  imports: [
    DataTableComponent,
    PushPipe,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    RouterModule,
    SpinnerComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './data-table-list.component.html',
  styleUrl: './data-table-list.component.scss',
})
export class DataTableListComponent implements OnInit, OnDestroy {
  store = inject(Store);
  displayedColumns$: Observable<string[]> = of([]);
  columns$?: Observable<any>; //  TODO: FIX ANY!
  data$?: Observable<MatTableDataSource<DataTableTypes>> | [];
  DataSourceOption = DataSourceOption;
  loading$ = this.store.select(selectLoading);
  private route = inject(ActivatedRoute);
  protected productsUrl?: boolean;
  protected usersUrl?: boolean;
  private _destroy$ = new Subject();

  ngOnInit() {
    this.route.snapshot.url.map((url) => {
      if (url.path === 'products') this.productsUrl = true;
      if (url.path === 'users') this.usersUrl = true;
    });

    if (this.usersUrl) {
      this.store.dispatch(AdminActions.loadUsers());
      this.data$ = this.store?.select(selectTableUsersProps).pipe(
        takeUntil(this._destroy$),
        map((data: DataTableTypes[]) => {
          return new MatTableDataSource(data);
        })
      );
      this.displayedColumns$ = this.store
        ?.select(selectUserPropsForColumnTable)
        .pipe(takeUntil(this._destroy$));
    }
    if (this.productsUrl) {
      this.store.dispatch(ProductsActions.loadProducts());
      this.data$ = this.store?.select(selectProductPropsForTable).pipe(
        takeUntil(this._destroy$),
        map((data: DataTableTypes[]) => new MatTableDataSource(data))
      );
      this.displayedColumns$ = this.store?.select(
        selectProductPropsForColumnTable
      );
    }
  }

  ngOnDestroy(): void {
    this._destroy$.unsubscribe();
  }
}
