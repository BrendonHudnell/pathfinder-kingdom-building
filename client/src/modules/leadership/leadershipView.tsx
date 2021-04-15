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
import { selectAllRoles } from './leadershipSlice';
import { RoleRow } from './roleRow';

const useStyles = makeStyles((theme) => {
	return {
		container: {
			padding: theme.spacing(3),
		},
	};
});

export function LeadershipView(): ReactElement {
	const classes = useStyles();

	const roles = useAppSelector((state) => selectAllRoles(state));

	return (
		<Paper className={classes.container}>
			<Table size="small">
				<TableHead>
					<TableRow>
						<TableCell>Filled?</TableCell>
						<TableCell>Role</TableCell>
						<TableCell>Held By</TableCell>
						<TableCell>Attribute</TableCell>
						<TableCell>Ability Bonus</TableCell>
						<TableCell>Leadership?</TableCell>
						<TableCell>Benefit</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{roles.map((role) => (
						<RoleRow key={role.id} role={role} />
					))}
				</TableBody>
			</Table>
		</Paper>
	);
}
