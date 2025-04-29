import {
    Component,
    OnInit,
    ViewEncapsulation,
    inject
} from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { sharedActions } from '@shared/spinner/store/shared.actions';
import { FooterComponent } from '../layout/footer/footer.component';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';
import { TopbarComponent } from '../layout/topbar/topbar.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    TopbarComponent,
    SidebarComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  store = inject(Store);
  ngOnInit(): void {
    this.store.dispatch(sharedActions.getCategories());
    this.store.dispatch(sharedActions.getSizes());
  }
}
