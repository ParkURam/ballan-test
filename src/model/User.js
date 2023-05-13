import {Validation} from "@/utils/validation";
export class User{
    constructor() {
        this.name = ''
        this.email = ''
        this.phone = ''
        this.password = ''
        this.confirmPassword = ''
        this.address1 = ''
        this.address2 = ''
        this.cardNumber = ''
        this.nameError = false
        this.emailError = false
        this.phoneError = false
        this.passwordError = false
        this.confirmPasswordError = false
        this.addressError = true
        this.cardNumberError = true
    }


    validateName(){
        this.nameError = Validation.validateName(this.name)
    }

    validateEmail(){
        this.emailError = Validation.validateEmail(this.email)
    }

    validatePhone(){
        this.phoneError = Validation.validatePhone(this.phone)
    }

    validatePassword(){
        this.passwordError = Validation.validatePassword(this.password)
        this.validateConfirmPassword()
    }
    validateConfirmPassword(){
        this.confirmPasswordError = this.password !== this.confirmPassword;
    }

    validateCardNumber(){
        this.cardNumberError = Validation.validateCardNumber(this.cardNumber)
    }
}



