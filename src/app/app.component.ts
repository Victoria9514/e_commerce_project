import { Component, ViewEncapsulation, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../common/sidebar/sidebar.component";
import { FooterComponent } from "../layout/footer/footer.component";
import { TopbarComponent } from '../layout/topbar/topbar.component';

@Component({
    selector: 'app-root',
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


}
