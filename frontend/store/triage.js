import XLSX from "xlsx"; // reads excel sheets
import axios from "axios";
import Vue from 'vue'

export const state = () => ({
    // state holds your application wide data
    currentQuestionId: 1,
    QuestionList: [],
    AnswerList: [],
    docID: "", // reference to Analytics object being saved to db
    UserReport: {
    }
})

export const actions = {
    fetchSpreadsheet({ commit }) {
      var url =
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vSQz9V3t_yg_yCYRKQlWfgEF5FNTugCmzGKNR2oWARQlCX63I9aodluv0Txr7Kcyw/pub?output=xlsx";
      axios(url, { responseType: "arraybuffer" })
        .catch(function (err) {
          /* error in getting data */
        })
        .then(function (res) {
          /* parse the data when it is received */
          var data = new Uint8Array(res.data);
          var workbook = XLSX.read(data, { type: "array" });
          commit(
            "loadQuestions",
            XLSX.utils.sheet_to_json(workbook.Sheets.questions)
          );
          commit(
            "loadAnswers",
            XLSX.utils.sheet_to_json(workbook.Sheets.answers)
          );
        })
        .catch(function (err) {
          /* error in parsing */
        });
    },

    // Creates a new empty entry inside database
    // then stores a reference to that document
    newAnalytics({ commit }) {
    //   axios.post(`${BASE_URL}/Analytics/create`).then(response => {
    //     commit("storeDocRef", response.data.Analytics._id);
    //   });
    commit("storeDocRef", 0);

    },

    // Sends post requests to update the database entry as users answer questions
    saveToDatabase({ commit }, data) {
    //   commit("updateAnalytics", data);
    },

    // Send triage to next question 
    updateQuestion({ commit }, questionID) {
      commit("updateQuestion", questionID);

    },

    // Store More Info Resource in User Report
    MoreInfo({ commit }, data) {
      commit("appendMoreInfo", data);
    },

    // Store Find Help Resource in User Report
    FindHelp({ commit }, data) {
      commit("appendFindHelp", data);
    },

    // Store Next Steps in User Report
    NextSteps({ commit }, data) {
      commit("appendNextSteps", data);
    },

    removeSavedData({ commit }, questionID) {
      var previousQuestion = this.state.QuestionList.filter((question) => {
        return question.id == questionID;
      })[0];


    //   commit("updateAnalytics", {
    //     questionTitle: previousQuestion.question,
    //     choice: ""
    //   })
    }
  }
  
  export const mutations = {
    // mutations are what actually alter your state
    loadQuestions(state, fetchedQuestions) {
      state.QuestionList = fetchedQuestions;
    },

    loadAnswers(state, fetchAnswers) {
      state.AnswerList = fetchAnswers;
    },

    storeDocRef(state, docID) {
      state.docID = docID;
    },

    updateQuestion(state, QuestionID) {
      state.currentQuestionId = QuestionID;
    },
    // updateAnalytics(state, data) {
    //   axios
    //     .post(`${BASE_URL}/Analytics/update/${state.docID}`, {
    //       questionTitle: data.questionTitle,
    //       choice: data.choice
    //     })
    //     .then(response => {
    //       return response.data;
    //     })
    //     .catch(err => Promise.reject(err.message));
    // },
    appendMoreInfo(state, data) {
      if (typeof state.UserReport[data.category] == 'undefined') {
        Vue.set(state.UserReport, [data.category], {})
      }

      if (typeof state.UserReport[data.category].MoreInfo == 'undefined') {
        Vue.set(state.UserReport[data.category], 'MoreInfo', [])
      }
      state.UserReport[data.category].MoreInfo.push(data.data);
    },

    appendFindHelp(state, data) {
      if (typeof state.UserReport[data.category] == 'undefined') {
        Vue.set(state.UserReport, [data.category], {})
      }

      if (typeof state.UserReport[data.category].FindHelp == 'undefined') {
        Vue.set(state.UserReport[data.category], 'FindHelp', [])
      }

      state.UserReport[data.category].FindHelp.push(data.data);
    },

    appendNextSteps(state, data) {
      if (typeof state.UserReport[data.category] == 'undefined') {
        Vue.set(state.UserReport, [data.category], {})
      }

      if (typeof state.UserReport[data.category].NextSteps == 'undefined')
        Vue.set(state.UserReport[data.category], 'NextSteps', [])

      state.UserReport[data.category].NextSteps.push(data.data);
    }
  }

  export const getters = {
    // getters allow you retrieve state within your components
    allQuestions(state) {
      return state.QuestionList;
    },
    allAnswers(state) {
      return state.AnswerList;
    },
    currentQuestionId(state) {
      return state.currentQuestionId;
    },
    getUserReport(state) {
      return state.UserReport;
    }
  }