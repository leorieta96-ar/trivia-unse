import React, { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";

interface NickFormProps {
  onSubmit: ({ name, dni }: { name: string; dni: string }) => void;
}

const NickForm: React.FC<NickFormProps> = ({ onSubmit }) => {
  const [values, setValues] = useState({
    name: "",
    dni: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (values.name.trim() && values.name.trim()) {
      onSubmit(values);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography
        variant="subtitle1"
        fontFamily="Montserrat"
        fontSize={{ xs: 16, lg: 23 }}
        fontWeight="bold"
      >
        Esta trivia consta de 20 preguntas, con 4 alternativas cada una, referidas a Software e Inteligencia Artificial.
        <br />
        Todas las respuestas encontrarás en el STAND 10, por ello te recomendamos pasar por allí antes de responder. PUEDES JUGAR SOLO UNA VEZ.
        <br />
        Gana quien responda correctamente la mayor cantidad de preguntas, en el menor tiempo.
        <br />
        El premio se entregará a las 12.45h en la Plaza Libertad, con tu DNI.
        <br />
      </Typography>
      <Typography
        variant="subtitle1"
        fontFamily="Montserrat"
        fontSize={{ xs: 13, lg: 23 }}
      >
        Ha sido desarrollada por José L. y Leandro O., estudiantes del Instituto de Investigación en Informática y Sistemas de Información de la Facultad de Ciencias Exactas y Tecnologías de la UNSE.
      </Typography>
      <TextField
        label="Ingresa tu Nick"
        variant="outlined"
        fullWidth
        name="name"
        value={values.name}
        onChange={handleChange}
        margin="normal"
        required
        sx={{ fontSize: 40 }}
      />
      <TextField
        label="Ingresa tu DNI"
        variant="outlined"
        fullWidth
        name="dni"
        value={values.dni}
        onChange={handleChange}
        required
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
