<template>
  <svg-icon :name="name" :class="[dir && `w-dir-${dir}`]" :width="size" :height="size" />
</template>

<script>
  export default {
    name: 'wonder-icon',
    props: {
      name: {
        type: String,
        required: true
      },
      size: {
        type: [String, Number],
        default: '24'
      },
      dir: {
        type: String
      }
    }
  }
</script>

<style lang="postcss">
  .svg-icon {
    flex-shrink: 0;
    &.w-dir {
      &-down {
        transform: rotate(90deg);
      }
      &-up {
        transform: rotate(-90deg);
      }
      &-left {
        transform: rotate(-180deg);
      }
    }
  }
</style>
