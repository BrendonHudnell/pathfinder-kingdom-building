import React, { ReactElement } from 'react';
import { Card, makeStyles } from '@material-ui/core';
import { useDrop } from 'react-dnd';
import { EntityId } from '@reduxjs/toolkit';

import { useAppDispatch } from '../../components/store';
import { BuildingId, buildingList } from './buildingTypes';
import { lotUpdated } from './districtSlice';
import { BuildingCard, BuildingCardItem } from './buildingCard';

export interface LotProps {
	districtId: EntityId;
	buildingId: BuildingId;
	index: number;
}

export function Lot(props: LotProps): ReactElement {
	const { districtId, buildingId, index } = props;

	const classes = makeStyles({
		root: {
			width: '12.5%',
			height: '12.5%',
			marginLeft: index % 2 === 0 ? '3%' : '0.5%',
			marginRight: index % 2 === 1 ? '3%' : '0.5%',
			marginTop: Math.floor(index / 6) % 2 === 0 ? '3%' : '0.5%',
			marginBottom: Math.floor(index / 6) % 2 === 1 ? '3%' : '0.5%',
		},
	})();

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

	return (
		<Card
			className={classes.root}
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
