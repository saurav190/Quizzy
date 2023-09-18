import api from "./index";

export const fetchAllQuizzes = async () => {
  try {
    const response = await api.get("/quizzes");
    return response.data;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};

export const fetchQuizzesByCategory = async (categoryId) => {
  try {
    const response = await api.get(`/quizzes?categoryName=${categoryId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    throw error;
  }
};

export const updateQuiz = async (quizId, updatedQuizData) => {
  try {
    const response = await api.put(`/quizzes/${quizId}`, updatedQuizData);
    return response.data;
  } catch (error) {
    console.error("Error updating quiz:", error);
    throw error;
  }
};

export const updateQuizCategory = async (category, newCategory) => {
  try {
    const quizzes = await fetchAllQuizzes();
    console.log("quiz category", quizzes);
    const quizToUpdate = quizzes.find((quiz) => quiz.category === category);
    console.log("quiz to update", quizToUpdate);
    if (!quizToUpdate) {
      throw new Error("Quiz not found");
    }

    quizToUpdate.category = newCategory;

    const response = await api.put(`/quizzes/${quizToUpdate.id}`, quizToUpdate);
    return response.data;
  } catch (error) {
    console.error("Error updating quiz category:", error);
    throw error;
  }
};

export const addQuiz = async (quizData) => {
  try {
    const response = await api.post("/quizzes", quizData);
    return response.data;
  } catch (error) {
    console.error("Error adding quiz:", error);
    throw error;
  }
};

export const removeQuiz = async (quizId) => {
  try {
    await api.delete(`/quizzes/${quizId}`);
  } catch (error) {
    console.error("Error removing quiz:", error);
    throw error;
  }
};
export const markQuizAttempted = async (
  quizId,
  score,
  attemptCount,
  userAttemptHistory
) => {
  try {
    const response = await api.patch(`/quizzes/${quizId}`, {
      isAttempted: true,
      attemptCount: attemptCount,
      userAttemptHistory: userAttemptHistory,
      score: score,
    });
    return response.data;
  } catch (error) {
    console.error("Error marking quiz as attempted:", error);
    throw error;
  }
};

export const fetchQuizById = async (quizId) => {
  try {
    const response = await api.get(`/quizzes/${quizId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching quiz by ID:", error);
    throw error;
  }
};

export const quizHistory = async (quizHistory) => {
  try {
    const response = await api.post("/quizHistory", quizHistory);
    return response.data;
  } catch (error) {
    console.log("Error updating user history:", error);
  }
};

export const fetchQuizHistory = async () => {
  try {
    const response = await api.get("/quizHistory");
    return response.data;
  } catch (error) {
    console.log("Error fetching quiz history:", error);
  }
};
