<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import { useUserStore } from '@/stores/user'

export default defineComponent({
  name: 'UserDropdown',
  setup() {
    const userStore = useUserStore()
    const user = ref(null)

    onMounted(() => {
      user.value = userStore.user
    })

    watch(
      () => userStore.user,
      (newUser) => {
        user.value = newUser
      }
    )

    return {
      user
    }
  }
})
</script>
<template>
  <v-menu transition="scale-transition">
    <template v-slot:activator="{ props }">
      <v-btn class="btn--circle-38px" icon v-bind="props" variant="text">
        <template v-slot:default>
          <v-badge
            bordered="true"
            color="success"
            dot
            location="bottom end"
            offset-x="3"
            offset-y="3"
            text-color="success"
          >
            <img
              alt="Admin Icon"
              class="w-100 h-100 rounded-circle"
              src="@/assets/images/avatar-df.svg"
            />
          </v-badge>
        </template>
      </v-btn>
    </template>

    <v-list class="mangosteen-list">
      <div class="mangosteen-user d-flex align-items-center px-4 pt-3 pb-2">
        <v-badge
          bordered="true"
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
          <p class="fs-8 mb-0">Super admin</p>
        </div>
      </div>
      <v-divider class="my-2"></v-divider>
      <div class="mangosteen-user-sign-out">
        <v-list-item class="mx-2 my-1">
          <template v-slot:prepend>
            <svg
              aria-hidden="true"
              class="v-icon notranslate v-theme--light me-2 iconify iconify--tabler"
              height="1em"
              role="img"
              style="font-size: 22px; height: 22px; width: 22px"
              tag="i"
              viewBox="0 0 24 24"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              >
                <path
                  d="M14 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-2"
                ></path>
                <path d="M7 12h14l-3-3m0 6l3-3"></path>
              </g>
            </svg>
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
    &__desc {
      padding-left: 12px;
    }
  }
}
</style>
