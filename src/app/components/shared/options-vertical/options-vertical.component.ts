import { NgClass } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-options-vertical',
  standalone: true,
  imports: [NgClass],
  templateUrl: './options-vertical.component.html'
})
export class OptionsVerticalComponent {
  isOpen = false
  @Input()
  toggleOpen(event:MouseEvent) {
    const allDropdowns = document.querySelectorAll('.dropdown-verti'); // Find all dropdowns
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
    if (targetElement && !targetElement.closest('#dropdown-verti')) {
      this.isOpen = false; // Close the dropdown
    }
  }
}
