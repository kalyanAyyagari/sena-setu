import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-view-products',
  standalone: true,
  imports: [],
  templateUrl: './view-products.component.html',
  styleUrl: './view-products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewProductsComponent {

}
