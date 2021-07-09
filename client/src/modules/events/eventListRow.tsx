import React, { ReactElement } from 'react';
import { TableCell, TableRow } from '@material-ui/core';

import { KingdomEvent } from './eventsSlice';

export interface EventRowProps {
	event: KingdomEvent;
}

export function EventListRow(props: EventRowProps): ReactElement {
	const { event } = props;

	return (
		<TableRow>
			<TableCell>{event.id}</TableCell>
			<TableCell>{event.eventType}</TableCell>
			<TableCell>{settlement.hexId}</TableCell>
			<TableCell>{economy}</TableCell>
			<TableCell>{stability}</TableCell>
			<TableCell>{loyalty}</TableCell>
		</TableRow>
	);
}
