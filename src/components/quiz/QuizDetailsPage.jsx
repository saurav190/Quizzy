import ControlPointIcon from "@mui/icons-material/ControlPoint";
import SyncIcon from "@mui/icons-material/Sync";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateQuiz } from "../../api/quizzes";
import { updateQuizzes } from "../../redux/slices/quizSlice";
import { QuizvalidationSchema } from "../../utils";

const QuizDetailsPage = () => {
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state) => state.quiz);
  const { quizId } = useParams();
  const selectedQuiz = quizzes.find((quiz) => quiz.id === quizId);
  const navigate = useNavigate();
  const errorMes = ["Atleast one Question is required"];

  const formik = useFormik({
    initialValues: {
      id: selectedQuiz?.id || "",
      quizname: selectedQuiz?.quizname || "",
      category: selectedQuiz?.category || "",
      type: selectedQuiz?.type || "",
      difficulty: selectedQuiz?.difficulty || "",
      questions: selectedQuiz?.questions?.map((question, index) => ({
        question: question.question || "",
        options: [...(question.options || [])],
        answer: [...question.answer] || [],
      })),
    },
    validationSchema: QuizvalidationSchema,
    onSubmit: (values) => {
      dispatch(updateQuizzes(values));
      updateQuiz(values.id, values);
      console.log("Form values:", values);
      setSnackbarOpen(true);
    },
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = [...formik.values.questions];
    console.log("updateQuestions", updatedQuestions);
    if (updatedQuestions.length <= 1) {
      formik.setFieldError("questions", errorMes);
    } else {
      updatedQuestions.splice(index, 1);
      formik.setFieldValue("questions", updatedQuestions);

      if (updatedQuestions.length > 1) {
        formik.setFieldError("questions", null);
      }
    }
  };

  const updatedQuestions = [...formik.values.questions].length;
  console.log("updatedQuestions", updatedQuestions);

  const handelGoback = () => {
    navigate(-1);
  };

  const handleChange = (e) => {
    formik.handleChange(e);
    formik.setFieldTouched(e.target.name, true, false);
  };

  if (!selectedQuiz) {
    return <div>Quiz not found.</div>;
  }

  return (
    <>
      <div className="text-4xl font-bold text-[#385A64] text-center">
        Quiz Details
      </div>
      <div className="max-w-4xl mx-auto p-4">
        <form onSubmit={formik.handleSubmit}>
          {/* Quiz Name */}
          <div className="mb-4">
            <label
              htmlFor="quizname"
              className="block text-gray-700 font-semibold mb-1"
            >
              Quiz Name
            </label>
            <input
              type="text"
              name="quizname"
              placeholder="Enter quiz name"
              className={`border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 w-full ${
                formik.errors.quizname && formik.touched.quizname
                  ? "border-red-500"
                  : ""
              }`}
              value={formik.values.quizname}
              onChange={handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.quizname && formik.touched.quizname && (
              <p className="text-red-500">{formik.errors.quizname}</p>
            )}
          </div>

          {/* Type */}
          <div className="mb-4">
            <label
              htmlFor="type"
              className="block text-gray-700 font-semibold mb-1"
            >
              Type
            </label>
            <input
              type="text"
              name="type"
              placeholder="Enter Type"
              className={`border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 w-full ${
                formik.errors.type && formik.touched.type
                  ? "border-red-500"
                  : ""
              }`}
              value={formik.values.type}
              onChange={handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.type && formik.touched.type && (
              <p className="text-red-500">{formik.errors.type}</p>
            )}
          </div>

          {/* Difficulty */}
          <div className="mb-4">
            <label
              htmlFor="difficulty"
              className="block text-gray-700 font-semibold mb-1"
            >
              Difficulty
            </label>
            <input
              type="text"
              name="difficulty"
              placeholder="Enter Difficulty"
              className={`border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 w-full ${
                formik.errors.difficulty && formik.touched.difficulty
                  ? "border-red-500"
                  : ""
              }`}
              value={formik.values.difficulty}
              onChange={handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.difficulty && formik.touched.difficulty && (
              <p className="text-red-500">{formik.errors.difficulty}</p>
            )}
          </div>

          {/* Questions */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Questions</h3>
            {formik.values.questions &&
              formik.values.questions.map((question, index) => (
                <div key={index} className="mb-4">
                  {/* Question */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between py-1">
                      <label
                        htmlFor={`questions[${index}].question`}
                        className="block text-gray-700 font-semibold mb-1"
                      >
                        Question {index + 1}
                      </label>
                      <button
                          type="button"
                          onClick={() => handleRemoveQuestion(index)}
                          className={
                            updatedQuestions <= 1
                              ? "cursor-not-allowed py-2 px-3 text-center border border-gray-500 text-gray-500 hover:bg-gray-500  hover:text-white shadow-lg  font-semibold rounded-lg "
                              : "py-2 px-3 text-center border border-red-500 text-red-500 hover:bg-red-500  hover:text-white shadow-lg  font-semibold rounded-lg"
                          }
                          disabled={updatedQuestions <= 1}
                        >
                          Remove Question {index + 1}
                        </button>
                    </div>
                    <input
                      type="text"
                      name={`questions[${index}].question`}
                      placeholder="Enter Question"
                      className={`border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 w-full ${
                        formik.errors.questions &&
                        formik.errors.questions[index] &&
                        formik.errors.questions[index].question &&
                        formik.touched.questions &&
                        formik.touched.questions[index] &&
                        formik.touched.questions[index].question
                          ? "border-red-500"
                          : ""
                      }`}
                      value={formik.values.questions[index].question}
                      onChange={handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.questions &&
                      formik.errors.questions[index] &&
                      formik.touched.questions &&
                      formik.touched.questions[index] &&
                      formik.touched.questions[index].question && (
                        <p className="text-red-500">
                          {formik.errors.questions[index].question}
                        </p>
                      )}
                  </div>

                  {/* Options */}
                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-1">
                      Options
                    </label>
                    {formik.values?.questions[index]?.options?.map(
                      (option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className="mb-2 flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            name={`questions[${index}].answer`}
                            className={`border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 w-[24px]`}
                            value={Number(optionIndex + 1)}
                            onChange={handleChange}
                            onBlur={formik.handleBlur}
                          />
                          <input
                            type="text"
                            name={`questions[${index}].options[${optionIndex}]`}
                            placeholder={`Enter Option ${optionIndex + 1}`}
                            className={`border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 w-full ${
                              formik.errors.questions &&
                              formik.errors.questions[index] &&
                              formik.errors.questions[index].options &&
                              formik.errors.questions[index].options[
                                optionIndex
                              ] &&
                              formik.touched.questions &&
                              formik.touched.questions[index] &&
                              formik.touched.questions[index].options &&
                              formik.touched.questions[index].options[
                                optionIndex
                              ]
                                ? "border-red-500"
                                : ""
                            }`}
                            value={
                              formik.values.questions[index].options[
                                optionIndex
                              ]
                            }
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.errors.questions &&
                            formik.errors.questions[index] &&
                            formik.errors.questions[index].options &&
                            formik.errors.questions[index].options[
                              optionIndex
                            ] &&
                            formik.touched.questions &&
                            formik.touched.questions[index] &&
                            formik.touched.questions[index].options &&
                            formik.touched.questions[index].options[
                              optionIndex
                            ] && (
                              <p className="text-red-500">
                                {
                                  formik.errors.questions[index].options[
                                    optionIndex
                                  ]
                                }
                              </p>
                            )}
                        </div>
                      )
                    )}
                    {formik.errors.questions &&
                      formik.errors.questions[index] &&
                      formik.touched.questions &&
                      formik.touched.questions[index] &&
                      formik.touched.questions[index].answer && (
                        <p className="text-red-500">
                          {formik.errors.questions[index].answer}
                        </p>
                      )}
                  </div>
                </div>
              ))}
            <button
              type="button"
              onClick={() =>
                formik.setFieldValue("questions", [
                  ...formik.values.questions,
                  {
                    id: "",
                    question: "",
                    options: ["", "", "", ""],
                    answer: [],
                  },
                ])
              }
              className=" text-[#385A64] border border-[#385A64] px-4 py-2 rounded-md hover:bg-[#385A64] hover:text-white"
            >
              <div className="flex items-center justify-center gap-1">
                <ControlPointIcon />
                Add Question
              </div>
            </button>
          </div>
          <div className="flex justify-center items-center gap-4">
            <button
              type="submit"
              className=" text-[#385A64] border border-[#385A64] px-4 py-2 rounded-md hover:bg-[#385A64] hover:text-white"
            >
              <SyncIcon />
              Update Quiz
            </button>
            <button
              type="button"
              onClick={handelGoback}
              className=" text-red-500 border border-red-500 px-4 py-2 rounded-md hover:bg-red-500 hover:text-white"
            >
              Cancel
            </button>
          </div>
        </form>

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
            Quiz Updated Successfully!
          </MuiAlert>
        </Snackbar>
      </div>
    </>
  );
};

export default QuizDetailsPage;
