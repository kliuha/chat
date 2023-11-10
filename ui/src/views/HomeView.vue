<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '../stores/user'
import { useChatsStore } from '../stores/chats'
import ChatPage from '../components/ChatPage.vue'

const userStore = useUserStore()
const chatsStore = useChatsStore()

onMounted(async () => {
    await userStore.fetchUser()
    await chatsStore.creatToken(userStore.user.login.username)
    await chatsStore.initializeStream(userStore.user.login.username)
})

const idGenerator = () => {
    console.log(Object.keys(chatsStore.availableChats).length)
    if (Object.keys(chatsStore.availableChats).length) {
        return Object.keys(chatsStore.availableChats).length + 1
    } else {
        return 1
    }
}

const createNewChat = async () => {
    await chatsStore.initializeChannel(idGenerator(), userStore.user.login.username)
}

const openChat = (chat) => {
    chatsStore.currentChat = chat
    chatsStore.channel.on('message.new', (event) => {
        chatsStore.messages.push({
            text: event.message.text,
            user: event.message.user
        })
    })
}

const onSendMessage = (text) => {
    chatsStore.sendMessage(text)
}
</script>

<template>
    <v-navigation-drawer permanent>
        <v-list>
            <v-list-item title="List of chats"></v-list-item>
            <v-divider></v-divider>
            <v-list-item
                v-for="chat in chatsStore.availableChats"
                :key="chat"
                :title="chat.id"
                @click="openChat(chat)"
            ></v-list-item>
            <v-list-item
                title="Create new chat"
                @click="createNewChat"
            ></v-list-item>
        </v-list>
    </v-navigation-drawer>

    <v-main
        class="d-flex align-center justify-center"
        style="min-height: 300px"
    >
        <span v-if="!chatsStore.currentChat">There is no selected chat, please choose one</span>
        <ChatPage
            v-else
            @send="onSendMessage"
        />
    </v-main>
</template>

<style scoped></style>
