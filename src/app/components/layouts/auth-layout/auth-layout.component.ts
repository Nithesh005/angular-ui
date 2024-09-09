import { Component, inject } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { Store } from '@ngrx/store'
import { LayoutState } from '@store/reducer'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './auth-layout.component.html'
})
export class AuthLayoutComponent {
  private store = inject(Store)
  colorMode = ''
  layout$: Observable<LayoutState>
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
