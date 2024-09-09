import { Title } from '@angular/platform-browser'
import { TransactionStatus } from '@data/dashboards/style2Transactions'

export const latestTransactions = [
 
  {
    id: 1,
    title: 'Elan',
    // icon: 'assets/images/paypal.png',
    // time: '11 Aug, 24. 10:36 am',
    medium: '12345',
    invoice: '9807654321',
    status: TransactionStatus.Pending,
    amount: 2141212,
    isChecked: false
  },
  {
    id: 2,
    title: 'Hendry',
    // icon: 'assets/images/paypal.png',
    // time: '11 Aug, 24. 10:36 am',
    medium: '12345',
    invoice: '9807654321',
    status: TransactionStatus.Successful,
    amount: 2521212,
    isChecked: false
  }
]
