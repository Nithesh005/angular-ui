import { DOCUMENT } from '@angular/common'
import { Component, Inject, inject } from '@angular/core'
import { RouterLink, RouterModule } from '@angular/router'
import { Store } from '@ngrx/store'
import { LayoutState } from '@store/reducer'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [RouterLink, RouterModule],
  templateUrl: './error.component.html'
})
export class ErrorComponent {
  private store = inject(Store)
  layout$: Observable<LayoutState>
  colorMode = ''
  constructor() {
    this.layout$ = this.store.select('layout')
  }
  ngOnInit(): void {
    // Initial check when the component is initialized
    this.layout$.subscribe((theme) => {
      this.colorMode = theme.theme
    })
  }
}
