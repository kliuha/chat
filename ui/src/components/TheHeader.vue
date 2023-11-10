<script setup>
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
</script>

<template>
    <v-app-bar class="app-header">
        <img
            class="app-logo"
            src="https://static-00.iconduck.com/assets.00/chat-icon-2048x2048-i7er18st.png"
            alt="App header"
        />
        <v-spacer></v-spacer>
        <div class="user-preview">
            <strong v-html="userStore.user?.name.first"></strong>
            <strong v-html="userStore.user?.name.last"></strong>
            <v-avatar>
                <v-img
                    alt="User"
                    :src="userStore.user?.picture?.medium"
                ></v-img>
            </v-avatar>
        </div>
    </v-app-bar>
</template>

<style scoped>
.app-header {
    padding: 0 40px;
}

.app-logo {
    height: 50px;
    width: 50px;
}

.user-preview {
    display: flex;
    gap: 4px;
    align-items: center;
}
</style>
