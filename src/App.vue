<template>
  <div class="flex justify-center w-full">
    <div class=" flex flex-col w-3/4">
      <div class="flex justify-between items-center mt-[2rem]">
        <div class="flex">
          <h1 class="text-5xl font-bold">Note</h1>
        </div>
        <svg @click="isEditingModalOpen = true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               stroke-width="1.5" stroke="currentColor" class="w-10 h-10 cursor-pointer">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>

      </div>
      <div class="flex justify-start items-center flex-wrap gap-4  mt-4">
        <TransitionGroup name="fade">
        <Note @removed="removeNote" @edit="enterEditMode" v-for="(note, index) in notes" :index="index" :note="note"></Note>
        </TransitionGroup>
      </div>
    </div>
  </div>
  <Model v-if="isEditingModalOpen" @close="handleModalClose" :isOpen="isEditingModalOpen">
    <h3 class="font-bold text-2">Note Editor</h3>
    <NoteEditor @add="addNote" :note="editingNote" @edit="editNote"></NoteEditor>
    <template #action>
      <span></span>
    </template>
  </Model>
</template>

<script setup>
import { ref, computed } from 'vue';
import Note from './components/Note.vue'
import NoteEditor from './components/NoteEditor.vue'
import Model from "./components/Model.vue";
import NoteEditorModal from './components/NoteEditorModal.vue'
const notes = ref([
  {
    title: 'note Title',
    text: "NOte text body"
  },
  {
    title: 'Learn Ai',
    text: "NOte text body"
  },
  {
    title: 'note Title',
    text: "NOte text body"
  },
  {
    title: 'Learn Ai',
    text: "NOte text body"
  },
]);
const editingNote = ref();
const isEditingModalOpen = ref(false)



// remove specifice object (Note)
const removeNote = (note) => {
  const index = notes.value.indexOf(note);
  const confirmed = confirm(`are you sure to delte ${note.title}`);
  if (!confirmed) {
    return;
  }
  notes.value.splice(index, 1);
}

const addNote = (note)=>{
  notes.value.push(note);
  isEditingModalOpen.value = false;
}

const editNote = (note) =>{
  const index = notes.value.indexOf(editingNote.value)
  notes.value[index] = note;
  editingNote.value = null ;
  isEditingModalOpen.value = false;
}

const enterEditMode =(note)=>{
  isEditingModalOpen.value =true
  editingNote.value = note;
}

const handleModalClose = () => {
  isEditingModalOpen.value = false;
  editingNote.value = null;
}
</script>
