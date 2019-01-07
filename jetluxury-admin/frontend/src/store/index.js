
import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import axios from 'axios'
import VuexPersist from 'vuex-persist'

// import request from 'request'
/*eslint-disable*/
Vue.use(Vuex)
const vuexLocalStorage = new VuexPersist({
    storage: window.localStorage, // or window.sessionStorage or localForage instance.
    // Function that passes the state and returns the state with only the objects you want to store.
    reducer: state => ({
    user: state.user,
    checked: state.checked,
    token: state.token
  })
})
export const store = new Vuex.Store({
  state: {
    // states for authentication
    user: null,
    error: null,
    loading: false,
    token: localStorage.getItem('token') || '',
    success: null,
    checked: false,
    status: '',
    // variables for admin operations
    adminList: null,// fetch all the admin data
    searchMatch: 0, // store the matched values based on the search condition
    total_rows: 0,// store total number of database table rows
    col_name:null,
    confirmPopup: null,
    // variables for member operations
      memberList: [],
      pointList: null,
      orderCount: null,
      orderSum: null,
      memb_level: null,
       // ==================================================
       // data state for Integrated OrderList
       // ==================================================

       total_result:0,
       result:[], // variable for holding the whole data returned form DB
       data:[],  // variable for sliced data for pagination
      //----------------------------
      //-- variable for pagination ----
       pagination_no :0, // total pages
       perPage:20, // list per page or per pagination
       start:1, // for  numbering
       active:0 // for pagination and numbering
      //-- End ----
      //----------------------------


  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setToken (state, payload) {
      state.token = payload
    },
    setSuccess (state, payload) {
      state.success = payload
    },
    setRememberMe (state, payload) {
      state.checked = payload
    },
    auth_success(state){
      state.status = 'success'
    },
    logout(state){
      state.status = ''
      state.token = ''
    },
    //============================================
    // operator control
    //============================================

    setAdmin(state, payload) {
      state.adminList = payload
    },
    setMatch(state, payload) {
      state.searchMatch = payload
    } ,
    setTotalRows(state, payload) {
      state.total_rows = payload
    } ,
    setCol(state, payload) {
      state.col_name= payload
    } ,
    setPopup(state, payload) {
      state.confirmPopup= payload
    },           //member
    //=====================================
    setMember(state, payload) {
      state.memberList= payload
    },
    setPoint(state, payload) {
      state.pointList= payload
    },
    setOrderSum(state, payload) {
      state.orderSum= payload
    },
    setOrderCount(state, payload) {
      state.orderCount= payload
    },
    setMemberLevel(state, payload) {
      state.memb_level= payload
    },
    //=============================================
      // Integrated OrderList
      //=============================================

      setTotalOrderResult(state,payload){
         state.total_rows = payload.total_rows;
         state.total_result = payload.total_result;
      },
      setPaginationNumber(state,payload){
        state.pagination_no = payload.pagination_no;
        state.total_rows =payload.total_rows;
        state.available = payload.available;
      },
      setPerPageSize(state,payload){
        state.perPage = payload.perPage;
      },
      // set data
      setData(state,payload){
          state.result = payload.data;
          if(payload.data) {
            state.data = payload.data.slice(payload.start, payload.end);
            state.active = payload.active;
            state.total_result = state.data.length;
          }
      },

      },

  actions: {
    userSignIn ({commit}, payload) {
      commit('setLoading', true)
      const url  = '/back';
      axios.post(`${url}/admin/login`,{
          admin_id: payload.email,
          admin_pw: payload.password
      })
        .then(result=>{
      if(result.data.admin.data) {
        const operator=result.data.admin.data.admin_id
        const token = result.data.token
        const role= result.data.role
        commit('setToken', token)
        commit('auth_success')
        axios.defaults.headers.common['Authorization'] = token
        commit('setUser', {email: operator,token: token,role: role })
        commit('setLoading', false)
        router.push({path: '/main/home'})
      } else {
        commit('setError', result.data.msg)
        commit('setLoading', false)
        router.push({path: '/signin'})
      }
    }).catch(err => {
        commit('setError', err.message) })
      localStorage.removeItem('token')
      router.push({path: '/signin'})
    },
    rememberMe ({commit}, payload) {
      commit('setRememberMe', payload.checked)
    },
    logout({commit}){
      return new Promise((resolve, reject) => {
        commit('logout')
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
      resolve()
    })
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {email: payload.email})
    },
    //==================================
    // admin setting methods
    ///=================================
    getAdmin ({commit}, payload) {
      const url  = '/back';
      axios.get(`${url}/admin/list`,{
        params: {
          col_name: payload.col_name,
          keyword: payload.keyword
        }
      })
        .then(result=>{
        if(result.status==200) {
        commit('setAdmin',result.data.admin.admin);
        commit('setTotalRows',result.data.admin.total_rows);
        commit('setMatch',result.data.available);
        router.push({path: '/main/setting/operatorcontrol'})
      } else {
        commit('setError', result)
      }
    })
    },
    setColName ({commit}, payload) {
      commit('setCol', payload.colName)
    },
    setPopupConfirm ({commit}, payload) {
      commit('setPopup', payload.confirm)
    },
    // removeAdmin({commit}, payload) {
    //   const url  = '/back';
    //   axios.put(`${url}/admin/remove`,{
    //     admin_id: payload.admin_id
    //   }).then(result=>{
    //   if(result.status==200) {
    //     commit('setSuccess', result.data.msg)
    //     //router.push({path: '/main/setting/operatorcontrol'})
    //   } else {
    //     commit('setError', result.data.msg)
    //     //router.push({path: '/main/setting/operatorcontrol'})
    //   }
    // }).catch(err => {
    //   commit('setError', err.message)
    //   router.push({path: '/main/setting/operatorcontrol'})
    // })
    // },
    saveRole({commit}, payload) { // save the access right for the operators
      const url  = '/back';
      axios.put(`${url}/admin/role`,{
        role: payload.role,
        admin_id: payload.admin_id
      }).then(result=>{
      if(result.status==200) {
        commit('setSuccess', result.data.msg)
        //router.push({path: '/main/setting/operatorcontrol'})
      } else {
        commit('setError', result.data.msg)
       // router.push({path: '/main/setting/operatorcontrol'})
      }
    }).catch(err => {
      commit('setError', err.message)
      router.push({path: '/main/setting/operatorcontrol'})
    })
    },
/*
    editAdmin({commit}, payload) { //contact doesn't exist in the database table
      const url  = '/back';
      axios.put(`${url}/admin/edit`,{
        admin_id: payload.admin_id,
        admin_status: payload.admin_status,
        admin_contact: payload.contact
      }).then(result=>{
        if(result.status==200) {
        commit('setSuccess', result.data.msg)
        router.push({path: '/main/setting/operatorcontrol'})
      } else {
        commit('setError', result.data.msg)
        router.push({path: '/main/setting/operatorcontrol'})
      }
    }).catch(err => {
        commit('setError', err.message)
      router.push({path: '/main/setting/operatorcontrol'})
    })
    },
*/
    createAdmin({commit}, payload) {
      const url  = '/back';
      axios.post(`${url}/admin/create`,{
        admin_id: payload.admin_id,
        admin_name: payload.admin_name,
        admin_pw: payload.admin_pw,
        admin_contact: payload.admin_contact,
        admin_status: payload.admin_status
      }).then(result=>{
        if(result.status==200) {
        commit('setSuccess', result.data)
        router.push({path: '/main/setting/operatorcontrol'})
      } else {
        commit('setError', result.data)
        router.push({path: '/main/setting/operatorcontrol'})
      }
    }).catch(err => {
        commit('setError', err.message)
      router.push({path: '/main/setting/operatorcontrol'})
    })
    },
    //==================================
    //  actions for member
    ///=================================
    getMember ({commit}, payload) {
      const url  = '/back';
      axios.get(`${url}/member/list`,{
        params: {
          date_term: payload.date_term,
          date_range: payload.date_range,
          keyword: payload.keyword,
          memb_status: payload.memb_status
        }
      })
        .then(result=>{
        if(result.status==200) {
        commit('setMember',result.data.member.member)
        commit('setTotalRows',result.data.member.total_rows)
        commit('setMatch',result.data.available)
        //router.push({path: '/main/member/memberlist'})
      } else {
        commit('setError', result)
      }
    }).catch(err => {
        commit('setError', err.message)
     // router.push({path: '/main/member/memberlist'})
    })
    },
    getPoint ({commit}) {
      const url  = '/back';
      axios.get(`${url}/member/point`)
        .then(result=>{
      if(result.status==200) {
        commit('setPoint',result.data.point)
        //router.push({path: '/main/member/memberlist'})
      } else {
        commit('setError', result)
      }
    }).catch(err => {
        commit('setError', err.message)
      //router.push({path: '/main/member/memberlist'})
    })
    },
    removeMember({commit}, payload) {
      const url  = '/back';
      axios.put(`${url}/member/remove`,{
        memb_id: payload.memb_id
      }).then(result=>{
        if(result.status==200) {
        commit('setSuccess', result.data.msg)
        //router.push({path: '/main/member/memberlist'})
      } else {
        commit('setError', result.data.msg)
        //router.push({path: '/main/member/memberlist'})
      }
    }).catch(err => {
        commit('setError', err.message)
      //router.push({path: '/main/member/memberlist'})
    })
    },
    editMember({commit}, payload) { //contact doesn't exist in the database table
      const url  = '/back';
      axios.put(`${url}/member/edit`,{
        memb_id: payload.memb_id,
        memb_status: payload.memb_status
      }).then(result=>{
        if(result.status==200) {
        commit('setSuccess', result.data.msg)
        //router.push({path: '/main/member/memberlist'})
      } else {
        commit('setError', result.data.msg)
        //router.push({path: '/main/setting/operatorcontrol'})
      }
    }).catch(err => {
        commit('setError', err.message)
     // router.push({path: '/main/setting/operatorcontrol'})
    })
    },
    getOrderSum ({commit}) {
      const url  = '/back';
      axios.get(`${url}/member/ordersum`)
        .then(result=>{
      if(result.status==200) {
        commit('setOrderSum',result.data.sum)
        //router.push({path: '/main/member/memberlist'})
      } else {
        commit('setError', result)
      }
    }).catch(err => {
        commit('setError', err.message)
      //router.push({path: '/main/member/memberlist'})
    })
    },
    getOrderCount ({commit}) {
      const url  = '/back';
      axios.get(`${url}/member/ordercount`)
        .then(result=>{
      if(result.status==200) {
        commit('setOrderCount',result.data.count)
       // router.push({path: '/main/member/memberlist'})
      } else {
        commit('setError', result)
      }
    }).catch(err => {
        commit('setError', err.message)
      //router.push({path: '/main/member/memberlist'})
    })
    },
    setMembLevel ({commit}, payload) {
      commit('setMemberLevel', payload.memb_level)
    },

    // userSignOut ({commit}) {
    //   firebase.auth().signOut()
    //   commit('setUser', null)
    //   router.push('/')
    // }

   //==============================================
   // actions for integrated order
   //==============================================
      updateOrderState({commit},payload){
          commit('setParameters', payload);
      },
      updateTotalResult({commit},payload){
          commit('setTotalOrderResult',payload)
      },
      updatePagination({commit},payload){ // perPage sixe
      commit('setPaginationNumber',payload);
      },
      paginate({commit},payload){ // for pagination
              commit('setData',payload);
      },

  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status
  },
  plugins: [vuexLocalStorage.plugin]

})
