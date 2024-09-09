import { CommonModule, DOCUMENT, NgClass, NgFor } from '@angular/common'
import { Component, Inject, inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { changeDir, changeLayout, toggleDarkMode } from '@store/actions'
import { LayoutState } from '@store/reducer'
import { Observable } from 'rxjs'


const directions = ['ltr', 'rtl']
const moods = ['light', 'dark']
export const layoutList = ['vertical', 'two-column', 'hovered', 'horizontal', 'detached']

@Component({
  selector: 'app-theme-customizer',
  standalone: true,
  imports: [NgFor, NgClass, CommonModule],
  templateUrl: './theme-customizer.component.html'
})
export class ThemeCustomizerComponent {
  private store = inject(Store)
  directions = directions
  moods = moods
  layoutList = layoutList
  customizerOpen = false
  currentLayout = ''
  currentDir = ''
  colorMode = ''
  layout$: Observable<LayoutState>
  constructor(@Inject(DOCUMENT) private document: Document) {
    this.layout$ = this.store.select('layout')
  }

  changelayout(newLayout: string) {
    this.store.dispatch(changeLayout({ newLayout }))
  }

  changeDir(newDir: string) {
    this.store.dispatch(changeDir({ newDir }))
  }

  toggleDarkMode() {
    this.store.dispatch(toggleDarkMode({newTheme:this.colorMode == 'light'?'dark':'light'}))
  }

  toggleCustomizer() {
    this.customizerOpen = !this.customizerOpen
  }

  clickCustomizer(event: MouseEvent) {
    event.stopPropagation()
  }

  ngOnInit() {
    this.layout$.subscribe((theme) => {
      this.currentLayout = theme.layout
      this.currentDir = theme.dir
      this.colorMode = theme.theme
      this.document.documentElement.dir = theme.dir
      this.document.body.classList.remove(...layoutList)
      this.document.body.classList.add(theme.layout)
      this.document.body.classList.add(theme.theme)
      this.document.documentElement.style.colorScheme = theme.theme
    })
  }
}
