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
          @click="$emit('complete')"
        >
          add
        </button>

        <button class="note-body__complete note-body__button" @click="$emit('complete')">
          complete
        </button>

        <button class="note-body__del note-body__button" @click="$emit('delete')">
          del
        </button>

        <button class="note-body__edit note-body__button" @click="$emit('edit')">
          edit
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
  }
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
