import { NgClass } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-language',
  standalone: true,
  imports: [NgClass],
  templateUrl: './language.component.html'
})
export class LanguageComponent {
  isOpen = false
  toggleOpen() {
    this.isOpen = !this.isOpen
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    // Check if the click event target is not within the sidebar
    if (!document.querySelector('#language')!.contains(event.target as Node) && !document.querySelector('#language-btn')!.contains(event.target as Node)) {
      this.isOpen = false // Close the sidebar
    }
  }
}
