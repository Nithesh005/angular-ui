// import { NgClass, NgFor, NgIf } from '@angular/common';
// import { Component, EventEmitter, HostListener, Input, Output, OnInit } from '@angular/core';
// import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
// import { FormsModule } from '@angular/forms';
// import { ClassNameValue, twMerge } from 'tailwind-merge';
// const defaultOptions = ['Select', 'Last 7 Days', 'Last 1 Month', 'Last 1 Year']
// @Component({
//   selector: 'app-dropdown',
//   standalone: true,
//   imports: [NgClass,NgFor, NgIf, FormsModule],
//   templateUrl: './dropdown.component.html',
//   providers: [
//     {
//       provide: NG_VALUE_ACCESSOR,
//       useExisting: DropdownComponent,
//       multi: true
//     }
//   ]
// })
// export class DropdownComponent implements OnInit , ControlValueAccessor {

//   currentOptions:string[]=[]
//   selected=''
//   btnClass=''
//   dropdownClass=''

//   private onChange: (value: any) => void = () => {};
//   private onTouched: () => void = () => {};

//   // props
//   // @input() selectedOption: clickEvent
//   @Output() dataEvent = new EventEmitter<string>();
//   @Input() options?:string[]
//   // @Input() options: any[] = []; 
//   @Input() btnClassProps?:string
//   @Input() dropdownClassProps?:string
//   @Output() selectionChange = new EventEmitter<string>();
  

 

//   selectOption(option:string){
//     if (option === 'Select') {
//       return; // Prevent selection of the "Select" option
//     }

//     this.selected=option
//     this.isOpen=false
//     this.dataEvent.emit(this.selected);
//     this.selectionChange.emit(this.selected); 
//     this.onChange(this.selected);
//     this.onTouched();

//   }

//   writeValue(value: any): void {
//     if (value !== undefined) {
//       this.selected = value;
//     }
//   }

//   registerOnChange(fn: any): void {
//     this.onChange = fn;
//   }

//   registerOnTouched(fn: any): void {
//     this.onTouched = fn;
//   }

//   setDisabledState?(isDisabled: boolean): void {
//     // Optionally handle disabled state if required
//   }

//   isOpen = false
//   toggleOpen(event:MouseEvent) {
//     const allDropdowns = document.querySelectorAll('.dropdown'); // Find all dropdowns
//     allDropdowns.forEach(dropdown => {
//         if (dropdown !== event.target) {
//             dropdown.classList.remove('show');
//             dropdown.classList.add('hide');
//         }
//     });
//     this.isOpen = !this.isOpen
//   }
//   @HostListener('document:click', ['$event'])
//   onDocumentClick(event: MouseEvent): void {
//   const targetElement = event.target as Element;

//     // Check if event.target exists and if the click event target is not within the dropdown or the dropdown button
//     if (targetElement && !targetElement.closest('.dropdown-btn')) {
//       this.isOpen = false; // Close the dropdown
//     }
//   }

//   ngOnInit(){
//     this.currentOptions = this.options?.length?this.options:defaultOptions
//     this.selected=this.currentOptions[0]
//     this.btnClass=twMerge('bg-n0 border dropdown-btn select-none cursor-pointer bg-primary/5 dark:bg-bg3 border-n30 text-sm md:text-base dark:border-n500 flex gap-2 justify-between items-center rounded-xl px-3 py-1.5 sm:px-4 sm:py-2',this.btnClassProps)
//     this.dropdownClass = twMerge('absolute dropdown flex-col z-20 top-full duration-300 origin-top min-w-max shadow-[0px_6px_30px_0px_rgba(0,0,0,0.08)] max-h-40 overflow-y-auto right-0 bg-n0 dark:bg-bg4 p-1 rounded-md',this.dropdownClassProps)
//   }
// }

// export interface clickEvent {
//   click?: () => void
// }

import { Component, EventEmitter, Input, Output, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ClassNameValue, twMerge } from 'tailwind-merge';

const defaultOptions = ['Select', 'Last 7 Days', 'Last 1 Month', 'Last 1 Year'];

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [NgClass, NgFor, NgIf, FormsModule],
  templateUrl: './dropdown.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DropdownComponent,
      multi: true
    }
  ]
})
export class DropdownComponent implements OnInit, ControlValueAccessor {
  @Input() options: string[] = []; 
  @Input() btnClassProps?: string;
  @Input() dropdownClassProps?: string;

  @Output() selectionChange = new EventEmitter<string>();
  @Output() dataEvent = new EventEmitter<string>();

  currentOptions: string[] = [];
  selected = '';
  btnClass = '';
  dropdownClass = '';
  isOpen = false;

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit() {
    this.initializeDropdown();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['options']) {
      this.initializeDropdown();
    }
  }

  initializeDropdown() {
    this.currentOptions = this.options.length ? this.options : defaultOptions;
    this.selected = this.currentOptions[0];
    this.btnClass = twMerge(
      'bg-n0 border dropdown-btn select-none cursor-pointer bg-primary/5 dark:bg-bg3 border-n30 text-sm md:text-base dark:border-n500 flex gap-2 justify-between items-center rounded-xl px-3 py-1.5 sm:px-4 sm:py-2',
      this.btnClassProps
    );
    this.dropdownClass = twMerge(
      'absolute dropdown flex-col z-20 top-full duration-300 origin-top min-w-max shadow-[0px_6px_30px_0px_rgba(0,0,0,0.08)] max-h-40 overflow-y-auto right-0 bg-n0 dark:bg-bg4 p-1 rounded-md',
      this.dropdownClassProps
    );
  }

  selectOption(option: string) {
    if (option === 'Select') {
      return;
    }
    this.selected = option;
    this.isOpen = false;
    this.dataEvent.emit(this.selected);
    this.selectionChange.emit(this.selected);
    this.onChange(this.selected);
    this.onTouched();
  }

  toggleOpen(event: MouseEvent) {
    this.isOpen = !this.isOpen;
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
}
