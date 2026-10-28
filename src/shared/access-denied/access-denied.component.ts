import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.css']
})
export class AccessDeniedComponent implements OnInit {
  // public Message ;
  constructor(private router: Router) {
    window.parent.postMessage({statuse: false, kind: 'loader'}, window.location.href);
    // this.Message = this.router.getCurrentNavigation().extras.state.Message;
  }

  ngOnInit() {
  }

}
