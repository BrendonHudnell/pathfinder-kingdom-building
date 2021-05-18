import React, { ReactElement } from 'react';
import { Card, makeStyles } from '@material-ui/core';
import { useDrop } from 'react-dnd';
import { EntityId } from '@reduxjs/toolkit';

import { useAppDispatch } from '../../components/store';
import { BuildingId, buildingList } from './buildingTypes';
import { lotUpdated } from './districtSlice';
import { BuildingCard, BuildingCardItem } from './buildingCard';

const useStyles = makeStyles((theme) => {
	return {
		rowTop: {
			marginTop: theme.spacing(2),
		},
		rowBottom: {
			marginBottom: theme.spacing(2),
		},
		colLeft: {
			marginLeft: theme.spacing(2),
		},
		colRight: {
			marginRight: theme.spacing(2),
		},
	};
});

export interface LotProps {
	districtId: EntityId;
	buildingId: BuildingId;
	index: number;
}

export function Lot(props: LotProps): ReactElement {
	const { districtId, buildingId, index } = props;

	const classes = useStyles();

	const dispatch = useAppDispatch();

	function onDrop(item: BuildingCardItem): void {
		const { lotNumber, id } = item;

		dispatch(
			lotUpdated({
				districtId,
				newLotNumber: index,
				oldLotNumber: lotNumber,
				buildingId: id,
			})
		);
	}

	const [{ isOver, canDrop }, drop] = useDrop(
		() => ({
			accept: 'Building',
			drop: onDrop,
			canDrop: () => buildingId === -1,
			collect: (monitor) => ({
				isOver: monitor.isOver(),
				canDrop: monitor.canDrop(),
			}),
		}),
		[buildingId]
	);

	const isActive = isOver && canDrop;

	const building = buildingList[buildingId];

	const rowStyle =
		Math.floor(index / 6) % 2 ? classes.rowBottom : classes.rowTop;
	const colStyle = index % 2 ? classes.colRight : classes.colLeft;

	return (
		<Card
			className={`${rowStyle} ${colStyle}`}
			style={
				isActive
					? { backgroundColor: 'green' }
					: canDrop
					? { backgroundColor: 'darkkhaki' }
					: {}
			}
			ref={drop}
		>
			{index}
			<br />
			<img
				style={{ height: '100%', width: '100%' }}
				src={
					buildingId !== -1
						? `/assets/images/${building.name?.replace(/ /g, '_')}.png`
						: '/assets/images/Empty_Lot.png'
				}
			/>
			<br />
			{buildingId >= 0 ? (
				<BuildingCard
					building={building}
					lotNumber={index}
					districtId={districtId}
				/>
			) : (
				'empty'
			)}
		</Card>
	);
}
