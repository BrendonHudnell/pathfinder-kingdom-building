import React, { ReactElement } from 'react';
import {
	makeStyles,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from '@material-ui/core';

import { useAppSelector } from '../../components/store';
import { selectAllEvents } from './eventsSlice';
import { EventListRow } from './eventListRow';

const useStyles = makeStyles((theme) => {
	return {
		container: {
			padding: theme.spacing(3),
		},
	};
});

export function EventListView(): ReactElement {
	const classes = useStyles();

	const events = useAppSelector((state) => selectAllEvents(state));

	return (
		<Paper className={classes.container}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell>Size</TableCell>
						<TableCell>Hex</TableCell>
						<TableCell>Economy</TableCell>
						<TableCell>Stability</TableCell>
						<TableCell>Loyalty</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{events.map((event) => (
						<EventListRow key={`events.${event.id}`} event={event} />
					))}
				</TableBody>
			</Table>
		</Paper>
	);
}
