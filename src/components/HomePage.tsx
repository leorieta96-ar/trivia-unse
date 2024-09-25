import React, { useState } from "react";
import NickForm from "./NickForm";
import Trivia from "./Trivia";
import servicePlayers from "../services/players";
import serviceQuestions from "../services/questions";
import Ranking from "./Ranking";
import { Snackbar, Alert } from "@mui/material";

const HomePage = ({ setTrivia }: { setTrivia: Function }) => {
  const [nick, setNick] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [questions, setQuestions] = useState([]);
  const [showTrivia, setShowTrivia] = useState<boolean>(false);
  const [ranking, setRanking] = useState([]);
  const [showRankinkg, setShowRankinkg] = useState<boolean>(false);

  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "error"
  );

  const handleNickSubmit = async ({
    name,
    dni,
  }: {
    name: string;
    dni: string;
  }) => {
    setNick(name);
    try {
      const id = await servicePlayers.create({ name, dni });
      setId(id);
      await getQuestions();
    } catch (error: any) {
      console.log("eeeee", error);
      if (error.response && error.response.status === 422) {
        setSnackbarMessage("Usuario existente");
      } else {
        setSnackbarMessage("Error - reintente");
      }
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const getQuestions = async () => {
    const arrayQuestions = await serviceQuestions.get();
    setQuestions(arrayQuestions);
    setShowTrivia(true);
    setTrivia(true);
  };

  const handleTrivia = async ({
    id,
    time_played,
    correct_answers,
  }: {
    id: string;
    time_played: string;
    correct_answers: number;
  }) => {
    await servicePlayers.putScore(id, {
      correct_answers,
      time_played,
    });
    setRanking(await servicePlayers.getRanking());
    setShowRankinkg(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (showRankinkg) return <Ranking ranking={ranking} highlightId={id} />;
  if (!showTrivia)
    return (
      <>
        <NickForm onSubmit={handleNickSubmit} />
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </>
    );
  return (
    <>
      <Trivia
        id={id}
        nick={nick}
        questions={questions}
        handleTivia={handleTrivia}
      />
    </>
  );
};

export default HomePage;
