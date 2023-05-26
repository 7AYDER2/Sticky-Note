<template>
  <Model :is-open="isOpen">
    <NoteEditor></NoteEditor>
  </Model>
</template>

<script setup>
import Model from "../components/Model.vue";
import NoteEditor from '../components/NoteEditor.vue';
import {defineProps} from 'vue';

const props = defineProps({isOpen:Boolean})

</script>
