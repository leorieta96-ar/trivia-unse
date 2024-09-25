import axiosInstance from "../config/axios";

const players = {
  create: ({ name, dni }: { name: string; dni: string }) =>
    axiosInstance
      .post("/players", { name, dni })
      .then((response) => response.data.uuid)
      .catch((error) => {
        console.error("Error en la petición:", error);
        throw error;
      }),

  getRanking: () =>
    axiosInstance
      .get("/ranking")
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error en la petición:", error);
      }),
  putScore: (
    id: string,
    body: { correct_answers: number; time_played: string }
  ) => {
    return axiosInstance
      .put(`/players/${id}`, body)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error en la petición:", error);
      });
  },
};

export default players;
