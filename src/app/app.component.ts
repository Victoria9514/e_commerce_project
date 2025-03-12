import { MediaMatcher } from '@angular/cdk/layout';
import { Component, ViewEncapsulation, inject, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../common/sidebar/sidebar.component";
import { FooterComponent } from "../layout/footer/footer.component";
import { TopbarComponent } from '../layout/topbar/topbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    TopbarComponent,
    SidebarComponent,
    FooterComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  protected readonly isMobile = signal(true);

  // private readonly _mobileQuery: MediaQueryList;
  // private readonly _mobileQueryListener: () => void;

  constructor() {
    const media = inject(MediaMatcher);

    // this._mobileQuery = media.matchMedia('(max-width: auto)');
    // this.isMobile.set(this._mobileQuery.matches);
    // this._mobileQueryListener = () => this.isMobile.set(this._mobileQuery.matches);
    // this._mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    // this._mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

}
