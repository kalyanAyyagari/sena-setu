import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nopagefound',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './nopagefound.component.html',
  styleUrl: './nopagefound.component.scss'
})
export class NopagefoundComponent {
  constructor(private router: Router) {}

  goHome(): void {
    this.router.navigate(['/units']);
  }
}
