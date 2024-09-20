import axiosInstance from "../config/axios";

const questions = {
  get: () =>
    axiosInstance
      .get("/questions")
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error en la petición:", error);
      })
};

export default questions;
