import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DropdownComponent } from '@component/shared/dropdown/dropdown.component';
import { TopBannerComponent } from '@component/shared/top-banner/top-banner.component';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule,TopBannerComponent,DropdownComponent],
  templateUrl: './privacy-policy.component.html'
})
export class PrivacyPolicyComponent {

}
