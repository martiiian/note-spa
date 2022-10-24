<template>
  <div class="note-body" :class="{ 'note-body_is-child': isChild }">
    <div class="note-body__top">
      <div class="note-body__title">
        {{ title }}
      </div>

      <div class="note-body__buttons">
        <button
          v-if="!isChild"
          class="note-body__complete note-body__button"
          @click="$emit('createChild')"
        >
          <img :src="require('~/src/assets/images/add.svg')" alt="add child" />
        </button>

        <button class="note-body__complete note-body__button" @click="$emit('complete')">
          <img :src="require('~/src/assets/images/check.svg')" alt="complete" />
        </button>

        <button class="note-body__del note-body__button" @click="$emit('delete')">
          <img :src="require('~/src/assets/images/delete.svg')" alt="delete" />
        </button>

        <button class="note-body__edit note-body__button" @click="$emit('edit')">
          <img :src="require('~/src/assets/images/edit.svg')" alt="edit" />
        </button>
      </div>
    </div>

    <div class="note-body__description">
      {{ description }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
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
    }
  },

  emits: ['createChild', 'complete', 'delete', 'edit']
}
</script>

<style lang="scss">
.note-body {
  padding: 10px 5px;
  width: 100%;
  background: #ffffff;
  border-radius: 5px;
  border: 1px solid #cbcbcb;

  &__buttons {
    opacity: 0;
    transition: .3s ease-in;
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
  }

  &:hover {
    .note-body__buttons {
      opacity: 1;
    }
  }

  &__top {
    display: flex;
    justify-content: space-between;
    padding-left: 10px;
  }

  &__title {
    color: #1b3854;
  }

  &__description {

  }

  &_is-child {
    background: #efefef;
    border-radius: 0;
    border: none;
    &:last-child {
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }
}
</style>
