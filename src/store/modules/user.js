import UserService from '@/services/user.service'

const userService = new UserService()

export const namespaced = true

export const state = {
  users: [],
  currentUser: {}
}

export const mutations = {
  SET_CURRENT_USER(state, currentUser) {
    state.currentUser = currentUser
  },

  SET_USERS(state, users){
    state.users = users
  },

  CREATE_USER(state, user) {
    state.users.push(user)
  },

  UPDATE_USER(state, updateuser){
    state.users.map(obj => obj.id === updateuser.id && Object.assign(obj, updateuser))
  }
}

export const actions = {
  fetchCurrentUser({ commit }) {
    const user = 'me'
    userService.fetchCurrentUser(user)
      .then(response => {
        commit('SET_CURRENT_USER', response.data.data)
      }) 
      .catch(error => {
        throw error
      })
  },

  fetchAllUsers({ commit }) {
    userService.fetch('')
      .then(response => {
        commit('SET_USERS', response.data.data)
      })
      .catch(error => {
        throw error
      })
  },

  updateUser({commit} , payload){

    const {id, firstName, lastName, email, phone, role} = payload

    userService.update(id , {firstName, lastName, email, phone, role})
      .then(response => { if(response.status === 200){
        commit('UPDATE_USER', payload)
        }
      })
  }
}

export const getters = {
  allUsers: state => state.users,
  currentUser: state => state.currentUser
}
