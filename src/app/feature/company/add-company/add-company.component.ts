import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-add-company',
  standalone: true,
  imports: [],
  templateUrl: './add-company.component.html',
  styleUrl: './add-company.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddCompanyComponent {

}
