import React, { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";

interface NickFormProps {
  onSubmit: (name: string) => void;
}

const NickForm: React.FC<NickFormProps> = ({ onSubmit }) => {
  const [nickInput, setNickInput] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nickInput.trim()) {
      onSubmit(nickInput);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography
        variant="body1"
        fontSize={{ xs: 11, lg: 25 }}
        sx={{ textWrap: "nowrap" }}
        textAlign="center"
      >
        Esta trivia consta de 20 preguntas.
        <br />
        Gana quien responda más preguntas correctas en el menor tiempo.
        <br />
        Se puede jugar entre las 10 y las 12.30 h del 28 de setiembre.
        <br />
        El premio se entregará a las 12.30h en el stand de la plaza Libertad
        <br />
      </Typography>
      <br />
      <br />
      <Typography
        variant="subtitle1"
        fontFamily="Montserrat"
        fontSize={{ xs: 10, lg: 23 }}
      >
        Esta trivia ha sido desarrollada por el Grupo de Computación Móvil en
        colaboración con el Grupo de IA, del Instituto de Investigación en
        Informática y Sistemas de Información de la Facultad de Ciencias Exactas
        y Tecnologías de la UNSE
      </Typography>
      <TextField
        label="Ingresa tu Nick"
        variant="outlined"
        fullWidth
        value={nickInput}
        onChange={(e) => setNickInput(e.target.value)}
        margin="normal"
        sx={{ fontSize: 40 }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        sx={{ fontSize: 20, fontWeight: "bold" }}
      >
        Comenzar Trivia
      </Button>
    </Box>
  );
};

export default NickForm;
