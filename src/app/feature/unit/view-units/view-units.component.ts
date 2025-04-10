import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from '../../../core/services/api.service';
import { AddUnitComponent } from "../add-unit/add-unit.component";

@Component({
  selector: 'app-view-units',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatInputModule, AddUnitComponent],
  templateUrl: './view-units.component.html',
  styleUrl: './view-units.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewUnitsComponent {
  unitId: string | null = null; // Initialize unitId as null
  units = signal([]);
  addToggle = signal(false);
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    // Simulate fetching the unit ID from a service or route parameter
    this.unitId = '123'; // Replace with actual logic to get the unit ID
    this.getAllUnits();
  }

  getAllUnits() {
    this.units.set([]);
    this.apiService.getAllUnits().subscribe({
      next: (response) => {
        console.log(response);

      },
      error:(err)=> {
        console.error(err);
      },
    })
  }
}
