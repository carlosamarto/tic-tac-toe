import { Square } from "../Square";

export function Results({ winner, resetGame }) {
	if (winner === null) return null;

	return (
		<section className="winner">
			<header className="winner__header">
				<h2 className="winner__title">{winner === false ? "Draw" : "The Winner:"}</h2>
				{winner && <Square>{winner}</Square>}
			</header>

			<footer className="winner__footer">
				<button onClick={resetGame} className="winner__button">
					Start Again
				</button>
			</footer>
		</section>
	);
}
