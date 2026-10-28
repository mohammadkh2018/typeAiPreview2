import {Component, Inject, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {DialogData} from '../../DialogData';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-list-form',
  templateUrl: './list-form.component.html',
  styleUrls: ['./list-form.component.css']
})
export class ListFormComponent implements OnInit {
  Data;
  constructor(public sanitizer: DomSanitizer,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.Data = sanitizer.bypassSecurityTrustResourceUrl('/Hermes_Web/Education/Stu/assets/Stu.html?route='
      + data.Kind
      + '&auth=' + data.Aut);
    // this.Data = sanitizer.bypassSecurityTrustResourceUrl('/Hermes_Web/Education/Stu/assets/Stu.html?route=listForm'
    //   + '&auth=' + data.Aut);
  }

  ngOnInit(): void {
  }

}
