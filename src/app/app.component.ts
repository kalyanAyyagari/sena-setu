import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BreadcrumbComponent } from "./shared/components/breadcrumb/breadcrumb.component";
import { HeaderComponent } from "./shared/components/header/header.component";
import { IdleService } from './core/services/idle.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BreadcrumbComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'sena-setu';
  constructor(private idleService: IdleService) {}
  ngOnInit(): void {
    this.idleService.startWatching();
  }
}
