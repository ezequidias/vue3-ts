<script setup lang="ts">
import { useAuthStore } from '@/stores';
import { useRouter } from 'vue-router';
const router = useRouter()
const authStore = useAuthStore();

const handleLogout = async () => {
  await authStore.logout()
  router.push("/login");
}

onBeforeMount(async () => {
  handleLogout()
})
</script>
<template>
</template>

