<script lang="ts" setup>
import avatar1 from '@/assets/images/avatars/avatar-1.png'
import { useRoute } from 'vue-router';
const $axios = inject('$axios')
const route = useRoute()
const router = useRouter()
const loading = ref(false)

const formData = {
  image: avatar1,
  name: '',
}
const dataLocal = ref(structuredClone(formData))
const refInputEl = ref<HTMLElement>()
// changeAvatar function
const changeAvatar = (file: Event) => {
  const fileReader = new FileReader()
  const { files } = file.target as HTMLInputElement
  if (files && files.length) {
    fileReader.readAsDataURL(files[0])
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string')
        dataLocal.value.image = fileReader.result
    }
  }
}
const resetAvatar = () => {
  dataLocal.value.image = formData.image
}


const getCategory = async () => {
  loading.value = true;
  try{
    const res = await $axios.get(`/categories/${route.params.id}`)
    dataLocal.value = res.data
  }catch(error: any){
  }finally{
    loading.value = false;
  }
}

const editCategory = async () => {
  loading.value = true;
  try{
    await $axios.put(`/categories/${route.params.id}`, { name: dataLocal.value.name, image: dataLocal.value.image})
    router.push("/categories");
  }catch(error: any){
  }finally{
    loading.value = false;
  }
}


onBeforeMount(async () => {
  await getCategory()
})
</script>

<template>
  <VRow>
    <VCol cols="12">
     <VBtn to="/categories">
          Listar Categorias
        </VBtn>
    </VCol>
      <VCol
        cols="12"
        md="12"
      >
        <!-- 👉 Horizontal Form -->
        <VCard :loading="loading" title="Editar Categoria">
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
            <label for="image">Imagem</label>
          </VCol>

          <VCol
            cols="12"
            md="9"
          >
           <VCardText class="d-flex">
            <VAvatar
            rounded="lg"
            size="100"
            class="me-6"
            :image="dataLocal.image"
          />

          <!-- 👉 Upload Photo -->
          <form
            ref="refForm"
            class="d-flex flex-column justify-center gap-5"
          >
            <div class="d-flex flex-wrap gap-2">
              <VBtn
                color="primary"
                @click="refInputEl?.click()"
              >
                <VIcon
                  icon="mdi-cloud-upload-outline"
                  class="d-sm-none"
                />
                <span class="d-none d-sm-block">Upload new photo</span>
              </VBtn>
              <input
                ref="refInputEl"
                type="file"
                name="file"
                accept=".jpeg,.png,.jpg,GIF"
                hidden
                @input="changeAvatar"
              >
              <VBtn
                type="reset"
                color="error"
                variant="tonal"
                @click="resetAvatar"
              >
                <span class="d-none d-sm-block">Reset</span>
                <VIcon
                  icon="mdi-refresh"
                  class="d-sm-none"
                />
              </VBtn>
            </div>
            <p class="text-body-1 mb-0">
              Allowed JPG, GIF or PNG. Max size of 800K
            </p>
          </form>
           </VCardText>

          </VCol>
        </VRow>
      </VCol>


       <VCol cols="12">
        <VRow no-gutters>

          <!-- 👉 Email -->
          <VCol
            cols="12"
            md="3"
          >
            <label for="email">Nome</label>
          </VCol>

          <VCol
            cols="12"
            md="9"
          >
            <VTextField
              id="name"
              v-model="dataLocal.name"
              placeholder="Nome"
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
        <VBtn :disabled="loading" @click="editCategory">
          Editar
        </VBtn>
        <VBtn
          color="secondary"
                :disabled="loading"
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
