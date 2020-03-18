/**
Author: Tyshan Prince (tyshantprince@gmail.com)
Date: July 09, 2019


Description:

Triage component

Manages user's triage state and current question information

Dynamically updates user report based on selected answers

*/




<template>
  <div>
    <div v-if="allQuestions.length == 0" class="flex flex-center">
<!-- loader -->

    </div>

    <div v-else class>

      <!-- show on Desktop Devices -->
      <desktop-view
        :currentQuestion="currentQuestion"
        :categories="categories"
        :current_category="current_category"
        :current_answers="current_answers"
        @answerClicked="handleClick($event)"
        ></desktop-view>


      <!-- show on Mobile Devices -->
      <!-- <mobile-view
        v-if="$q.platform.is.mobile"
        :currentQuestion="currentQuestion"
        :categories="categories"
        :current_category="current_category"
        :current_answers="current_answers"
        @answerClicked="handleClick($event)"
        ></mobile-view> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import MobileView from "../components/triage/MobileView.vue";
import DesktopView from "../../components/triage/DesktopView.vue";

export default {
  name: "Triage",
  components: {
    DesktopView,
  },
  data() {
    return {};
  },
  created() {
    // Runs when triage page is created
    this.$store.dispatch("triage/fetchSpreadsheet"); // fetches questions and answers from spreadsheet
    this.$store.dispatch("triage/newAnalytics"); // creates a new database entry to hold user answer choices
  },
  methods: {
    handleClick(answer) {
      if (answer.choice)
        // this.$store.dispatch("triage/saveToDatabase", {
        //   questionTitle: this.currentQuestion.question,
        //   choice: answer.choice
        // });

      if (answer.findHelp) {
        this.$store.dispatch("triage/FindHelp", {
          data: answer.findHelp,
          category: answer.category,
          questionId: answer.questionId
        });
      }
      if (answer.moreInfo) {
        this.$store.dispatch("triage/MoreInfo", {
          data: answer.moreInfo,
          category: answer.category,
          questionId: answer.questionId
        });
      }
      if (answer.nextSteps) {
        this.$store.dispatch("triage/NextSteps", {
          data: answer.nextSteps,
          category: answer.category,
          questionId: answer.questionId
        });
      }
    }
  },
  computed: {
    ...mapGetters({
      allQuestions: "triage/allQuestions", // all questions from vuex store
      allAnswers: "triage/allAnswers", // all answers from vuex store
      currentQuestionID: "triage/currentQuestionId" // current question based on state of application
    }),
    currentQuestion() {
      // Gets the current question object based on the current question ID
      return this.allQuestions.filter(
        question => question.id == this.currentQuestionID
      )[0];
    },

    categories() {
      // Get all categories
      var list = [];
      this.allQuestions.forEach(question => {
        if (!list.includes(question.category)) list.push(question.category);
      });
      return list;
    },

    current_category() {
      if(this.currentQuestion){

      
      return this.categories.filter(category => {
        return category == this.currentQuestion.category;
      })[0];
      }
    },

    current_answers() {
      var self = this;
      if(self.currentQuestion)
      return this.allAnswers.filter(function(answer) {
        return self.currentQuestion.answers
          .split(",")
          .includes(answer.id.toString());
      });
    }
  }
};
</script>

