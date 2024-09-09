import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ClassNameValue, twMerge } from 'tailwind-merge';

const defaultOptions = ['Select', 'Last 7 Days', 'Last 1 Month', 'Last 1 Year'];

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  standalone: true,
  imports: [NgClass, NgFor, NgIf, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AutocompleteComponent,
      multi: true
    }
  ]
})
export class AutocompleteComponent implements ControlValueAccessor {
  currentOptions: string[] = [];
  filteredOptions: string[] = [];
  filter: string = '';
  selected = '';
  btnClass = '';
  dropdownClass = '';

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  @Output() dataEvent = new EventEmitter<string>();
  @Input() options?: string[];
  @Input() btnClassProps?: string;
  @Input() dropdownClassProps?: string;

  selectOption(option: string) {
    if (option === 'Select') {
      return; // Prevent selection of the "Select" option
    }

    this.filter = ''
    this.filteredOptions = [];
    this.filteredOptions = [...this.currentOptions];
    this.selected = option;
    this.isOpen = false;
    this.dataEvent.emit(this.selected);
    this.onChange(this.selected);
    this.onTouched();
  }

  writeValue(value: any): void {
    if (value !== undefined) {
      this.selected = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Optionally handle disabled state if required
  }

  isOpen = false;
  toggleOpen(event: MouseEvent) {
    this.isOpen = !this.isOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const targetElement = event.target as Element;

    if (targetElement && !targetElement.closest('.dropdown-btn') && !targetElement.closest('.dropdown')) {
      this.isOpen = false; // Close the dropdown
    }
  }

  ngOnInit() {
    this.currentOptions = this.options?.length ? this.options : defaultOptions;
    this.filteredOptions = [...this.currentOptions];
    this.selected = this.currentOptions[0];
    this.btnClass = twMerge('bg-n0 border dropdown-btn select-none cursor-pointer bg-primary/5 dark:bg-bg3 border-n30 text-sm md:text-base dark:border-n500 flex gap-2 justify-between items-center rounded-xl px-3 py-1.5 sm:px-4 sm:py-2', this.btnClassProps);
    this.dropdownClass = twMerge('absolute dropdown flex-col z-20 top-full duration-300 origin-top min-w-max shadow-[0px_6px_30px_0px_rgba(0,0,0,0.08)] max-h-40 overflow-y-auto right-0 bg-n0 dark:bg-bg4 p-1 rounded-md', this.dropdownClassProps);
  }

  filterOptions() {
    this.filteredOptions = this.currentOptions.filter(option => option.toLowerCase().includes(this.filter.toLowerCase()));
  }
}
