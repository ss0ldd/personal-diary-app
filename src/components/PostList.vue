<script>
import {ref, watch, onMounted} from 'vue'

export default {
  setup() {
    const notes = ref([]);
    const userName = ref('')
    const inputNoteName = ref('')
    const inputContent = ref('')
    const inputCategory = ref(null)

    watch(userName, (newVal) => {
      localStorage.setItem('name', newVal)
    })

    watch(notes, (newVal) => {
      localStorage.setItem('notes', JSON.stringify(newVal))
    }, {
      deep: true
    })

    const addNote = () => {
      if (inputContent.value.trim() === '' || inputNoteName.value.trim() === '' || inputCategory.value === null) {
        return;
      }

      notes.value.push({
        header: inputNoteName.value,
        content: inputContent.value,
        category: inputCategory.value,
        editable: false,
        created: new Date().getTime()
      });
      inputNoteName.value = '';
      inputContent.value = '';
      inputCategory.value = null;
    };

    const removeNote = (noteToRemove) => {
      notes.value = notes.value.filter(note => note !== noteToRemove)
    }

    onMounted(() => {
      userName.value = localStorage.getItem('name') || ''
      notes.value = JSON.parse(localStorage.getItem('notes')) || [];
    });

    return {
      notes,
      userName,
      inputNoteName,
      inputContent,
      inputCategory,
      addNote,
      removeNote,
    };
  }
};

</script>

<template>
  <section class="greeting">
    <h2 class="title-greeting">
      Hello, <input type="text" id="name" placeholder="Name here" v-model="userName">
    </h2>
  </section>
  <section class="create-note">
    <h3>Create a note</h3>
    <form id="new-note-form" @submit.prevent="addNote">
      <h4>What's on your mind?</h4>
      <input
          type="text"
          name="noteName"
          id="note-name"
          placeholder="enter header"
          v-model="inputNoteName"/>
      <input
          type="text"
          name="content"
          id="content"
          placeholder="today I ..."
          v-model="inputContent"/>
      <h4>Pick a category</h4>
      <div class="options">
        <label>
          <input
              type="radio"
              name="category"
              id="category1"
              value="personal"
              v-model="inputCategory" />
          <span class="bubble personal"></span>
          <div>Personal</div>
        </label>
        <label>
          <input
              type="radio"
              name="category"
              id="category2"
              value="university"
              v-model="inputCategory" />
          <span class="bubble university"></span>
          <div>University</div>
        </label>
      </div>
      <input type="submit" value="Add a note" />
    </form>
  </section>

  <section class="notes-list">
    <h3>Notes list</h3>
    <div class="list" id="notes-list">
      <div v-for="note in notes" class="notes-item">
        <label>
          <span :class="`bubble ${
							note.category == 'university'
								? 'university'
								: 'personal'
						}`"></span>
        </label>

        <div class="note-content">
          <input type="text" v-model="note.header"/>
          <input type="text" v-model="note.content"/>
        </div>

        <div class="actions">
          <button class="delete" @click="removeNote(note)">Delete</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>