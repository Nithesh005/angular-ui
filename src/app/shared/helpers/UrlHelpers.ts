export class URLHelper {

    constructor() {}
    static initiateMFAURL = '/verification-srv/v2/authenticate/initiate';
    static authenticateMFAURL = '/verification-srv/v2/authenticate/authenticate';
    static mfaListURL = '/verification-srv/v2/setup/public/configured/list';
    static cancelByUserURL = '/verification-srv/v2/setup/cancel';
    static socketStatusURL = '/verification-srv/v2/notification/status';
    static sealoneSocketStatusURL = '/verification-srv/v2/notification/sealone/status';


    static authContext = '/authentication-srv'
    // static loginApi = this.authContext + '/verify_auth';
    static loginApi = this.authContext + '/loginWeb';  //Success
    static registerApi = this.authContext + '/signup'; // Success
    static forgotApi = this.authContext + '';
    static verifyCodeApi = this.authContext + '/verify_email_code'  //  write Get request
    static verifyMobileOtp = this.authContext + '/verify_mobile_code' // write Get Request 
    
    static forgotPasswordApi = this.authContext + '/forgot_password'

    static updaePassword = this.authContext + '/update_password'
    // static verifyMobileOtp = this.authContext + '/sms-otp'
    static userInfo = this.authContext + '/userInfo' //GET - fetch userinfo , POST - UpdateUserInfo
    static notificationData = '/getNotification'
    
    static serviceUrl = '/bbps/get_service_data'
    static fetchBillUrl = '/bbps/bill_fetch'
    
    static orderApi = '/tyche/orderapi'

    public static getAPIURL(): string {
        // return "https://authentication.ezbillpay.in";
        // return "http://127.0.0.1:8006"
        return "https://ezilbillserver-rhz0.onrender.com"
    }
    public static getBBPSURL(): string {
        // return "https://authentication.ezbillpay.in";
        // return "http://127.0.0.1:8000"
        return "https://bbps-server-cvu7.onrender.com"
    }
    public static TycheURL(): string {
        // return "https://authentication.ezbillpay.in";
        // return "http://127.0.0.1:7000"
        return "https://tyche-server-rq5m.onrender.com"
    }

    public static getBaseURL(): string {
        return "https://client.ezbillpay.in";
    }
}
