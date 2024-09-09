// layout.effects.ts
import { Inject, Injectable } from '@angular/core'
import { Actions, ofType, createEffect } from '@ngrx/effects'
import { tap } from 'rxjs/operators'
import { DOCUMENT } from '@angular/common'
import { Store } from '@ngrx/store'
import * as LayoutActions from './actions'
import { layoutList } from '@component/shared/theme-customizer/theme-customizer.component'


@Injectable()
export class LayoutEffects {
  constructor(private actions$: Actions, @Inject(DOCUMENT) private document: Document, private store: Store, private actions:Actions) {}

  toggleDarkMode$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LayoutActions.toggleDarkMode),
        tap(({newTheme}) => {
          localStorage.setItem('theme',newTheme)
          this.document.body.classList.remove('dark','light')
          this.document.body.classList.add(newTheme)
        })
      ),
    { dispatch: false }
  )

  changeDir$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LayoutActions.changeDir),
        tap(({ newDir }) => {
          // Update local storage
          localStorage.setItem('dir', newDir)
          // Update document direction
          this.document.documentElement.dir = newDir
        })
      ),
    { dispatch: false }
  )

  changeLayout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LayoutActions.changeLayout),
        tap(({ newLayout }) => {
          // Update local storage
          localStorage.setItem('layout', newLayout)
          // Update document layout
          this.document.body.classList.remove(...layoutList)
          this.document.body.classList.add(newLayout)
        })
      ),
    { dispatch: false }
  )
}
