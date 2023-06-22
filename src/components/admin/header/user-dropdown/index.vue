<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import type { User } from '@/types/User'
import IconSignout from '@/components/icons/header/IconSignout.vue'
import { useAuthenticationStore } from '@/stores/authentication'
import router from '@/router'
import { useToast } from 'vue-toastification'

export default defineComponent({
  name: 'UserDropdown',
  components: { IconSignout },
  setup() {
    const userStore = useUserStore()
    const authStore = useAuthenticationStore()
    const user = ref<User | null>(null)
    const userRole = ref('')
    const toast = useToast()
    const signOut = async () => {
      await authStore.signOut()
      await router.push('/sign-in')
      toast.success('You are now logged out.')
    }
    onMounted(() => {
      user.value = userStore.user
      userRole.value = userStore.userRole
    })

    watch(
      () => userStore.user,
      (newUser) => {
        user.value = newUser
      }
    )

    watch(
      () => userStore.userRole,
      (newUserRole) => {
        userRole.value = newUserRole
      }
    )

    return {
      user,
      userRole,
      signOut
    }
  }
})
</script>
<template>
  <v-menu :close-on-content-click="false" activator="parent" transition="scale-transition">
    <template v-slot:activator="{ props }">
      <v-btn class="btn--circle-38px" icon v-bind="props" variant="text">
        <template v-slot:default>
          <v-badge
            bordered
            color="success"
            dot
            location="bottom end"
            offset-x="3"
            offset-y="3"
            text-color="success"
          >
            <v-avatar
              :image="user && user.avatar ? user.avatar : ''"
              class="v-avatar--h38px"
              color="mangosteen-user__avatar"
            ></v-avatar>
          </v-badge>
        </template>
      </v-btn>
    </template>

    <v-list class="mangosteen-list">
      <div class="mangosteen-user d-flex align-items-center">
        <v-badge
          bordered
          color="success"
          dot
          location="bottom end"
          offset-x="3"
          offset-y="3"
          text-color="success"
        >
          <v-avatar
            :image="user.avatar"
            class="v-avatar--h38px"
            color="mangosteen-user__avatar"
          ></v-avatar>
        </v-badge>
        <div class="mangosteen-user__desc">
          <p class="fw-semibold mb-0 text-black">{{ user.name }}</p>
          <p class="fs-8 mb-0 text-capitalize">{{ userRole }}</p>
        </div>
      </div>
      <v-divider class="my-2"></v-divider>
      <div class="mangosteen-user-sign-out">
        <v-list-item
          @click="signOut"
          class="mx-2 my-1 rounded-6 btn-sign-out-modal"
          density="compact"
          variant="text"
        >
          <template v-slot:prepend>
            <IconSignout></IconSignout>
          </template>
          <v-list-item-title class="fw-medium">Sign Out</v-list-item-title>
        </v-list-item>
      </div>
    </v-list>
  </v-menu>
</template>
<style lang="scss" scoped>
.mangosteen-list {
  margin-top: 13.5px;
  width: 230px;
  border-radius: 6px !important;
  box-shadow: 0 2px 6px rgba(47, 43, 61, 0.14), 0 0 transparent, 0 0 transparent !important;

  .mangosteen-user {
    padding: 6px 24px;

    &__desc {
      padding-left: 12px;
    }
  }
}
</style>
