<script lang="ts" setup>
const form = ref({email: '', password: ''})
const $axios = inject('$axios')
const router = useRouter()

const loading = ref(false)

const createUser = async () => {
  loading.value = true;
  try{
    await $axios.post(`/users`, { email: form.value.email, password: form.value.password})
    router.push("/users");
  }catch(error: any){
  }finally{
    loading.value = false;
  }
}
</script>

<template>
  <VRow>
    <VCol cols="12">
     <VBtn to="/users">
          Listar Usuários
        </VBtn>
    </VCol>
      <VCol
        cols="12"
        md="12"
      >
        <!-- 👉 Horizontal Form -->
        <VCard :loading="loading" title="Criar Usuário">
          <VCardText>
  <VForm @submit.prevent="() => {}">
    <VRow>

      <VCol cols="12">
        <VRow no-gutters>
          <!-- 👉 Email -->
          <VCol
            cols="12"
            md="3"
          >
            <label for="email">Email</label>
          </VCol>

          <VCol
            cols="12"
            md="9"
          >
            <VTextField
              id="email"
              v-model="form.email"
              placeholder="Email"
              persistent-placeholder
            />
          </VCol>
        </VRow>
      </VCol>

      <VCol cols="12">
        <VRow no-gutters>
          <!-- 👉 Password -->
          <VCol
            cols="12"
            md="3"
          >
            <label for="password">Password</label>
          </VCol>

          <VCol
            cols="12"
            md="9"
          >
            <VTextField
              id="password"
              v-model="form.password"
              type="password"
              placeholder="Password"
              persistent-placeholder
            />
          </VCol>
        </VRow>
      </VCol>

      <!-- 👉 submit and reset button -->
      <VCol
        offset-md="3"
        cols="12"
        md="9"
        class="d-flex gap-4"
      >
        <VBtn :disabled="loading" type="submit" @click="createUser">
          Cadastar
        </VBtn>
        <VBtn
          :disabled="loading"
          color="secondary"
          variant="tonal"
          type="reset"
        >
          Resetar
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
   </VCardText>
        </VCard>
      </VCol>
    </VRow>
</template>
