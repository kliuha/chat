<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()

onMounted(async() => {
    await userStore.fetchUser()
})
</script>

<template>
    <v-navigation-drawer permanent>
      <v-list>
        <v-list-item title="List of chats"></v-list-item>
        <v-divider></v-divider>
        <v-list-item link title="List Item 1"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      Main Content
    </v-main>
</template>

<style scoped>
</style>