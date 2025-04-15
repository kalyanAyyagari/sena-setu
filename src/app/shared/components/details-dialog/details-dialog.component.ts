import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../core/services/api.service';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-details-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, FormsModule, MatInputModule,
    MatIconModule],
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
  numberOfCopies: number = 1;
  maxCopiesPerPage: number = 10;
  ngOnInit(): void {
    if (this.data.barcode) {
      this.apiService.getBarcodeImage(this.data.barcode).subscribe({
        next: (response: any) => {
          console.log(response);
          const blob = new Blob([response], { type: 'image/png' });
          const url = URL.createObjectURL(blob);
          const imgElement = document.createElement('img');
          imgElement.src = url;
          // imgElement.style.width = '100%';
          // imgElement.style.height = '100%';
          imgElement.style.objectFit = 'contain';
          document.getElementById('barcode-image-container')?.appendChild(imgElement);
        }
      });
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  printBarcode(): void {
    const printContent = document.getElementById('barcode-image-container');
    if (!printContent) {
      console.error('Barcode container not found');
      return;
    }
    const WindowPrt = window.open('', '', 'width=600,height=400');
    if (!WindowPrt) {
      console.error('Failed to open print window');
      return;
    }
    try {
      // Create repeating barcode elements based on numberOfCopies
      const barcodeHtml = Array(this.numberOfCopies)
        .fill(printContent.innerHTML)
        .join('<div class="barcode-break"></div>');

      WindowPrt.document.writeln(`
        <html>
          <head>
            <title>Print Barcodes</title>
            <style>
              @page {
                size: A4;
                margin: 10mm;
              }
              body {
                margin: 0;
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 10mm;
                padding: 10mm;
              }
              .barcode-container {
                display: flex;
                justify-content: center;
                align-items: center;
                page-break-inside: avoid;
              }
              img {
                max-width: 90mm;
                max-height: 40mm;
                object-fit: contain;
              }
              @media print {
                .barcode-break {
                  page-break-after: always;
                }
              }
            </style>
          </head>
          <body>
            ${Array(this.numberOfCopies)
              .fill('')
              .map(() => `
                <div class="barcode-container">
                  ${printContent.innerHTML}
                </div>
              `)
              .join('')}
          </body>
        </html>
      `);
      WindowPrt.document.close();
      WindowPrt.focus();
      WindowPrt.print();
      WindowPrt.close();
    } catch (error) {
      console.error('Error while printing:', error);
      WindowPrt.close();
    }
  }

  onlyNumbers(event: KeyboardEvent): boolean {
    // Allow: backspace, delete, tab, escape, enter
    if ([46, 8, 9, 27, 13].indexOf(event.keyCode) !== -1 ||
      // Allow: Ctrl+A
      (event.keyCode === 65 && event.ctrlKey === true) ||
      // Allow: home, end, left, right
      (event.keyCode >= 35 && event.keyCode <= 39)) {
      return true;
    }
    // Ensure that it is a number and stop the keypress if not
    if ((event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) &&
      (event.keyCode < 96 || event.keyCode > 105)) {
      event.preventDefault();
      return false;
    }
    return true;
  }

}
