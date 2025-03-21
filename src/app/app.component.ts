import { Component, ViewEncapsulation, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../layout/footer/footer.component";
import { SidebarComponent } from "../layout/sidebar/sidebar.component";
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
