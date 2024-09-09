import { NgClass } from '@angular/common'
import { Component, HostListener } from '@angular/core'

@Component({
  selector: 'app-notification-dropdown',
  standalone: true,
  imports: [NgClass],
  templateUrl: './notification.component.html'
})
export class NotificationDropdownComponent {
  isOpen = false
  toggleOpen() {
    this.isOpen = !this.isOpen
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    // Check if the click event target is not within the sidebar
    if (!document.querySelector('#notification')!.contains(event.target as Node) && !document.querySelector('#notification-btn')!.contains(event.target as Node)) {
      this.isOpen = false // Close the sidebar
    }
  }
}
