import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharedService {

  private showLoaderSource = new BehaviorSubject<boolean>(false);

  isShowLoader = this.showLoaderSource.asObservable();

  constructor() { }

  showLoader(value: boolean){
    this.showLoaderSource.next(value)
  }
}
