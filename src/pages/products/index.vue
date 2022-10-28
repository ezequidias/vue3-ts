<script lang="ts" setup>
const $axios = inject('$axios')
const users = ref([])
const loading = ref(false)
const dialog = ref(false)
const dataDel = ref({})

const getProducts = async () => {
  loading.value = true;
  try{
    const res = await $axios.get('/products')
    users.value = res.data
  }catch(error: any){
  }finally{
    loading.value = false;
  }
}

const confirmDel = (user) => {
  dialog.value = true
  dataDel.value = user
}

const productDelete = async () => {
  loading.value = true;
  try{
    const res = await $axios.delete(`/products/${dataDel.value.id}`)
    getProducts()
    dialog.value = false
    dataDel.value = {}
  }catch(error: any){
  }finally{
    loading.value = false;
  }
}

const rejectDel = () => {
  dialog.value = false
  dataDel.value = {}
}

onMounted(async () => {
  await getProducts()
})
</script>

<template>
  <VRow>
    <!-- basic -->
    <VCol cols="12">
     <VBtn to="/products/create">
          Criar Produto
        </VBtn>
    </VCol>
    <VCol cols="12">
      <VCard :loading="loading" title="Todos os Produtos">
        <VTable>
    <thead>
      <tr>
        <th class="text-uppercase">
          ID
        </th>
        <th class="text-uppercase">
          Imagem
        </th>   
        <th class="text-uppercase">
          Categoria
        </th>
        <th class="text-uppercase">
          Nome
        </th>
        <th class="text-uppercase">
          Opções
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, index) in users"
        :key="index"
      >
        <td>{{ item.id }}</td>
        <td>
          <div class="m-2"><img :src="item.image" width="50" height="50" /></div>
        </td>
        <td>
          {{ item.category.name }} ({{ item.category.id }})
        </td>
        <td>
          {{ item.name }}
        </td>
        <td>
        <VBtn :to="`/products/edit/${item.id}`" x-small color="primary" class="mr-2">
          Editar
        </VBtn>
         <VBtn @click="confirmDel(item)" x-small color="error">
          Deletar
        </VBtn>

          
        </td>
      </tr>
    </tbody>
  </VTable>
      </VCard>
    </VCol>
  </VRow>

     <v-dialog v-model="dialog" persistent max-width="390" >
      
      <v-card :loading="loading">
        <v-card-title class="text-h5">
          Voce deseja deletar?
        </v-card-title>
        <v-card-text><b>ID:</b> {{dataDel.id}} <br> <b>Nome:</b> {{dataDel.name}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="rejectDel" >
            Não Deletar
          </v-btn>
          <v-btn color="success" text @click="productDelete" >
            Sim
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
