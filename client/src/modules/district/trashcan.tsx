import React, { ReactElement } from 'react';
import { Chip, makeStyles } from '@material-ui/core';
import { useDrop } from 'react-dnd';

import { useAppDispatch } from '../../components/store';
import { BuildingCardItem } from './buildingCard';
import { lotCleared } from './districtSlice';

const useStyles = makeStyles((theme) => {
	return {
		isActive: {
			backgroundColor: 'darkred',
			color: 'white',
			height: 80,
			width: 160,
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			fontWeight: 'bold',
			fontSize: 20,
			marginLeft: theme.spacing(3),
		},
		canDrop: {
			backgroundColor: 'red',
			color: 'white',
			height: 80,
			width: 160,
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			fontWeight: 'bold',
			fontSize: 20,
			marginLeft: theme.spacing(3),
		},
		default: {
			height: 80,
			width: 160,
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			fontWeight: 'bold',
			fontSize: 20,
			marginLeft: theme.spacing(3),
		},
	};
});

export function Trashcan(): ReactElement {
	const classes = useStyles();

	const dispatch = useAppDispatch();

	function onDrop(item: BuildingCardItem): void {
		const { districtId, lotNumber } = item;

		dispatch(lotCleared({ districtId, oldLotNumber: lotNumber }));
	}

	const [{ isOver, canDrop }, drop] = useDrop(() => ({
		accept: 'Building',
		drop: onDrop,
		canDrop: (item) => item.lotNumber !== undefined,
		collect: (monitor) => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
		}),
	}));

	const isActive = isOver && canDrop;

	return (
		<Chip
			ref={drop}
			className={
				isActive
					? classes.isActive
					: canDrop
					? classes.canDrop
					: classes.default
			}
			label="Trash"
		/>
	);
}
