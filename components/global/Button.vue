<template>
  <w-link
    ref="wBtn"
    class="w-btn"
    :class="[
      color && `w-color w-color-${color}`,
      size && `w-size-${size}`,
      variant && `w-variant-${variant}`,
      {'pointer-events-none': loading}
    ]"
    :tag="tag"
    :type="type"
    :to="to"
    :title="title"
    :target="target"
    :exact="exact"
    :disabled="disabled"
    v-on="$listeners"
  >
    <template v-if="loading">
      <w-icon
        name="loader"
        class="animate-spin absolute inset-0 w-5 h-5 m-auto opacity-0"
        :class="[showContent && loading ? 'opacity-50' : loading ? 'opacity-100' : '']"
      />
      <span class="w-btn-loader" :class="{'opacity-0': loading && !showContent}">
        <slot />
      </span>
    </template>
    <slot v-else />
  </w-link>
</template>

<script>
  export default {
    name: 'WButton',
    props: {
      color: {
        type: String,
        validator: v => ['white', 'black', 'pale', 'grey', 'smoke', 'orange', 'blur', 'green', 'border', 'red'].indexOf(v) !== -1
      },
      variant: {
        type: String,
        validator: v => ['primary', 'secondary', 'inverse'].indexOf(v) !== -1
      },
      size: {
        type: String,
        validator: v => ['default', 'small'].indexOf(v) !== -1
      },
      type: {
        type: String,
        default: 'button',
        validator: v => ['button', 'submit'].indexOf(v) !== -1
      },
      to: {
        type: String
      },
      title: {
        type: String
      },
      target: {
        type: String
      },
      tag: {
        type: String,
        default: 'button'
      },
      exact: {
        type: Boolean
      },
      disabled: {
        type: Boolean
      },
      loading: {
        type: Boolean
      },
      showContent: {
        type: Boolean
      }
    }
  }
</script>

<style lang="postcss">
  .w-btn {
    @apply relative inline-flex items-center flex-shrink-0 cursor-pointer max-w-full text-14 text-left;
    &-loader {
      @apply inline-flex items-center flex-shrink-0 max-w-full;
    }
    &:not(.w-color) {
      @screen fine {
        &:hover {
          @apply underline;
        }
      }
      &.active,
      &:active {
        @apply underline;
      }
    }

    &.active,
    &:active {
      @apply cursor-default;
    }

    &.disabled,
    &:disabled {
      @apply text-grey pointer-events-none;
    }

    &.w-color {
      @apply px-5 rounded-full border border-transparent transition-colors duration-300 justify-center;
      padding-top: 12px;
      padding-bottom: 12px;
      &.w-size-small {
        padding-top: 8px;
        padding-bottom: 8px;
      }
      &.disabled,
      &:disabled {
        @apply bg-grey text-dark !important;
      }

      &-white {
        @apply bg-white text-dark border-grey;
        &:hover,
        &.active {
          @apply border-orange;
        }
        &.w-variant {
          &-primary {
            &:hover,
            &.active {
              @apply bg-orange text-white;
            }
          }
        }
      }

      &-black {
        @apply bg-black text-white border-white-25;
        &:hover,
        &.active {
          @apply bg-white text-dark border-grey;
        }
      }

      &-grey {
        @apply bg-grey text-dark border-white-25;
        &:hover,
        &.active {
          @apply bg-black text-white;
        }
      }

      &-smoke {
        @apply bg-smoke text-dark border-white-25 border border-grey;
        &:hover,
        &.active {
          @apply bg-pale;
        }
      }

      &-pale {
        @apply bg-pale;
        &:hover,
        &.active {
          @apply bg-grey border-grey;
        }
      }

      &-orange {
        @apply bg-orange text-white;
        &:hover,
        &.active {
          @apply bg-white text-orange border-orange-25;
        }
        &.w-variant {
          &-secondary {
            @apply bg-white text-orange border-orange;
            &:hover,
            &.active {
              @apply bg-orange text-white;
            }
          }
        }
      }

      &-red {
        @apply bg-red text-white;
        &:hover,
        &.active {
          @apply bg-white text-orange border-orange-25;
        }
      }

      &-green {
        @apply bg-green text-white border-white-25;
        &:hover,
        &.active {
          @apply bg-white text-green border-green;
        }
        &.w-variant {
          &-secondary {
            @apply bg-white text-green border-green;
            &:hover,
            &.active {
              @apply bg-green text-white;
            }
          }
          &-inverse {
            @apply bg-white text-dark border-grey;
            &:hover,
            &.active {
              @apply bg-green text-white border-white-25;
            }
          }
        }
        &:disabled,
        &.disabled {
          @apply border-grey !important;
        }
      }

      &-blur {
        @apply text-white bg-white-25 border-white-25;
        backdrop-filter: blur(10px);
        &:hover,
        &.active {
          @apply bg-white text-dark;
        }

        @supports (-webkit-touch-callout: none) or ((-webkit-appearance: none) and (stroke-color: transparent)) {
          @apply relative border-0;

          &:after {
            @apply content absolute block inset-0 rounded-full border border-white-25;
          }
        }
      }
    }
  }
  // Resetting links underline in buttons
  a.w-btn.w-color {
    @apply no-underline;
    & > * {
      @apply no-underline;
    }
    &:hover > * {
      @apply no-underline;
    }
  }
</style>
