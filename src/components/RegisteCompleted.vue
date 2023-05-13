<template>
    <div class="container">
        <div class="card">
            <h2>{{`${user.name}님`}}</h2>
            <h2>회원 가입 되었습니다.</h2>
            <p>
                이메일 : {{ user.email }}
            </p>
            <p>
                주소 : {{ user.address }}
            </p>
            <p>
                연락처 : {{ user.phone }}
            </p>
        </div>
    </div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
    name: "RegisteCompleted",
    props: { user: Object },
})
</script>

<style scoped>

</style>