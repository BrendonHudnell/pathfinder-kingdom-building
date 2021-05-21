import React, { Fragment, ReactElement } from 'react';
import { Tooltip } from '@material-ui/core';
import { DragPreviewImage, useDrag } from 'react-dnd';

import { getBuildingListTypeByLotType } from './buildingUtils';
import { LotTooltip } from './lotTooltip';
import { BuildingDragItem, LotType } from './buildingTypes';

export interface LotCardProps {
	lotType: LotType;
	lotNumber: number;
}

export function LotCard(props: LotCardProps): ReactElement {
	const { lotType, lotNumber } = props;

	const item: BuildingDragItem = {
		lotType: [lotType],
		lotNumber,
		isMove: true,
	};

	const [{ isDragging }, drag, preview] = useDrag(() => ({
		type: 'LotCard',
		item,
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	}));

	const buildingListType = getBuildingListTypeByLotType(lotType);

	return (
		<Fragment>
			<DragPreviewImage
				connect={preview}
				src={`/assets/images/${buildingListType.replace(/ /g, '_')}.png`}
			/>
			{isDragging ? (
				<img
					ref={drag}
					src={`/assets/images/${lotType?.replace(/ /g, '_')}.png`}
				/>
			) : (
				<Tooltip title={<LotTooltip lotType={lotType} />}>
					<img
						ref={drag}
						src={`/assets/images/${lotType?.replace(/ /g, '_')}.png`}
					/>
				</Tooltip>
			)}
		</Fragment>
	);
}
