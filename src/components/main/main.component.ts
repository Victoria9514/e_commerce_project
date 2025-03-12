import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';
import { ProductListComponent } from "../product/product-list/product-list.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MatFormFieldModule,MatSidenavModule, MatSelectModule, MatInputModule, FormsModule, ProductListComponent,],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent  implements OnInit{
ngOnInit(): void {
}
router = inject(ActivatedRoute);

}


