<script setup>
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
</script>

<template>
    <v-app-bar>
        <img
            class="app-logo"
			src="https://static-00.iconduck.com/assets.00/chat-icon-2048x2048-i7er18st.png"
			alt="App header">
        <v-avatar>
            <v-img
                alt="User"
                :src="userStore.user?.picture?.medium"
            ></v-img>
        </v-avatar>
    </v-app-bar>
</template>

<style scoped>
.app-header {
    position: absolute;
    top: 0;
    left: 0;
    height: 80px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0px 0px 8px 0px #00000014;
    padding: 0 40px;
    box-sizing: border-box;
}

.app-logo {
    height: 50px;
    width: 50px;
}
</style>