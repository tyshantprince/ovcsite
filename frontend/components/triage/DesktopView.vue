<template>
  <div>
    <!-- Desktop/Tablet Layout -->

    <!-- Display Category -->
    <v-layout class="pa-5" row justify-center align-center>
      <v-flex xs12>
        <div class="text-center" v-if="currentQuestion">
          <h3 style="font-size: 3rem; ">{{ currentQuestion.category }}</h3>
        </div>
      </v-flex>
    </v-layout>
    <v-layout>
      <!-- Display Current Question -->
      <v-flex xs12 md6>
        <div :key="currentQuestion" class v-if="currentQuestion.question">
          <p class="text-center questionDesktop foundationFont">
            {{ currentQuestion.question }}
            <v-btn v-if="currentQuestion.tip" style="font-size: .75rem;" @click="tip = true">
              <v-icon>mdi-information</v-icon>
            </v-btn>
          </p>
        </div>
      </v-flex>

        <!-- Display Answer Buttons for Questions w/ <= 3  -->
        <v-flex xs12 md6 v-if="current_answers.length <= 3">
          <div :key="answer.id" v-for="(answer) in current_answers" class="py-6">
            <v-btn @click="$emit('answerClicked', answer); handleClick(answer)" class="myIntro">
              <v-layout class="row align-center" style="width: 100%;">
                <span style="font-size: 1.5vmax;" class>{{ answer.answer }}</span>
              </v-layout>
            </v-btn>
          </div>
        </v-flex>

        <!-- Display Answer Buttons for MultiSelect -->

        <v-container grid-list-lg v-else-if="current_answers.length == 8">
          <v-layout row justify-center align-center>
            <v-flex md6 :key="answer.id" v-for="(answer) in current_answers" class="pa-4">
              <v-btn
                @click="$emit('answerClicked', answer);"
                class
                :class="[{ 'selected' : answer.selected }]"
                rounded
                large
                block
              >
                <div class>
                  <h3 style="font-size: 24px" class="q-px-lg">
                    <v-icon class="answerBtn q-pr-lg">{{answer.icon}}</v-icon>
                    {{ answer.answer }}
                  </h3>
                </div>
              </v-btn>
            </v-flex>

            <v-flex class="text-center">
              <v-btn
                @click="handleClick(current_answers[0])"
                class="shadow-7"
                rounded
                size="2rem"
              >Continue</v-btn>
            </v-flex>
          </v-layout>
        </v-container>

        <!-- Display Answer Buttons for Counties -->

        <v-container grid-list-lg v-else>
          <v-layout row justify-center align-center>
            <v-flex md4 :key="answer.id" v-for="(answer) in current_answers" class="pa-4">
              <v-btn
                @click="$emit('answerClicked', answer); handleClick(answer)"
                class="shadow-0"
                rounded
                large
                block
              >
                <div class>
                  <p class="q-pt-sm" style="font-size: 24px;">{{ answer.answer }}</p>
                </div>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: "DesktopView",
  props: [
    "currentQuestion",
    "categories",
    "current_category",
    "current_answers"
  ],
  data() {
    return {
      helping: false, // display helping self or others modal if true
      arizona: false, // display arizona citizen modal if true
      safety: false, // display safety/911 modal if true
      tip: false,

      icons: {
        // Icons that represent each category
        Safety: "security",
        Finance: "monetization_on",
        Housing: "domain",
        Family: "child_friendly",
        FinishingUp: "person_pin"
      }
    };
  },
  methods: {
    exit() {
      window.location = "http://www.azflse.org";
    },
    handleClick(answer) {
      if (!answer.modal) {
        this.$store.dispatch("triage/updateQuestion", answer.nextQuestion);
      }
      if (answer.modal == "helping") {
        this.helping = true;
      }

      if (answer.modal == "arizona") {
        this.arizona = true;
      }

      if (answer.modal == "safety") {
        this.safety = true;
      }

      if (answer.nextQuestion == "end") {
        this.$router.push("triage/report");
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.foundationFont {
  font-family: foundationFont;
}

.questionDesktop {
  color: black;
  font-size: 4vh;
  line-height: 1.25;
}

.myIntro:hover {
  background-color: #603f85 !important;
}

.myIntro {
  color: black;
  background-color: #00667e;
  border-style: solid;
  border-color: #fff;
  border-width: 7px;
  height: 100%;
  width: 100%;
}

.answerBtn {
  color: #fff;
}

.myCounty:hover {
  background-color: #603f85 !important;
}

.myCounty {
  color: #fff;
  background-color: #00667e;
  border-style: solid;
  border-color: #fff;
  border-width: 7px;
  width: 100%;
  height: 7.5vh;
}

.mybtn:hover {
  background-color: #603f85 !important;
}

.mybtn {
  color: #fff;
  background-color: #00667e;
  border-style: solid;
  border-color: #fff;
  border-width: 7px;
  min-height: 100%;
  min-width: 100%;
}

.victimBtn:hover {
  background-color: #603f85 !important;
}

.victimBtn {
  color: #fff;
  background-color: #00667e;
  border-style: solid;
  border-color: #fff;
  border-width: 4px;
  width: 100%;
  height: 100%;
}

.selected {
  background-color: #603f85 !important;
}

.answersTransition-enter-active, .answersTransition-leave-active {
  transition: opacity 0.5s ease-in-out, transform 0.5s ease;
}

.answersTransition-enter-active {
  transition-delay: 0.5s;
}

.answersTransition-enter, .answersTransition-leave-to {
  opacity: 0;
}

.answersTransition-enter-to, .answersTransition-leave {
  opacity: 1;
}
</style>
  