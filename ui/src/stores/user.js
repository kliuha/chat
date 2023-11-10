import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const user = ref()
  const fetchUser = async() => {
    if(!localStorage.getItem('user')) {
      const response = await fetch('https://randomuser.me/api')
      const parsedResponse = await response.json()
      localStorage.setItem('user', JSON.stringify(parsedResponse.results[0]))
      user.value = parsedResponse.results[0]
    } else {
      user.value = JSON.parse(localStorage.getItem('user'))
    }
  }

  return { user, fetchUser }
})
