<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar elevation="0" app>
      <v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="drawer = !drawer" />
      <v-container mx-auto py-0>
        <v-layout>
          <v-img class src="ovc.png" max-width="10vw" max-height="7vh" />
          <v-btn
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            class="hidden-sm-and-down ma-3"
            text
            large
          >{{ item.title }}</v-btn>
        </v-layout>
      </v-container>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Home",
          to: "/"
        },
        {
          icon: "mdi-chart-bubble",
          title: "Get Started",
          to: "/get-started"
        },
        {
          icon: "mdi-chart-bubble",
          title: "Legal Needs",
          to: "/legal-needs"
        },
        {
          icon: "mdi-chart-bubble",
          title: "Find Help",
          to: "/find-help"
        },
        {
          icon: "mdi-chart-bubble",
          title: "Glossary",
          to: "/glossary"
        },
        {
          icon: "mdi-chart-bubble",
          title: "About Us",
          to: "/about-us"
        }
      ],
      miniVariant: false,
      title: "Vuetify.js"
    };
  }
};
</script>
