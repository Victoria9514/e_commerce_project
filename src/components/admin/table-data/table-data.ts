import { TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
  inject,
  viewChild,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { ButtonComponent } from '../../../common/button/button.component';

import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { IProduct, Product } from '@models/product.model';
import { IUser, User } from '@models/user.model';
import { of } from 'rxjs';
import {
  DataTableTypes,
  TableDataActions,
} from '../../../models/data-source.models';
import { AdminActions } from '../../../store/actions/admin.actions';
import { ProductsActions } from '../../../store/actions/product.actions';
@Component({
  selector: 'app-data-table',
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatPaginatorModule,
    MatInputModule,
    MatTableModule,
    ButtonComponent,
    MatTabsModule,
    TitleCasePipe,
    FormsModule,
    PushPipe,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
  ],
  providers: [MatDatepickerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './table-data.html',
  styleUrl: './table-data.scss',
})
export class DataTableComponent {
  private _store = inject(Store);
  protected editMode = false;
  protected TableDataActions = TableDataActions;
  protected readonly sort = viewChild.required(MatSort);
  protected readonly paginator = viewChild.required(MatPaginator);
  @Input() dataSource?: MatTableDataSource<DataTableTypes> | [];
  @Input() displayedColumns$!: string[];

  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    if (this.dataSource instanceof MatTableDataSource) {
      this.dataSource.paginator = paginator;
    }
  }
  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource ? (this.dataSource.sort = sort) : null;
  }

  get alldisplayedColumns$() {
    if (!this.displayedColumns$) return of([]);
    return of(
      this.displayedColumns$.concat([
        TableDataActions.DELETE,
        TableDataActions.EDIT,
      ])
    );
  }

  protected applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.dataSource)
      this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private _loadUsers() {
    this._store.dispatch(AdminActions.loadUsers());
  }

  protected deleteItem(value: IUser | IProduct): void {
    if (value instanceof User) {
      this._store.dispatch(AdminActions.deleteUser({ user_id: value.user_id }));
    }
    if (value instanceof Product) {
      this._store.dispatch(
        ProductsActions.deleteProduct({
          product_id: value.product_id,
        })
      );
    }
  }
  protected editItem() {
    this.editMode = true;
  }

  protected update(obj: IProduct | IUser) {
    if (obj instanceof User) {
      this._store.dispatch(AdminActions.updateUser({ user: obj }));
    }
    if (obj instanceof Product) {
      this._store.dispatch(ProductsActions.updateProduct({ product: obj }));
    }
    this.editMode = false;
  }
}
