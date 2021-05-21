import React, { Fragment, ReactElement } from 'react';
import { Card, Tooltip, Typography } from '@material-ui/core';
import { DragPreviewImage, useDrag } from 'react-dnd';

import { BuildingListTooltip } from './buildingListTooltip';
import {
	BuildingDragItem,
	BuildingListType,
	buildingListTypeToLotTypeMap,
} from './buildingTypes';

export interface BuildingListCardProps {
	buildingListType: BuildingListType;
}

export function BuildingListCard(props: BuildingListCardProps): ReactElement {
	const { buildingListType } = props;

	const lotType = buildingListTypeToLotTypeMap[buildingListType];

	const item: BuildingDragItem = {
		lotNumber: -1,
		lotType,
		isMove: false,
	};

	const [{ isDragging }, drag, preview] = useDrag(() => ({
		type: 'BuildingCard',
		item,
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	}));

	return (
		<Fragment>
			<DragPreviewImage
				connect={preview}
				src={`/assets/images/${buildingListType.replace(/ /g, '_')}.png`}
			/>
			{isDragging ? (
				<Card ref={drag}>
					<Typography>{buildingListType}</Typography>
				</Card>
			) : (
				<Tooltip
					title={<BuildingListTooltip buildingListType={buildingListType} />}
				>
					<Card ref={drag}>
						<Typography>{buildingListType}</Typography>
					</Card>
				</Tooltip>
			)}
		</Fragment>
	);
}
