import { Component } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  submitPaymentForm() {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://staging-connect.basispay.in/checkout';
    const formData = {
      address: 'chn',
      apiKey: 'd901d9d0-2d17-4468-ab81-376c6d2f4417',
      city: 'city',
      country: 'IND',
      customerEmail: 'nitheshwaran003@gmail.com',
      customerMobile: '+919976203099',
      customerName: 'Nithesh',
      deliveryAddress: '',
      deliveryCity: '',
      deliveryCountry: '',
      deliveryMobile: '',
      deliveryName: '',
      deliveryPostalCode: '',
      deliveryRegion: '',
      orderReference: 'yZ8HZp9TRIssd6dUUF5kLA==',
      postalCode: '123',
      region: 'tn',
      secureHash: '5B7DDCE64D6D33F0E86C298FCA94F82E13742928B20C045C50F3EE123B8BB0EC8EEFD563D2703FA83775D1F30A81D95AED06DC60456612208FFEAF5F6D6C6E92'
    };

    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        const hiddenField = document.createElement('input');
        hiddenField.type = 'hidden';
        hiddenField.name = key;
        hiddenField.value = formData[key];
        form.appendChild(hiddenField);
      }
    }

    document.body.appendChild(form);
    form.submit();
  }

}
