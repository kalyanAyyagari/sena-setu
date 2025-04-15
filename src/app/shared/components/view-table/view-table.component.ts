import { ChangeDetectionStrategy, Component, input, Input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DetailsDialogComponent } from '../details-dialog/details-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-view-table',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatTableModule, MatIconModule],
  templateUrl: './view-table.component.html',
  styleUrl: './view-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewTableComponent {
  dataSource: any = input();
  @Input() cols: string[] = [];
  editItem = output<any>();
  deleteItem = output<string>();
  goto = output<string>();
  constructor(private dialog: MatDialog) { }
  openDialog(row: { name: string; description?: string; quantity?: number; barcode?: string }): void {
    this.dialog.open(DetailsDialogComponent, {
      data: row,
      // width: '600px',
      // minHeight: '400px',
      // height: '90vh',
    });
  }

  editFunction(row: any) {
    this.editItem.emit(row);
  }
  deleteFunction(id: string) {
    this.deleteItem.emit(id);
  }
}
