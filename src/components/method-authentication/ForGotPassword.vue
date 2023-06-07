<script lang="ts" setup>
import { ref } from 'vue'
import { useAuthenticationStore } from '@/stores/authentication'

const authenticationStore = useAuthenticationStore()

import { useToast } from 'vue-toastification'

const toast = useToast()

const email = ref('')
const accountLoading = ref(false)

async function sendPasswordResetEmail() {
  accountLoading.value = true
  authenticationStore
    .sendPasswordResetEmail(email.value)
    .then(() => {
      accountLoading.value = false
      toast.success('Password reset link has been sent to your email.')
      email.value = ''
    })
    .catch((error) => {
      accountLoading.value = false
      email.value = ''
      if (error.code === 'auth/user-not-found') {
        toast.error('User not found')
      }
      if (error.code === 'auth/too-many-requests') {
        toast.error('Too many requests')
      }
      if (error.code === 'auth/invalid-email') {
        toast.error('Invalid email')
      }
    })
}
</script>
<template>
  <div class="wrap-component">
    <div class="forgot-password p-5" data-aos="zoom-in">
      <div class="forgot-password__title text-center">
        <h5 class="fw-semibold mb-2 text-black">Forgot password?</h5>
        <p class="text-blue-grey-lighten-3 fw-medium mb-0 fs-7">
          We'll send you reset instructions
        </p>
      </div>
      <div class="forgot-password__form">
        <form @submit.prevent="sendPasswordResetEmail">
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
              Send link reset password
            </v-btn>
          </div>
        </form>
      </div>
      <div class="sign-up__back">
        <router-link class="btn-primary--outlined text-decoration-none" to="/sign-in">
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
<style lang="scss" scoped>
.wrap-component {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: var(--bs-secondary-bg);

  .forgot-password {
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
