import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-view-sub-products',
  standalone: true,
  imports: [],
  templateUrl: './view-sub-products.component.html',
  styleUrl: './view-sub-products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewSubProductsComponent {

}
