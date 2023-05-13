export const Validation = {
    validateName: (name) => {
        const regex = /^[가-힣]{2,}|[a-zA-Z]{3,}$/;
        return !regex.test(name);
    },
    validateEmail: (email) => {
        const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return !regex.test(email);
    },
    validatePhone: (phone) => {
        const regex = /^0\d{1,2}[-\s]?\d{3,4}[-\s]?\d{4}$/;
        return !regex.test(phone);
    },
    validatePassword(password) {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        return !regex.test(password);
    },
    validateCardNumber(cardNumber) {
        return !this.luhnCheck(cardNumber.replace(/\D/g, ''))
    },
    luhnCheck(cardNumber) {
        let sum = 0;
        let isEven = false;
        for (let i = cardNumber.length - 1; i >= 0; i--) {
            let digit = parseInt(cardNumber.charAt(i), 10);
            if (isEven) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }
            sum += digit;
            isEven = !isEven;
        }
        return sum % 10 === 0;
    }
}