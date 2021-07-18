import React, { ReactElement } from 'react';
import { Chip, makeStyles } from '@material-ui/core';
import { useDrop } from 'react-dnd';

import { useAppDispatch } from '../../components/store';
import { buildingRemoved } from '../settlement';
import { lotCleared } from './districtSlice';
import {
	getBuildingDisplayTypeByLotType,
	getLotOffsetByLotType,
	getSizeByLotType,
} from './buildingUtils';
import { BuildingDragItem } from './buildingTypes';

const useStyles = makeStyles({
	root: {
		height: 80,
		width: 160,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		fontWeight: 'bold',
		fontSize: 20,
	},
	isActive: {
		backgroundColor: 'darkred',
		color: 'white',
	},
	canDrop: {
		backgroundColor: 'red',
		color: 'white',
	},
});

export interface TrashcanProps {
	settlementId: number;
	districtId: number;
}

export function Trashcan(props: TrashcanProps): ReactElement {
	const { settlementId, districtId } = props;

	const classes = useStyles();

	const dispatch = useAppDispatch();

	function onDrop(item: BuildingDragItem): void {
		const { lotNumber, lotType } = item;

		const size = getSizeByLotType(lotType[0]);
		const offset = getLotOffsetByLotType(lotType[0]);

		if (size === 1) {
			dispatch(lotCleared({ districtId, oldLotNumber: lotNumber }));
		} else if (size === 2) {
			dispatch(lotCleared({ districtId, oldLotNumber: lotNumber + offset[0] }));
			dispatch(lotCleared({ districtId, oldLotNumber: lotNumber + offset[1] }));
		} else {
			dispatch(lotCleared({ districtId, oldLotNumber: lotNumber + offset[0] }));
			dispatch(lotCleared({ districtId, oldLotNumber: lotNumber + offset[1] }));
			dispatch(lotCleared({ districtId, oldLotNumber: lotNumber + offset[2] }));
			dispatch(lotCleared({ districtId, oldLotNumber: lotNumber + offset[3] }));
		}

		const displayType = getBuildingDisplayTypeByLotType(lotType[0]);
		dispatch(buildingRemoved({ settlementId, building: displayType }));
	}

	const [{ isOver, canDrop }, drop] = useDrop(
		() => ({
			accept: 'LotCard',
			drop: onDrop,
			canDrop: (item) => item.lotNumber !== -1,
			collect: (monitor) => ({
				isOver: monitor.isOver(),
				canDrop: monitor.canDrop(),
			}),
		}),
		[districtId]
	);

	const isActive = isOver && canDrop;

	return (
		<Chip
			ref={drop}
			className={`${classes.root} ${
				isActive ? classes.isActive : canDrop ? classes.canDrop : ''
			}`}
			label="Trash"
		/>
	);
}
