<script lang="ts">
import { defineComponent } from 'vue'
import IconPinia from '@/components/icons/aside/IconPinia.vue'
import IconMail from '@/components/icons/aside/menu/IconMail.vue'
import IconArrow from '@/components/icons/aside/menu/IconArrow.vue'
import IconList from '@/components/icons/aside/menu/IconList.vue'
import IconDrash from '@/components/icons/aside/menu/IconDrash.vue'
import IconDashboard from '@/components/icons/aside/menu/IconDashboard.vue'
import IconDocumentation from '@/components/icons/aside/menu/IconDocumentation.vue'
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue'
import IconUsers from '@/components/icons/aside/menu/IconUsers.vue'
import IconProduct from '@/components/icons/aside/menu/IconProduct.vue'
import IconPost from '@/components/icons/aside/menu/IconPost.vue'
import IconSupport from '@/components/icons/aside/menu/IconSupport.vue'

export default defineComponent({
  name: 'AsideAdmin',
  components: {
    IconDrash,
    IconList,
    IconArrow,
    IconMail,
    IconPinia,
    IconDashboard,
    IconDocumentation,
    CollapseTransition,
    IconUsers,
    IconProduct,
    IconPost,
    IconSupport
  },
  data() {
    return {
      menuItems: [
        {
          title: 'Dashboard',
          iconComponent: 'IconDashboard',
          isActive: false,
          link: '',
          type: 'group',
          isOpen: false,

          children: [
            {
              title: 'Analytics',
              icon: 'IconList',
              isActive: false,
              link: '/admin/dashboard'
            },
            {
              title: 'Analytics',
              icon: 'IconList',
              isActive: false,
              link: '/admin/analytics'
            }
          ]
        },
        {
          title: 'App & Page',
          iconComponent: 'IconMail',
          link: '',
          type: 'title'
        },
        {
          title: 'Product',
          iconComponent: 'IconProduct',
          isActive: false,
          link: '',
          type: 'group',
          isOpen: false,
          children: [
            {
              title: 'Category',
              icon: 'IconList',
              isActive: false,
              link: '/admin/product/category'
            },
            {
              title: 'List',
              icon: 'IconList',
              isActive: false,
              link: '/admin/product/list'
            },
            {
              title: 'Create',
              icon: 'IconList',
              isActive: false,
              link: '/admin/product/create'
            },
            {
              title: 'Config',
              icon: 'IconList',
              isActive: false,
              link: '/admin/product/config'
            }
          ]
        },
        {
          title: 'Post',
          iconComponent: 'IconPost',
          isActive: false,
          link: '',
          type: 'group',
          isOpen: false,
          children: [
            {
              title: 'Category',
              icon: 'IconList',
              isActive: false,
              link: '/admin/post/category'
            },
            {
              title: 'List',
              icon: 'IconList',
              isActive: false,
              link: '/admin/post/list'
            },
            {
              title: 'View',
              icon: 'IconList',
              isActive: false,
              link: '/admin/edit'
            }
          ]
        },
        {
          title: 'Authorize',
          iconComponent: 'IconMail',
          link: '',
          type: 'title'
        },
        {
          title: 'Users',
          iconComponent: 'IconUsers',
          isActive: false,
          link: '',
          type: 'group',
          isOpen: false,
          children: [
            {
              title: 'List',
              icon: 'IconList',
              isActive: false,
              link: '/admin/user'
            },
            {
              title: 'View',
              icon: 'IconList',
              isActive: false,
              link: '/admin/user'
            }
          ]
        },
        {
          title: 'Others',
          iconComponent: 'IconMail',
          link: '',
          type: 'title'
        },
        {
          title: 'Documentation',
          iconComponent: 'IconDocumentation',
          isActive: false,
          link: '/admin/documentation',
          type: 'link',
          isOpen: false
        },
        {
          title: 'Raise Support',
          iconComponent: 'IconSupport',
          isActive: false,
          link: '/admin/support',
          type: 'link',
          isOpen: false
        }
      ]
    }
  },
  methods: {
    isActiveRoute(link: any) {
      return this.$route.path === link
    },
    toggleOpen(item: { isOpen: boolean }) {
      this.menuItems.forEach((menuItem) => {
        menuItem.isActive = false
      })
      item.isOpen = !item.isOpen
      item.isActive = item.isOpen
    }
  },
  mounted() {
    const routePath = this.$route.path
    this.menuItems.forEach(
      (menuItem: { type: string; children: any[]; isActive: boolean; isOpen: boolean }) => {
        if (menuItem.type === 'group') {
          const hasActiveChild =
            menuItem.children.find((child: string) => child.link === routePath) !== undefined
          menuItem.isActive = hasActiveChild
          menuItem.isOpen = hasActiveChild
        }
      }
    )
  }
})
</script>
<template>
  <aside class="aside">
    <a class="aside__logo d-flex align-items-center gap-3 text-decoration-none">
      <div class="aside__logo__icon">
        <IconPinia></IconPinia>
      </div>
      <h5 class="aside__logo__branch fw-bold mb-0 text-deep-purple-lighten-1">MangPlat</h5>
    </a>
    <ul class="aside__menu aside-nav">
      <li
        v-for="(menuItem, index) in menuItems"
        :key="menuItem.title"
        :class="{
          'nav-item': menuItem.type === 'link',
          'nav-group': menuItem.type === 'group',
          active: menuItem.isActive,
          open: menuItem.isOpen,
          'nav-title': menuItem.type === 'title'
        }"
      >
        <template v-if="menuItem.type === 'link'">
          <router-link
            class="nav-item__link"
            :class="{ 'router-link-active': isActiveRoute(menuItem.link) }"
            :to="menuItem.link"
          >
            <component :is="menuItem.iconComponent" class="nav-item__link__icon"></component>
            <span class="nav-item__link__title">{{ menuItem.title }}</span>
          </router-link>
        </template>
        <template v-if="menuItem.type === 'group'">
          <a
            class="nav-group__label"
            :class="{ open: menuItem.isActive }"
            @click="toggleOpen(menuItem)"
          >
            <component :is="menuItem.iconComponent" class="nav-item__link__icon"></component>
            <span class="nav-group__label__title">{{ menuItem.title }}</span>
            <IconArrow class="nav-group__label__arrow"></IconArrow>
          </a>
          <collapse-transition>
            <ul
              class="nav-group-children"
              v-show="menuItem.isOpen"
              :class="{ show: menuItem.isActive }"
              :id="'navCollapse' + index"
            >
              <li
                v-for="menuItemChildren of menuItem.children"
                :key="menuItemChildren.title"
                class="nav-item"
              >
                <router-link
                  class="nav-item__link"
                  :to="menuItemChildren.link"
                  :class="{ 'router-link-active': isActiveRoute(menuItemChildren.link) }"
                >
                  <IconList class="nav-item__link__icon"></IconList>
                  <span class="nav-item__link__title"> {{ menuItemChildren.title }} </span>
                </router-link>
              </li>
            </ul>
          </collapse-transition>
        </template>
        <template v-if="menuItem.type === 'title'">
          <div class="title-wrapper">
            <span class="title-text">{{ menuItem.title }}</span>
            <IconDrash class="nav-title__icon"></IconDrash>
          </div>
        </template>
      </li>
    </ul>
  </aside>
</template>
<style lang="scss" scoped>
@import '@/assets/scss/aside/aside';
</style>
