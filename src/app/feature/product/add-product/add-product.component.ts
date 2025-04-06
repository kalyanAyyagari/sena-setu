import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddProductComponent {

}
