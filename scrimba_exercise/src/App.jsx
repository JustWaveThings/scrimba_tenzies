import React from 'react';
import Die from './component/Die';
import Confetti from './component/Confetti';

function App() {
	function newDice(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min) + min);
	}

	const diceArray = Array.from({ length: 10 }, (_, i) => {
		return {
			id: i,
			value: newDice(1, 6),
			isHeld: false,
		};
	});

	const [diceState, setDiceState] = React.useState(diceArray);
	const [tenzies, setTenzies] = React.useState(false);

	React.useEffect(() => checkForWin(), [diceState]);

	function checkForWin() {
		const check = diceState.map(dice => dice.isHeld);
		const isEveryDiceHeld = diceHeld => diceHeld === true;

		const sameValue = diceState.map(dice => dice.value);
		const compareValue = sameValue[0] || null;
		const allSameValue = same => same === compareValue;
		console.log(tenzies, 'tenzies value');
		if (check.every(isEveryDiceHeld) && sameValue.every(allSameValue)) {
			console.log('Game Won!');
			setTenzies(true);
		}
	}

	const dieValuesMapped = diceState.map(die => (
		<Die
			key={die.id}
			value={die.value}
			isHeld={die.isHeld}
			id={die.id}
			holdDice={holdDice}
		/>
	));

	function holdDice(e, id) {
		e.stopPropagation();
		setDiceState(prevState =>
			prevState.map(state =>
				state.id === id ? { ...state, isHeld: !state.isHeld } : state
			)
		);
	}

	function rollHandler() {
		if (tenzies) {
			setTenzies(false);
			setDiceState(diceArray);
		} else {
			setDiceState(
				diceState.map(obj =>
					!obj.isHeld ? { ...obj, value: newDice(1, 6) } : { ...obj }
				)
			);
		}
	}

	return (
		<main>
			<h1 className="title">Tenzies</h1>
			<p className="instructions">
				Roll until all dice are the same. Click each die to freeze it at its
				current value between rolls.
			</p>
			<div className="dice-holder">{dieValuesMapped}</div>
			<button onClick={() => rollHandler()}>
				{tenzies ? `Start New Game` : `Roll Again`}
			</button>
			{tenzies && <Confetti />}
		</main>
	);
}

export default App;
