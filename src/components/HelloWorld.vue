<template>
  <div>
    <input v-model="inputValue" placeholder="请输入内容" />
    <button @click="handleClick">发送</button>
    <div v-if="response">{{ response }}</div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HelloWorld',
  data() {
    return {
      inputValue: '',
      response: ''
    }
  },
  methods: {
    handleClick() {
      axios.get('/api', {
        params: {
          input: this.inputValue
        }
      })
        .then(response => {
          this.response = response.data
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
}
</script>