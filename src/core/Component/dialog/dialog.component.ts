import {Component, Inject, OnInit} from '@angular/core';
import {DialogData} from '../../DialogData';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LangService} from '../../Services/lang.service';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  isCheck = false;

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
              public langService: LangService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onConfirm(): void {
    if (this.data.Ischeck) {
      this.dialogRef.close({confirm: true, checkIs: this.isCheck});
    } else {
      this.dialogRef.close(true);
    }
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }

  ngOnInit(): void {
  }


}
