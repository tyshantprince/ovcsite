 <template>
  <!-- Mobile Design -->
  <q-page class="q-pa-lg">
    <div v-if="currentQuestion">
      <div class="row justify-between items-center" v-if="this.currentQuestion.id != 1">
        <div class style>
          <q-btn
            push
            class="fit"
            color="secondary"
            icon="arrow_back_ios"
            style="font-size: .6rem;"
            @click="$store.dispatch('updateQuestion', current_answers[0].previousQuestion); $store.dispatch('removeSavedData', current_answers[0].previousQuestion)"
          ></q-btn>
        </div>

        <div class style>
          <q-btn
            push
            class="fit"
            color="secondary"
            label="Exit"
            style="font-size: .6rem;"
            @click="$store.dispatch('updateQuestion', current_answers[0].previousQuestion); $store.dispatch('removeSavedData', current_answers[0].previousQuestion)"
          ></q-btn>
        </div>
      </div>

      <div class="row justify-center" style="height: 5vh;">
        <div class>
          <p
            class="foundationFont text-center text-weight-bolder fit"
            style="color: #fff; font-size: 2rem"
          >{{currentQuestion.category}}</p>
        </div>
      </div>

      <!-- Question -->
      <div class="row justify-center items-center">
        <transition
          mode="out-in"
          leave-class="disappear"
          enter-active-class="animated fadeInDown"
          leave-active-class="animated fadeOutUp"
        >
          <div
            :key="currentQuestion.question"
            class="col-12 flex flex-center q-pa-md"
            style="height: 25vh;"
          >
            <p
              class="text-center text-weight-medium questionMobile"
              v-if="currentQuestion"
              
            >{{ currentQuestion.question }}</p>
          </div>
        </transition>

        <div class="col-12">
          <transition-group
            mode="out-in"
            v-if="current_answers.length <= 3"
            leave-class="animated disappear"
            enter-active-class="animated fadeInUp"
            leave-active-class="animated fadeOutDown"
          >
            <!-- If the question has less than 4 answers -->
            <div
              :key="answer.id"
              v-for="(answer) in current_answers"
              style="height: 15vh; padding-top: 30px;"
              class="flex flex-center"
            >
              <q-btn
                @click="handleTouch(answer)"
                :disable="isDisabled"
                ref="answer"
                class="shadow-0 q-my-md mybtnMobile fit"
                href="#"
                no-caps
                rounded
                align="left"
              >
                <div class="row items-center fit">
                  <div class>
                    <q-icon class :name="answer.icon"></q-icon>
                  </div>
                  <div class="col q-px-xs">
                    <span class>{{ answer.answer }}</span>
                  </div>
                </div>
              </q-btn>
            </div>
          </transition-group>

            <div key="vict" class="row justify-center items-center"
            v-else-if="current_answers.length <= 9"
            
             style="height: 50vh;">
              <div class="row justify-center items-center">
                <div :key="answer.id" v-for="(answer) in current_answers" class="col-3 q-pa-xs">
                  <q-btn
                    @click="handleVictimTouch(answer)"
                    :disable="isDisabled"
                    class="shadow-0 victimBtnMobile"
                    :class="[{ 'selected' : answer.selected }]"
                    href="#"
                    no-caps
                    rounded
                    align="center"
                  >
                    <h3 style="font-size: 1.5vmax" class>
                      <q-icon class :name="answer.icon"></q-icon>
                      {{ answer.answer }}
                    </h3>
                  </q-btn>
                </div>

                <div class="row q-pt-md" key="continue">
                  <div class="col">
                    <q-btn
                      @click="handleClick(current_answers[0])"
                      class="shadow-7"
                      rounded
                      size="3vh"
                      dense
                      color="accent"
                      align="center"
                      label="Continue"
                    ></q-btn>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="row justify-center items-center flex flex-center"
              key="county"
              style="height: 10vh;"
            v-else

            >
              <div
                class="col-4 q-pa-xs"
                :key="answer.id"
                v-for="(answer) in current_answers"
              >
                <q-btn
                  @click="handleTouch(answer)"
                  :disable="isDisabled"
                  class="shadow-0 myCountyMobile q-pa-xs"
                  no-caps
                  href="#"
                  rounded
                  align="center"
                >
                  <div class>
                    <span class style="font-size: 2.25vh; ">{{ answer.answer }}</span>
                  </div>
                </q-btn>
              </div>
            </div>
        </div>
      </div>

      <!-- I am here to Help Modal -->
      <q-dialog v-model="helping" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <span class="q-pa-md">
              <h4
                class="text-center"
              >You are trying to find help for someone else. Please answer the rest of these questions as if you are that person.</h4>
            </span>
          </q-card-section>

          <q-card-actions align="center">
            <q-btn
              size="1.5rem"
              label="Continue"
              color="primary"
              v-close-popup
              @click="helping = false; $store.dispatch('updateQuestion', current_answers[0].nextQuestion)"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <!-- Are you in Arizona Modal -->
      <q-dialog v-model="arizona" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <span class="q-pa-md text-center">
              <h4>This resources in this tool are aimed at assisting victims of crime. Please click here to explore information available on the site.</h4>
              <q-btn label="Go To Website" color="secondary" size="1.5rem"></q-btn>
            </span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              class
              label="Okay"
              size="1.5rem"
              color="primary"
              v-close-popup
              @click="arizona = false;"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>

    <q-dialog v-model="safety" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm text-center">
            <h4>If you are in immediate danger, call 911.</h4>
          </span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            size="1.5rem"
            label="Okay"
            color="primary"
            v-close-popup
            @click="safety = false;  $store.dispatch('updateQuestion', current_answers[0].nextQuestion)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

    <script>
export default {
  name: "MobileView",
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
      isDisabled: false,
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
        this.$store.dispatch("updateQuestion", answer.nextQuestion);
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
        this.$router.push("report");
      }
    },
    handleTouch(answer) {
        this.$emit("answerClicked", answer);
        this.handleClick(answer);
        this.isDisabled = true;
        setTimeout(() => {
          this.isDisabled = false;
        }, 250);

    },

     handleVictimTouch(answer) {
       answer.selected = !answer.selected;
        this.$emit("answerClicked", answer);
        setTimeout(() => {
          this.isDisabled = false;
        }, 250);

    },
  }
};
</script>
<style lang="stylus" scoped>
.foundationFont {
  font-family: foundationFont;
  font-size: 5vh;
}

.questionMobile {
  color: #fff;
  font-family: foundationFont;
  font-size: 3.25vh;
  line-height: 1.2;
}

.myCountyMobile {
  color: #fff;
  background-color: #00667e;
  border-style: solid;
  border-color: #fff;
  border-width: 5px;
  border-radius: 20px;
  min-width: 100%;
  height: 8vh;
}

.mybtnMobile {
  color: #fff;
  background-color: #00667e;
  border-style: solid;
  border-color: #fff;
  border-width: 5px;
  border-radius: 20px;
}


.victimBtnMobile {
  color: #fff;
  background-color: #00667e;
  border-style: solid;
  border-color: #fff;
  border-width: 3px;
  border-radius: 20px;
  width: 100%;
  height: 20vh;
}

.selected {
  background-color: #603f85 !important;
}

.disappear {
  display: none;
}
</style>