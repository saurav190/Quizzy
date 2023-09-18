import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useNavigationType, useParams } from "react-router-dom";
import { fetchQuizById, markQuizAttempted, quizHistory } from "../api/quizzes";
import QuizResult from "../components/quiz/QuizResult";
import {
  setIsAttempted,
  setQuizHistory,
  setResult,
} from "../redux/slices/quizSlice";

const QuizPage = () => {
  const { quizId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  console.log("Navigating", navigate);
  const { quizzes, loading } = useSelector((state) => state.quiz);
  const selectedQuiz = quizzes.find((quiz) => quiz.id === quizId);
  console.log("selectedQuiz", selectedQuiz);
  const { attemptCount } = useSelector((state) => state.quiz);
  console.log("attemptCount", attemptCount);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [clickedOption, setClickedOption] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const { login } = useSelector((state) => state.userSlice);
  const [attempt, setAttemts] = useState(1);
  const { QuizHistory } = useSelector((state) => state.quiz);
  const selectedQuizHistory = QuizHistory.filter(
    (quiz) => quiz.quizId === quizId
  );
  console.log("selectedQuizHistory", selectedQuizHistory);
  console.log("QuizHistory", QuizHistory);

  const navType = useNavigationType();
  console.log("navType", navType);
  
    
  useEffect(() => {
    if (navType ==="POP") {
      alert("this is not possible")
      
    }
  }, [navType]);


  useEffect(() => {
    const fetchQuiz = async () => {
      const quizData = await fetchQuizById(quizId);
      console.log("quizData", quizData);

      setAttemts(quizData.attemptCount || 0);
      console.log("attemts", attempt);
    };
    fetchQuiz();
  }, [dispatch, quizId]);

  let currentdate = new Date();
  let timeStamp =
    currentdate.getDay() +
    "/" +
    currentdate.getMonth() +
    "/" +
    currentdate.getFullYear() +
    " @ " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();
  console.log("timeStamp: ", timeStamp);

  const userAttemptHistory = {
    quizId,
    userId: login.id,
    timestamp: timeStamp,
    score,
  };

  const nextQuestion = () => {
    let updatedScore = updateScore();
    console.log({updatedScore});
    if (currentQuestion < selectedQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setClickedOption(0);
    } else {
      setShowResult(true);
      dispatch(
        setResult({
          score: updatedScore,
          totalQuestion: selectedQuiz.questions.length,
        })
      );
      dispatch(setQuizHistory({...userAttemptHistory, score:updatedScore}));
      quizHistory({...userAttemptHistory, score:updatedScore});
      markQuizAttempted(quizId, updatedScore, attempt + 1, QuizHistory);

      if (attemptCount >= 4) {
        dispatch(setIsAttempted(true));
      }
    }
  };

  const lastQuestion = () => {
    updateScore();
    if (currentQuestion === 0) {
      setCurrentQuestion(currentQuestion);
      setClickedOption(0);
    } else if (currentQuestion < selectedQuiz.questions.length) {
      setCurrentQuestion(currentQuestion - 1);
      setClickedOption(0);
    } else {
      setShowResult(true);
    }
  };
  const updateScore = () => {
    const currentQuestionData = selectedQuiz.questions[currentQuestion];
    let updatedScore = score+1;
    if (currentQuestionData.answer.includes(clickedOption.toString())) {
      setScore(updatedScore);
    }
    return updatedScore;
  };

  const handleQuiz = () => {
    navigate(`/quizzes/${selectedQuiz.category}`);
    if (attempt <= 5) {
      markQuizAttempted(quizId, score, attempt + 1, userAttemptHistory);
      dispatch(setIsAttempted(true));
    }
  };

  if (loading) {
    return <CircularProgress />;
  }
  if (attempt >= 5) {
    return (
      <>
        <QuizResult
          disableTryAgain={attemptCount >= 5}
          Gotoquizzes={handleQuiz}
          userAttemptHistory={selectedQuizHistory}
        />
        )
      </>
    );
  }
  return (
    <>
      <div className="container flex items-center justify-center inset-0 ">
        <div className="grid grid-cols-1 my-10">
          <div className="quiz-app text-center font-sans p-10 shadow-2xl">
            <p className="text-2xl font-semibold bg-[#385A64] text-white shadow-2xl rounded p-3">
              {selectedQuiz.quizname}
            </p>

            {showResult ? (
              <QuizResult
                score={score}
                totalScore={selectedQuiz.questions.length}
                disableTryAgain={attemptCount >= 5}
                Gotoquizzes={handleQuiz}
                attemptCount={attempt + 1}
                userAttemptHistory={selectedQuizHistory}
              />
            ) : (
              <>
                <div className="question my-5 font-semibold text-lg ">
                  <span id="question-number">{currentQuestion + 1}. </span>
                  <span id="question-txt">
                    {selectedQuiz.questions[currentQuestion].question}
                  </span>
                </div>
                <div className="option-container flex flex-col text-center">
                  {selectedQuiz.questions[currentQuestion].options.map(
                    (option, i) => {
                      return (
                        <button
                          // className="option-btn"
                          className={`option-btn border-2 border-slate-400 rounded my-3 hover:bg-[#385A64] hover:border-lime-400 hover:text-white  text-center ${
                            clickedOption === i + 1
                              ? "bg-[#385A64] text-white rounded border-lime-400"
                              : null
                          } `}
                          key={i}
                          onClick={() => setClickedOption(i + 1)}
                        >
                          {option}
                        </button>
                      );
                    }
                  )}
                </div>
                <div className="flex items-center justify-evenly mt-10">
                  <input
                    type="button"
                    value="previous"
                    className={`${
                      currentQuestion === 0
                        ? "cursor-not-allowed bg-gray-500 text-white shadow-md px-3 py-2 rounded text-lg"
                        : "bg-[#385A64] text-white shadow-md px-3 py-2 rounded text-lg"
                    }`}
                    id="prev-button"
                    onClick={lastQuestion}
                  />
                  <input
                    type="button"
                    className="bg-[#385A64] text-white shadow-md px-3 py-2 rounded text-lg"
                    value="Next"
                    id="next-button"
                    onClick={nextQuestion}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizPage;
