import { Component } from '@angular/core';
import { DropdownComponent } from '@component/shared/dropdown/dropdown.component';
import { TopBannerComponent } from '@component/shared/top-banner/top-banner.component';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [TopBannerComponent,DropdownComponent],
  templateUrl: './contact-us.component.html'
})
export class ContactUsComponent {
  countries=['USA','UK','Canada']
}
