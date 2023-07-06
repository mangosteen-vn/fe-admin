//@/router/edit.ts
// @ts-ignore
import { createRouter, createWebHistory } from 'vue-router'
// @ts-ignore
import HomeView from '../views/HomeView.vue'
// @ts-ignore
import SignIn from '@/components/method-authentication/SignIn.vue'
// @ts-ignore
import SignUp from '@/components/method-authentication/SignUp.vue'
// @ts-ignore
import ForGotPassword from '@/components/method-authentication/ForgotPassword.vue'
// @ts-ignore
import AdminLayout from '@/views/AdminLayout.vue'
// @ts-ignore
import DashboardView from '@/components/admin/dashboard/index.vue'
import ListProduct from '@/components/admin/product/list/index.vue'
import CreateProduct from '@/components/admin/product/create/index.vue'
import ConfigProduct from '@/components/admin/product/config/index.vue'
import EditProduct from '@/components/admin/product/edit/index.vue'
import ImageEdit from '@/components/admin/image/edit/ImageEdit.vue'

// @ts-ignore
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignIn
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForGotPassword
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUp
    },
    {
      path: '/admin',
      component: AdminLayout,
      meta: {
        requireAdmin: true
      },
      children: [
        {
          path: 'dashboard',
          component: DashboardView
        },
        {
          path: 'image',
          children: [
            {
              path: 'edit',
              component: ImageEdit
            }
          ]
        },
        {
          path: 'product',
          children: [
            {
              path: 'list',
              component: ListProduct
            },
            {
              path: ':id/edit',
              component: EditProduct
            },
            {
              path: 'config',
              component: ConfigProduct
            },
            {
              path: 'create',
              component: CreateProduct
            }
          ]
        }
      ]
    }
  ]
})
export default router
