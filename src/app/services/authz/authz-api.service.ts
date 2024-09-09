import { Injectable } from '@angular/core';
import { URLHelper } from '../../shared/helpers/UrlHelpers';
import { DataService } from '@service/data.service';
// Test Commit
@Injectable({
  providedIn: 'root'
})
export class AuthzApiService {

  constructor(private dataService: DataService) { }

  userInfo(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const http = new XMLHttpRequest();
        const _serviceURL = URLHelper.getAPIURL() + URLHelper.userInfo
        // const _serviceURL = "loclhost:8080/verifycode"
        http.onreadystatechange = () => {
          if (http.readyState == 4) {
            if (http.responseText) {
              console.log(http.responseText);

              resolve(JSON.parse(http.responseText));
            } else {
              resolve(undefined);
            }
          }
        };
        http.open("GET", _serviceURL, true);
        http.setRequestHeader("Content-type", "application/json");
        const token = localStorage.getItem('authToken');
        if (token) {
          http.setRequestHeader("Authorization", `${token}`);
        }
        http.send(JSON.stringify({}));
      } catch (ex) {
        reject(ex);
      }
    })
  }
  // Sample Output UserInfo:
  // {
  //   "code": 200,
  //   "data": {
  //     "email": "nitheshwaran003@gmail.com",
  //     "username": "TESTtest"
  //   },
  //   "status": "Success"
  // }

  // Payload Key to Update User UpdateUserInfo
  // "first_name"
  // "last_name"
  // "username"
  // "state"
  // "city"
  // "company_name"
  // "company_website"

  UpdateUserInfo(payload: any): Promise<any> {
    // console.log('payload response',payload.zipcode);
    payload.pin_code = payload.zipcode
    payload.mobile_number = payload.phone
    console.log('payload response', payload);
    return new Promise((resolve, reject) => {
      try {

        const http = new XMLHttpRequest();
        const _serviceURL = URLHelper.getAPIURL() + URLHelper.userInfo
        http.onreadystatechange = () => {
          if (http.readyState == 4) {
            if (http.responseText) {
              resolve(JSON.parse(http.responseText));
            } else {
              resolve(undefined);
            }
          }
        };
        http.open("POST", _serviceURL, true);
        http.setRequestHeader("Content-type", "application/json");
        const token = localStorage.getItem('authToken');
        // console.log("Uertoken : ", token);
        if (token) {
          // http.setRequestHeader("Authorization", `Bearer ${token}`);
          http.setRequestHeader("Authorization", `${token}`);
        }
        http.send(JSON.stringify(payload));

      } catch (ex) {
        reject(ex);
      }
    })
  }


  GetService(service_name: any): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const http = new XMLHttpRequest();
        const _serviceURL = URLHelper.getBBPSURL() + URLHelper.serviceUrl
        http.onreadystatechange = () => {
          if (http.readyState == 4) {
            if (http.responseText) {
              // console.log(JSON.parse(http.responseText));
              resolve(JSON.parse(http.responseText));
            } else {
              resolve(undefined);
            }
          }
        };
        http.open("POST", _serviceURL, true);
        http.setRequestHeader("Content-type", "application/json");
        const token = localStorage.getItem('authToken');
        if (token) {
          http.setRequestHeader("Authorization", `${token}`);
        }
        // http.send(JSON.stringify({"serviceName": "cable_tv_billers"}));
        http.send(JSON.stringify({ "serviceName": service_name }));
      } catch (ex) {
        reject(ex);
      }
    })
  }

  submitPaymentForm(formData: any) {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://staging-connect.basispay.in/checkout';
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
  MakePayment(payload:any): Promise<any> {
    return new Promise((resolve, reject) => {
      try {      
        const http = new XMLHttpRequest();
        const _serviceURL = URLHelper.TycheURL() + URLHelper.orderApi
        // console.log('_serviceURL',_serviceURL); 
        http.onreadystatechange = () => {
          if (http.readyState == 4) {         
            if (http.responseText) {              
              console.log(JSON.parse(http.responseText));
              const formValue = JSON.parse(http.responseText)
              console.log('formValue',formValue);
              this.submitPaymentForm(formValue.data)
              resolve(JSON.parse(http.responseText));
            } else {
              resolve(undefined);
            }
          }
        };
        http.open("POST", _serviceURL, true);
        http.setRequestHeader("Content-type", "application/json");
        const token = localStorage.getItem('authToken');
        if (token) {
          http.setRequestHeader("Authorization", `${token}`);
        }
        // http.send(JSON.stringify({"serviceName": "cable_tv_billers"}));
        // const payload = {
        //   "bill_amount": "70",
        //   "billerId": "TNEB00000TND01",
        //   "customerParams": [{ "name": "Consumer Number", "value": "054760011140" }]
        // }
        http.send(JSON.stringify(payload));
      } catch (ex) {
        reject(ex);
      }
    })
  }

  getNotification(): Promise<any> {
    //   Sample Response
    //   {
    //     "code": 200,
    //     "data": [
    //         {
    //             "imgUrl": "https://img.freepik.com/free-vector/gradient-sale-background-with-discount_23-2148966077.jpg?ga=GA1.1.909030877.1723801676&semt=ais_hybrid",
    //             "message": "Diwali mega sale 99% discount",
    //             "timestamp": "Sun, 25 Aug 2024 14:30:00 GMT"
    //         }
    //     ],
    //     "status": "Success"
    // }
    return new Promise((resolve, reject) => {
      try {
        const http = new XMLHttpRequest();
        const _serviceURL = URLHelper.getAPIURL() + URLHelper.notificationData
        http.onreadystatechange = () => {
          if (http.readyState == 4) {
            if (http.responseText) {
              resolve(JSON.parse(http.responseText));
            } else {
              resolve(undefined);
            }
          }
        };
        http.open("GET", _serviceURL, true);
        http.setRequestHeader("Content-type", "application/json");
        const token = localStorage.getItem('authToken');
        if (token) {
          http.setRequestHeader("Authorization", `${token}`);
        }
        http.send(JSON.stringify({ "serviceName": "cable_tv_billers" }));
      } catch (ex) {
        reject(ex);
      }
    })
  }

  FetchBill(payload: any): Promise<any> {
    // Smaple payload
    //   {
    //     "billerId":"TNEB00000TND01",
    //     "customerParams":[{"name": "Consumer Number", "value": "054760011140"}]
    // }
    // console.log(payload);
    return new Promise((resolve, reject) => {
      try {
        const http = new XMLHttpRequest();
        const _serviceURL = URLHelper.getBBPSURL() + URLHelper.fetchBillUrl
        http.onreadystatechange = () => {
          if (http.readyState == 4) {
            if (http.responseText) {
              console.log(JSON.parse(http.responseText));
              resolve(JSON.parse(http.responseText));
            } else {
              resolve(undefined);
            }
          }
        };
        http.open("POST", _serviceURL, true);
        http.setRequestHeader("Content-type", "application/json");
        const token = localStorage.getItem('authToken');
        if (token) {
          http.setRequestHeader("Authorization", `${token}`);
        }
        // http.send(JSON.stringify({"serviceName": "cable_tv_billers"}));
        http.send(JSON.stringify(payload));
      } catch (ex) {
        reject(ex);
      }
    })
    // Sample Response
    //   {
    //     "code": 200,
    //     "data": {
    //         "additionalTags": [],
    //         "amount": "140",
    //         "billDate": "2022-07-20",
    //         "billNumber": "922337203685477580788",
    //         "billPeriod": "Monthly",
    //         "billTags": [],
    //         "custConvDesc": "",
    //         "custConvFee": "",
    //         "customerName": "AL.RM.SETHURAMAN.",
    //         "dueDate": "2024-08-30"
    //     },
    //     "status": "Success"
    // }
  }

  login(payload: any): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const http = new XMLHttpRequest();
        const _serviceURL = URLHelper.getAPIURL() + URLHelper.loginApi
        http.onreadystatechange = () => {
          if (http.readyState === 4) {
            if (http.status === 200 && http.responseText) { // Check for successful status
              const response = JSON.parse(http.responseText);
              if (response.code === 200 && response.data.token.AccessToken) {
                // console.log(response.data.token.AccessToken);
                localStorage.setItem('authToken', response.data.token.AccessToken);
                setTimeout(() => {
                  // this.getNotification()
                  // this.userInfo();
                  // this.MakePayment();
                }, 1);
              }
              else if (response.code === 404) {
                const response = JSON.parse(http.responseText);
                resolve(response);
              }
              resolve(response);
            }

            else {
              resolve(undefined);
            }
          }
        };
        http.open("POST", _serviceURL, true);
        http.setRequestHeader("Content-type", "application/json");
        http.send(JSON.stringify(payload));
      } catch (ex) {
        reject(ex);
      }
    })
  }


  register(payload: any): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const http = new XMLHttpRequest();
        const _serviceURL = URLHelper.getAPIURL() + URLHelper.registerApi
        http.onreadystatechange = () => {
          if (http.readyState == 4) {
            if (http.responseText) {
              resolve(JSON.parse(http.responseText));
            } else {
              resolve(undefined);
            }
          }
        };
        http.open("POST", _serviceURL, true);
        http.setRequestHeader("Content-type", "application/json");
        http.send(JSON.stringify(payload));
      } catch (ex) {
        reject(ex);
      }
    })
  }

  forgetResend(payload: any): Promise<any> {

    return new Promise((resolve, reject) => {
      try {

        const http = new XMLHttpRequest();
        let value = ''
        if (payload.isEmail) {
          value = "?email_id=" + payload.email
        }
        console.log('paylod try', payload)
        // else {
        //   value = "?mobile_number=" + payload.mobile
        // }
        const _serviceURL = URLHelper.getAPIURL() + URLHelper.forgotPasswordApi
        http.onreadystatechange = () => {
          if (http.readyState == 4) {
            if (http.responseText) {
              resolve(JSON.parse(http.responseText));
            } else {
              resolve(undefined);
            }
          }
        };
        http.open("GET", _serviceURL, true);
      } catch (ex) {
        reject(ex);
      }
    })
  }

  initiateForgetPassword(email: string): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const http = new XMLHttpRequest();
        const _serviceURL = URLHelper.getAPIURL() + URLHelper.forgotPasswordApi + "?email_id=" + email
        http.onreadystatechange = () => {
          if (http.readyState == 4) {
            if (http.responseText) {
              resolve(JSON.parse(http.responseText));
            } else {
              resolve(undefined);
            }
          }
        };
        http.open("GET", _serviceURL, true);
        http.setRequestHeader("Content-type", "application/json");
        http.send();
      } catch (ex) {
        reject(ex);
      }
    })
  }

  forgotPassword(payload: any): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const http = new XMLHttpRequest();
        const _serviceURL = URLHelper.getAPIURL() + URLHelper.forgotPasswordApi
        http.onreadystatechange = () => {
          if (http.readyState == 4) {
            if (http.responseText) {
              resolve(JSON.parse(http.responseText));
            } else {
              resolve(undefined);
            }
          }
        };
        http.open("POST", _serviceURL, true);
        http.setRequestHeader("Content-type", "application/json");
        http.send(JSON.stringify(payload));
      } catch (ex) {
        reject(ex);
      }
    })
  }

  sendOtp(payload: any): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const http = new XMLHttpRequest();
        const _serviceURL = URLHelper.getAPIURL() + URLHelper.verifyMobileOtp + "?mobile_number=" + payload.mobile
        http.onreadystatechange = () => {
          if (http.readyState == 4) {
            if (http.responseText) {
              resolve(JSON.parse(http.responseText));
            } else {
              resolve(undefined);
            }
          }
        };
        http.open("GET", _serviceURL, true);
        http.setRequestHeader("Content-type", "application/json");
        http.send(JSON.stringify(payload));
      } catch (ex) {
        reject(ex);
      }
    })
  }

  codeVerify(payload: any): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const http = new XMLHttpRequest();
        const _serviceURL = URLHelper.getAPIURL() + URLHelper.verifyCodeApi
        http.onreadystatechange = () => {
          if (http.readyState == 4) {
            if (http.responseText) {
              resolve(JSON.parse(http.responseText));
            } else {
              resolve(undefined);
            }
          }
        };
        http.open("POST", _serviceURL, true);
        http.setRequestHeader("Content-type", "application/json");
        http.send(JSON.stringify(payload));
      } catch (ex) {
        reject(ex);
      }
    })
  }
  SendEmailCode(payload: any): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        console.log(payload);
        const http = new XMLHttpRequest();
        // const _serviceURL = URLHelper.getAPIURL() + URLHelper.verifyCodeApi
        const _serviceURL = `${URLHelper.getAPIURL() + URLHelper.verifyCodeApi}?email_id=${encodeURIComponent(payload.email_id)}`;
        http.onreadystatechange = () => {
          if (http.readyState == 4) {
            if (http.responseText) {
              resolve(JSON.parse(http.responseText));
            } else {
              resolve(undefined);
            }
          }
        };
        http.open("GET", _serviceURL, true);
        http.setRequestHeader("Content-type", "application/json");
        http.send(JSON.stringify(payload));
      } catch (ex) {
        reject(ex);
      }
    })
  }
  resentCode(payload: any): Promise<any> {

    return new Promise((resolve, reject) => {
      try {

        const http = new XMLHttpRequest();
        let value = ''
        if (payload.isEmail) {
          value = "?email_id=" + payload.email
        }
        console.log('paylod try', payload)
        // else {
        //   value = "?mobile_number=" + payload.mobile
        // }
        const _serviceURL = URLHelper.getAPIURL() + URLHelper.forgotPasswordApi
        http.onreadystatechange = () => {
          if (http.readyState == 4) {
            if (http.responseText) {
              resolve(JSON.parse(http.responseText));
            } else {
              resolve(undefined);
            }
          }
        };
        http.open("GET", _serviceURL, true);
      } catch (ex) {
        reject(ex);
      }
    })
  }

  codeMobileVerify(payload: any): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const http = new XMLHttpRequest();
        const _serviceURL = URLHelper.getAPIURL() + URLHelper.verifyMobileOtp
        http.onreadystatechange = () => {
          if (http.readyState == 4) {
            if (http.responseText) {
              resolve(JSON.parse(http.responseText));
            } else {
              resolve(undefined);
            }
          }
        };
        http.open("POST", _serviceURL, true);
        http.setRequestHeader("Content-type", "application/json");
        http.send(JSON.stringify(payload));
      } catch (ex) {
        reject(ex);
      }
    })
  }
  UpdatePassword(payload: any): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const http = new XMLHttpRequest();
        const _serviceURL = URLHelper.getAPIURL() + URLHelper.updaePassword
        http.onreadystatechange = () => {
          if (http.readyState == 4) {
            if (http.responseText) {
              resolve(JSON.parse(http.responseText));
            } else {
              resolve(undefined);
            }
          }
        };
        http.open("POST", _serviceURL, true);
        http.setRequestHeader("Content-type", "application/json");
        http.send(JSON.stringify(payload));
      } catch (ex) {
        reject(ex);
      }
    })
  }
}
