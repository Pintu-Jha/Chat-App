import validator from 'is_js';


function checkEmpty(val: string, key: string) {
    if (validator.empty(val.trim())) {
        return `Please enter ${key}`
    } else {
        return ''
    }
}

const checkMinLength = (val: { trim: () => { (): any; new(): any; length: number; }; }, minLength: number, key: string) => {
    if (val.trim().length < minLength) {
        return `Please enter valid ${key}`
    } else {
        return ''
    }
}

export default function (data: { fullName: any; username: any; email: any; password: any; otp: any; }) {
    const { 
        fullName,
        username,
        email, 
        password,
        otp
     } = data;

     if (username !== undefined) {
        let emptyValidationText = checkEmpty(username, "User name");
        if (emptyValidationText !== '') {
            return emptyValidationText
        }else{
            let minLenghtValidation = checkMinLength(username, 3, "User name");
            if(minLenghtValidation !== ''){
                return minLenghtValidation;
            }
        }
    }

    if (fullName !== undefined) {
        let emptyValidationText = checkEmpty(fullName, "Full name");
        if (emptyValidationText !== '') {
            return emptyValidationText
        }else{
            let minLenghtValidation = checkMinLength(fullName, 3, "Full name");
            if(minLenghtValidation !== ''){
                return minLenghtValidation;
            }
        }
    }


    if (email !== undefined) {
        let emptyValidationText = checkEmpty(email, "email");
        if (emptyValidationText !== '') {
            return emptyValidationText
        }else{
            if(!validator.email(email)){
                return "Please enter valid email";
            }
        }
    }

    if (password !== undefined) {
        let emptyValidationText = checkEmpty(password, "password");
        if (emptyValidationText !== '') {
            return emptyValidationText
        }else{
            let minLenghtValidation = checkMinLength(password, 6, "password");
            if(minLenghtValidation !== ''){
                return minLenghtValidation;
            }
        }
    }

    if (otp !== undefined) {
        let emptyValidationText = checkEmpty(otp, "Otp");
        if (emptyValidationText !== '') {
            return emptyValidationText
        }else{
            let minLenghtValidation = checkMinLength(otp, 4, "Otp");
            if(minLenghtValidation !== ''){
                return minLenghtValidation;
            }
        }
    }

}