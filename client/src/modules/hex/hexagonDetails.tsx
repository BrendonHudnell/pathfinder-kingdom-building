import React, { ReactElement } from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@material-ui/core';

import { ExplorationState, SpecialTerrainType, TerrainType } from './hexUtils';
import {
	explorationStateUpdated,
	HexData,
	nameUpdated,
	settlementIdUpdated,
	specialTerrainUpdated,
	terrainUpdated,
} from './hexSlice';
import { useAppDispatch } from '../../components/store';
import { addNewSettlement } from '../settlement';
import { addNewDistrict } from '../district';
import { LinkButton } from '../../components/linkButton';

export interface HexagonDetailsProps {
	open: boolean;
	hexData: HexData;
	onClose: () => void;
}

export function HexagonDetails(props: HexagonDetailsProps): ReactElement {
	const { hexData, open, onClose } = props;
	const hexId = hexData.id;

	const dispatch = useAppDispatch();

	async function addSettlement(): Promise<void> {
		// TODO fix when server is hooked up
		const settlementId = Math.floor(Math.random() * 10000);
		const districtId = Math.floor(Math.random() * 10000);

		dispatch(addNewDistrict({ districtId, settlementId }));
		dispatch(addNewSettlement({ hexId, settlementId, districtId }));
		dispatch(settlementIdUpdated({ hexId, settlementId }));
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
				<Grid container spacing={2} alignItems="center">
					<Grid item>
						<Typography>Terrain type:</Typography>
					</Grid>
					<Grid item>
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
					</Grid>
				</Grid>

				<Grid container spacing={2} alignItems="center">
					<Grid item>
						<Typography>Exploration status:</Typography>
					</Grid>
					<Grid item>
						<Select
							style={{ minWidth: '10ch' }}
							value={hexData.explorationState}
							onChange={(e) =>
								dispatch(
									explorationStateUpdated({
										hexId,
										explorationState: e.target.value as ExplorationState,
									})
								)
							}
						>
							{Object.values(ExplorationState).map((state) => (
								<MenuItem key={state} value={state}>
									{state}
								</MenuItem>
							))}
						</Select>
					</Grid>
				</Grid>

				<Grid container spacing={2} alignItems="center">
					<Grid item>
						<Typography>Special terrain:</Typography>
					</Grid>
					<Grid item>
						<Select
							style={{ minWidth: '10ch' }}
							value={hexData.specialTerrain}
							onChange={(e) =>
								dispatch(
									specialTerrainUpdated({
										hexId,
										specialTerrain: e.target.value as SpecialTerrainType,
									})
								)
							}
						>
							{Object.values(SpecialTerrainType).map((type) => (
								<MenuItem key={type} value={type}>
									{type}
								</MenuItem>
							))}
						</Select>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				{hexData.explorationState === ExplorationState.CLEARED ? (
					<Button variant="outlined" onClick={addSettlement}>
						Create Settlement
					</Button>
				) : hexData.explorationState === ExplorationState.CLAIMED ? (
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
