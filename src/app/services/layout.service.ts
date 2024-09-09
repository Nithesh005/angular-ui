import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { LayoutState } from '@store/reducer';


@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor(private store: Store<LayoutState>) {}

  getLayout() {
    return this.store.pipe(select(state => state.layout));
  }

  getDir() {
    return this.store.pipe(select(state => state.dir));
  }

  getTheme() {
    return this.store.pipe(select(state => state.theme));
  }
}
