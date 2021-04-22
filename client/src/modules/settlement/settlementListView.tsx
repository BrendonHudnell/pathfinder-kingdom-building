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
import { selectAllSettlements } from './settlementSlice';
import { SettlementListRow } from './settlementListRow';

const useStyles = makeStyles((theme) => {
	return {
		container: {
			padding: theme.spacing(3),
		},
	};
});

export function SettlementListView(): ReactElement {
	const classes = useStyles();

	const settlements = useAppSelector((state) => selectAllSettlements(state));

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
						<TableCell>Unrest</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{settlements.map((settlement) => (
						<SettlementListRow
							key={`settlement.${settlement.id}`}
							settlement={settlement}
						/>
					))}
				</TableBody>
			</Table>
		</Paper>
	);
}
