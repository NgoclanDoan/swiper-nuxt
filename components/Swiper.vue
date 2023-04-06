<template>
  <div :class="['w-swiper-full', {'pagination-hidden': hidePagination, 'pagination-inner': paginationInner}, `dir-${dir}`]">
    <div ref="swiper" :class="['swiper', swiperClass]">
      <div class="swiper-wrapper">
        <slot name="before" />
        <div v-for="(slide, index) in slides" :class="['swiper-slide', slideClass]" :key="index">
          <slot :slide="slide" :index="index" />
        </div>
        <slot name="after" />
      </div>
    </div>
    <!-- Controls -->
    <template v-if="!hideControls">
      <div v-if="!hideNav" ref="prev" :class="['swiper-nav', 'swiper-nav-prev', {'opacity-0': !isInit}, navClass]">
        <w-button
          :class="['p-2', {'transform rotate-90': dir === 'vertical'}]"
          :color="navColor"
        >
          <w-icon name="arrow-right-sm" size="35" dir="left" />
        </w-button>
      </div>
      <div v-if="!hideNav" ref="next" :class="['swiper-nav', 'swiper-nav-next', {'opacity-0': !isInit}, navClass]">
        <w-button
          :class="['p-2', {'transform rotate-90': dir === 'vertical'}]"
          :color="navColor"
        >
          <w-icon name="arrow-right-sm" size="35" />
        </w-button>
      </div>
      <div v-if="!hidePagination" class="swiper-pagination-wrapper">
        <div ref="pagination" class="swiper-pagination" />
      </div>
    </template>
  </div>
</template>

<script>
  import {Swiper, Navigation, Pagination, Zoom} from 'swiper'
  Swiper.use([Navigation, Pagination, Zoom])

  export default {
    name: 'WSwiper',
    props: {
      slides: {
        type: Array,
        required: true
      },
      options: {
        type: Object,
        default: () => ({})
      },
      swiperClass: {
        type: String
      },
      slideClass: {
        type: String
      },
      hidePagination: {
        type: Boolean
      },
      hideNav: {
        type: Boolean
      },
      hideControls: {
        type: Boolean
      },
      navColor: {
        type: String,
        default: 'grey',
        validator: v => ['white', 'black', 'grey'].indexOf(v) !== -1
      },
      navClass: {
        type: String
      },
      paginationInner: {
        type: Boolean
      }
    },

    data() {
      return {
        slider: null,
        isInit: false,
        opt: {}
      }
    },
    computed: {
      dir() {
        return this.opt.direction
      }
    },
    mounted() {
      const swiperEl = this.$refs.swiper
      // Adding default options
      const defaultOptions = {
        slidesPerView: 'auto',
        direction: 'horizontal',
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        watchOverflow: true,
        setWrapperSize: true
        // centeredSlides won't work in cssMode
        // cssMode: !this.options.centeredSlides
      }

      if (!this.hideControls) {
        // Adding navigation
        if (!this.hideNav) {
          defaultOptions.navigation = {
            nextEl: this.$refs.next,
            prevEl: this.$refs.prev
          }
        }
        // Adding pagination
        if (!this.hidePagination) {
          defaultOptions.pagination = {
            el: this.$refs.pagination,
            dynamicBullets: true,
            clickable: true
          }
        }
      }

      this.opt = {
        ...defaultOptions,
        ...this.options,
        on: {
          init: sw => {
            this.isInit = true
            this.$emit('init', sw)
          },
          slideChange: sw => {
            this.$emit('slideChange', sw)
          }
        }
      }

      // if slidesPerView === 'auto' we need to add width: auto to the slides so that they adapt to the size of the content inside
      if (this.opt.slidesPerView === 'auto') swiperEl.classList.add('slides-auto')
      this.$nextTick(() => {
        this.slider = new Swiper(this.$refs.swiper, this.opt)
        this.$emit('mounted', this.slider)
      })
    },

    beforeDestroy() {
      this.slider?.autoplay?.stop()
      this.slider?.destroy()
    }
  }
</script>

<style lang="postcss">
  @import 'node_modules/swiper/swiper-bundle.min.css';

  .w-swiper-full {
    @apply relative max-w-full;
    .swiper {
      @apply full overflow-hidden;
      &-slide {
        @apply max-w-full;
      }
      &-nav {
        @apply z-1 absolute w-8 h-8 flex-center will-change-opacity transition-opacity duration-300;
      }
      &-pagination {
        @apply whitespace-no-wrap;
        &-wrapper {
          @apply flex absolute items-center justify-center;
        }
        &-bullet {
          @apply cursor-pointer;
        }
        &-bullets {
          .swiper-pagination-bullet {
            @apply bg-transparent border border-dark opacity-100 w-3 h-3 transition-all duration-200;

            &-active {
              @apply bg-black border;
            }
          }
        }
      }
      &-button-disabled {
        @apply opacity-0;
        animation: a-pointer-events 1s linear forwards;
      }
      &.slides-auto {
        .swiper-slide {
          @apply w-auto;
        }
      }
    }

    // Might be needed in the future
    /*.center-container {
      @screen sm {
        padding-left: calc((100vw - 100%) / 2);
        width: 100vw;
        max-width: none;
        margin-left: calc((100vw - 100%) / 2 * -1);
      }
    }*/

    &.dir {
      &-horizontal {
        @apply pb-6;
        .swiper-nav {
          @apply pb-6;
        }
        &.pagination-hidden,
        &.pagination-inner {
          @apply pb-0;
          .swiper-nav {
            @apply pb-0;
          }
        }
        .swiper {
          &-nav {
            @apply inset-y-0 my-auto;
            &-prev {
              @apply left-0 ml-7;
            }
            &-next {
              @apply right-0 mr-7;
            }
          }
          &-pagination {
            &-wrapper {
              @apply inset-x-0 bottom-0 h-4;
            }
            &-bullets {
              .swiper-pagination-bullet {
                @apply mx-px2;
              }
            }
          }
        }
      }
      &-vertical {
        .swiper {
          &-nav {
            @apply inset-x-0 mx-auto;
            &-prev {
              @apply top-0;
            }
            &-next {
              @apply bottom-0;
            }
          }
          &-pagination {
            @apply flex flex-col;
            &-wrapper {
              @apply right-0 inset-y-0 w-4;
            }
            &-bullets {
              .swiper-pagination-bullet {
                @apply my-px2 flex-shrink-0;
              }
            }
          }
        }
      }
    }
  }
</style>
