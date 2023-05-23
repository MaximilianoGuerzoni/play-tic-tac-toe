import { WINNER_COMBOS } from "../constans"

export const checkWinnerFrom = (boardToCheck) => {
    //Revisamos todas las combinaciones ganadores
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if
        (
        boardToCheck[a] &&
        boardToCheck[a] == boardToCheck[b] &&
        boardToCheck[b] == boardToCheck[c]
  
      ) {
        return boardToCheck[a]
      }
    }
    //Si no hay ganador
    return null
  }
  