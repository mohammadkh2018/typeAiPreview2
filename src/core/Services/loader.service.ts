import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public isLoading = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  show() {
  }

  hide() {
  }

}

