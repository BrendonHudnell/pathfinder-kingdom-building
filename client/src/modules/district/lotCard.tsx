import React, { Fragment, ReactElement } from 'react';
import { Tooltip } from '@material-ui/core';
import { EntityId } from '@reduxjs/toolkit';
import { DragPreviewImage, useDrag } from 'react-dnd';

import { Building } from './buildingTypes';
import { BuildingTooltip } from './buildingTooltip';
import { BuildingCardItem } from './buildingCard';

export interface LotCardProps {
	building: Building;
	lotNumber?: number;
	districtId?: EntityId;
}

export function LotCard(props: LotCardProps): ReactElement {
	const { building, lotNumber, districtId } = props;

	const item: BuildingCardItem = {
		...building,
		lotNumber,
		districtId,
	};

	const [{ isDragging }, drag, preview] = useDrag(() => ({
		type: 'Building',
		item,
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	}));

	return (
		<Fragment>
			<DragPreviewImage
				connect={preview}
				src={`/assets/images/${building.name?.replace(/ /g, '_')}.png`}
			/>
			{isDragging ? (
				<img
					ref={drag}
					src={`/assets/images/${building.name?.replace(/ /g, '_')}.png`}
				/>
			) : (
				<Tooltip title={<BuildingTooltip building={building} inLot />}>
					<img
						ref={drag}
						src={`/assets/images/${building.name?.replace(/ /g, '_')}.png`}
					/>
				</Tooltip>
			)}
		</Fragment>
	);
}
