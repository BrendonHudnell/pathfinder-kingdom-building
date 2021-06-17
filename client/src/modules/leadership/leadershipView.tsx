import React, { ReactElement } from 'react';
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
import {
	secondRulerToggled,
	selectAllRoles,
	viceroyAdded,
} from './leadershipSlice';
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
	const skillsEnabled = useAppSelector(
		(state) => state.kingdom.options.leadershipSkills
	);

	const consortOrSecondRuler = roles.find(
		(role) => role.name === 'Consort' || role.name === 'Second Ruler'
	);
	const secondRuler = consortOrSecondRuler?.name === 'Second Ruler' ?? false;

	function toggleSecondRuler(): void {
		if (secondRuler) {
			dispatch(
				secondRulerToggled({
					id: consortOrSecondRuler?.id ?? -1,
					changes: { name: 'Consort' },
				})
			);
		} else {
			dispatch(
				secondRulerToggled({
					id: consortOrSecondRuler?.id ?? -1,
					changes: { name: 'Second Ruler' },
				})
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
						{skillsEnabled ? <TableCell>Related Skill</TableCell> : null}
						{skillsEnabled ? <TableCell>Skill Bonus</TableCell> : null}
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
						<RoleRow key={role.id} role={role} skillsEnabled={skillsEnabled} />
					))}
					<TableRow>
						<TableCell colSpan={8}>
							<Button
								variant="contained"
								color="primary"
								onClick={() => dispatch(viceroyAdded())}
							>
								Add Viceroy
							</Button>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</Paper>
	);
}
