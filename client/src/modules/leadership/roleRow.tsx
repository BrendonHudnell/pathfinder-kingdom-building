import React, { ReactElement } from 'react';
import {
	Button,
	Checkbox,
	makeStyles,
	MenuItem,
	Select,
	TableCell,
	TableRow,
	TextField,
	Typography,
} from '@material-ui/core';

import { useAppDispatch } from '../../components/store';
import {
	abilityBonusUpdated,
	attributeUpdated,
	benefitUpdated,
	heldByUpdated,
	leadershipToggled,
	Role,
	skillBonusUpdated,
	vacantToggled,
	viceroyDeleted,
} from './leadershipSlice';
import { roleBenefitList, roleConstantsList } from './leadershipUtils';

const useStyles = makeStyles((theme) => {
	return {
		disabled: {
			color: theme.palette.text.disabled,
		},
	};
});

export interface RoleRowProps {
	role: Role;
	skillsEnabled: boolean;
}

export function RoleRow(props: RoleRowProps): ReactElement {
	const {
		id,
		vacant,
		name,
		heldBy,
		attribute,
		abilityBonus,
		skillBonus,
		leadership,
		benefit,
	} = props.role;

	const { attributeOptions, skillAbility } = roleConstantsList.find(
		(el) => el.name === name
	)!;

	const classes = useStyles();

	const dispatch = useAppDispatch();

	return (
		<TableRow>
			<TableCell padding="checkbox">
				<Checkbox
					checked={!vacant}
					onChange={() => dispatch(vacantToggled(id))}
				/>
			</TableCell>
			<TableCell>
				<Typography className={vacant ? classes.disabled : ''}>
					{name}
				</Typography>
			</TableCell>
			<TableCell>
				<TextField
					style={{ minWidth: '30ch' }}
					disabled={vacant}
					value={heldBy}
					onChange={(e) =>
						dispatch(heldByUpdated({ id, heldBy: e.target.value }))
					}
				/>
			</TableCell>
			<TableCell>
				{attributeOptions.length > 1 ? (
					<Select
						disabled={vacant}
						style={{ minWidth: '13ch' }}
						value={attribute}
						onChange={(e) =>
							dispatch(
								attributeUpdated({ id, attribute: e.target.value as string })
							)
						}
					>
						{attributeOptions.map((option) => (
							<MenuItem key={`${id}.${option}`} value={option}>
								{option}
							</MenuItem>
						))}
					</Select>
				) : (
					<Typography className={vacant ? classes.disabled : ''}>
						{attributeOptions[0]}
					</Typography>
				)}
			</TableCell>
			<TableCell>
				<TextField
					disabled={vacant}
					type="number"
					value={abilityBonus}
					onChange={(e) =>
						dispatch(
							abilityBonusUpdated({ id, abilityBonus: Number(e.target.value) })
						)
					}
				/>
			</TableCell>
			<TableCell padding="checkbox">
				<Checkbox
					disabled={vacant}
					checked={leadership}
					onChange={() => dispatch(leadershipToggled(id))}
				/>
			</TableCell>
			{props.skillsEnabled ? (
				<TableCell className={vacant ? classes.disabled : ''}>
					<Typography>{skillAbility}</Typography>
				</TableCell>
			) : null}
			{props.skillsEnabled ? (
				<TableCell>
					<TextField
						disabled={vacant}
						type="number"
						value={skillBonus}
						onChange={(e) =>
							dispatch(
								skillBonusUpdated({ id, skillBonus: Number(e.target.value) })
							)
						}
					/>
				</TableCell>
			) : null}
			<TableCell colSpan={name === 'Viceroy' ? 1 : 2}>
				{name === 'Ruler' || name === 'Second Ruler' || name === 'Spymaster' ? (
					<Select
						disabled={vacant}
						style={{ minWidth: '30ch' }}
						value={benefit}
						onChange={(e) =>
							dispatch(
								benefitUpdated({ id, benefit: e.target.value as string })
							)
						}
					>
						{name === 'Ruler' || name === 'Second Ruler'
							? roleBenefitList.map((benefit) => (
									<MenuItem key={`${id}.${benefit}`} value={benefit}>
										{benefit}
									</MenuItem>
							  ))
							: roleBenefitList.slice(0, 3).map((benefit) => (
									<MenuItem key={`${id}.${benefit}`} value={benefit}>
										{benefit}
									</MenuItem>
							  ))}
					</Select>
				) : (
					<Typography className={vacant ? classes.disabled : ''}>
						{benefit}
					</Typography>
				)}
			</TableCell>
			{name === 'Viceroy' ? (
				<TableCell>
					<Button
						variant="contained"
						color="secondary"
						onClick={() => dispatch(viceroyDeleted(id))}
					>
						Remove Viceroy
					</Button>
				</TableCell>
			) : null}
		</TableRow>
	);
}
