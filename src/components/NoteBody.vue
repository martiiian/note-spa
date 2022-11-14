<template>
  <div
    class="note-body"
    :class="{
      'note-body_is-child': isChild,
      'note-body_is-complete': isComplete,
      'note-body_is-empty': isEmpty
    }"
    @click="$emit('click')"
  >
    <div class="note-body__top">
      <div class="note-body__title">
        {{ title }}
      </div>

      <div
        class="note-body__buttons"
        :class="{ 'note-body__buttons_active': menuIsOpen }"
      >
        <button
          v-if="!isChild"
          class="note-body__complete note-body__button"
          @click.stop="$emit('createChild')"
        >
          <img src="@/assets/images/add.svg" alt="add child" />
        </button>

        <button
          class="note-body__complete note-body__button"
          @click.stop="$emit('complete')"
        >
          <img src="@/assets/images/check.svg" alt="complete" />
        </button>

        <button
          class="note-body__del note-body__button"
          @click.stop="$emit('delete')"
        >
          <img src="@/assets/images/delete.svg" alt="delete" />
        </button>

        <button
          class="note-body__edit note-body__button"
          @click.stop="$emit('edit')"
        >
          <img src="@/assets/images/edit.svg" alt="edit" />
        </button>
      </div>

      <button
        class="note-body__button note-body__button_mobile-options"
        @click.stop="toggleMenu"
      >
        <img src="@/assets/images/menu.svg" alt="edit" />
      </button>
    </div>

    <div class="note-body__description">
      {{ description }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  isChild: {
    type: Boolean,
    default: false
  },
  isEmpty: {
    type: Boolean,
    default: false,
  },
  isComplete: {
    type: Boolean,
    default: false
  }
})

defineEmits([
  'createChild', 'complete', 'delete', 'edit', 'click'
])

const menuIsOpen = ref(false)

function toggleMenu() {
  menuIsOpen.value = !menuIsOpen.value
}
</script>

<style lang="scss">
.note-body {
  padding: 10px 10px 10px 15px;
  width: 100%;
  background: #ffffff;
  border-radius: 5px;
  border: 1px solid #cbcbcb;
  cursor: pointer;

  &:hover {
    background: #f9f9f9;
    .note-body__buttons {
      @media (min-width: 400px) {
        opacity: 1;
        visibility: visible;
      }
    }
  }

  &__buttons {
    opacity: 0;
    visibility: hidden;
    transition: .3s ease-in;
    display: flex;
    flex-wrap: nowrap;
    flex-shrink: 0;
    @media (max-width: 400px) {
      opacity: 0;
      visibility: visible;
    }

    &_active {
      @media (max-width: 400px) {
        opacity: 1;
        visibility: visible;
      }
    }
  }

  &__button {
    cursor: pointer;
    background: none;
    border: none;
    margin-left: 10px;
    transition: 0.3s opacity ease-in-out;

    &:hover {
      opacity: 0.8;
    }

    img {
      height: 15px;
      width: 15px;
    }

    &_mobile-options {
      display: none;
      @media (max-width: 400px) {
        display: block;
      }
    }
  }

  &__top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  &__title {
    color: #1b3854;
    flex-grow: 1;
  }

  &__description {
    color: #a5a3a3;
  }

  &_is-empty {
    cursor: default;
    &:hover {
      background: #ffffff;
    }
  }

  &_is-child {
    background: #efefef;
    border-radius: 0;
    border: none;
    cursor: default;
    &:last-child {
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
    }
    &:hover {
      background: #efefef;
    }
  }

  &_is-complete {
    background: #bdbdbd;
    cursor: default;
    &:hover {
      background: #bdbdbd;
    }
  }
}
</style>
