<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useAuthenticationStore } from '@/stores/authentication'

const authenticationStore = useAuthenticationStore()

const formAction = reactive({
  email: '',
  password: '',
  showPassword: false
})
const googleLoading = ref(false)

function signInWithGoogle() {
  googleLoading.value = true
  authenticationStore
    .signInWithGoogle()
    .then(() => {
      googleLoading.value = false
    })
    .catch(() => {
      googleLoading.value = false
    })
}
</script>

<template>
  <div class="wrap-component">
    <div class="sign-in p-5">
      <div class="sign-in__title text-center">
        <h5 class="fw-semibold mb-2 text-black">You must Sign In to Join</h5>
        <p class="text-body-tertiary fw-medium mb-0 fs-7">We're A Team That Guides Each Other</p>
      </div>
      <div class="sign-in__method">
        <v-btn
          :loading="googleLoading"
          block
          class="social-sign-in"
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
    border-radius: var(--bs-border-radius-lg);
    width: 364px;

    &__title {
      margin-bottom: 20px;
    }
  }
}
</style>
