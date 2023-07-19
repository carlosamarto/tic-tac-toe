import "./App.css";
import { TURNS } from "../Utils/Constants";
import { Square } from "../Components/Square";
import { Results } from "../Components/Results";
import { useGameLogic } from "../Hooks/useGameLogic";

// App Component
function App() {
	// Call the custom hook to get the game logics
	const { board, turns, results, resetGame, updateBoard } = useGameLogic();

	return (
		<main className="board">
			<h1 className={`board__title ${results !== null ? "board__title--results" : ""}`}>Tic Tac Toe</h1>

			{/* If results is different than null the game is over either a draw o someone win */}
			{results === null ? (
				<>
					<section className="board__turns">
						<p className="board__text">Turn:</p>

						<Square isSelected={turns === TURNS.X || turns === TURNS.O}>{turns}</Square>
					</section>

					<section className="board__game">
						{/* Print every square and use the index for the array */}
						{board.map((square, index) => {
							return (
								<Square key={index} index={index} updateBoard={updateBoard} checked={square}>
									{square}
								</Square>
							);
						})}
					</section>

					<button onClick={resetGame} className="board__button">
						Restart the game
					</button>
				</>
			) : (
				<Results resetGame={resetGame} results={results} />
			)}
		</main>
	);
}

export { App };
