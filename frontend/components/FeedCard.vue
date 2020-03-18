<template>
  <v-flex
    xs12
    :class="classes"
  >
    <v-card
      :height="value.prominent ? 450 : 350"
      color="grey lighten-1"
      dark
      href="#!"
    >
      <v-img
        height="100%"
        gradient="rgba(0, 0, 0, .42), rgba(0, 0, 0, .42)"
      >
        <v-layout
          v-if="!value.prominent"
          fill-height
          wrap
          text-xs-right
          ma-0
        >
          <v-flex xs12>
            <h3 class="title font-weight-bold mb-2">
              {{ value.name }}
            </h3>
            <div class="caption">
              {{ value.description }}<br>
            </div>
          </v-flex>
          <v-flex align-self-end>
            <v-chip
              class="text-uppercase ma-0"
              color="primary"
              label
              small
              @click.stop=""
            >
              Read More
            </v-chip>
          </v-flex>
        </v-layout>
      </v-img>
    </v-card>
  </v-flex>
</template>

<script>
  export default {
    props: {
      size: {
        type: Number,
        required: true
      },
      value: {
        type: Object,
        default: () => ({})
      }
    },

    computed: {
      classes () {
        return {
          'm12': this.size === 1,
          'md6': this.size === 2,
          'md4': this.size === 3
        }
      }
    }
  }
</script>

<style>
.v-image__image {
  transition: .3s linear;
}
</style>
