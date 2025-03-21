import { CdkTreeModule } from '@angular/cdk/tree';
import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ICategory } from '../../models/states.models';
import { selectCategories } from '../../store/shared.selectors';

@Component({
  selector: 'app-tree',
  imports: [
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    CdkTreeModule,
  ],
  templateUrl: './tree.component.html',
  styleUrl: './tree.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeComponent {
  store = inject(Store);
  dataSource$: Observable<ICategory[]> = this.store.pipe(
    select(selectCategories)
  );

  childrenAccessor = (node: ICategory) => node?.children ?? null;
  hasChild = (_: number, node: ICategory) => !!node.children?.length;
}
