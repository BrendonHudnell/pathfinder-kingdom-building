import React, { ReactElement } from 'react';
import { Card, Typography } from '@material-ui/core';
import { EntityId } from '@reduxjs/toolkit';
import { useDrag } from 'react-dnd';

import { Building } from './buildingTypes';

export interface BuildingCardProps {
	building: Building;
	lotNumber?: number;
	districtId?: EntityId;
}

export interface BuildingCardItem extends Building {
	lotNumber?: number;
	districtId?: EntityId;
}

export function BuildingCard(props: BuildingCardProps): ReactElement {
	const { building, lotNumber, districtId } = props;

	const item: BuildingCardItem = {
		...building,
		lotNumber,
		districtId,
	};

	const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
		type: 'Building',
		item,
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	}));

	return isDragging ? (
		<Card ref={dragPreview} />
	) : (
		<Card ref={drag}>
			<Typography>{building.name}</Typography>
		</Card>
	);
}
