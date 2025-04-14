import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-details-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './details-dialog.component.html',
  styleUrl: './details-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { name: string; description?: string; quantity?: number; barcode?: string },
    public dialogRef: MatDialogRef<DetailsDialogComponent>,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    if (this.data.barcode) {
      this.apiService.getBarcodeImage(this.data.barcode).subscribe({
        next: (response: any) => {
          console.log(response);
          const blob = new Blob([response], { type: 'image/png' });
          const url = URL.createObjectURL(blob);
          const imgElement = document.createElement('img');
          imgElement.src = url;
          imgElement.style.width = '100%';
          imgElement.style.height = '100%';
          imgElement.style.objectFit = 'contain';
          document.getElementById('barcode-image-container')?.appendChild(imgElement);
        }
      });
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
