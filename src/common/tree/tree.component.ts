import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';

interface ProductsAsNode {
  name: string;
  children?: ProductsAsNode[];
}

const TREE_DATA: ProductsAsNode[] = [
  {
    name: 'Fruit',
    children: [{name: 'Apple'}, {name: 'Banana'}, {name: 'Fruit loops'}],
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [{name: 'Broccoli'}, {name: 'Brussels sprouts'}],
      },
      {
        name: 'Orange',
        children: [{name: 'Pumpkins'}, {name: 'Carrots'}],
      },
    ],
  },
];
@Component({
    selector: 'app-tree',
    imports: [MatTreeModule, MatIconModule, MatButtonModule],
    templateUrl: './tree.component.html',
    styleUrl: './tree.component.scss'
})
export class TreeComponent {

  dataSource = TREE_DATA;

  childrenAccessor = (node: ProductsAsNode) => node.children ?? [];

  hasChild = (_: number, node: ProductsAsNode) => !!node.children && node.children.length > 0;

}
