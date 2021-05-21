import React, { ReactElement } from 'react';
import { Container, makeStyles } from '@material-ui/core';
import { useDrop } from 'react-dnd';

import { useAppDispatch } from '../../components/store';
import {
	getLotOffsetByLotType,
	getNewLotTypesByLotType,
	getSizeByLotType,
} from './buildingUtils';
import { District, lotUpdated } from './districtSlice';
import { LotCard } from './lotCard';
import { BuildingDragItem, LotType } from './buildingTypes';

const firstRow = [0, 1, 2, 3, 4, 5];
const lastRow = [30, 31, 32, 33, 34, 35];
const firstCol = [0, 6, 12, 18, 24, 30];
const lastCol = [5, 11, 17, 23, 29, 35];

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
	lotType: LotType | null;
	district: District;
	index: number;
}

export function Lot(props: LotProps): ReactElement {
	const { lotType, district, index } = props;

	const classes = useStyles();

	const dispatch = useAppDispatch();

	function onDrop(item: BuildingDragItem): void {
		const { lotNumber, lotType, isMove } = item;

		const size = getSizeByLotType(lotType[0]);

		if (size === 1) {
			dispatch(
				lotUpdated({
					districtId: district.id,
					newLotNumber: index,
					oldLotNumber: lotNumber,
					lotType: lotType[0],
				})
			);
		} else {
			const offset = getLotOffsetByLotType(lotType[0]);
			const newLotType = getNewLotTypesByLotType(lotType[0]);

			if (isMove && lotNumber < index) {
				offset.reverse();
				newLotType.reverse();
			}
			if (isMove) {
				offset.forEach((_, idx) =>
					dispatch(
						lotUpdated({
							districtId: district.id,
							newLotNumber: index + offset[idx],
							oldLotNumber: lotNumber + offset[idx],
							lotType: newLotType[idx],
						})
					)
				);
			} else {
				offset.forEach((_, idx) =>
					dispatch(
						lotUpdated({
							districtId: district.id,
							newLotNumber: index + offset[idx],
							oldLotNumber: lotNumber,
							lotType: newLotType[idx],
						})
					)
				);
			}
		}
	}

	function handleCanDrop(item: BuildingDragItem): boolean {
		const { lotType: incomingLotType, lotNumber, isMove } = item;

		const size = getSizeByLotType(incomingLotType[0]);

		if (size !== 1) {
			const offset = getLotOffsetByLotType(incomingLotType[0]);
			const [_, ext] = incomingLotType[0].split(' ');

			if (isMove) {
				let dropOk = true;
				const oldLotNumbers = offset.map((oset) => lotNumber + oset);
				const newLotNumbers = offset.map((oset) => index + oset);
				const difference = newLotNumbers.filter(
					(lotNumber) => !oldLotNumbers.includes(lotNumber)
				);
				difference.forEach((lotNumber) => {
					if (district.lotTypeList[lotNumber]) {
						dropOk = false;
					}
				});
				if (!dropOk) {
					return false;
				}
			}

			if (ext === 'TL') {
				return (
					!lastCol.includes(index) &&
					!lastRow.includes(index) &&
					index !== lotNumber
				);
			}
			if (ext === 'TR') {
				return (
					!firstCol.includes(index) &&
					!lastRow.includes(index) &&
					index !== lotNumber
				);
			}
			if (ext === 'BL') {
				return (
					!lastCol.includes(index) &&
					!firstRow.includes(index) &&
					index !== lotNumber
				);
			}
			if (ext === 'BR') {
				return (
					!firstCol.includes(index) &&
					!firstRow.includes(index) &&
					index !== lotNumber
				);
			}
			if (ext === 'L') {
				return !lastCol.includes(index) && index !== lotNumber;
			}
			if (ext === 'R') {
				return !firstCol.includes(index) && index !== lotNumber;
			}
			if (ext === 'T') {
				return !lastRow.includes(index) && index !== lotNumber;
			}
			if (ext === 'B') {
				return !firstRow.includes(index) && index !== lotNumber;
			}
		}
		return !lotType;
	}

	const [{ isOver, canDrop }, drop] = useDrop(
		() => ({
			accept: ['BuildingCard', 'LotCard'],
			drop: onDrop,
			canDrop: handleCanDrop,
			collect: (monitor) => ({
				isOver: monitor.isOver(),
				canDrop: monitor.canDrop(),
			}),
		}),
		[lotType, district, index]
	);

	const isActive = isOver && canDrop;

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
			{lotType ? (
				<LotCard lotType={lotType} lotNumber={index} />
			) : (
				<img src="/assets/images/Empty_Lot.png" />
			)}
		</Container>
	);
}
