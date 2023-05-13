<template>
    <form v-if="!complete" @submit.prevent="submitForm" class="container">
        <div class="card">
            <div class="card-content" v-if="step === 1">
                <h2>개인 정보 입력</h2>
                <div class="label-input">
                    <label for="email">이메일 주소*</label>
                    <input type="email" id="email" v-model="user.email" @input="validateEmail" @blur="validateEmail">
                </div>
                <p v-show="user.emailError" class="error">올바른 이메일 주소를 입력해주세요.</p>

                <div class="label-input">
                    <label for="password">비밀번호*</label>
                    <input type="password" id="password" v-model="user.password" @input="validatePassword" @blur="validatePassword">
                </div>
                <p v-show="user.passwordError" class="error">영문 대문자, 소문자, 숫자, 특수문자를 포함한 8자리 이상의 문자열을 입력해주세요.</p>
                <div class="label-input">
                    <label for="confirmPassword">비밀번호 확인*</label>
                    <input type="password" id="confirmPassword" v-model="user.confirmPassword" @input="validateConfirmPassword" @blur="validateConfirmPassword">

                </div>
                <p v-show="user.confirmPasswordError && user.confirmPassword !== ''" class="error">비밀번호가 일치하지 않습니다.</p>
            </div>
            <div class="card-content"  v-if="step === 2">
                <h2>배송지 정보 입력</h2>
                <div class="label-input">
                    <label for="name">이름*</label>
                    <input type="text" id="name" v-model="user.name" @input="validateName">
                </div>
                <p v-if="user.nameError" class="error">2글자 이상의 한글 완성형 또는 3글자 이상의 영문 알파벳만 입력해주세요.</p>

                <div class="label-input">
                    <label for="phone">연락처*</label>
                    <input type="tel" id="phone" v-model="user.phone" @input="validatePhone">
                </div>
                <p v-if="user.phoneError" class="error">
                    올바른 전화번호 형식을 입력해주세요.<br/>
                    (ex. 010-1234-1234, 010 1234 1234, 01012341234)
                </p>
                <div class="label-input">
                    <label for="address">주소*</label>
                    <div class="btn-label">
                        <button class="btn address-btn" @click="showAddressModal">우편주소</button>
                    </div>

                </div>
                <div class="address-column">
                    <input type="text" id="address1" v-model="user.address1" class="full-width address-input" readonly>
                    <input type="text" id="address2" v-model="user.address2" class="full-width address-input">
                </div>
            </div>
            <div v-if="step === 3" class="card-content">
                <h2>결재 정보 입력</h2>
                <label for="cardNumber">카드 번호*</label>
                <div class="card-number-input">
                    <input type="text" id="cardNumber1" v-model="user.cardNumber1" maxlength="4" @input="validateCardNumber">
                    <input type="text" id="cardNumber2" v-model="user.cardNumber2" maxlength="4" @input="validateCardNumber">
                    <input type="text" id="cardNumber3" v-model="user.cardNumber3" maxlength="4" @input="validateCardNumber">
                    <input type="text" id="cardNumber4" v-model="user.cardNumber4" maxlength="4" @input="validateCardNumber">
                </div>
                <p v-if="user.cardNumberError && user.cardNumber !== ''" class="error">유효한 카드 번호를 입력해주세요.</p>
            </div>
            <div class="actions-buttons">
                <button v-if="step > 1"
                        class="btn bg-active"
                        @click.prevent="prevStep"
                >이전</button>
                <button v-if="step < 3"
                        class="btn"
                        :class="checkNext ? 'bg-active' : 'bg-disabled' "
                        :disabled="!checkNext"
                        @click.prevent="nextStep"
                >다음</button>
                <button v-if="step === 3"
                        class="btn"
                        :class="checkNext ? 'bg-active' : 'bg-disabled' "
                        :disabled="!checkNext"
                        type="submit">
                완료</button>
            </div>
        </div>
    </form>
    <RegisteCompleted v-if="complete" :user="user"/>
</template>

<script>
import {computed, defineComponent, reactive} from "vue";
import {User} from "@/model/User";
import RegisteCompleted from "@/components/RegisteCompleted.vue";

export default defineComponent({
    name: "UserRegist",
    components: {RegisteCompleted},
    setup(){
        const debounce = (func, timeout = 100) => {
            let timer;
            return (...args) => {
                clearTimeout(timer);
                timer = setTimeout(() => { func.apply(this, args); }, timeout);
            };
        }
        const isEmpty = (data) => {
            let flag = false
            data.forEach((item) => {
                if(item === '') flag = true
            })
            return flag
        }
        const data = reactive({
            complete: false,
            user:  new User(),
            step: 1,
            validateEmail: debounce(() => {
                data.user.validateEmail()
            }),
            validatePassword: debounce(() => {
                data.user.validatePassword()
            }),
            validateConfirmPassword: debounce(() => {
                data.user.validateConfirmPassword()
            }),
            validatePhone: debounce(() => {
                data.user.validatePhone()
            }),
            validateName: debounce(() => {
                data.user.validateName()
            }),
            validateCardNumber: debounce(()=> {
                data.user.validateCardNumber()
            })
        })
        const nextStep = () => {
            if(checkNext.value){
                data.step++;
            }
        }
        const prevStep = () => {
            data.step--;
        }
        const showAddressModal= () => {
            data.user.openPost()
        }
        const submitForm = () => {
            if (!data.user.cardNumberError && data.step === 3) {
                data.complete = true
            }
        }

        const checkNext = computed(()=>{
            if(data.step === 1){
                if(isEmpty([data.user.email, data.user.password, data.user.confirmPassword])){
                    return false
                }else{
                    return !(data.user.emailError || data.user.passwordError || data.user.confirmPasswordError)
                }
            }
            if(data.step === 2){
                if(isEmpty([data.user.name, data.user.phone, data.user.address1, data.user.address2])){
                    return false
                }else{
                    return !(data.user.nameError || data.user.phoneError || data.user.addressError)
                }
            }
            if(data.step === 3){
                if(isEmpty([data.user.cardNumber1, data.user.cardNumber2, data.user.cardNumber3, data.user.cardNumber4])){
                    return false
                }else{
                    return !data.user.cardNumberError
                }
            }
            return false
        })

        return Object.assign(data, {
            nextStep,
            prevStep,
            showAddressModal,
            submitForm,
            checkNext,
        })
    }
})
</script>

<style scoped>

</style>