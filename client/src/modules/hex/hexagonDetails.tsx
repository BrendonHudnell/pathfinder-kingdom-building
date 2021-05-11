import React, { ReactElement } from 'react';
import {
	Button,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControlLabel,
	Grid,
	makeStyles,
	MenuItem,
	Select,
	Table,
	TableBody,
	TableCell,
	TableRow,
	TextField,
	Typography,
} from '@material-ui/core';
import { unwrapResult } from '@reduxjs/toolkit';

import { useAppDispatch } from '../../components/store';
import { LinkButton } from '../../components/linkButton';
import { addNewSettlement } from '../settlement';
import { ExplorationState, SpecialTerrainType, TerrainType } from './hexUtils';
import {
	explorationStateUpdated,
	HexData,
	nameUpdated,
	notesUpdated,
	pointsOfInterestUpdated,
	settlementIdUpdated,
	specialTerrainAdded,
	specialTerrainRemoved,
	terrainUpdated,
} from './hexSlice';

const useStyles = makeStyles({
	borderlessLeft: {
		textAlign: 'end',
		verticalAlign: 'top',
		borderBottom: 'none',
		paddingLeft: 0,
		paddingRight: 0,
	},
	borderlessRight: {
		borderBottom: 'none',
	},
});

export interface HexagonDetailsProps {
	open: boolean;
	hexData: HexData;
	onClose: () => void;
}

export function HexagonDetails(props: HexagonDetailsProps): ReactElement {
	const { hexData, open, onClose } = props;
	const hexId = hexData.id;

	const classes = useStyles();

	const dispatch = useAppDispatch();

	async function addSettlement(): Promise<void> {
		// TODO fix when server is hooked up
		const settlementId = Math.floor(Math.random() * 10000);

		const resultAction = await dispatch(
			addNewSettlement({ hexId, settlementId })
		);
		const newSettlement = unwrapResult(resultAction);
		dispatch(settlementIdUpdated({ hexId, settlementId: newSettlement.id }));

		dispatch(
			explorationStateUpdated({
				hexId,
				explorationState: ExplorationState.SETTLED,
			})
		);
	}

	function toggleSpecialTerrain(
		specialTerrain: SpecialTerrainType,
		isChecked: boolean
	): void {
		if (isChecked) {
			dispatch(specialTerrainAdded({ hexId, specialTerrain }));
		} else {
			dispatch(specialTerrainRemoved({ hexId, specialTerrain }));
		}
	}

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>
				<TextField
					value={hexData.name}
					onChange={(e) =>
						dispatch(nameUpdated({ hexId, name: e.target.value }))
					}
				/>
			</DialogTitle>
			<DialogContent>
				<Table size="small">
					<TableBody>
						<TableRow>
							<TableCell className={classes.borderlessLeft}>
								<Typography>Terrain type:</Typography>
							</TableCell>
							<TableCell className={classes.borderlessRight}>
								<Select
									style={{ minWidth: '10ch' }}
									value={hexData.terrain}
									onChange={(e) =>
										dispatch(
											terrainUpdated({
												hexId,
												terrain: e.target.value as TerrainType,
											})
										)
									}
								>
									{Object.values(TerrainType).map((hexType) => (
										<MenuItem key={hexType} value={hexType}>
											{hexType}
										</MenuItem>
									))}
								</Select>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className={classes.borderlessLeft}>
								<Typography>Exploration status:</Typography>
							</TableCell>
							<TableCell className={classes.borderlessRight}>
								<Typography>{hexData.explorationState}</Typography>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className={classes.borderlessLeft}>
								<Typography>Special terrain:</Typography>
							</TableCell>
							<TableCell className={classes.borderlessRight}>
								<Grid container>
									{Object.values(SpecialTerrainType).map((type) => (
										<Grid item key={`specialterrain-${hexId}-${type}`}>
											<FormControlLabel
												control={
													<Checkbox
														checked={hexData.specialTerrain.includes(type)}
														onChange={(e) =>
															toggleSpecialTerrain(type, e.target.checked)
														}
													/>
												}
												label={type}
											/>
										</Grid>
									))}
								</Grid>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className={classes.borderlessLeft}>
								<Typography>Points of interest:</Typography>
							</TableCell>
							<TableCell className={classes.borderlessRight}>
								<TextField
									variant="outlined"
									multiline
									rows={4}
									rowsMax={4}
									value={hexData.pointsOfInterest}
									onChange={(e) =>
										dispatch(
											pointsOfInterestUpdated({
												hexId,
												pointsOfInterest: e.target.value,
											})
										)
									}
								/>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className={classes.borderlessLeft}>
								<Typography>Notes:</Typography>
							</TableCell>
							<TableCell className={classes.borderlessRight}>
								<TextField
									variant="outlined"
									multiline
									rows={4}
									rowsMax={4}
									value={hexData.notes}
									onChange={(e) =>
										dispatch(notesUpdated({ hexId, notes: e.target.value }))
									}
								/>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</DialogContent>
			<DialogActions>
				{hexData.explorationState === ExplorationState.UNEXPLORED ? (
					<Button
						variant="outlined"
						onClick={() =>
							dispatch(
								explorationStateUpdated({
									hexId,
									explorationState: ExplorationState.EXPLORED,
								})
							)
						}
					>
						Explore Hex
					</Button>
				) : null}
				{hexData.explorationState === ExplorationState.EXPLORED ? (
					<Button
						variant="outlined"
						onClick={() =>
							dispatch(
								explorationStateUpdated({
									hexId,
									explorationState: ExplorationState.CLEARED,
								})
							)
						}
					>
						Clear Hex
					</Button>
				) : null}
				{hexData.explorationState === ExplorationState.CLEARED ? (
					<Button
						variant="outlined"
						onClick={() =>
							dispatch(
								explorationStateUpdated({
									hexId,
									explorationState: ExplorationState.CLAIMED,
								})
							)
						}
					>
						Claim Hex
					</Button>
				) : null}
				{hexData.explorationState === ExplorationState.CLAIMED ? (
					<Button variant="outlined" onClick={addSettlement}>
						Settle Hex
					</Button>
				) : hexData.explorationState === ExplorationState.SETTLED ? (
					<LinkButton
						variant="outlined"
						to={`/settlements/${hexData.settlementId}`}
						title="View Settlement"
					/>
				) : null}
			</DialogActions>
		</Dialog>
	);
}
