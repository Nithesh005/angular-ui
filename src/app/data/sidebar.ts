interface SubmenuItem {
  title: string;
  url: string;
  submenus?: SubmenuItem[];
}

interface SidebarItem {
  id: number;
  name: string;
  icon: string;
  submenus: SubmenuItem[];
}
export const sidebarData:SidebarItem[] = [
  {
    id: 1,
    name: 'Dashboard',
    icon: 'las la-home',
    submenus: [
      { title: 'Dashboard 1', url: '/dashboards/user' },
    ]
  },
 
  {
    id: 2,
    name: 'Payment',
    icon: 'las la-wallet',
    submenus: [
      { title: 'Bill payments', url: '/payment/payment-provider' },
      { title: 'QR Code', url: '/payment/qr-code' },
      {
        title: 'Payment Link',
        url: '/payment/payment-provider',
        submenus: [
          { title: 'Create Link', url: '/payment/payment-link/create' },
          { title: 'History', url: '/payment/payment-link/history' }
        ]
      },
      { title: 'Payouts', url: '/payment/payment-provider' },  
    ]
  },
  // {
  //   id: 6,
  //   name: 'Invoicing',
  //   icon: 'las la-file-invoice',
  //   submenus: [
  //     { title: 'Add New Invoice', url: '/invoicing/add-new' },
  //     { title: 'Style 01', url: '/invoicing/style-01' },
  //     { title: 'Style 02', url: '/invoicing/style-02' }
  //   ]
  // },
  
  {
    id: 3,
    name: 'Integration',
    icon: 'las la-wallet',
    submenus: [
      { title: 'Settings', url: '/settings/security' },
    ]
  },
  {
    id: 4,
    name: 'Support',
    icon: 'las la-handshake',
    submenus: [
      { title: 'Tickets', url: '/support/help-center' },
      { title: 'Help Center', url: '/support/help-center' },
      { title: 'Faq', url: '/support/help-center' },
    ]
  }
]

