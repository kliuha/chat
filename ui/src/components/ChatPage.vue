<script setup>
import { ref } from 'vue'
import { useChatsStore } from '../stores/chats'
import { useUserStore } from '../stores/user'

const emits = defineEmits(['send'])

const chatsStore = useChatsStore()
const userStore = useUserStore()

const messageText = ref('')
const showOverlay = ref(false)

const sendMessage = () => {
    emits('send', messageText.value)
    messageText.value = ''
}
</script>

<template>
    <div class="chat-wrapper">
        <div class="chat-messages">
            <li
                class="message-list"
                :class="{ 'message-right': message?.user.id === userStore.user?.login.username }"
                v-for="message in chatsStore.messages"
                :key="message.id"
            >
                <div class="message-card">
                    <span class="message-username">
                        {{ message?.user.id }}
                    </span>
                    <span>{{ message.text }}</span>
                </div>
            </li>
        </div>
        <div class="chat-control">
            <v-btn
                class="control-button"
                variant="outlined"
                @click="showOverlay = true"
            >
                Chat members
            </v-btn>
            <v-text-field
                label="Write your message"
                variant="outlined"
                hide-details="auto"
                v-model="messageText"
            ></v-text-field>
            <v-btn
                class="control-button"
                variant="outlined"
                @click="sendMessage"
            >
                Send
            </v-btn>
        </div>
        <v-overlay
            v-model="showOverlay"
            contained
            class="align-center justify-center"
        >
            <div
                v-for="member in chatsStore.currentChat.state.members"
                :key="member"
            >
                {{ member.user_id }}
            </div>
            <v-btn
                color="success"
                @click="showOverlay = false"
            >
                Hide List
            </v-btn>
        </v-overlay>
    </div>
</template>

<style scoped>
.chat-wrapper {
    width: 100%;
    height: calc(100vh - 150px);
}

.chat-messages {
    width: 100%;
    height: 90%;
    padding: 10px;
    overflow: auto;
}

.chat-control {
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
}

.control-button {
    height: 100%;
}

.message-list {
    list-style: none;
    height: 30px;
    padding: 10px;
    font-size: 18px;
    display: flex;
    height: 100px;
}

.message-right {
    justify-content: flex-end;
}

.message-card {
    display: flex;
    flex-direction: column;
}

.message-username {
    font-style: italic;
    font-size: 14px;
    text-decoration: underline;
}
</style>
