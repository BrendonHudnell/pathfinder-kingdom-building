import React, { Fragment, ReactElement, useState } from 'react';
import { makeStyles, Tooltip } from '@material-ui/core';
import { EntityId } from '@reduxjs/toolkit';
import { Hex, Hexagon, Text } from 'react-hexgrid';

import { useAppSelector } from '../../components/store';
import { HexagonDetails } from './hexagonDetails';
import { selectHexById } from './hexSlice';
import {
	ExplorationState,
	mapExplorationStateToBorderColor,
	mapTerrainToColor,
	TerrainType,
} from './hexUtils';
import { HexagonTooltip } from './hexagonTooltip';

const useStyles = makeStyles({
	small: {
		fontSize: '3px',
	},
	cursor: {
		cursor: 'pointer',
	},
});

export interface HexagonViewProps {
	hex: Hex;
	hexId: EntityId;
}

export function HexagonView(props: HexagonViewProps): ReactElement {
	const { hex, hexId } = props;

	const classes = useStyles();

	const [open, setOpen] = useState(false);
	const [over, setOver] = useState(false);

	const hexData = useAppSelector((state) => selectHexById(state, hexId));

	function handleClose(): void {
		setOpen(false);
	}

	const hexColor = mapTerrainToColor(hexData?.terrain ?? TerrainType.PLAINS);
	const hexBorderColor = mapExplorationStateToBorderColor(
		hexData?.explorationState ?? ExplorationState.UNEXPLORED
	);
	const strokeWidth =
		hexData?.explorationState === ExplorationState.CLAIMED ||
		hexData?.explorationState === ExplorationState.SETTLED
			? '.4px'
			: '.2px';
	const opacity = over ? 0.5 : 1;

	return (
		<Fragment>
			<Tooltip title={<HexagonTooltip hexData={hexData} />}>
				<Hexagon
					className={classes.cursor}
					q={hex.q}
					r={hex.r}
					s={hex.s}
					cellStyle={{
						fill: hexColor,
						stroke: hexBorderColor,
						strokeWidth: strokeWidth,
						opacity: opacity,
					}}
					onClick={() => setOpen(true)}
					onMouseEnter={() => setOver(true)}
					onMouseLeave={() => setOver(false)}
				>
					{/* TODO remove? */}
					<Text className={classes.small}>{hexData?.terrain}</Text>
				</Hexagon>
			</Tooltip>
			{hexData ? (
				<HexagonDetails hexData={hexData} open={open} onClose={handleClose} />
			) : null}
		</Fragment>
	);
}
