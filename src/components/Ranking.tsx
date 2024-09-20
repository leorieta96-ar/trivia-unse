import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const HighlightedTableRow = styled(StyledTableRow)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light, // Color destacado
  "&:hover": {
    backgroundColor: theme.palette.secondary.dark, // Cambia el color al pasar el ratón
  },
}));

interface Player {
  id: number;
  name: string;
  uuid: string;
  attempts: number;
  correct_answers: number;
  time_played: string;
}

interface RankingProps {
  ranking: Player[];
  highlightId: string; // El id que quieres resaltar
}

const Ranking: React.FC<RankingProps> = ({ ranking, highlightId }) => {
  return (
    <TableContainer component={Paper}>
      <Table stickyHeader aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell align="right">Nick</StyledTableCell>
            <StyledTableCell align="right">Intentos</StyledTableCell>
            <StyledTableCell align="right">
              Respuestas Correctas
            </StyledTableCell>
            <StyledTableCell align="right">Tiempo</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ranking.map((player, index) => {
            const isHighlighted = player.uuid === highlightId;
            console.log({ player, highlightId });
            return isHighlighted ? (
              <HighlightedTableRow key={player.uuid}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell align="left">{player.name}</StyledTableCell>
                <StyledTableCell align="center">
                  {player.attempts}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {player.correct_answers}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {player.time_played}
                </StyledTableCell>
              </HighlightedTableRow>
            ) : (
              <StyledTableRow key={player.uuid}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell align="left">{player.name}</StyledTableCell>
                <StyledTableCell align="center">
                  {player.attempts}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {player.correct_answers}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {player.time_played}
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Ranking;
