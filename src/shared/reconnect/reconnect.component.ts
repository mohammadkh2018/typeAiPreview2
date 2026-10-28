import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {map} from 'rxjs/operators';
import {interval} from 'rxjs';

@Component({
  selector: 'app-reconnect',
  templateUrl: './reconnect.component.html',
  styleUrls: ['./reconnect.component.css']
})
export class ReconnectComponent implements OnInit {
   Counter   = 0;
   countTry = 0;
  constructor(private location: Location) {
    interval(500).pipe(
      map((x) => {
        this.Counter = x;
        if (x === 100) {
          this.location.back();
          this.countTry = this.countTry + 1;
        }
      })
    ).subscribe();
  }


  On_ReTry() {
    this.location.back();
  }

  ngOnInit() {
  }

}
