import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoaderState} from './loader.model';
import {LoaderService} from '../../core/Services/loader.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit , OnDestroy {

  show = true;

  private subscription!: Subscription;

  constructor(public  loaderService: LoaderService) { }
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
