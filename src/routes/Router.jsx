import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { fetchCategories } from "../api/categories";
import ErrorPage from "../components/common/ErrorPage";
import Masterlayout from "../layouts/Masterlayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import { fetchAllUsers } from "../api/users";
import { useDispatch } from "react-redux";
import { loginInfo, signUpInfo } from "../redux/slices/userSlice";
import { setCategory } from "../redux/slices/categorySlice";
import QuizlistPage from "../pages/QuizlistPage";
import { fetchAllQuizzes, fetchQuizHistory } from "../api/quizzes";
import { getQuizHistory, setQuizzes } from "../redux/slices/quizSlice";
import QuizPage from "../pages/QuizPage";
import ProtectedPages from "../components/common/ProtectedRoutes";
import QuizDetailsPage from "../components/quiz/QuizDetailsPage";

const Router = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const userInfo = localStorage?.getItem("loginuser");

    if (userInfo) {
      const user = JSON.parse(userInfo);
      dispatch(loginInfo(user));
    }
    const fetchAllCats = async () => {
      const allCats = await fetchCategories();
      dispatch(setCategory(allCats));
    };
    const getallUsers = async () => {
      const allUsers = await fetchAllUsers();
      console.log(allUsers);
      dispatch(signUpInfo(allUsers));
    };

    const fetchAllQuiz = async () => {
      const allQuizzes = await fetchAllQuizzes();
      console.log("allQuizzes", allQuizzes);
      dispatch(setQuizzes(allQuizzes));
    };

    const fetchAllQuizHistory = async () => {
      const allQuizHistory = await fetchQuizHistory();
      console.log("All Quizzes History", allQuizHistory);
      dispatch(getQuizHistory(allQuizHistory));
    };

    getallUsers();
    fetchAllCats();
    fetchAllQuiz();
    fetchAllQuizHistory();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Masterlayout />}>
            <Route index element={<HomePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="quizzes/:quizzeCategory"
              element={
                <ProtectedPages>
                  <QuizlistPage />
                </ProtectedPages>
              }
            />
            <Route
              path="quiz/:quizId"
              element={
                <ProtectedPages>
                  <QuizPage />
                </ProtectedPages>
              }
            />
            <Route path="/quizDetails/:quizId" element={<QuizDetailsPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
