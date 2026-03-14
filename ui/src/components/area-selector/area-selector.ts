import {Component} from '@angular/core';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

interface TreeNode {
  name: string;
  children?: TreeNode[];
}

const EXAMPLE_DATA: TreeNode[] = [
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
  selector: 'app-area-selector',
  imports: [
    MatTreeModule,
    MatIconButton,
    MatIcon,
  ],
  templateUrl: './area-selector.html',
  styleUrl: './area-selector.css',
})
export class AreaSelector {
  dataSource: TreeNode[] = EXAMPLE_DATA;

  childrenAccessor: (node: TreeNode) => TreeNode[] = (node: TreeNode): TreeNode[] => node.children ?? [];

  hasChild: (_: number, node: TreeNode) => boolean = (_: number, node: TreeNode): boolean => !!node.children && node.children.length > 0;
}
