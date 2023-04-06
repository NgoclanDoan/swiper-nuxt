<template>
  <w-link :to="item.slug" class="w-card-simple">
    <img :class="classImage" :src="item.img" :alt="item.name" />
    <div class="flex-shrink-0">
      <slot />
    </div>
  </w-link>
</template>

<script>
  export default {
    name: 'WCardSimple',
    props: {
      item: {
        type: Object,
        required: true
      },
      classImage: {
        type: String
      },
      reqSize: {
        type: [Number, String],
        default: 200
      }
    }
  }
</script>

<style lang="postcss">
  .w-card-simple {
    @apply w-13 h-17 flex flex-col flex-shrink-0 p-4;
    .v-lazy-image {
      @apply flex-grow overflow-hidden mb-2 mode-darken;
    }
  }
</style>
