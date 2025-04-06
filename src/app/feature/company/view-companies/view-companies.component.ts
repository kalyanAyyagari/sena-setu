import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-view-companies',
  standalone: true,
  imports: [],
  templateUrl: './view-companies.component.html',
  styleUrl: './view-companies.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewCompaniesComponent {

}
