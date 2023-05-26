<template>
  <Transition name="fade">
    <div v-if="isOpen"
         class="flex justify-center items-center h-screen w-screen fixed top-0 left-0 bg-black bg-opacity-25 z-[1000]"
         @click.self="closeModal">
      <transition name="slide-y" appear>
        <div class="w-1/3 flex flex-col bg-white p-3 rounded-lg">
          <div class="w-full">
            <slot></slot>
          </div>
          <div class="justify-end flex gap-2">
            <slot name="action">
              <button class="rounded-lg px-2 py-1 bg-red-500 text-white">Yes</button>
              <button class="rounded-lg px-2 py-1 bg-indigo-500 text-white">No</button>
            </slot>
          </div>
      </div>
      </transition>
    </div>
  </Transition>
</template>

<script setup>
import {defineProps} from 'vue'

 const props = defineProps({
  isOpen:Boolean
 })

const emit = defineEmits(['close'])

const closeModal = ()=>{
  emit('close');
}
</script>