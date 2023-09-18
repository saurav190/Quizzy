import { createSlice } from "@reduxjs/toolkit";

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    quizzes: [],
    result: "",
    loading: false,
    error: null,
    isAttempted: false,
    attemptCount: 0,
    QuizHistory: [],
  },
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    getQuizHistory: (state, action) => {
      state.QuizHistory = action.payload;
    },
    addQuizzes: (state, action) => {
      state.quizzes.unshift(action.payload);
    },
    removeQuizzes: (state, action) => {
      const quizId = action.payload;
      state.quizzes = state.quizzes.filter((quiz) => quiz.id !== quizId);
    },
    updateQuizzes: (state, action) => {
      const index = state.quizzes.findIndex(
        (quiz) => quiz.id === action.payload.id
      );

      if (index !== -1) {
        state.quizzes[index] = action.payload;
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setResult: (state, action) => {
      state.result = action.payload;
    },
    setIsAttempted: (state, action) => {
      state.isAttempted = action.payload;
    },
    setAttemts: (state, action) => {
      state.attemptCount += action.payload;
    },
    resetQuiz: (state) => {
      state.attemptCount = 0;
      state.quiz = null;
      state.result = "";
    },
    setQuizHistory: (state, action) => {
      state.QuizHistory.push(action.payload);
    },
  },
});

export const {
  getQuizHistory,
  setQuizHistory,
  setQuizzes,
  addQuizzes,
  setAskedCount,
  setLoading,
  setResult,
  resetQuiz,
  setAttemts,
  setIsAttempted,
  removeQuizzes,
  updateQuizzes,
} = quizSlice.actions;

export default quizSlice.reducer;
