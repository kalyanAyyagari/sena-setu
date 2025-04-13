import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-details-dialog',
  standalone: true,
  imports: [MatDialogModule,MatButtonModule],
  templateUrl: './details-dialog.component.html',
  styleUrl: './details-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { name: string; description: string },
    public dialogRef: MatDialogRef<DetailsDialogComponent>
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

}
