import { Square } from "../Square";

export function Results({ resetGame, results }) {
	return (
		<>
			<section className="results">
				<header className="results__header">
					<h2 className="results__title">{results === false ? "Draw" : "Win:"}</h2>
					{results && <Square>{results}</Square>}
				</header>

				<footer className="results__footer">
					<button onClick={resetGame} className="results__button">
						Start Again
					</button>
				</footer>
			</section>
		</>
	);
}
