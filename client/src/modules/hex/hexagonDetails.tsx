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
import { unrestAdded } from '../kingdom';
import {
	ExplorationState,
	getDefenseValue,
	getTerrainImprovements,
	SpecialTerrainType,
	TerrainImprovementType,
	TerrainType,
} from './hexUtils';
import {
	explorationStateUpdated,
	HexData,
	nameUpdated,
	notesUpdated,
	pointsOfInterestUpdated,
	settlementIdUpdated,
	specialTerrainAdded,
	specialTerrainRemoved,
	terrainImprovementAdded,
	terrainImprovementRemoved,
	terrainUpdated,
} from './hexSlice';

const useStyles = makeStyles({
	borderlessLeft: {
		textAlign: 'end',
		verticalAlign: 'center',
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

	const improvements = getTerrainImprovements(hexData);
	const defense = getDefenseValue(hexData);

	async function addSettlement(): Promise<void> {
		const resultAction = await dispatch(addNewSettlement(hexId));
		const newSettlement = unwrapResult(resultAction);
		dispatch(settlementIdUpdated({ hexId, settlementId: newSettlement.id }));

		dispatch(
			explorationStateUpdated({
				hexId,
				explorationState: ExplorationState.SETTLED,
			})
		);
	}

	function terrainImprovementDisabled(
		terrainImprovement: TerrainImprovementType
	): boolean {
		if (
			terrainImprovement === TerrainImprovementType.MINE ||
			terrainImprovement === TerrainImprovementType.QUARRY ||
			terrainImprovement === TerrainImprovementType.SAWMILL
		) {
			const mine = hexData.terrainImprovements.includes(
				TerrainImprovementType.MINE
			);
			const quarry = hexData.terrainImprovements.includes(
				TerrainImprovementType.QUARRY
			);
			const sawmill = hexData.terrainImprovements.includes(
				TerrainImprovementType.SAWMILL
			);

			if (terrainImprovement !== TerrainImprovementType.MINE && mine) {
				return true;
			}
			if (terrainImprovement !== TerrainImprovementType.QUARRY && quarry) {
				return true;
			}
			if (terrainImprovement !== TerrainImprovementType.SAWMILL && sawmill) {
				return true;
			}
		}
		return false;
	}

	function toggleTerrainImprovement(
		terrainImprovement: TerrainImprovementType,
		isChecked: boolean
	): void {
		if (isChecked) {
			if (
				terrainImprovement === TerrainImprovementType.FORT ||
				terrainImprovement === TerrainImprovementType.WATCHTOWER
			) {
				dispatch(unrestAdded(-1));
			}
			dispatch(terrainImprovementAdded({ hexId, terrainImprovement }));
		} else {
			dispatch(terrainImprovementRemoved({ hexId, terrainImprovement }));
		}
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
								<Typography noWrap>Terrain type:</Typography>
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
								<Typography noWrap>Exploration status:</Typography>
							</TableCell>
							<TableCell className={classes.borderlessRight}>
								<Typography>{hexData.explorationState}</Typography>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className={classes.borderlessLeft}>
								<Typography noWrap>Defense:</Typography>
							</TableCell>
							<TableCell className={classes.borderlessRight}>
								<Typography>{defense}</Typography>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className={classes.borderlessLeft}>
								<Typography noWrap>Terrain improvements:</Typography>
							</TableCell>
							<TableCell className={classes.borderlessRight}>
								<Grid container>
									{improvements.map((improvement) => (
										<Grid
											item
											key={`terrainimprovement-${hexId}-${improvement}`}
										>
											<FormControlLabel
												control={
													<Checkbox
														disabled={terrainImprovementDisabled(improvement)}
														checked={hexData.terrainImprovements.includes(
															improvement
														)}
														onChange={(e) =>
															toggleTerrainImprovement(
																improvement,
																e.target.checked
															)
														}
													/>
												}
												label={improvement}
											/>
										</Grid>
									))}
								</Grid>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className={classes.borderlessLeft}>
								<Typography noWrap>Special terrain:</Typography>
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
								<Typography noWrap>Points of interest:</Typography>
							</TableCell>
							<TableCell className={classes.borderlessRight}>
								<TextField
									variant="outlined"
									fullWidth
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
								<Typography noWrap>Notes:</Typography>
							</TableCell>
							<TableCell className={classes.borderlessRight}>
								<TextField
									variant="outlined"
									fullWidth
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
