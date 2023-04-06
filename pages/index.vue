<template>
  <main>
    <swiper class="w-full px-10" :slides="slides" :options="{spaceBetween: 20}">
      <card slot-scope="{slide}" :item="slide" />
    </swiper>
  </main>
</template>

<script>
import Swiper from '@/components/Swiper.vue'
import Card from '@/components/Card.vue'

export default {
  components: {
    Swiper,
    Card
  },
  data() {
    return {
      slides: [
        {
          name: 'Slide 1',
          img: 'https://picsum.photos/200/300'
        },
        {
          name: 'Slide 2',
          img: 'https://picsum.photos/200/300'
        },
        {
          name: 'Slide 3',
          img: 'https://picsum.photos/200/300'
        }
      ]
    }
  }
}
</script>
