import {Component, inject} from '@angular/core';
import {MatTreeModule} from '@angular/material/tree';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {SearchService} from '../../services/search-service';
import {TreeNode} from '../../types/tree-node';

@Component({
  selector: 'app-area-selector',
  imports: [
    MatTreeModule,
    MatIconButton,
    MatIcon,
    MatButton,
  ],
  templateUrl: './area-selector.html',
  styleUrl: './area-selector.css',
})
export class AreaSelector {
  public searchService: SearchService = inject(SearchService);

  childrenAccessor: (node: TreeNode) => TreeNode[] = (node: TreeNode): TreeNode[] => node.children ?? [];

  hasChild: (_: number, node: TreeNode) => boolean = (_: number, node: TreeNode): boolean => !!node.children && node.children.length > 0;

  public onSelectArea(areaName: string): void {
    this.searchService.selectArea(areaName);
  }
}
