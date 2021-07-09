import React, { ReactElement, useEffect } from 'react';
import { Typography } from '@material-ui/core';

import { useAppDispatch, useAppSelector } from '../../../components/store';
import { numberReducer } from '../../../components/arrayNumberReducer';
import { selectAllSettlements } from '../../settlement';
import { addNewEvent } from '../eventsSlice';
import { EventType } from '../eventsUtils';

export function ArchaeologicalFind(): ReactElement {
	const dispatch = useAppDispatch();

	const hasMuseum = !!useAppSelector((state) => selectAllSettlements(state))
		.map((settlement) => settlement.buildings.Museum)
		.reduce(numberReducer, 0);

	useEffect(() => {
		dispatch(
			addNewEvent({
				eventType: EventType.ARCHAEOLOGICAL_FIND,
				lore: 1,
				fame: hasMuseum ? 2 : 0,
			})
		);
	}, []);

	return (
		<Typography>
			A well-preserved ruin is found in your kingdom, with historical artifacts
			connected to the people who lived in your land long ago. Effect: Lore +1.
			If you have a Museum, the discoverers donate 10,000 gp worth of historical
			artifacts to its collection (if you have multiple Museums, choose one as
			the recipient).
		</Typography>
	);
}
