import { Component, inject } from '@angular/core'
import { RouterLink } from '@angular/router'
import { Store } from '@ngrx/store'
import { LayoutState } from '@store/reducer'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-sign-in-qrcode',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sign-in-qrcode.component.html'
})
export class SignInQrcodeComponent {
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
