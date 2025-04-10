import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BreadcrumbComponent } from "./shared/components/breadcrumb/breadcrumb.component";
import { HeaderComponent } from "./shared/components/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BreadcrumbComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sena-setu';
}
