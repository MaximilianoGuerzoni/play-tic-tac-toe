import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'
import { Square } from './components/Square'
import { TURNS } from './constans'
import { checkWinnerFrom } from './logic board/board'
import { WinnerModal } from './components/winnerModal'






function App() {

  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board');
    return boardFromStorage ? JSON.parse(boardFromStorage) :
      Array(9).fill(null)

  });

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.x
  });

  const [winner, setWinner] = useState(null);

  const upDateBoard = (index) => {

    if (board[index] || winner) return

    //Update board
    const newBoard = [...board]
    newBoard[index] = turn;
    setBoard(newBoard);

    //Update turns
    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x;
    setTurn(newTurn);

    const boardFromStorage = window.localStorage.setItem('board', JSON.stringify(newBoard))
    const turnFromStorage = window.localStorage.setItem('turn', newTurn)

    //Check Winner
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }


  }

  //Check end game 
  const checkEndGame = (newBoard) => {
    return newBoard.every((Square) => Square !== null)
  }

  //Reset game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.x);
    setWinner(null);
  }

  return (
    <main className='board'>

      <h1>TA-TE-TI</h1>
      <button onClick={resetGame}> Reset Game </button>
      <section className='game'>
        {
          board.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                upDateBoard={upDateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.x} >
          {TURNS.x}
        </Square>
        <Square isSelected={turn === TURNS.o} >
          {TURNS.o}
        </Square>
      </section>
      <section>
        <WinnerModal resetGame={resetGame} winner={winner} />
      </section>
    </main>

  )
}

export default App
