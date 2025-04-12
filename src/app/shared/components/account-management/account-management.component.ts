import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-account-management',
  standalone: true,
  imports: [],
  templateUrl: './account-management.component.html',
  styleUrl: './account-management.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountManagementComponent {

}
