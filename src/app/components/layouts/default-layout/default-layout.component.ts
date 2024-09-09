import { Component, HostListener, Inject, OnInit, inject } from '@angular/core'
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router'
import { CommonModule, DOCUMENT, Location } from '@angular/common'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import { ThemeCustomizerComponent } from '@component/shared/theme-customizer/theme-customizer.component'
import { NotificationDropdownComponent } from '@component/topbar/notification/notification.component'
import { ProfileDropdownComponent } from '@component/topbar/profile-dropdown/profile-dropdown.component'
import { LanguageComponent } from '@component/topbar/language/language.component'
import { LayoutState } from '@store/reducer'
import { sidebarData } from '@data/sidebar'
import { toggleDarkMode } from '@store/actions'
import { DialogModule } from 'primeng/dialog'
import { DropdownComponent } from '@component/shared/dropdown/dropdown.component'
import { CalendarModule } from 'primeng/calendar'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-default-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, RouterLinkActive, ThemeCustomizerComponent, NotificationDropdownComponent, LanguageComponent, ProfileDropdownComponent, DialogModule, DropdownComponent, CalendarModule, FormsModule],
  templateUrl: './default-layout.component.html',
  styleUrl:'./default-layout.component.css',
})
export class DefaultLayoutComponent implements OnInit {

  
  private store = inject(Store)
  layout$: Observable<LayoutState>
  constructor(private location: Location) {
    this.layout$ = this.store.select('layout')
  }
  visible = false
  isSidebarOpen = false
  date: Date | undefined
  currencies = ['USD', 'GBP', 'YEN', 'JPN']
  status = ['active', 'inactive']
  colorMode = ''
  sidebarData = sidebarData
  activeMenu = sidebarData[0].name
  //new code 
  activeSubMenu: string | null = null;
  setActiveMenu(name: string) {
    this.activeMenu == name ? (this.activeMenu = '') : (this.activeMenu = name)
  }
  //new code 
  toggleSubMenu(submenuTitle: string) {
    this.activeSubMenu = this.activeSubMenu === submenuTitle ? null : submenuTitle;
  }

  // activeMenu = '';
  // activeSubMenu = '';
  // setActiveMenu(name: string) {
  //   this.activeMenu = this.activeMenu === name ? '' : name;
  //   this.activeSubMenu = ''; 
  // }
  // toggleSubMenu(title: string) {
  //   this.activeSubMenu = this.activeSubMenu === title ? '' : title;
  // }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen
  }

  toggleDarkMode() {
    this.store.dispatch(toggleDarkMode({ newTheme: this.colorMode == 'light' ? 'dark' : 'light' }))
  }

  onModalClick(event: MouseEvent) {
    event.stopPropagation()
  }

  getCurrentYear() {
    return new Date().getFullYear()
  }

  ngOnInit(): void {
    // Initial check when the component is initialized
    this.layout$.subscribe((theme) => {
      this.colorMode = theme.theme
    })
    this.handleWindowResize()
    sidebarData.map(({ name, submenus }) => submenus.map(({ url }) => (url == this.location.path() ? (this.activeMenu = name) : '')))
  }

  ngOnDestroy(): void {
    // Clean up by removing event listener when the component is destroyed
    window.removeEventListener('resize', this.handleWindowResize)
  }

  @HostListener('window:resize', ['$event'])
  handleWindowResize(event?: Event) {
    // Check window width and set isSidebarOpen accordingly
    this.isSidebarOpen = window.innerWidth > 1200
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    // Check if the click event target is not within the sidebar
    if (window.innerWidth < 1200) {
      if (!document.querySelector('.sidebar')!.contains(event.target as Node) && !document.querySelector('#sidebar-toggle-btn')!.contains(event.target as Node)) {
        this.isSidebarOpen = false // Close the sidebar
      }
    }
  }
  clickRoute() {
    if (window.innerWidth < 1200) {
      this.isSidebarOpen = false
    }
  }

  
}
