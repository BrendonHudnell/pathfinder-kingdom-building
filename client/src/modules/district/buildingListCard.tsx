import React, {
	createRef,
	Fragment,
	ReactElement,
	useEffect,
	useState,
} from 'react';
import { Grid, Tooltip, Typography } from '@material-ui/core';
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

	const [height, setHeight] = useState(0);
	const textRef = createRef<HTMLSpanElement>();
	useEffect(() => {
		if (textRef.current) {
			setHeight(textRef.current.offsetHeight);
		}
	}, [textRef.current]);

	return (
		<Fragment>
			<DragPreviewImage
				connect={preview}
				src={`/assets/images/${buildingListType.replace(/ /g, '_')}.png`}
			/>
			{isDragging ? (
				<Grid ref={drag} container spacing={3}>
					<Grid item>
						<Typography ref={textRef}>{buildingListType}</Typography>
					</Grid>
					<Grid item>
						<img
							src={`/assets/images/${buildingListType.replace(/ /g, '_')}.png`}
							height={height ? height : 'auto'}
						/>
					</Grid>
				</Grid>
			) : (
				<Tooltip
					title={<BuildingListTooltip buildingListType={buildingListType} />}
				>
					<Grid ref={drag} container spacing={3}>
						<Grid item>
							<Typography ref={textRef}>{buildingListType}</Typography>
						</Grid>
						<Grid item>
							<img
								src={`/assets/images/${buildingListType.replace(
									/ /g,
									'_'
								)}.png`}
								height={height ? height : 'auto'}
							/>
						</Grid>
					</Grid>
				</Tooltip>
			)}
		</Fragment>
	);
}
