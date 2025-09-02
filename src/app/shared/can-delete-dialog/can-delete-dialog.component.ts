import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-can-delete-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    RouterModule,
    MatButtonModule
  ],
  templateUrl: './can-delete-dialog.component.html',
  styleUrl: './can-delete-dialog.component.scss'
})
export class CanDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CanDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { 
      message: string,
    }
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
