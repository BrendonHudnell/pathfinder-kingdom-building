import React, { ReactElement, useState } from 'react';
import {
	Button,
	makeStyles,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from '@material-ui/core';

import { useAppDispatch, useAppSelector } from '../../components/store';
import { secondRulerToggled, selectAllRoles } from './leadershipSlice';
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

	const dispatch = useAppDispatch();

	const roles = useAppSelector((state) => selectAllRoles(state));

	const [secondRuler, setSecondRuler] = useState(
		roles.map((role) => role.name).includes('Second Ruler')
	);

	function toggleSecondRuler(): void {
		setSecondRuler(!secondRuler);
		if (secondRuler) {
			dispatch(secondRulerToggled({ id: 2, changes: { name: 'Consort' } }));
		} else {
			dispatch(
				secondRulerToggled({ id: 2, changes: { name: 'Second Ruler' } })
			);
		}
	}

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
						<TableCell>
							<Button
								variant="contained"
								color="primary"
								onClick={() => toggleSecondRuler()}
							>
								{secondRuler ? 'Remove Second Ruler' : 'Add Second Ruler'}
							</Button>
						</TableCell>
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
