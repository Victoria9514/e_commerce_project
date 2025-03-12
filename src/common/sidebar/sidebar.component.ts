import { Component } from '@angular/core';
import { TreeComponent } from "../tree/tree.component";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [TreeComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {


}
