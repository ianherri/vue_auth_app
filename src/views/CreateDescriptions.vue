<template>
  <div class="loading" v-if="loading">loading</div>

  <div v-else>
    <div v-if="loggedIn" class="content-container">
      <div class="content-wrapper">
        <h3>Hello, {{ user.name }} enter the product name and style below</h3>
      </div>

      <div class="create-description-wrapper">
        <form>
          <div class="product-name-wrapper">
            <label>Product Name:</label>
            <input
              v-model="productTitle"
              class="message-input"
              type="text"
              placeholder="add product title..."
            />
          </div>
          <div class="style-select-wrapper">
            <label>Add keywords: </label>
            <form>
              <input
                v-model="keyWord"
                class="message-input"
                type="text"
                placeholder="add keywords..."
              />
              <button @click.prevent="handleAddKeyWord(keyWord)">add</button>
            </form>
            <div v-for="word in productKeyWords" :key="word.id">
              {{ word }}
              <button @click.prevent="handleRemoveKeyWord(word)">remove</button>
            </div>
          </div>
          <button @click.prevent="handleCreateDescription" class="btn">
            Create Descriptions
          </button>
        </form>
      </div>
      <h3>Prompt input:</h3>
      <div class="description-output" v-if="firstClick">
        Write a product description for a {{ productTitle }}using the words:
        {{ productKeyWords.join(', ') }}
      </div>
      <h3>GPT-3 output:</h3>
      <div class="description-output" v-if="firstClick">
        <h4>{{ productTitle }}</h4>

        {{ description }}
      </div>
    </div>
    <div v-if="!loggedIn" class="content-container">
      <LoginRedirect />
    </div>
  </div>
</template>

<script setup>
import useAuth from '../composables/auth'
import useState from '@/composables/state'
import LoginRedirect from '@/components/LoginRedirect.vue'
import { ref } from 'vue'
const { loggedIn, user, loading } = useAuth()
const { createDescription } = useState()
const description = ref('')
const productTitle = ref('')
const productKeyWords = ref([])
const firstClick = ref(false)

async function handleCreateDescription() {
  const res = await createDescription({
    seedWords: productKeyWords.value.join(', '),
    title: productTitle.value,
  })
  description.value = res.data.choices[0].text
  firstClick.value = true
}

function handleAddKeyWord(keyWord) {
  productKeyWords.value.push(keyWord)
  console.log(productKeyWords.value)
}

function handleRemoveKeyWord(selected) {
  productKeyWords.value.filter((word) => {
    word === selected
  })
}
</script>

<style>
.create-description-wrapper {
  border-radius: 8px;
  display: flex;
  width: 350px;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  gap: 15px;
  background: #ffffff;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  transition: all 1000ms;
}
.product-name-wrapper {
  display: block;
}
.style-select-wrapper {
  display: block;
}
.description-output {
  border-radius: 8px;
  display: flex;
  width: 350px;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  gap: 15px;
  background: #ffffff;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  transition: all 1000ms;
}
.message-input {
  resize: none;
  display: flex;
  align-self: right;
  min-width: auto;
  border: 1px solid #d2d2d2;
  border-radius: 4px;
  padding: 2px;
  box-sizing: border-box;
}
</style>
