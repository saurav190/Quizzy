import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MuiAlert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from "@mui/material/Snackbar";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import * as yup from "yup";
import {
  addCategory,
  fetchCategories,
  removeCategory,
  updateCategory,
} from "../api/categories";
import { updateQuizCategory } from "../api/quizzes";
import AddCategories from "../components/home/AddCategories";
import {
  addCategories,
  removeCategories,
  updateCategories,
} from "../redux/slices/categorySlice";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const validationSchema = yup.object({
  category: yup.string().required("Please add a brief description"),
});

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [open, setOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const dispatch = useDispatch();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snakebarDeleteOpen, setSnakebarDeleteOpen] = useState(false);
  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const { quizzes, loading } = useSelector((state) => state.quiz);

  const totalQuizzesByCategoryReducer = (quizzes) => {
    return quizzes.reduce((totalQuizzes, quiz) => {
      const category = quiz.category;
      totalQuizzes[category] = (totalQuizzes[category] || 0) + 1;
      return totalQuizzes;
    }, {});
  };
  const AttemptedQuizzes = (quizzes) => {
    return quizzes.reduce((totalAttempted, quiz) => {
      if (quiz.isAttempted) {
        const category = quiz.category;

        totalAttempted[category] = (totalAttempted[category] || 0) + 1;
      }
      return totalAttempted;
    }, {});
  };

  const totalAttemptedQuizzes = AttemptedQuizzes(quizzes);
  console.log("totalAttemptedQuizzes", totalAttemptedQuizzes);
  const totalQuizzes = totalQuizzesByCategoryReducer(quizzes);
  console.log("totalQuizzes", totalQuizzes);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };

  const handleConfirmationOpen = (category) => {
    setSelectedCategory(category);
    setConfirmationOpen(true);
  };

  const handleConfirmationClose = () => {
    setSelectedCategory(null);
    setConfirmationOpen(false);
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    formik.setValues({
      id: category.id,
      category: category.category,
    });
    setOpen(true);
  };
  const formik = useFormik({
    initialValues: {
      id: "",
      category: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const existingCategories = await fetchCategories();
      const arrayCategory = [existingCategories];
      console.log(arrayCategory);
      const newCategory = {
        id: values.id,
        category: values.category,
      };

      const categoryExists = existingCategories.some(
        (item) => item.category === values.category
      );
      console.log("categoryExists", categoryExists);

      if (categoryExists) {
        formik.setFieldError("category", "Category already exists");
      } else {
        if (selectedCategory) {
          console.log("selectedCategory", selectedCategory.category);
          updateCategory(selectedCategory.id, newCategory);
          updateQuizCategory(selectedCategory.category, newCategory.category);
          dispatch(updateCategories(newCategory));
        } else {
          newCategory.id = uuidv4();
          dispatch(addCategories(newCategory));
          addCategory(newCategory);
          setSnackbarOpen(true);
        }

        formik.resetForm();
        setOpen(false);
        setSelectedCategory(null);
      }
    },
  });

  const handleDelete = async () => {
    if (selectedCategory) {
      await removeCategory(selectedCategory.id);
      dispatch(removeCategories(selectedCategory.id));
      handleConfirmationClose();
      setSnakebarDeleteOpen(true);
    }
  };
  const handleEditOpen = (category) => {
    setSelectedCategory(category);
    setEditPopupOpen(true);
  };

  const handleEditClose = () => {
    setSelectedCategory(null);
    setEditPopupOpen(false);
  };

  const handleChange = (e) => {
    formik.handleChange(e);
    formik.setFieldTouched(e.target.name, true, false);
  };

  const { userRole } = useSelector((state) => state.userSlice);
  const { categories } = useSelector((state) => state.category);
  console.log(userRole);
  console.log("categoires", categories);

  return (
    <>
      <section className="container">
        <div className="flex justify-between items-center">
          <div className="flex flex-col py-4">
            <h1 className="text-4xl font-bold">Sporcle Quiz Categories</h1>
            <p className="text-xl font-medium">
              Discover the most popular quizzes and quiz categories on Sporcle
            </p>
          </div>
          {userRole === "admin" && (
            <AddCategories
              open={open}
              handleOpen={handleOpen}
              handleClose={handleClose}
              handleChange={handleChange}
              formik={formik}
              snackbarOpen={snackbarOpen}
              setSnackbarOpen={setSnackbarOpen}
            />
          )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
          {categories?.map((category) => (
            <div
              key={category.id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105 "
            >
              <NavLink className='flex items-center justify-between' to={`/quizzes/${category.category}`}>
                <h3 className={`text-lg font-semibold ${(totalQuizzes[category.category] ) ? "text-green-500" : "text-red-500"
                }`}>
                  {category.category} 
                </h3>
                <ArrowForwardIosIcon className="!text-gray-300" />
              </NavLink>
              <p className=" border-2 my-2" />
              <div className="flex justify-between items-center mt-3">
               
                <div>
                  Total Attempted Quizzes:{" "}
                  {totalAttemptedQuizzes[category.category] || 0} out of{" "}
                  {totalQuizzes[category.category] || 0}
                </div>
                {userRole === "admin" && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(category)}
                      className=" rounded-full p-2"
                    >
                      <EditIcon /> Edit
                    </button>
                    <button
                      onClick={() => handleConfirmationOpen(category)}
                      className="text-red-500 hover:text-white hover:bg-red-500 rounded-full p-2"
                    >
                      <DeleteIcon /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Confirmation Dialog */}
      <Dialog
        open={confirmationOpen}
        onClose={handleConfirmationClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this category?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button onClick={handleConfirmationClose} className="text-[#385A64]">
            Cancel
          </button>
          <button onClick={handleDelete} className="text-red-500" autoFocus>
            Delete
          </button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={editPopupOpen} // Use the new state variable for the dialog
        onClose={handleEditClose} // Use the new close function
        aria-labelledby="edit-dialog-title"
        aria-describedby="edit-dialog-description"
      >
        <DialogTitle id="edit-dialog-title">Edit Category</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="editedCategory"
                className="block text-gray-700 font-semibold mb-1"
              >
                New Category Name
              </label>
              <input
                type="text"
                id="editedCategory"
                name="editedCategory"
                placeholder="Enter the new category name"
                className={`border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 w-full ${
                  formik.touched.editedCategory && formik.errors.editedCategory
                    ? "border-red-500"
                    : ""
                }`}
                onChange={handleChange}
                value={formik.values.editedCategory}
                onBlur={formik.handleBlur}
              />
              {formik.touched.editedCategory &&
                formik.errors.editedCategory && (
                  <p className="text-red-500">{formik.errors.editedCategory}</p>
                )}
            </div>
            <DialogActions>
              <button onClick={handleEditClose}>Cancel</button>
              <button
                type="submit"
                className="py-2 px-12 text-center bg-[#385A64] shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg"
              >
                Save
              </button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

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
          Category Deleted Successfully!
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default HomePage;
