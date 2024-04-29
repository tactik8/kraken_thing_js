import re


export class KrData {
    /*

   Analyzes a given value

    */

    constructor(propertyID = null, value = null) {

        this._propertyID = propertyID;
        this._value = value;
        }

    isUrl(){

        //https://uibakery.io/regex-library/url

        var httpRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
        // Validate URL
        return httpRegex.test(this._value); // Returns true

        
    }


    isEmail(){

        var validateEmailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

        return validateEmailRegex.test(this._value); 

    }
    
    isTelephone(){

        const validatePhoneNumberRegex = /^\+?[1-9][0-9]{7,14}$/;
        return validatePhoneNumberRegex.test(this._value); 
    }


    isUsZipcode(){
        const validateRegex = /^[0-9]{5}(?:-[0-9]{4})?$/;
        return validateRegex.test(this._value); 
    }
    isCaPostalcode(){

        const validateRegex = /(^\d{5}(-\d{4})?$)|(^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$)/;
        return validateRegex.test(this._value); 
        
    }

    
    isString(){

        
    }
    isKrThing(){
        
    }
    

    isIsoDate(){

        var ISOregex = /^(?:\d{4})-(?:\d{2})-(?:\d{2})T(?:\d{2}):(?:\d{2}):(?:\d{2}(?:\.\d*)?)(?:(?:-(?:\d{2}):(?:\d{2})|Z)?)$/;
        // Validate ISO date
        return ISOregex.test(this._value); 
    }

    isUsDate(){

        var ISOregex = /^(0?[1-9]|[12][0-9]|3[01])([ \/\-])(0?[1-9]|1[012])\2([0-9][0-9][0-9][0-9])(([ -])([0-1]?[0-9]|2[0-3]):[0-5]?[0-9]:[0-5]?[0-9])?$/;
        // Validate ISO date
        return ISOregex.test(this._value); 
        
    }

    

    isGuid(){

        var guidRegex = /^(?:\{{0,1}(?:[0-9a-fA-F]){8}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){12}\}{0,1})$/;
        // Validate GUID
        return guidRegex.test(this._value); // Returns true
    }

    isUuid(){
        var uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        // Validate UUID
        return uuidRegex.test(this._value); // Returns true
        
    }
    isUsSsn(){
       var ssn_validate_pattern = /^(?!666|000|9\\d{2})\\d{3}-(?!00)\\d{2}-(?!0{4})\\d{4}$/
        return ssn_validate_pattern.test(this._value); 
    }

    isPassword(){

        // https://uibakery.io/regex-library/password
        var passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        // Validate password
        return passwordRegex.test(this._value); 
    }

    isNumber(){

        var numberRegex = /^\d+$/;
        // Validate numbers
        return numberRegex.test(this._value); 
    }
    isMacAddress(){

        var macRegex = /^(?:[0-9A-Fa-f]{2}[:-]){5}(?:[0-9A-Fa-f]{2})$/;
        // Validate mac address
        return macRegex.test(this._value); 
    }
    isIpV4Address(){
        var ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        // Validate IPv4 address
        ipv4Regex.test(this._value); 
    }

    isIpV6Address(){
        var ipv4Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
        // Validate IPv4 address
        ipv4Regex.test(this._value); 
    }
}