import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.sass']
})
export class DialogDeleteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  public ngOnInit() {
  }

  /**
   * Close the dialog.
   */
  public onNoClick(): void {
    this.dialogRef.close(false);
  }
  /**
   * Close the dialog.
   */
  public onClick(): void {
    this.dialogRef.close(true);
  }
}
