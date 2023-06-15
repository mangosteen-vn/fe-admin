<script lang="ts">
import {defineComponent} from 'vue'
import IconPinia from '@/components/icons/aside/IconPinia.vue'
import IconMail from '@/components/icons/aside/menu/IconMail.vue'
import IconArrow from '@/components/icons/aside/menu/IconArrow.vue'
import IconList from '@/components/icons/aside/menu/IconList.vue'
import IconDrash from '@/components/icons/aside/menu/IconDrash.vue'

export default defineComponent({
    name: 'Aside',
    components: {IconDrash, IconList, IconArrow, IconMail, IconPinia},
    data() {
        return {
            menuItems: [
                {
                    title: 'Email',
                    iconComponent: 'IconMail',
                    isActive: true,
                    link: '/admin/dashboard',
                    type: 'link'

                },
                {
                    title: 'App & Page',
                    iconComponent: 'IconMail',
                    link: '',
                    type: 'title'
                },
                {
                    title: 'Invoice',
                    iconComponent: 'IconMail',
                    isActive: true,
                    link: '',
                    type: 'group', isOpen: true,

                    children: [
                        {
                            title: 'Email',
                            icon: 'IconList',
                            isActive: true,
                            link: '/admin/him'
                        }
                    ]
                }
            ]
        }
    },
    methods: {
        isActiveRoute(link) {
            return this.$route.path === link
        },
        toggleGroup(item) {
            item.isOpen = !item.isOpen;
        }
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
            <li v-for="menuItem of menuItems" :key="menuItem.title"
                :class="{'nav-item': menuItem.type === 'link', 'nav-group': menuItem.type === 'group', 'active': menuItem.isActive, 'open': menuItem.isOpen, 'nav-title': menuItem.type === 'title'}">
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
                    <div class="nav-group__label" @click="toggleGroup(menuItem)">
                        <component :is="menuItem.iconComponent" class="nav-item__link__icon"></component>
                        <span class="nav-group__label__title">{{ menuItem.title }}</span>
                        <IconArrow class="nav-group__label__arrow"></IconArrow>
                    </div>
                    <ul class="nav-group-children">
                        <li v-for="menuItemChildren of menuItem.children" :key="menuItemChildren.title"
                            class="nav-item">
                            <router-link class="nav-item__link" :to="menuItemChildren.link"
                                         :class="{ 'router-link-active': isActiveRoute(menuItemChildren.link) }">
                                <IconList class="nav-item__link__icon"></IconList>
                                <span class="nav-item__link__title"> {{ menuItemChildren.title }} </span>
                            </router-link>
                        </li>
                    </ul>
                </template>
                <template v-if="menuItem.type === 'title'">
                    <div class="title-wrapper">
                        <span class="title-text">App & Page</span>
                        <IconDrash class="nav-title__icon"></IconDrash>
                    </div>
                </template>
            </li>
        </ul>
    </aside>
</template>
<style lang="scss" scoped>
.aside {
  background: var(--bs-white);
  box-shadow: 0 2px 6px rgba(47, 43, 61, 0.14), 0 0 transparent, 0 0 transparent;
  z-index: 9999;

  &__logo {
    margin: 0 14px;
    padding: 16px 12px;
  }

  &__menu {
    padding: 0;

    .nav-item {
      list-style: none;
      margin-bottom: 4px;

      &__link {
        display: flex;
        align-items: center;
        text-decoration: none;
        position: relative;
        margin-block: 0;
        margin-inline: 0.875rem;
        padding-block: 0;
        padding-inline: 0.75rem;
        white-space: nowrap;
        border-radius: 6.4px;
        block-size: 2.375rem;

        &:hover {
          &::before {
            opacity: calc(0.04 * 1);
          }
        }

        &::before {
          position: absolute;
          border-radius: inherit;
          block-size: 100%;
          content: '';
          inline-size: 100%;
          background-color: rgba(var(--nav-link-inerhit), 0.68);
          inset: 0;
          opacity: 0;
          pointer-events: none;
        }

        &.router-link-active {
          background: linear-gradient(
                          72.47deg,
                          rgb(115, 103, 240) 22.16%,
                          rgba(115, 103, 240, 0.7) 76.47%
          ) !important;
          box-shadow: 0 2px 6px rgba(115, 103, 240, 0.48);
          font-weight: 500;

          .nav-item__link__icon {
            stroke: var(--bs-white);
          }

          .nav-item__link__title {
            color: var(--bs-white);
            font-weight: 600;
          }
        }

        &__icon {
          width: 22px !important;
          height: 22px !important;
          stroke: rgba(var(--nav-link-inerhit), 0.68);
          flex-shrink: 0;
          margin-inline-start: 0.3rem;
          margin-inline-end: 0.5rem;
        }

        &__title {
          color: rgba(var(--nav-link-inerhit), 0.68);
          font-weight: 500;
          white-space: nowrap;
        }
      }
    }

    .nav-group {
      @extend .nav-item;
      overflow: hidden;

      &__label {
        @extend .nav-item__link;
        cursor: pointer;
        margin-bottom: 4px;

        &__icon {
          @extend .nav-item__link__icon;
        }

        &__title {
          @extend .nav-item__link__title;
          margin-inline-end: auto;
        }

        &__arrow {
          width: 16px;
          height: 16px;
          stroke: rgba(var(--nav-link-inerhit), 0.68);
        }
      }

      &.active {
        .nav-group__label {
          &::before {
            opacity: calc(0.055 * 1);
            background-color: rgba(var(--nav-link-inerhit), 0.78);
          }
        }
      }

      &.open {
        .nav-group-children {
          height: auto;
          transition: max-height 0.3s ease-in;
        }
      }

      &-children {
        max-height: 0;
        overflow: hidden;
        transition: height 0.3s ease-out;
        padding: 0;

        .nav-item__link__icon {
          width: 10px !important;
          height: 10px !important;
          margin-right: 12px;
        }
      }
    }

    .nav-title {
      text-transform: uppercase;
      margin: 20px 14px 6px 14px;
      padding: 0 12px;
      letter-spacing: 0.4px;
      list-style: none;

      .title-wrapper {
        .title-text {
          font-size: 12px;
          color: rgba(var(--nav-link-inerhit) 0.42);
          width: auto;
          white-space: nowrap;
        }
      }

      &__icon {
        display: none;
        stroke: rgba(var(--nav-link-inerhit), 0.42);
      }
    }
  }

  &.close {
    .aside__logo__branch {
      width: 0;
      overflow: hidden;
      visibility: hidden;
      transition: 1s;
      transform: translateX(-1px);
    }

    .nav-item {
      .nav-item__link__title {
        overflow: hidden;
        display: none;
      }
    }

    .nav-title {
      .title-wrapper {
        .title-text {
          width: 0;
          overflow: hidden;
          visibility: hidden;
          transform: translateX(-1px);
          display: none;
          transition: 0.5s;
        }
      }

      &__icon {
        display: block;
        margin-inline-start: 0.3rem;
        stroke: rgba(var(--nav-link-inerhit), 0.42);
      }
    }

    .nav-group {
      &__label {
        &__title {
          width: 0;
          overflow: hidden;
          visibility: hidden;
          transform: translateX(-1px);
          transition: 1s;
        }

        &__arrow {
          display: none;
        }
      }

      &.open {
        .nav-group-children {
          height: 0;
          display: none;
          padding: 0;

          .nav-item__link__icon {
            width: 10px !important;
            height: 10px !important;
            margin-right: 12px;
          }
        }
      }
    }
  }
}
</style>
