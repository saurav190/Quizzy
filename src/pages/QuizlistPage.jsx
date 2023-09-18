import ControlPointIcon from "@mui/icons-material/ControlPoint";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { addQuiz, fetchQuizzesByCategory, removeQuiz } from "../api/quizzes";
import AddQuizzes from "../components/home/AddQuizzes";
import {
  addQuizzes,
  removeQuizzes,
  setQuizzes,
  updateQuizzes,
} from "../redux/slices/quizSlice";
import { QuizvalidationSchema } from "../utils";

const initialValues = {
  id: "",
  quizname: "",
  category: "",
  type: "",
  difficulty: "",
  questions: [
    {
      question: "",
      options: ["", "", "", ""],
      answer: "",
    },
  ],
};

const QuizlistPage = () => {
  const { quizzeCategory } = useParams();
  const dispatch = useDispatch();
  const { quizzes, loading } = useSelector((state) => state.quiz);
  const { userRole } = useSelector((state) => state.userSlice);
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snakebarEditOpen, setSnakebarEditOpen] = useState(false);
  const [snakebarDeleteOpen, setSnakebarDeleteOpen] = useState(false);

  //   const { quiz } = useSelector((state) => state.quiz);
  //   console.log("attmptCount", quiz.attemptCount);

  const [isAddQuizOpen, setIsAddQuizOpen] = useState(false);
  const [removeQuizId, setRemoveQuizId] = useState(null);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState(false);
  const [selectQuiz, setSelectQuiz] = useState(null);
  const handleAddQuizClick = () => {
    setIsAddQuizOpen(true);
  };

  const handleRemoveQuizClick = (quizId) => {
    setRemoveQuizId(quizId);
    setIsConfirmationDialogOpen(true);
  };

  const handleCancelRemoveQuiz = () => {
    setRemoveQuizId(null);
    setIsConfirmationDialogOpen(false);
  };

  const handleConfirmRemoveQuiz = async () => {
    if (removeQuizId) {
      await removeQuiz(removeQuizId);
      dispatch(removeQuizzes(removeQuizId));
      setRemoveQuizId(null);
      setIsConfirmationDialogOpen(false);
      setSnakebarDeleteOpen(true);
    }
  };

  useEffect(() => {
    const fetchAllQuiz = async (state) => {
      const quizzes = await fetchQuizzesByCategory(quizzeCategory);
      dispatch(setQuizzes(quizzes));
    };
    fetchAllQuiz();
  }, [dispatch, quizzeCategory]);

  const filteredQuizzes = quizzes.filter(
    (el) => el.category === quizzeCategory
  );
  console.log("filteredQuizzes", filteredQuizzes);

  const handelQuiz = async (quizId) => {
    setTimeout(() => {
      navigate(`/quiz/${quizId}`);
    }, 1000);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: QuizvalidationSchema,
    onSubmit: (values, { setSubmitting }) => {
      if (selectQuiz) {
        dispatch(updateQuizzes(values));
        setSnakebarEditOpen(true);
      } else {
        const quizId = uuidv4();
        values.id = quizId;
        console.log(values);
        dispatch(addQuizzes(values));
        addQuiz(values);
        setSnackbarOpen(true);
      }
      setSubmitting(false);
      setIsAddQuizOpen(false);
    },
  });

  const onClose = () => {
    setIsAddQuizOpen(false);
    setSelectQuiz(null);
    formik.resetForm();
  };

  const handeViewResult = (quizId) => {
    navigate(`/quiz/${quizId}`);
  };
  const handleViewQuiz = (quizId) => {
    navigate(`/quizDetails/${quizId}`);
  };
  if (loading) {
    return <CircularProgress />;
  }

  return (
    <section className="container">
      <div className="flex justify-between items-center">
        <div className="flex flex-col py-4">
          <h1 className="text-4xl font-bold">{quizzeCategory} Quizzes</h1>
          <p className="text-xl font-medium">
            Discover the most popular quizzes and quiz categories on Sporcle
          </p>
        </div>
        {userRole === "admin" && (
          <>
            <button
              className="bg-[#385A64] text-white shadow-md px-3 py-2 rounded text-lg"
              onClick={handleAddQuizClick}
            >
              <ControlPointIcon /> Add Quiz
            </button>
            <AddQuizzes
              open={isAddQuizOpen}
              formik={formik}
              category={quizzeCategory}
              onClose={onClose}
            />
          </>
        )}
      </div>

      <div>
        {loading ? (
          <CircularProgress />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
            {filteredQuizzes.length === 0 ? (
              <Typography variant="h6">
                There is no quiz available for this category.
              </Typography>
            ) : (
              filteredQuizzes?.map((quiz) => (
                <div
                  key={quiz.id}
                  className={
                    quiz.difficulty === "easy"
                      ? "bg-[#059669] flex items-center text-white justify-evenly w-full rounded  shadow-lg h-full hover:border-lime-500  border-2"
                      : quiz.difficulty === "medium"
                      ? "bg-[#FF9B50] flex items-center text-white justify-evenly w-full rounded shadow-lg h-full hover:border-lime-500  border-2"
                      : quiz.difficulty === "hard"
                      ? " bg-[#C63D2F] "
                      : "flex flex-col items-center text-white justify-evenly w-full rounded shadow-lg h-full hover:border-lime-500  border-2"
                  }
                >
                  <h3 className="text-base my-2 font-semibold text-center px-3">
                    {quiz.quizname}
                  </h3>

                  {userRole === "admin" && (
                    <div className="flex  items-center justify-center gap-2 py-3">
                      <button
                        onClick={() => handleViewQuiz(quiz.id)}
                        className=" text-[#385A64] border border-[#385A64] px-4 py-2 rounded-md hover:bg-[#385A64] hover:text-white"
                      >
                        <VisibilityIcon /> View
                      </button>
                      <button
                        onClick={() => handleRemoveQuizClick(quiz.id)}
                        className="py-2 px-3 text-center border border-red-500 text-red-500 hover:bg-red-500  hover:text-white  font-semibold rounded-lg"
                      >
                        <DeleteIcon /> Delete
                      </button>
                    </div>
                  )}

                  {userRole === "user" &&
                    (quiz.attemptCount >= 5 ? (
                      <>
                        <span className="text-white">0 attempts remaining</span>
                        <button
                          onClick={() => handeViewResult(quiz.id)}
                          type="button"
                          className="py-2 my-1 px-3 text-center bg-[#385A64]  text-white font-semibold rounded-lg"
                        >
                          View
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handelQuiz(quiz.id)}
                        className="py-2 my-1 px-3 text-center bg-[#385A64]  text-white font-semibold rounded-lg"
                      >
                        Start
                      </button>
                    ))}

                  {userRole === "user" && quiz.isAttempted && (
                    <span className="text-white">Attempted.</span>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
      {/* Confirmation Dialog */}
      <Dialog
        open={isConfirmationDialogOpen}
        onClose={handleCancelRemoveQuiz}
        aria-labelledby="remove-quiz-dialog-title"
        aria-describedby="remove-quiz-dialog-description"
      >
        <DialogTitle id="remove-quiz-dialog-title">Remove Quiz</DialogTitle>
        <DialogContent>
          <DialogContentText id="remove-quiz-dialog-description">
            Are you sure you want to remove this quiz?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelRemoveQuiz} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmRemoveQuiz} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          style={{ backgroundColor: "#385A64" }}
        >
          Quiz Added Successfully!
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={snakebarEditOpen}
        autoHideDuration={6000}
        onClose={() => setSnakebarEditOpen(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setSnakebarEditOpen(false)}
          severity="success"
          style={{ backgroundColor: "#385A64" }}
        >
          Quiz Updated Successfully!
        </MuiAlert>
      </Snackbar>

      <Snackbar
        open={snakebarDeleteOpen}
        autoHideDuration={6000}
        onClose={() => setSnakebarDeleteOpen(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setSnakebarDeleteOpen(false)}
          severity="success"
          style={{ backgroundColor: "#385A64" }}
        >
          Quiz Deleted Successfully!
        </MuiAlert>
      </Snackbar>
    </section>
  );
};

export default QuizlistPage;
