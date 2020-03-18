<template>
  <div>
    <!-- Desktop Design -->

    <v-layout class v-if="this.categories.length == 0">
      <v-container>
        <v-layout row justify-center>
          <v-flex class="col-xs-12 text-center q-py-lg">
            <!-- Top Banner  -->
            <banner/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-layout>
  </div>
</template>

<script>
import Banner from '~/components/home/Banner.vue'
import { mapGetters } from "vuex";
import axios from "axios";
import _ from "lodash";



export default {
  components: {
    Banner,
  },
  name: "PageReport",
  data() {
    return {
      expanded: "Safety",
      step: 1,
      loading: false,
      category_text: "",
      topic: "about",
      icons: {
        Safety: "local_hospital",
        Finance: "monetization_on",
        Housing: "domain",
        Family: "child_friendly",
        VictimRights: "security"
      },
      userPhone: ""
    };
  },
  computed: {
    ...mapGetters({
      UserReport: "triage/getUserReport"
    }),
    current_about() {
      return this.UserReport[this.slide].about.split("<br>");
    },

    current_nextSteps() {
      return this.UserReport[this.slide].nextSteps;
    },

    categories() {
      return _.map(this.UserReport, (value, key) => {
        if (typeof value.FindHelp != "undefined")
          if (value.FindHelp.length != 0) return key;
        if (typeof value.MoreInfo == "undefined")
          if (value.MoreInfo.length != 0) return key;
        if (typeof value.NextSteps == "undefined")
          if (value.NextSteps.length != 0) return key;
      }).filter(el => el != null && el != "General");
    }
  }
}
</script>
