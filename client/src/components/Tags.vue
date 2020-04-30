<template>
  <div class="tags">
    <h1 class="tags__title">Etiquetas</h1>
    <input v-on:keyup.enter="addTag" v-model="text" class="tags__input" placeholder="Anadir etiqueta"/>
    <div class="tags__content">
      <!-- Replace for another component if you have time -->
      <div v-for="(tag, index) in tags"
        v-bind:item="tag"
        v-bind:index="index"
        v-bind:key="tag._id"
        class="tag__element">
        <div class="tag__info">
          <div v-bind:style="{ backgroundColor: tag.color }"
          class="tag__circle"></div>
          <p class="tag__name">{{tag.text}}</p>
        </div>
        <div class="tag__btns">
          <button v-on:click="changeTagUpdatingId(tag._id)" class="tag__btn">Editar</button>
          <button v-on:click="deleteTag(tag._id)" class="tag__btn">Borrar</button>
        </div>
      </div>
    </div>
    <div class="modal" v-show="showLoadingModal">
      <div class="modal__content">
        <div class="spinner__loading"></div>
        <br>Cargando...
      </div>
    </div>  
    <div class="modal" v-show="showUpdateTextModal">
      <div class="modal__content">
        <input v-model="textUpdated" class="tags__input--modal tags__input" placeholder="Anadir nuevo texto"/>
        <button v-on:click="updateTag" class="tag__btn tag__btn--modal">Editar</button>
        <button v-on:click="closeUpdateModal" class="tag__btn tag__btn--modal">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
import TagsService from '../TagsService';
export default {
  name: 'Tags',
  data() {
    return {
      tags: [],
      error: '',
      text: '',
      textUpdated: '',
      showLoadingModal: false,
      showUpdateTextModal: false,
      tagUpdatindId: ''
    }
  },
  async created() {
    try {
      this.tags = await TagsService.getTags();
    } catch(err) {
      this.err = err.message;
    }
  },
  methods: {
    async addTag() {
      if(this.text.trim().length) {
        this.showLoadingModal = true;
        let newText = this.text;
        this.text = '';
        await TagsService.insertTag(newText, this.generateRandomColor())
        this.tags = await TagsService.getTags();
        this.showLoadingModal = false;
      }
    },
    async deleteTag(id) {
      this.showLoadingModal = true;
      await TagsService.deleteTag(id);
      this.tags = await TagsService.getTags();
      this.showLoadingModal = false;
    },
    async updateTag() {
      this.showUpdateTextModal = false;
      this.showLoadingModal = true;
      await TagsService.updateTag(this.tagUpdatindId, this.textUpdated);
      this.tags = await TagsService.getTags();
      this.showLoadingModal = false;
    },
    changeTagUpdatingId(id) {
      this.showUpdateTextModal = true;
      this.tagUpdatindId = id;
    },
    closeUpdateModal() {
      this.textUpdated = '';
      this.showUpdateTextModal = false;
    },
    generateRandomColor() {
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += '0123456789ABCDEF'[Math.floor(Math.random() * 16)];
      }
      return color;
    }
  }
}
</script>

<style scoped>
.tags {
  margin: auto;
  max-width: 992px;
  width: 95%;
}
.tags__title {
  width: calc(100% - 15px);
  font-size: 16px;
  font-weight: normal;
  color: #333;
  padding-left: 15px;
  padding-bottom: 25px;
  border-bottom: 1px solid #ddd;
}
.tags__input {
  color: #878896;
  appearance: none;
  -webkit-appearance: none;
  border: none;
  width: 100%;
  font-size: 20px;
  padding: 15px;
  margin: 10px 0;
}
.tags__input:focus {
  outline: none;
}
.tags__content {
  border-bottom: 2px solid #878896;
  padding: 20px 0;
}
.tag__element {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
}
.tag__element:hover {
  background: #f3f7ff;
}
.tag__info {
  display: flex;
  justify-content: center;
  align-items: center;
}
.tag__circle {
  border-radius: 100%;
  height: 8px;
  width: 8px;
  background: #ddd;
}
.tag__name {
  margin-left: 10px;
  color: #333;
}
.tag__btn {
  height: 50px;
  cursor: pointer;
  border: none;
  background: none;
  color: #a09c9c;
  padding: 0 10px;
  margin-left: 10px;
}
.tag__btn:focus {
  outline: none;
}
.tags__input--modal {
  height: 16px;
}
.tag__btn--modal, .tags__input--modal {
  max-width: 200px;
  border: 2px solid #d8d8d8;
  margin-left: 0;
  background-color: #fff;
}
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(200, 245, 255, 0.6);
}
.modal__content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: #09d;
}
.spinner__loading {
  width: 1rem;
  height: 1rem;
  border-top-color: #09d;
  border-left-color: #09d;
  animation: spinner 1s linear infinite;
  border-bottom-color: transparent;
  border-right-color: transparent;
  border-style: solid;
  border-width: 2px;
  border-radius: 50%;  
  box-sizing: border-box;
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
  margin-top: 14px;
}

@keyframes spinner {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
