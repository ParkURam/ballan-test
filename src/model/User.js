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
        this.cardNumber1 = ''
        this.cardNumber2 = ''
        this.cardNumber3 = ''
        this.cardNumber4 = ''
        this.nameError = false
        this.emailError = false
        this.phoneError = false
        this.passwordError = false
        this.confirmPasswordError = false
        this.addressError = true
        this.cardNumberError = true
    }

    get address(){
        return `${this.address1} ${this.address2}`
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
        const cardNumber = this.cardNumber1 + this.cardNumber2 + this.cardNumber3 + this.cardNumber4
        this.cardNumberError = Validation.validateCardNumber(cardNumber)
    }

    openPost(){
        this.addressError = true
        this.address1 = ''
        this.address2 = ''
        new window.daum.Postcode({
            oncomplete: (resData) => {

                if (resData.userSelectedType === "R") {
                    // 사용자가 도로명 주소를 선택했을 경우
                    this.address1 = resData.roadAddress;
                } else {
                    // 사용자가 지번 주소를 선택했을 경우(J)
                    this.address1 = resData.jibunAddress;
                }
                // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
                if (resData.userSelectedType === "R") {
                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                    if (resData.bname !== "" && /[동|로|가]$/g.test(resData.bname)) {
                        this.address2 += resData.bname;
                    }
                    // 건물명이 있고, 공동주택일 경우 추가한다.
                    if (resData.buildingName !== "" && resData.apartment === "Y") {
                        this.address2 +=
                            this.address2 !== ""
                                ? `, ${resData.buildingName}`
                                : resData.buildingName;
                    }
                    // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                    if (this.address2 !== "") {
                        this.address2 = `(${this.address2})`;
                    }
                } else {
                    this.address2 = "";
                }

                this.addressError = false
            },
        }).open();
    }
}



