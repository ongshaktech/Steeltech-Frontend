import CryptoJS from "crypto-js";

export function SetCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    cvalue =  CryptoJS.AES.encrypt(cvalue, "@#$ *IlO0Oo0_-");
    document.cookie = cname + "=" + cvalue + "; " + expires + "; SameSite=None; Secure; path=/";
}

export function GetCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            let output = c.substring(name.length, c.length);
            output = (CryptoJS.AES.decrypt(output, "@#$ *IlO0Oo0_-")).toString(CryptoJS.enc.Utf8);
            return output;
        }
    }
    return "";
}

export function ClearCookie() {
    document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "pswd=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
