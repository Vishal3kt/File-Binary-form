import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-dailog-delete',
  templateUrl: './dailog-delete.component.html',
  styleUrls: ['./dailog-delete.component.scss']
})
export class DailogDeleteComponent implements OnInit {
  rowId: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    public dialogRef: MatDialogRef<DailogDeleteComponent>,
    public api: ApiService
  ) {
    this.rowId = data.rowId;
  }

  ngOnInit(): void {

  }

  removeRow() {
    if (!this.rowId) {
      console.error("Row ID is undefined.");
      return;
    }
    this.api.deleteRow(this.rowId).subscribe(
      (res) => {
        console.log(res);
      },
    );
    this.dialogRef.close();
  }
}
