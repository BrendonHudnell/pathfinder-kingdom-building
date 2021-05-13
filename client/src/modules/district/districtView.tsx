import React, { ReactElement } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { EntityId } from '@reduxjs/toolkit';

import { useAppSelector } from '../../components/store';
import { Lot } from './lot';
import { selectDistrictById } from './districtSlice';

const useStyles = makeStyles({
	root: {
		width: '100%',
		height: '100%',
		display: 'flex',
		flexWrap: 'wrap',
		backgroundColor: 'grey',
	},
});

export interface DistrictViewProps {
	districtId: EntityId;
}

export function DistrictView(props: DistrictViewProps): ReactElement {
	const { districtId } = props;

	const classes = useStyles();

	const district = useAppSelector((state) =>
		selectDistrictById(state, districtId)
	);

	return (
		<Box className={classes.root}>
			{district
				? district.lotIds.map((lotId, index) => (
						<Lot
							key={`${district.name}-lot-${index}`}
							districtId={districtId}
							buildingId={lotId}
							index={index}
						/>
				  ))
				: null}
		</Box>
	);
}
