import React, { ReactElement } from 'react';
import { Container, makeStyles } from '@material-ui/core';
import { useDrop } from 'react-dnd';

import { useAppDispatch } from '../../components/store';
import { BuildingId, buildingList } from './buildingTypes';
import { District, lotUpdated } from './districtSlice';
import { BuildingCardItem } from './buildingCard';
import { LotCard } from './lotCard';

const useStyles = makeStyles((theme) => {
	return {
		fitContent: {
			width: 'fit-content',
			height: 'fit-content',
		},
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
	district: District;
	buildingId: BuildingId;
	index: number;
}

export function Lot(props: LotProps): ReactElement {
	const { district, buildingId, index } = props;

	const classes = useStyles();

	const dispatch = useAppDispatch();

	function onDrop(item: BuildingCardItem): void {
		const { lotNumber, id } = item;

		dispatch(
			lotUpdated({
				districtId: district.id,
				newLotNumber: index,
				oldLotNumber: lotNumber,
				buildingId: id,
			})
		);
	}

	function handleCanDrop(/*item: BuildingCardItem*/): boolean {
		return buildingId === -1;
	}

	const [{ isOver, canDrop }, drop] = useDrop(
		() => ({
			accept: 'Building',
			drop: onDrop,
			canDrop: handleCanDrop,
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
		<Container
			disableGutters
			className={`${rowStyle} ${colStyle} ${classes.fitContent}`}
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
				<LotCard
					building={building}
					lotNumber={index}
					districtId={district.id}
				/>
			) : (
				<img src="/assets/images/Empty_Lot.png" />
			)}
		</Container>
	);
}
