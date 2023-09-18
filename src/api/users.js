import api from "./index";

export const fetchAllUsers = async () => {
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.get("/users", {
      params: {
        email: credentials.email,
      },
    });

    return response.data[0] || null;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

export const signupUser = async (userData) => {
  try {
    const response = await api.post("/users", userData);
    return response.data;
  } catch (error) {
    console.error("Error signing up user:", error);
    throw error;
  }
};

export const fetchUserById = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};
