<template>
  <div class="flex flex-col gap-4 items-start mt-2 p-[1rem] bg-gray-50 rounded-lg p-2 bg-blue-100	">
        <input
          class="w-full rounded-lg p-2 border-2 border-gray-200"
          type="text"
          v-model="noteTitleValue"
          placeholder="Enter the Title..."/>
        <textarea
          v-model="noteTextValue"
          class="w-full rounded-lg p-2 border-2 border-gray-200 mb-2"
          placeholder="Type in your note..."
        ></textarea>
        <div class="w-full flex justify-end">
          <Button @click="addOrSaveNote" class="mt-2 bg-blue-600 text-white ">submit</Button>
        </div>
  </div>
</template>

<script setup>
import {ref, computed, defineEmits, defineProps, watch, onMounted} from "vue";
  import Button from './Button.vue'
  const noteTextValue = ref("");
  const noteTitleValue = ref("");
  const props = defineProps({
    note: {
      type: Object,
      required: false,
    },
  });

  const isEditing = computed(() => {
    return props.note != null;
  });

  const currentEditingNote = computed(() => {
    return props.note;
  });

  watch(currentEditingNote, (newValue, oldValue) => {
      if (newValue !== null) {
          noteTextValue.value = newValue.text;
          noteTitleValue.value = newValue.title;
      }
  });
  
  //edit the data without edit the state

  onMounted(()=>{
     if(props.note != null){
        noteTextValue.value = props.note.text;
        noteTitleValue.value = props.note.title;
     }
  })
  const trimmedNoteTextValue = computed(() => {
      if (noteTextValue.value == null) {
        return "";
      }
      return noteTextValue.value.trim();
  });

  const trimmedNoteTitleValue = computed(() => {
      if (noteTitleValue.value == null) {
        return "";
      }
      return noteTitleValue.value.trim();
  });

  const emit = defineEmits(["add","edit"]);

  const addOrSaveNote = () => {
        if (trimmedNoteTitleValue.value === "") {
          alert("Please Type in the note Text");
          return;
        }

        if (trimmedNoteTextValue.value === "") {
          alert("Please Type in the note Text");
          return;
        }

        if(isEditing.value){
          emit('edit',{
            title: trimmedNoteTitleValue.value,
            text: trimmedNoteTextValue.value,
          })
        }else {
          emit("add", {
            title: trimmedNoteTitleValue.value,
            text: trimmedNoteTextValue.value,
          });
        }
        noteTextValue.value = "";
        noteTitleValue.value = "";
   };

</script>
