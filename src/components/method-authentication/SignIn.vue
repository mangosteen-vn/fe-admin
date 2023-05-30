<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useAuthenticationStore } from '@/stores/authentication'

const authenticationStore = useAuthenticationStore()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const googleLoading = ref(false)
const facebookLoading = ref(false)
const accountLoading = ref(false)
const googleDisable = ref(false)
const facebookDisable = ref(false)
const accountDisable = ref(false)

function signInWithGoogle() {
  googleLoading.value = true
  facebookDisable.value = true
  accountDisable.value = true
  authenticationStore
    .signInWithGoogle()
    .then(() => {
      facebookDisable.value = false
      googleLoading.value = false
      accountDisable.value = false
    })
    .catch(() => {
      googleLoading.value = false
      facebookDisable.value = false
      accountDisable.value = false
    })
}

function signInWithFacebook() {
  facebookLoading.value = true
  googleDisable.value = true
  accountDisable.value = true
  authenticationStore
    .signInWithFacebook()
    .then(() => {
      facebookLoading.value = false
      googleDisable.value = false
      accountDisable.value = false
    })
    .catch(() => {
      facebookLoading.value = false
      googleDisable.value = false
      accountDisable.value = false
    })
}

async function signInWithEmailAndPassword() {
  accountLoading.value = true
  try {
    await authenticationStore.signInWithEmailAndPassword(email.value, password.value)
    email.value = ''
    password.value = ''
    accountLoading.value = false
  } catch (error) {
    accountLoading.value = false
    console.error(error)
  }
}
</script>

<template>
  <div class="wrap-component">
    <div class="sign-in p-5">
      <div class="sign-in__title text-center">
        <h5 class="fw-semibold mb-1 text-black">You must Sign In to Join</h5>
        <p class="text-blue-grey-lighten-3 fw-medium mb-0 fs-7">
          We're A Team That Guides Each Other
        </p>
      </div>
      <div class="sign-in__method">
        <v-btn
          :disabled="googleDisable"
          :loading="googleLoading"
          block
          class="social-sign-in text-none google-login"
          prepend-icon
          rounded="lg"
          variant="outlined"
          @click="signInWithGoogle"
        >
          <template v-slot:prepend>
            <img alt="Google Icon" src="@/assets/images/google-icon.svg" />
          </template>
          Sign in with Google
        </v-btn>
        <v-btn
          :disabled="facebookDisable"
          :loading="facebookLoading"
          block
          class="social-sign-in text-none facebook-login"
          prepend-icon
          rounded="lg"
          variant="outlined"
          @click="signInWithFacebook"
        >
          <template v-slot:prepend>
            <img alt="Facebook Icon" src="@/assets/images/facebook-icon.svg" />
          </template>
          Sign in with Facebook
        </v-btn>
      </div>
      <div class="sign-in__line text-center">
        <div class="sign-in__line__element fw-medium">Or</div>
      </div>
      <div class="sign-in__form">
        <form @submit.prevent="signInWithEmailAndPassword">
          <div
            :class="{ 'has-value': email !== '' }"
            class="form__input input-email input-email--v1"
          >
            <input
              v-model="email"
              class="form-control input__control"
              placeholder="Uname@gmail.com"
              type="email"
              required
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
          <div class="form__forgot text-end mt-2">
            <router-link class="fs-7 fw-semibold text-purple-accent-4" to="/forgot-password"
              >Forgot password?
            </router-link>
          </div>
          <div class="form__btn btn-primary--flat mt-3">
            <v-btn
              :disabled="accountDisable"
              :loading="accountLoading"
              block
              class="text-none"
              color="purple-accent-4"
              prepend-icon
              rounded="lg"
              type="submit"
              variant="flat"
            >
              Sign in with Your Account
            </v-btn>
          </div>
        </form>
      </div>
      <div class="sign-in__register mt-4 text-center fw-medium text-blue-grey-lighten-2 fs-7">
        Don't have account?
        <router-link class="fw-semibold text-blue-grey-darken-4" to="/sign-up">Sign Up</router-link>
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

  .sign-in {
    background-color: var(--bs-body-bg);
    border-radius: 8px;
    width: 364px;

    &__register {
      line-height: 18px;

      a {
        transition: 0.4s;

        &:hover {
          text-decoration: none;
          transition: 0.4s;
        }
      }
    }

    &__method {
      margin: 20px 0;

      .facebook-login {
        margin-top: 12px;
      }
    }

    &__form {
      margin-top: 20px;

      form {
        .input-password {
          margin-top: 12px;
        }

        .form {
          &__forgot {
            line-height: 18px;

            a {
              transition: 0.4s;

              &:hover {
                text-decoration: none;
                transition: 0.4s;
              }
            }
          }
        }
      }
    }

    &__line {
      &__element {
        position: relative;
        align-items: center;
        color: var(--blue-grey-lighten-3);

        &::before {
          background: var(--blue-grey-lighten-4);
          bottom: 45%;
          content: '';
          left: 0;
          height: 1px;
          position: absolute;
          width: 118px;
        }

        &::after {
          background: var(--blue-grey-lighten-4);
          bottom: 45%;
          right: 0;
          content: '';
          height: 1px;
          position: absolute;
          width: 118px;
        }
      }
    }
  }
}
</style>
