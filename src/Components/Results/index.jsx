import { Square } from "../Square";
import PropTypes from "prop-types";

// Render UI Component
function Results({ resetGame, results, winner }) {
	return (
		<>
			<section className="results">
				<header className="results__header">
					<h2 className="results__title">{results === false ? "Draw" : "Win:"}</h2>
					{results && <Square>{winner}</Square>}
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

// Define prop types for the Results component
Results.propTypes = {
	resetGame: PropTypes.func.isRequired,
	results: PropTypes.bool,
	winner: PropTypes.string.isRequired,
};

export { Results };
