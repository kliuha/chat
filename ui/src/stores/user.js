import { ref } from 'vue'
import { defineStore } from 'pinia'

import axios from 'axios'

export const useUserStore = defineStore('user', () => {
    const user = ref()
    const fetchUser = async () => {
        if (!localStorage.getItem('user')) {
            const response = await axios.get('https://randomuser.me/api')
            localStorage.setItem('user', JSON.stringify(response.data.results[0]))
            user.value = response.data.results[0]
        } else {
            user.value = JSON.parse(localStorage.getItem('user'))
        }
    }

    return { user, fetchUser }
})
