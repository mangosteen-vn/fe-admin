<script lang="ts" setup>
import { ref } from 'vue'
import { useAuthenticationStore } from '@/stores/authentication'
const authenticationStore = useAuthenticationStore()
import { useToast } from 'vue-toastification'
import router from '@/router'

const toast = useToast()
const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const showPassword = ref(false)
const showPasswordConfirmation = ref(false)
const accountLoading = ref(false)

function createUserWithEmailAndPassword() {
  accountLoading.value = true
  if (password.value == passwordConfirmation.value) {
    authenticationStore
      .createUserWithEmailAndPassword(email.value, password.value)
      .then(() => {
        email.value = ''
        password.value = ''
        passwordConfirmation.value = ''
        router.push('/sign-in')
        toast.success('Thanks for signing up')
        accountLoading.value = false
      })
      .catch((error) => {
        if (error.code == 'auth/email-already-in-use') {
          toast.error('Email already in use')
          email.value = ''
          password.value = ''
          passwordConfirmation.value = ''
          accountLoading.value = false
        }
      })
  } else {
    toast.error('Password and Confirm Password does not match')
    password.value = ''
    passwordConfirmation.value = ''
    accountLoading.value = false
  }
}
</script>
<template>
  <div class="wrap-component">
    <div class="sign-up p-5" data-aos="zoom-in">
      <div class="sign-up__title text-center">
        <h5 class="fw-semibold text-black">Create an Account</h5>
      </div>
      <div class="sign-up__form">
        <form @submit.prevent="createUserWithEmailAndPassword">
          <div
            :class="{ 'has-value': email !== '' }"
            class="form__input input-email input-email--v1"
          >
            <input
              v-model="email"
              class="form-control input__control"
              placeholder="Uname@gmail.com"
              required
              type="email"
            />
            <svg
              class="icon-user"
              height="18"
              style="enable-background: new 0 0 512 512"
              version="1.1"
              viewBox="0 0 512 512"
              width="18"
              x="0"
              xml:space="preserve"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:svgjs="http://svgjs.com/svgjs"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              y="0"
            >
              <g>
                <path
                  class=""
                  d="M437.02 330.98c-27.883-27.882-61.071-48.523-97.281-61.018C378.521 243.251 404 198.548 404 148 404 66.393 337.607 0 256 0S108 66.393 108 148c0 50.548 25.479 95.251 64.262 121.962-36.21 12.495-69.398 33.136-97.281 61.018C26.629 379.333 0 443.62 0 512h40c0-119.103 96.897-216 216-216s216 96.897 216 216h40c0-68.38-26.629-132.667-74.98-181.02zM256 256c-59.551 0-108-48.448-108-108S196.449 40 256 40s108 48.448 108 108-48.449 108-108 108z"
                  data-original=""
                  fill=""
                ></path>
              </g>
            </svg>
          </div>
          <div
            :class="{ 'has-value': password !== '' }"
            class="form__input input-password input-password--v1"
          >
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="password"
              class="form-control input__control"
              placeholder="Password"
              required
            />
            <svg
              class="icon-password"
              height="18"
              style="enable-background: new 0 0 512 512"
              version="1.1"
              viewBox="0 0 32 32"
              width="18"
              x="0"
              xml:space="preserve"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:svgjs="http://svgjs.com/svgjs"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              y="0"
            >
              <g>
                <path
                  d="M16 32c-.143 0-.286-.03-.419-.092l-2.995-1.382C6.156 27.558 2 21.063 2 13.98V4a1 1 0 0 1 .887-.994 58.352 58.352 0 0 0 5.898-.983A58.32 58.32 0 0 0 15.666.057c.216-.076.452-.076.667 0a58.323 58.323 0 0 0 6.882 1.966c1.938.427 3.923.758 5.898.983A1 1 0 0 1 30 4v9.981c0 7.083-4.155 13.577-10.586 16.545l-2.995 1.382A1.004 1.004 0 0 1 16 32zM4 4.886v9.095a16.27 16.27 0 0 0 9.424 14.729L16 29.897l2.576-1.189A16.27 16.27 0 0 0 28 13.981V4.886A60.332 60.332 0 0 1 16 2.06 60.326 60.326 0 0 1 4 4.885z"
                  data-original=""
                  fill=""
                ></path>
                <path
                  d="M20 23h-8c-1.103 0-2-.897-2-2v-7c0-1.103.897-2 2-2h8c1.103 0 2 .897 2 2v7c0 1.103-.897 2-2 2zm-8-9v7h8.002L20 14z"
                  data-original=""
                  fill=""
                ></path>
                <path
                  d="M19 14h-6a1 1 0 0 1-1-1v-2c0-2.206 1.794-4 4-4s4 1.794 4 4v2a1 1 0 0 1-1 1zm-5-2h4v-1c0-1.103-.897-2-2-2s-2 .897-2 2z"
                  data-original=""
                  fill=""
                ></path>
              </g>
            </svg>
            <span
              :class="{ show: showPassword }"
              class="icon-show-password"
              @click="showPassword = !showPassword"
            ></span>
          </div>
          <div
            :class="{ 'has-value': passwordConfirmation !== '' }"
            class="form__input input-password input-password--v1 input-password-confirmation"
          >
            <input
              v-model="passwordConfirmation"
              :type="showPasswordConfirmation ? 'text' : 'password'"
              autocomplete="password"
              class="form-control input__control"
              placeholder="Password confirmation"
              required
            />
            <svg
              class="icon-password"
              height="18"
              style="enable-background: new 0 0 512 512"
              version="1.1"
              viewBox="0 0 32 32"
              width="18"
              x="0"
              xml:space="preserve"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:svgjs="http://svgjs.com/svgjs"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              y="0"
            >
              <g>
                <path
                  d="M16 32c-.143 0-.286-.03-.419-.092l-2.995-1.382C6.156 27.558 2 21.063 2 13.98V4a1 1 0 0 1 .887-.994 58.352 58.352 0 0 0 5.898-.983A58.32 58.32 0 0 0 15.666.057c.216-.076.452-.076.667 0a58.323 58.323 0 0 0 6.882 1.966c1.938.427 3.923.758 5.898.983A1 1 0 0 1 30 4v9.981c0 7.083-4.155 13.577-10.586 16.545l-2.995 1.382A1.004 1.004 0 0 1 16 32zM4 4.886v9.095a16.27 16.27 0 0 0 9.424 14.729L16 29.897l2.576-1.189A16.27 16.27 0 0 0 28 13.981V4.886A60.332 60.332 0 0 1 16 2.06 60.326 60.326 0 0 1 4 4.885z"
                  data-original=""
                  fill=""
                ></path>
                <path
                  d="M20 23h-8c-1.103 0-2-.897-2-2v-7c0-1.103.897-2 2-2h8c1.103 0 2 .897 2 2v7c0 1.103-.897 2-2 2zm-8-9v7h8.002L20 14z"
                  data-original=""
                  fill=""
                ></path>
                <path
                  d="M19 14h-6a1 1 0 0 1-1-1v-2c0-2.206 1.794-4 4-4s4 1.794 4 4v2a1 1 0 0 1-1 1zm-5-2h4v-1c0-1.103-.897-2-2-2s-2 .897-2 2z"
                  data-original=""
                  fill=""
                ></path>
              </g>
            </svg>
            <span
              :class="{ show: showPasswordConfirmation }"
              class="icon-show-password"
              @click="showPasswordConfirmation = !showPasswordConfirmation"
            ></span>
          </div>
          <div class="form__btn btn-primary--flat mt-3 pt-1">
            <v-btn
              :loading="accountLoading"
              block
              class="text-none"
              color="purple-accent-4"
              prepend-icon
              rounded="lg"
              type="submit"
              variant="flat"
            >
              Sign Up
            </v-btn>
          </div>
        </form>
      </div>
      <div class="sign-up__back">
        <router-link to="/sign-in" class="btn-primary--outlined text-decoration-none">
          <v-btn
            block
            class="text-none"
            color="grey-darken-3"
            prepend-icon
            rounded="lg"
            type="submit"
            variant="outlined"
          >
            <template v-slot:prepend>
              <img alt="Back Icon" src="@/assets/images/back-icon.svg" />
            </template>
            Back to Sign In
          </v-btn>
        </router-link>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.wrap-component {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: var(--bs-secondary-bg);

  .sign-up {
    background-color: var(--bs-body-bg);
    border-radius: 8px;
    width: 364px;
    &__form {
      margin-top: 20px;

      form {
        .input-password {
          margin: 12px 0;
        }
      }
    }
    &__back {
      margin-top: 12px;
    }
  }
}
</style>
