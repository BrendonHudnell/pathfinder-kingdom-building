import React, { ReactElement } from 'react';
import { Box, Grid, makeStyles, Table, TableBody } from '@material-ui/core';
import { BuildingList } from './buildingList';
import { Trashcan } from './trashcan';
import { LotTableRow } from './lotTableRow';
import {
	getDistrictFortificationColor,
	getDistrictTerrainColor,
} from './districtUtils';
import { District } from './districtSlice';

const useStyles = makeStyles({
	dirt: {
		background: 'tan',
	},
	paved: {
		background: 'grey',
	},
	sewers: {
		background: 'darkslategray',
	},
	pavedAndSewers: {
		background: `repeating-linear-gradient(
			45deg,
			grey,
			grey 30px,
			darkslategray 30px,
			darkslategray 60px
		)`,
	},
});

export interface LotsViewProps {
	district: District;
}

export function LotsView(props: LotsViewProps): ReactElement {
	const { district } = props;

	const classes = useStyles();

	const terrainNorth = getDistrictTerrainColor(district.north.terrain);
	const terrainSouth = getDistrictTerrainColor(district.south.terrain);
	const terrainEast = getDistrictTerrainColor(district.east.terrain);
	const terrainWest = getDistrictTerrainColor(district.west.terrain);

	const fortificationNorth = getDistrictFortificationColor(
		district.north.wall,
		district.north.moat
	);
	const fortificationSouth = getDistrictFortificationColor(
		district.south.wall,
		district.south.moat
	);
	const fortificationEast = getDistrictFortificationColor(
		district.east.wall,
		district.east.moat
	);
	const fortificationWest = getDistrictFortificationColor(
		district.west.wall,
		district.west.moat
	);

	const backgroundClass =
		district.paved && district.sewers
			? classes.pavedAndSewers
			: district.paved
			? classes.paved
			: district.sewers
			? classes.sewers
			: classes.dirt;

	return (
		<Grid container spacing={3}>
			<Grid item>
				<Grid container direction="column" alignItems="center" spacing={3}>
					<Grid item />
					<Grid item>
						<BuildingList />
					</Grid>
					<Grid item>
						<Trashcan districtId={district.id} />
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs>
				<Box
					marginTop={3}
					border={24}
					style={{
						borderLeftColor: fortificationEast,
						borderRightColor: fortificationWest,
						borderTopColor: fortificationNorth,
						borderBottomColor: fortificationSouth,
						width: 'fit-content',
					}}
				>
					<Box
						border={24}
						style={{
							borderLeftColor: terrainEast,
							borderRightColor: terrainWest,
							borderTopColor: terrainNorth,
							borderBottomColor: terrainSouth,
							width: 'fit-content',
						}}
					>
						<Table
							size="small"
							style={{ width: 'fit-content' }}
							className={backgroundClass}
						>
							<TableBody>
								<LotTableRow
									district={district}
									inclusiveStart={0}
									exclusiveEnd={6}
								/>
								<LotTableRow
									district={district}
									inclusiveStart={6}
									exclusiveEnd={12}
								/>
								<LotTableRow
									district={district}
									inclusiveStart={12}
									exclusiveEnd={18}
								/>
								<LotTableRow
									district={district}
									inclusiveStart={18}
									exclusiveEnd={24}
								/>
								<LotTableRow
									district={district}
									inclusiveStart={24}
									exclusiveEnd={30}
								/>
								<LotTableRow
									district={district}
									inclusiveStart={30}
									exclusiveEnd={36}
								/>
							</TableBody>
						</Table>
					</Box>
				</Box>
			</Grid>
		</Grid>
	);
}
