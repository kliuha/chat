import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { StreamChat } from 'stream-chat'

export const useChatsStore = defineStore('chats', () => {
    const availableChats = ref([])
    const currentChat = ref()
    const token = ref()
    const channel = ref()
    const client = ref()
    const messages = ref([])

    const fetchChats = async () => {
        try {
            /*empty */
        } catch {
            /*empty */
        }
    }

    const initializeStream = async (username) => {
        client.value = new StreamChat(import.meta.env.VITE_APP_API_KEY)

        await client.value.connectUser({ id: username }, token.value)
        availableChats.value = client.value.activeChannels
    }

    const initializeChannel = async (number, id) => {
        channel.value = client.value.channel('messaging', `vue-chat-${number}`, {
            name: `Vue Chat number ${number}`
        })
        console.log(channel.value)
        await channel.value.create()
        if (!channel.value.state.members[id]) {
            await addMember(id, `vue-chat-${number}`)
        }
        availableChats.value = client.value.activeChannels
        messages.value = (await channel.value.watch()).messages
    }

    const addMember = async (id, channelName) => {
        await axios.post(`${import.meta.env.VITE_APP_SERVER_API_ENDPOINT}/add-member`, {
            id: id,
            channelName: channelName
        })
    }

    const creatToken = async (username) => {
        const { data } = await axios.post(`${import.meta.env.VITE_APP_SERVER_API_ENDPOINT}/join`, {
            username: username,
            user_ID: username
        })
        token.value = data.token
    }

    const sendMessage = async (newMessage) => {
        await currentChat.value.sendMessage({
            text: newMessage
        })
    }

    return {
        availableChats,
        currentChat,
        messages,
        client,
        channel,
        fetchChats,
        initializeStream,
        initializeChannel,
        creatToken,
        sendMessage
    }
})
