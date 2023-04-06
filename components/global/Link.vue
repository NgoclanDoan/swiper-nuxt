<script>
  import {target} from '@/utils/helpers'

  export default {
    name: 'WLink',
    props: {
      type: {
        type: String,
        default: 'button',
        validator: v => ['button', 'submit'].indexOf(v) !== -1
      },
      to: {
        type: String
      },
      tag: {
        type: String,
        default: 'button'
      },
      title: {
        type: String
      },
      target: {
        type: String
      },
      exact: {
        type: Boolean
      },
      disabled: {
        type: Boolean
      }
    },
    computed: {
      isActive() {
        const [targetPath] = this.$route.path.split('/f/')
        return this.exact ? this.to === targetPath : targetPath.startsWith(this.to)
      }
    },
    watch: {
      isActive: {
        handler(val) {
          if (val) this.$emit('activated')
        },
        immediate: true
      }
    },
    render(h) {
      let tag = this.tag
      let outerLink = false
      if (this.to) {
        tag = 'nuxt-link'
        outerLink = target(this.to) === '_blank'
        if (outerLink || /^mailto:/i.test(this.to) || /^tel:/i.test(this.to)) tag = 'a'
      }
      return h(
        tag,
        {
          ref: this.ref,
          props: {
            to: this.to,
            exact: this.exact,
            tag: tag !== 'nuxt-link' ? tag : this.to ? 'a' : this.tag
          },
          attrs: {
            'aria-label': this.title || 'button',
            type: tag === 'button' ? this.type : null,
            title: this.title,
            href: tag === 'a' || tag === 'nuxt-link' ? this.to : null,
            rel: outerLink ? 'noopener' : null,
            disabled: this.disabled
          },
          class: {
            active: this.isActive,
            disabled: this.disabled
          },
          ...((this.to && this.$listeners.clickLink) || outerLink || this.target === '_blank'
            ? {
                domProps: {
                  target: '_blank'
                }
              }
            : {}),
          [this.to && tag !== 'a' ? 'nativeOn' : 'on']: {
            ...this.$listeners,
            ...(this.to && this.$listeners.clickLink
              ? {
                  click: e => {
                    if (e.ctrlKey) return
                    e.preventDefault()
                    e.stopPropagation()
                    this.$emit('clickLink', e)
                  }
                }
              : {})
          }
        },
        this.$slots.default
      )
    }
  }
</script>
