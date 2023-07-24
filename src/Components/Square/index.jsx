import PropTypes from "prop-types";

const Square = ({ children, index, isSelected, updateBoard, checked }) => {
	// Render UI Component
	return (
		<>
			<div
				onClick={() => updateBoard(index)}
				className={`square ${isSelected ? "square--selected" : ""} ${checked ? "square--checked" : ""}`}
			>
				{children}
			</div>
		</>
	);
};

// Define prop types for the Square component
Square.propTypes = {
	children: PropTypes.string,
	index: PropTypes.number,
	isSelected: PropTypes.bool,
	updateBoard: PropTypes.func,
	checked: PropTypes.string,
};

export { Square };
