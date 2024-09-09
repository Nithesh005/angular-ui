import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DropdownComponent } from '@component/shared/dropdown/dropdown.component';
import { OptionsHorizComponent } from '@component/shared/options-horiz/options-horiz.component';
import { TopBannerComponent } from '@component/shared/top-banner/top-banner.component';

@Component({
  selector: 'app-help-center',
  standalone: true,
  imports: [DropdownComponent,TopBannerComponent,CommonModule,OptionsHorizComponent],
  templateUrl: './help-center.component.html'
})
export class HelpCenterComponent {

}
