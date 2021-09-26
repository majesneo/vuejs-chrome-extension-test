<template>
  <div>
    <div v-if="alertIsVisible && message" class="alert">
      <div @click="hideAlert" class="close">x</div>
      <div v-if="message">
        {{ message }}
      </div>
      <div v-else>
        Loading...
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      message: null,
      currentPage: null,
      alertIsVisible: false
    }
  },
  computed: {
    sites() {
      return this.$store.getters.sites
    }
  },
  watch: {
    sites(newSites) {
      if (newSites) {
        this.getUrlPage()
      }
    },
  },
  created() {
    this.setTimer()
    if (this.checkHideAlert() || this.checkThreeSession()) {
      this.alertIsVisible = false
    } else {
      this.$store.dispatch('getSitesSoftomate')
      this.alertIsVisible = true
    }

  },
  methods: {
    setTimer() {
      const hours = 1;
      const now = new Date().getTime();
      const setupTime = localStorage.getItem('setupTime');
      if (setupTime == null) {
        localStorage.setItem('setupTime', now)
      } else {
        if (now - setupTime > hours * 60 * 60 * 1000) {
          localStorage.clear()
          localStorage.setItem('setupTime', now);
          this.$store.dispatch('getSitesSoftomate')
        }
      }
    },
    checkThreeSession() {
      let sessionNumber = Number(sessionStorage.getItem('session'))
      if (sessionNumber >= 3) {
        this.alertIsVisible = false
        return true
      } else {
        this.setSession(++sessionNumber)
      }
    },
    setSession(value = '1') {
      sessionStorage.setItem("session", value);
    },
    checkHideAlert() {
      return localStorage.hasOwnProperty('hideAlert')
    },
    hideAlert() {
      localStorage.setItem('hideAlert', 'true')
      this.alertIsVisible = false
    },
    getUrlPage() {
      this.currentPage = window.location.href
      if (this.currentPage) {
        this.checkDomain()
      }
    },
    checkDomain() {
      this.sites.forEach(site => {
        if (this.currentPage.indexOf(site.domain) !== -1) {
          const {message} = site
          this.message = message
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.alert {
  z-index: 99999;
  position: absolute;
  width: 100%;
  background-color: dimgray;
  max-width: 320px;
  color: white;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close {
  right: 5px;
  top: -1px;
  position: absolute;
  cursor: pointer;
}
</style>
