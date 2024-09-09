export const TransactionStatus = {
  Successful: 'successful',
  Cancelled: 'cancelled',
  Pending: 'pending'
}
export const transactionsData = [
  {
    id: 1,
    title: 'Hooli INV-79820',
    icon: 'assets/images/paypal.png',
    time: '11 Aug, 24. 10:36 am',
    medium: 'Paypal',
    invoice: '#521452',
    status: TransactionStatus.Successful,
    amount: 1121212,
    isChecked: false
  },
  {
    id: 2,
    title: 'Initech INV-24792',
    icon: 'assets/images/paypal.png',
    time: '11 Aug, 24. 10:36 am',
    medium: 'Paypal',
    invoice: '#521452',
    status: TransactionStatus.Cancelled,
    amount: 8921212,
    isChecked: false
  },
  {
    id: 3,
    title: 'Bluth Company INV-84732',
    icon: 'assets/images/paypal.png',
    time: '11 Aug, 24. 10:36 am',
    medium: 'Paypal',
    invoice: '#521452',
    status: TransactionStatus.Pending,
    amount: 2141212,
    isChecked: false
  },
  {
    id: 4,
    title: 'Salaries',
    icon: 'assets/images/paypal.png',
    time: '11 Aug, 24. 10:36 am',
    medium: 'Paypal',
    invoice: '#521452',
    status: TransactionStatus.Successful,
    amount: 2521212,
    isChecked: false
  },
  {
    id: 5,
    title: 'Massive Dynamic INV-90874',
    icon: 'assets/images/visa.png',
    time: '11 Aug, 24. 10:36 am',
    medium: 'Visa',
    invoice: '#521452',
    status: TransactionStatus.Pending,
    amount: 554100,
    isChecked: false
  },
  {
    id: 6,
    title: 'Jack Collingwood Card reload',
    icon: 'assets/images/payoneer.png',
    time: '11 Aug, 24. 10:36 am',
    medium: 'Payoneer',
    invoice: '#521452',
    status: TransactionStatus.Successful,
    amount: 1420012,
    isChecked: false
  },
  {
    id: 7,
    title: 'DOGE Yearly Return Invest.',
    icon: 'assets/images/payoneer.png',
    time: '11 Aug, 24. 10:36 am',
    medium: 'Payoneer',
    invoice: '#521452',
    status: TransactionStatus.Cancelled,
    amount: 782332,
    isChecked: false
  },
  {
    id: 8,
    title: 'Globex Corporation INV-24398',
    icon: 'assets/images/paypal.png',
    time: '11 Aug, 24. 10:36 am',
    medium: 'Paypal',
    invoice: '#521452',
    status: TransactionStatus.Successful,
    amount: 8521212,
    isChecked: false
  }
]
