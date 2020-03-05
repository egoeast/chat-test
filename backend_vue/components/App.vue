<template>
  <div class="container-fluid">
    <div class="row flex-xl-nowrap">
      <div class="col-md-3 col-xl-2 bd-sidebar">
        <form role="search" class="bd-search d-flex align-items-center">

          <button class="btn btn-link bd-search-docs-toggle d-md-none p-0 ml-3 collapsed" type="button"
                  data-toggle="collapse" data-target="#bd-docs-nav" aria-controls="bd-docs-nav"
                  aria-expanded="false" aria-label="Toggle docs navigation">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" role="img"
                 focusable="false"><title>Menu</title>
              <path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"
                    d="M4 7h22M4 15h22M4 23h22"></path>
            </svg>
          </button>
        </form>

        <sidebar-menu></sidebar-menu>

      </div>


      <nav class="d-none d-xl-block col-xl-2 bd-toc" aria-label="Secondary navigation">
        <ul class="section-nav">
          <li class="toc-entry toc-h2"><a href="#quick-start">One</a>
            <ul>
              <li class="toc-entry toc-h3"><a href="#css">one</a></li>
            </ul>
          </li>
          <li class="toc-entry toc-h2"><a href="#important-globals">Two</a>
            <ul>
              <li class="toc-entry toc-h3"><a href="#reboot">two</a></li>
            </ul>
          </li>
        </ul>
      </nav>


      <main class="col-md-9 col-xl-8 py-md-3 pl-md-5 bd-content" role="main">

        <h1 class="bd-title" id="content">Introduction</h1>
        <p class="bd-lead">Get started with Bootstrap, the world’s most popular framework for building responsive, mobile-first sites, with BootstrapCDN and a template starter page.</p>

        <h2 id="quick-start"><span class="bd-content-title">Quick start<a class="anchorjs-link " aria-label="Anchor" data-anchorjs-icon="#" href="#quick-start" style="padding-left: 0.375em;"></a></span></h2>

        <p>Looking to quickly add Bootstrap to your project? Use BootstrapCDN, provided for free by the folks at StackPath. Using a package manager or need to download the source files? <a href="/docs/4.4/getting-started/download/">Head to the downloads page</a>.</p>
        <router-view></router-view>
        <!--<vuedal></vuedal>-->


      </main>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
//import {Component as Vuedal} from "vuedals"
import SidebarMenu from "./SidebarMenu.vue";

export default {

    name: 'app',
    components: {SidebarMenu},
    /*data() {
        return {
          isAuthenticated: true,
        }
    },
    computed: {
        ...mapState({
          userName: state => state.user.name
        })
    },
    components: {
        Vuedal
    },
    methods: {
        ...mapActions('user', [
            'logoutUser',
            'checkUser'
        ]),
        logOut() {
            this.logoutUser().then(() => {
                this.$router.push({name: 'home'})
            });
        }
    },
    created() {
        this.checkUser().then(() => {
            if (!this.userName && this.$router.currentRoute.name === 'chat') {
                this.$router.push({name: 'login'});
            }
        });

        if (!("Notification" in window)) {
            alert("This browser does not support desktop notification");
        }

        if (Notification.permission !== "denied") {
            Notification.requestPermission().then(function (permission) {

            });
        }


    },
    watch: {
        $route(to, from) {
            // react to route changes...
            if (!this.userName && to.name === 'chat') {
                this.$router.push({name: 'login'});
            }
        }
    },*/

}
</script>

<style>

</style>
