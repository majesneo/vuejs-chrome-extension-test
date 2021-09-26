<template>
  <div class="app">
    <ul v-if="sites && sites.length> 0">
      <li>
        <a class="link" target="_blank" v-for="site in sites"
           :href="'https://'+site.domain">{{ site.name }}</a>
      </li>
    </ul>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['sites']),
  },
  created() {
    this.$store.dispatch('getSitesSoftomate')
  },
  methods: {
  }
}


</script>

<style lang="scss" scoped>
.link {
  color: black;
  display: block;
  margin-bottom: 5px;
  padding: 5px 10px;

  &:hover {
    color: green;
  }
}
</style>
