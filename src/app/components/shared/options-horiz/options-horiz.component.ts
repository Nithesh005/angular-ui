import { NgClass } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-options-horiz',
  standalone: true,
  imports: [NgClass],
  templateUrl: './options-horiz.component.html'
})
export class OptionsHorizComponent {

  isOpen = false
  toggleOpen(event:MouseEvent) {
    const allDropdowns = document.querySelectorAll('.dropdown-horiz'); // Find all dropdowns
    allDropdowns.forEach(dropdown => {
        if (dropdown !== event.target) {
            dropdown.classList.remove('show');
            dropdown.classList.add('hide');
        }
    });
    this.isOpen = !this.isOpen
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
  const targetElement = event.target as Element;

    // Check if event.target exists and if the click event target is not within the dropdown or the dropdown button
    if (targetElement && !targetElement.closest('#dropdown-horiz')) {
      this.isOpen = false; // Close the dropdown
    }
  }
}
