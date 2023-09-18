import * as yup from "yup";

export const signupSchema = yup.object({
  username: yup
    .string()
    .required("Please provide a username")
    .matches(/^\S*$/, "Username cannot contain spaces")
    .min(4, "Username must be at least 4 characters long")
    .max(10, "Username can't be more than 10 characters long"),
  email: yup
    .string()
    .email("Please provide a valid email")
    .required("Please provide an email")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$/,
      "Please enter a valid email format"
    ),
  password: yup
    .string()
    .required("Please provide a password")
    .min(8, "Password must be at least 8 characters")
    .max(15, "Password can't be more than 15 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+}{":;'?/>.<,|\~`[\]\\[=-]).{8,}$/,
      "Password must contain at least one letter, one number, and one special character"
    ),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please provide a confirm password"),
  gender: yup.string().required("Please select a gender"),
  dateOfBirth: yup
    .date()
    .required("Please provide a date of birth")
    .max(new Date(), "Date of birth cannot be in the future")
    .test("minimumAge", "You must be at least 8 years old", (value) => {
      const today = new Date();
      const userDate = new Date(value);
      const minimumAgeDate = new Date();
      minimumAgeDate.setFullYear(today.getFullYear() - 8);

      return userDate <= minimumAgeDate;
    }),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Please provide a valid email")
    .required("Please provide an email")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/g,
      "Please enter a valid email format"
    ),
  password: yup
    .string()
    .required("Please provide a password")
    .min(8, "Password must be at least 8 characters")
    .max(15, "Password can't be more than 15 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+}{":;'?/>.<,|\~`[\]\\[=-]).{8,}$/,
      "Password must contain at least one letter, one number, and one special character"
    ),
});

export const QuizvalidationSchema = yup.object({
  quizname: yup.string().required("Quiz Name is required"),
  type: yup.string().required("Type is required"),
  difficulty: yup.string().required("Difficulty is required"),
  questions: yup.array().min(1, "atleast").of(
    yup.object().shape({
      question: yup.string().required("Question is required"),
      options: yup
        .array()
        .min(2, "At least two options are required")
        .of(yup.string().required("Option is required")),
    })
  ),
});
