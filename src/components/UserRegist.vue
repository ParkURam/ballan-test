<template>
    <form @submit.prevent="submitForm" class="container">
        <div class="card">
            <div class="card-content" v-if="step === 1">
                <div class="label-input">
                    <label for="email">이메일 주소</label>
                    <input type="email" id="email" v-model="user.email" @input="validateEmail" @blur="validateEmail">
                </div>
                <p v-show="user.emailError" class="error">올바른 이메일 주소를 입력해주세요.</p>

                <div class="label-input">
                    <label for="password">비밀번호</label>
                    <input type="password" id="password" v-model="user.password" @input="validatePassword" @blur="validatePassword">
                </div>
                <p v-show="user.passwordError" class="error">영문 대문자, 소문자, 숫자, 특수문자를 포함한 8자리 이상의 문자열을 입력해주세요.</p>
                <div class="label-input">
                    <label for="confirmPassword">비밀번호 확인</label>
                    <input type="password" id="confirmPassword" v-model="user.confirmPassword" @input="validateConfirmPassword" @blur="validateConfirmPassword">

                </div>
                <p v-show="user.confirmPasswordError && user.confirmPassword !== ''" class="error">비밀번호가 일치하지 않습니다.</p>
            </div>

            <div class="card-content"  v-if="step === 2">
                <div class="label-input">
                    <label for="name">이름</label>
                    <input type="text" id="name" v-model="user.name" @blur="user.validateName">
                </div>
                <p v-if="user.nameError" class="error">2글자 이상의 한글 완성형 또는 3글자 이상의 영문 알파벳만 입력해주세요.</p>

                <div class="label-input">
                    <label for="phone">연락처</label>
                    <input type="tel" id="phone" v-model="user.phone" @blur="user.validatePhone">
                </div>
                <p v-if="user.phoneError" class="error">올바른 전화번호 형식을 입력해주세요. (ex. 010-1234-1234)</p>
                <div class="label-input">
                    <label for="address">주소</label>
                    <div class="btn-label">
                        <button class="btn address-btn" @click="showAddressModal">우편주소</button>
                    </div>

                </div>
                <div class="address-column">
                    <input type="text" id="address1" v-model="user.address1" class="full-width address-input" @click="showAddressModal">
                    <input type="text" id="address2" v-model="user.address2" class="full-width address-input" @click="showAddressModal">
                </div>
                <p v-if="user.addressError" class="error">주소를 입력해주세요.</p>
            </div>

            <div v-if="step === 3">
                <div>
                    <label for="cardNumber">카드 번호</label>
                    <input type="text" id="cardNumber" v-model="user.cardNumber" @blur="user.validateCardNumber">
                    <p v-if="user.cardNumberError" class="error">유효한 카드 번호를 입력해주세요.</p>
                </div>
            </div>

            <div class="actions-buttons">
                <button v-if="step < 3"
                        class="btn"
                        :class="checkNext ? 'bg-active' : 'bg-disabled' "
                        :disabled="!checkNext"
                        @click.prevent="nextStep"
                >다음</button>
                <button v-if="step > 1"
                        class="btn"
                        @click.prevent="prevStep"
                >이전</button>
                <button v-if="step === 3" class="btn" type="submit">완료</button>
            </div>
        </div>
    </form>
</template>

<script>
import {computed, defineComponent, reactive} from "vue";
import {User} from "@/model/User";

export default defineComponent({
    name: "UserRegist",
    setup(){
        const data = reactive({
            user : new User(),
            step: 2,
        })
        const debounce = (func, timeout = 100) => {
            let timer;
            return (...args) => {
                clearTimeout(timer);
                timer = setTimeout(() => { func.apply(this, args); }, timeout);
            };
        }

        const validateEmail = debounce(() => {
            data.user.validateEmail()
        })
        const validatePassword = debounce(() => {
            data.user.validatePassword()
        })
        const validateConfirmPassword = debounce(() => {
            data.user.validateConfirmPassword()
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
            // Implement Daum Postcode API here
        }
        const submitForm = () => {
            if (this.cardNumberError) {
                return;
            }
        }

        const checkNext = computed(()=>{
            if(data.step === 1){
                if(data.user.email === '' || data.user.password === '' || data.user.confirmPassword === ''){
                    return false
                }else{
                    return !(data.user.emailError || data.user.passwordError || data.user.confirmPasswordError)
                }
            }

            if(data.step === 2){
                return data.user.nameError || data.user.phoneError
            }

            if(data.step === 3){
                return data.user.addressError
            }
            return false
        })

        return Object.assign(data, {
            nextStep,
            prevStep,
            showAddressModal,
            submitForm,
            checkNext,
            validateEmail,
            validatePassword,
            validateConfirmPassword,

        })
    }
})
</script>

<style scoped>

</style>