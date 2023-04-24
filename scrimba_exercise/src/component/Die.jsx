import React from 'react';

function Die(props) {
	return (
		<div
			className={props.isHeld ? 'die-held Die' : 'Die'}
			onClick={e => props.holdDice(e, props.id)}
		>
			{props.value}
		</div>
	);
}

export default Die;
