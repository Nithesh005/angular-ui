import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OptionsHorizComponent } from '@component/shared/options-horiz/options-horiz.component';
import { PasswordInputComponent } from '@component/shared/password-input/password-input.component';
import { SwitchComponent } from '@component/shared/switch/switch.component';
import { TopBannerComponent } from '@component/shared/top-banner/top-banner.component';

@Component({
  selector: 'app-security',
  standalone: true,
  imports: [CommonModule,RouterLink,TopBannerComponent,OptionsHorizComponent,SwitchComponent, PasswordInputComponent],
  templateUrl: './security.component.html'
})
export class SecurityComponent {
  twofactorsettings1 = [
    {
      id: 1,
      title: 'Authentication app',
      desc: 'Google auth app',
      status: true
    },
    {
      id: 2,
      title: 'Primary email',
      desc: 'E-mail used to send notifications',
      status: false
    },
    {
      id: 3,
      title: 'SMS Recovery',
      desc: 'Your phone number or something',
      status: true
    }
  ]
  twofactorsettings2 = [
    {
      id: 1,
      title: 'Mobile Authenticator',
      desc: 'Enhance security with a mobile authentication app.',
      status: false
    },
    {
      id: 2,
      title: 'Email Notifications',
      desc: 'Receive important notifications via your primary email.',
      status: true
    },
    {
      id: 3,
      title: 'SMS Account Recovery',
      desc: 'Enable SMS-based account recovery for added convenience.',
      status: false
    }
  ]
}
