import React, { Fragment, ReactElement, useState } from 'react';
import {
	Dialog,
	DialogTitle,
	FormControlLabel,
	Switch,
	List,
	ListItem,
	Button,
	Typography,
	makeStyles,
} from '@material-ui/core';

import { useAppDispatch, useAppSelector } from '../../components/store';
import {
	kingdomFameUpdated,
	kingdomGovernmentUpdated,
	kingdomModifiersUpdated,
	leadershipSkillsUpdated,
	settlementGovernmentUpdated,
	settlementModifiersUpdated,
} from './kingdomSlice';

const useStyles = makeStyles((theme) => {
	return {
		indented: {
			marginLeft: theme.spacing(3),
		},
		doubleIndented: {
			marginLeft: theme.spacing(6),
		},
	};
});

export function OptionsDialogButton(): ReactElement {
	const [open, setOpen] = useState(false);

	const classes = useStyles();

	const dispatch = useAppDispatch();

	const options = useAppSelector((state) => state.kingdom.options);

	return (
		<Fragment>
			<Button onClick={() => setOpen(true)} color="inherit">
				<Typography>Options</Typography>
			</Button>
			<Dialog open={open} onClose={() => setOpen(false)}>
				<DialogTitle>Options</DialogTitle>
				<List>
					<ListItem>
						<FormControlLabel
							control={
								<Switch
									checked={options.settlementModifiers}
									onChange={(e) =>
										dispatch(settlementModifiersUpdated(e.target.checked))
									}
								/>
							}
							label="Settlement Modifiers"
						/>
					</ListItem>
					<ListItem>
						<FormControlLabel
							className={classes.indented}
							control={
								<Switch
									disabled={!options.settlementModifiers}
									checked={options.settlementGovernment}
									onChange={(e) =>
										dispatch(settlementGovernmentUpdated(e.target.checked))
									}
								/>
							}
							label="Settlement Forms of Government"
						/>
					</ListItem>
					<ListItem>
						<FormControlLabel
							className={classes.indented}
							control={
								<Switch
									disabled={!options.settlementModifiers}
									checked={options.kingdomModifiers}
									onChange={(e) =>
										dispatch(kingdomModifiersUpdated(e.target.checked))
									}
								/>
							}
							label="Kingdom Modifiers"
						/>
					</ListItem>
					<ListItem>
						<FormControlLabel
							className={classes.doubleIndented}
							control={
								<Switch
									disabled={
										!options.settlementModifiers || !options.kingdomModifiers
									}
									checked={options.kingdomGovernment}
									onChange={(e) =>
										dispatch(kingdomGovernmentUpdated(e.target.checked))
									}
								/>
							}
							label="Kingdom Forms of Government"
						/>
					</ListItem>
					<ListItem>
						<FormControlLabel
							className={classes.indented}
							control={
								<Switch
									disabled={!options.settlementModifiers}
									checked={options.kingdomFame}
									onChange={(e) =>
										dispatch(kingdomFameUpdated(e.target.checked))
									}
								/>
							}
							label="Kingdom Fame/Infamy"
						/>
					</ListItem>
					<ListItem>
						<FormControlLabel
							control={
								<Switch
									checked={options.leadershipSkills}
									onChange={(e) =>
										dispatch(leadershipSkillsUpdated(e.target.checked))
									}
								/>
							}
							label="Leadership Skills"
						/>
					</ListItem>
				</List>
			</Dialog>
		</Fragment>
	);
}
