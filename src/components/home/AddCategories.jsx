import {
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import React from "react";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

const AddCategories = ({
  open,
  handleOpen,
  handleClose,
  formik,
  handleChange,
  snackbarOpen,
  setSnackbarOpen,
}) => {
  return (
    <Container>
      <button
        className="bg-[#385A64] text-white shadow-md px-3 py-2 rounded text-lg"
        onClick={handleOpen}
      >
        <ControlPointIcon />
        Add Category
      </button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Categories</DialogTitle>
        <DialogContent>
          <div className="form-container">
            <form onSubmit={formik.handleSubmit}>
              {/* Category Text Field  */}
              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block text-gray-700 font-semibold mb-1"
                >
                  Category Name
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  placeholder="Enter your Category"
                  className={`border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 w-full ${
                    formik.touched.category && formik.errors.category
                      ? "border-red-500"
                      : ""
                  }`}
                  onChange={handleChange}
                  value={formik.values.category}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.category && formik.errors.category && (
                  <p className="text-red-500">{formik.errors.category}</p>
                )}
              </div>

              {/* Dialog Actions  */}
              <DialogActions>
                <button onClick={handleClose}>Cancel</button>
                <button
                  type="submit"
                  className="py-2 px-12 text-center bg-[#385A64] shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg"
                >
                  submit
                </button>
              </DialogActions>
            </form>
          </div>
        </DialogContent>
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
          Category Added Successfully!
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default AddCategories;
