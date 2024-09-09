import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { OptionsHorizComponent } from '@component/shared/options-horiz/options-horiz.component'
import { SwitchComponent } from '@component/shared/switch/switch.component'
import { TopBannerComponent } from '@component/shared/top-banner/top-banner.component'

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [TopBannerComponent,SwitchComponent,OptionsHorizComponent,CommonModule],
  templateUrl: './notification.component.html'
})
export class NotificationComponent {
  notificationsData = {
    'Email Notification': [
      {
        id: 1,
        title: 'Two-Factor Authentication',
        desc: 'Use your favorite authentication app for added security.',
        status: true
      },
      {
        id: 2,
        title: 'Email Notifications',
        desc: 'Receive important notifications via your primary email.',
        status: false
      },
      {
        id: 3,
        title: 'SMS Recovery',
        desc: 'Set up SMS recovery for account access.',
        status: false
      }
    ],
    'SMS Notification': [
      {
        id: 1,
        title: 'Text Authentication Code',
        desc: 'Authenticate using SMS for quick access.',
        status: false
      },
      {
        id: 2,
        title: 'Critical Alerts',
        desc: 'Get critical alerts directly to your phone via SMS.',
        status: true
      },
      {
        id: 3,
        title: 'Emergency Recovery',
        desc: 'Enable SMS recovery as a backup method.',
        status: true
      }
    ],
    'Push Notification': [
      {
        id: 1,
        title: 'Push Authentication',
        desc: 'Securely authenticate with push notifications.',
        status: true
      },
      {
        id: 2,
        title: 'Instant Alerts',
        desc: 'Receive instant alerts through push notifications.',
        status: false
      },
      {
        id: 3,
        title: 'Emergency Push',
        desc: 'Configure push notifications for emergency scenarios.',
        status: true
      }
    ],
    'News Flash': [
      {
        id: 1,
        title: 'News Updates',
        desc: 'Stay informed with important news updates.',
        status: true
      },
      {
        id: 2,
        title: 'Newsletter',
        desc: 'Subscribe to our newsletter for regular updates.',
        status: false
      },
      {
        id: 3,
        title: 'Emergency Alerts',
        desc: 'Receive emergency alerts for urgent news.',
        status: false
      }
    ],
    'Buzz Alert': [
      {
        id: 1,
        title: 'Buzzworthy Moments',
        desc: 'Get notified about buzzworthy moments in real-time.',
        status: false
      },
      {
        id: 2,
        title: 'Popular Trends',
        desc: 'Stay updated on popular trends and topics.',
        status: true
      },
      {
        id: 3,
        title: 'Trend Alerts',
        desc: 'Receive alerts for trending topics and discussions.',
        status: false
      }
    ],
    'Update Notification': [
      {
        id: 1,
        title: 'System Updates',
        desc: 'Receive notifications for system updates and improvements.',
        status: true
      },
      {
        id: 2,
        title: 'App Upgrades',
        desc: 'Get alerted about the latest app upgrades and features.',
        status: false
      },
      {
        id: 3,
        title: 'Emergency Updates',
        desc: 'Stay informed with emergency system updates.',
        status: true
      }
    ]
  }
}
