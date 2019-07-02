<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h2 :class="[style.error, style.small, style.font]" class="small">{{msg}}</h2>
    <p :class="style.red">{{init}}</p>
    <section :class="style.layout">
    </section>
  </div>
</template>
<script>
import titleMixin from '@/mixin/title-mixin'
import metaTag from '@/lib/meta'
import Host from '@/lib/host'
import loading from '@/lib/loading'
import style from '@/style/about.css'

console.log(style)

export default {
  name: 'about',
  mixins: [titleMixin],
  data: () => {
    return {
      msg: 'MSG',
      title: 'this is title',
      style: Object.assign({}, style)
    }
  },
  computed: {
    // display the item from store state.
    init () {
      // console.log('route item id:', this.$route.params.id)
      // console.log('meta::', this.$store.state.metaData[this.$route.name])

      const meta = this.$store.state.metaData[this.$route.name]
      // console.log(Host(this) + this.$route.fullPath)
      // console.log(meta)
      if (meta) {
        this.initMeta(this, meta)
      }
      // if (this.$ssrContext) {
      //   this.$ssrContext.title = meta.title
      // }

      return ''
    }
  },
  // Server-side only
  // This will be called by the server renderer automatically
  serverPrefetch () {
    console.log('==serverPrefetch==')
    // console.log(this.$ssrContext)

    // this.$ssrContext.title = 'pre title'
    // return the Promise from the action
    // so that the component waits before rendering

    return this.getMeta()
  },
  // Client-side only
  mounted () {
    console.log('==mounted==')
    // If we didn't already do it on the server
    // we fetch the item (will first show the loading text)
    if (!this.init) {
      this.getMeta()
    }
    // document.body.classList.add('class', this.name + '_bg')
    // console.log('||||||', this.$store.state.metaData[this.$route.name])
    // this.metaData = this.$store.state.metaData[this.$route.name]
    document.body.classList.add(style.about_bg)
    loading(false, style)
  },
  beforeCreate () {
  },
  beforeDestroy () {
    console.log('beforeDestroy')
    document.body.classList.remove(style.about_bg)

    loading(true, style)
  },

  methods: {
    initMeta (_this, meta) {
      metaTag(_this, {
        title: meta.title,
        meta: [
          {
            itemprop: 'description',
            name: 'description',
            property: 'og:description',
            content: meta.description
          },
          {
            itemprop: 'url',
            property: 'og:url',
            content: Host(this) + this.$route.fullPath
          },
          {
            itemprop: 'image',
            property: 'og:image',
            content: 'https://ssl.feebee.com.tw/og_fb_banner.jpg'
          },
          {
            property: 'og:image:width',
            content: '600'
          },
          {
            property: 'og:image:height',
            content: '314'
          }
        ],
        link: [{
          rel: 'asstes',
          href: 'https://assets-cdn.github.com/'
        }]
      })
    },
    getMeta () {
      // console.log('route:', this.$route)
      // return the Promise from the action
      return this.$store.dispatch('getMeta', this.$route.name)
    }
  }
}

</script>
