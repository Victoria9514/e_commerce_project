import { SelectionModel } from '@angular/cdk/collections';
import { CdkTreeModule } from '@angular/cdk/tree';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { FilterOptions } from '@models/filter.models';
import { ICategory } from '@models/product.model';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { NavigationActions } from 'src/store/actions/navigation.actions';
import { selectCategories } from '../../store/selectors/shared.selectors';

@Component({
  selector: 'app-tree',
  imports: [
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    CdkTreeModule,
    MatCheckboxModule,
    PushPipe,
  ],
  templateUrl: './tree.component.html',
  styleUrl: './tree.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeComponent {
  private _store = inject(Store);
  FilterOptions = FilterOptions;

  protected checkBoxSelection = new SelectionModel<ICategory>(true);
  protected productCategories$ = this._store.select(selectCategories);
  protected childrenAccessor = (node: ICategory) => node?.children ?? null;
  protected hasChild = (_: number, node: ICategory) => !!node.children?.length;

  protected navigateTo(opt: FilterOptions) {
    const query = this.checkBoxSelection.selected.map((item) => item.type);
    this._store.dispatch(
      NavigationActions.navigate({
        opt,
        query,
      })
    );
  }
}
