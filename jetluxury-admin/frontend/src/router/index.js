import Vue from 'vue'
import Router from 'vue-router'
import { store } from '../store'
import SignIn from 'components/sign/SignIn'
import SignUp from 'components/sign/SignUp'

import Main from 'components/Main'

// Home
import Home from 'components/menu/Home'

// Setting
import BasicSetting from 'components/menu/setting/BasicSetting'
import OperatorControl from 'components/menu/setting/OperatorControl'
import SecurityControl from 'components/menu/setting/SecurityControl'

// Product
import Product from 'components/menu/product/Product'
import ProductControl from 'components/menu/product/ProductControl'
import SearchControl from 'components/menu/product/SearchControl'

// Order & delivery
import Order from 'components/menu/order/Order'
import IntegratedOrder from 'components/menu/order/IntegratedOrder' // 주문통합
import IntegratedDelivery from 'components/menu/order/IntegratedDelivery' // 배송통합

// Member
import Member from 'components/menu/member/Member'
import MemberList from 'components/menu/member/MemberList' // 회원리스트
import MemberSecession from 'components/menu/member/MemberSecession' // 휴면회원관리
import MemberDormancy from 'components/menu/member/MemberDormancy' // 회원탈퇴/삭제

// board
import Board from 'components/menu/board/Board'
import FaqCategory from 'components/menu/board/FaqCategory'
import FaqList from 'components/menu/board/FaqList'
import QnA from 'components/menu/board/QnA'
import Cs from 'components/menu/board/Cs'

// Banner
import Banner from 'components/menu/banner/Banner'
import BrandBanner from 'components/menu/banner/BrandBanner'
import EventBanner from 'components/menu/banner/EventBanner'

// Sns
import Sns from 'components/menu/sns/Sns'
import SnsSetup from 'components/menu/sns/SnsSetup'

Vue.use(Router)

/*eslint-disable*/
// Handling Unauthorized Access Cases

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: {
        name: 'signin'
      }
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn
      // meta: {
      //   requiresAuth: true, adminAuth: true, employeeAuth: true, partimeAuth: true, internAuth: true
      // }
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/main',
      name: 'main',
      component: Main,
      meta: {
        requiresAuth: true, adminAuth: true, employeeAuth: true, partimeAuth: true, internAuth: true
      },
      children: [
        {
          path: 'home',
          name: 'Home',
          component: Home,
          meta: {
            requiresAuth: true, adminAuth: true, employeeAuth: true, partimeAuth: true, internAuth: true
          }
        },
        {
          path: 'setting',
          name: 'BasicSetting',
          component: BasicSetting,
          meta: {
            requiresAuth: true, adminAuth: true, employeeAuth: false, partimeAuth: false, internAuth: false
          },
          children: [
            {
              path: 'operatorcontrol',
              name: 'OperatorControl',
              component: OperatorControl,meta: {
              requiresAuth: true, adminAuth: true, employeeAuth: false, partimeAuth: false, internAuth: false
            }
            },
            {
              path: 'securitycontrol',
              name: 'SecurityControl',
              component: SecurityControl,
              meta: {
                requiresAuth: true, adminAuth: true, employeeAuth: false, partimeAuth: false, internAuth: false
              }
            }
          ]
        },
        {
          path: 'product',
          name: 'Product',
          component: Product,
          meta: {
            requiresAuth: true, adminAuth: true, employeeAuth: true, partimeAuth: false, internAuth: false
          },
          children: [
            {
              path: 'productcontrol',
              name: 'ProductControl',
              component: ProductControl,
              meta: {
                requiresAuth: true, adminAuth: true, employeeAuth: true, partimeAuth: false, internAuth: false
              }
            },
            {
              path: 'searchcontrol',
              name: 'SearchControl',
              component: SearchControl,
              meta: {
                requiresAuth: true, adminAuth: true, employeeAuth: true, partimeAuth: false, internAuth: false
              }
            }
          ]
        },
        {
          path: 'order',
          name: 'order',
          component: Order,
          meta: {
            requiresAuth: true, adminAuth: true, employeeAuth: true, partimeAuth: true, internAuth: true
          },
          children: [
            {
              path: 'integratedorder',
              name: 'IntegratedOrder',
              component: IntegratedOrder,
              meta: {
                requiresAuth: true, adminAuth: true, employeeAuth: true, partimeAuth: true, internAuth: true
              }
            },
            {
              path: 'integrateddelivery',
              name: 'IntegratedDelivery',
              component: IntegratedDelivery,
              meta: {
                requiresAuth: true, adminAuth: true, employeeAuth: true, partimeAuth: true, internAuth: true
              }
            }
          ]
        },
        {
          path: 'member',
          name: 'Member',
          component: Member,
          meta: {
            requiresAuth: true, adminAuth: true, employeeAuth: true, partimeAuth: false, internAuth: false
          },
          children: [
            {
              path: 'memberlist',
              name: 'MemberList',
              component: MemberList,
              meta: {
                requiresAuth: true, adminAuth: true, employeeAuth: true, partimeAuth: false, internAuth: false
              }
            },
            {
              path: 'membersecession',
              name: 'MemberSecession',
              component: MemberSecession,
              meta: {
                requiresAuth: true, adminAuth: true, employeeAuth: true, partimeAuth: false, internAuth: false
              }
            },
            {
              path: 'memberdormancy',
              name: 'MemberDormancy',
              component: MemberDormancy,
              meta: {
                requiresAuth: true, adminAuth: true, employeeAuth: true, partimeAuth: false, internAuth: false
              }
            }
          ]
        },
        {
          path: 'board',
          name: 'Board',
          component: Board,
          meta: {
            requiresAuth: true, adminAuth: true, employeeAuth: true, partimeAuth: true, internAuth: false
           },
          children: [
            {
              path: 'faqcategory',
              name: 'FaqCategory',
              component: FaqCategory,
              meta: {
                requiresAuth: true, adminAuth: true, employeeAuth: true, partimeAuth: true, internAuth: false
              }
            },
            {
              path: 'faqlist',
              name: 'FaqList',
              component: FaqList,
              meta: {
                requiresAuth: true, adminAuth: true, employeeAuth: true, partimeAuth: true, internAuth: false
              }
            },
            {
              path: 'qna',
              name: 'QnA',
              component: QnA,
              meta: {
                requiresAuth: true, adminAuth: true, employeeAuth: true, partimeAuth: true, internAuth: false
              }
            },
            {
              path: 'cs',
              name: 'Cs',
              component: Cs,
              meta: {
                requiresAuth: true, adminAuth: true, employeeAuth: true, partimeAuth: true, internAuth: false
              }
            }
          ]
        },
        {
          path: 'banner',
          name: 'Banner',
          component: Banner,
          meta: {
            requiresAuth: true, adminAuth: true, employeeAuth: true, partimeAuth: true, internAuth: true
          },
          children: [
            {
              path: 'brandbanner',
              name: 'BrandBanner',
              component: BrandBanner,
              meta: {
                requiresAuth: true, adminAuth: true, employeeAuth: true, partimeAuth: true, internAuth: true
              }
            },
            {
              path: 'eventbanner',
              name: 'EventBanner',
              component: EventBanner,
              meta: {
                requiresAuth: true, adminAuth: true, employeeAuth: true, partimeAuth: true, internAuth: true
              }
            }
          ]
        },
        {
          path: 'sns',
          name: 'Sns',
          component: Sns,
          meta: {
            requiresAuth: true,adminAuth: true, employeeAuth: true, partimeAuth: true, internAuth: true
          },
          children: [
            {
              path: 'snssetup',
              name: 'SnsSetup',
              component: SnsSetup,
              meta: {
                requiresAuth: true,adminAuth: true, employeeAuth: true, partimeAuth: true, internAuth: true
              }
            }
          ]
        }
      ]
    }
  ]
})
/*eslint-disable*/
router.beforeEach((to, from, next) => {
  const operator= store.state.user
  if(to.matched.some(record => record.meta.requiresAuth)) {
  if (store.getters.isLoggedIn) {// using the token
    if(to.meta.adminAuth && operator.role === 'admin') {
      next()
      return
    }else if((to.meta.employeeAuth) && (operator.role === 'employee')) {
      next()
      return
    }
    else if(to.meta.partimeAuth && operator.role == 'partime') {
      next()
      return
    } else if(to.meta.internAuth && operator.role == 'intern') {
      next()
      return
    }
    else {
      next('/signin')
    }
  }
  next('/signin')
} else {
  next()
}
})

export default router
