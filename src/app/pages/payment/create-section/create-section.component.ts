import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { DropdownComponent } from '@component/shared/dropdown/dropdown.component'
import { OptionsHorizComponent } from '@component/shared/options-horiz/options-horiz.component'
import { TopBannerComponent } from '@component/shared/top-banner/top-banner.component'
import { CalendarModule } from 'primeng/calendar'
@Component({
  selector: 'app-create-section',
  standalone: true,
  imports: [TopBannerComponent, DropdownComponent, OptionsHorizComponent, CalendarModule, FormsModule],
  templateUrl: './create-section.component.html'
})
export class CreateSectionComponent {
  currencies = ['USD', 'GBP', 'EUR']
  date: Date | undefined
  dateFormat: string = 'yy-mm-dd';
}
