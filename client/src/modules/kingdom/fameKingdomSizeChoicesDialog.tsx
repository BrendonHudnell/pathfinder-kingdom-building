import React, { ReactElement } from 'react';
import {
	Dialog,
	DialogTitle,
	List,
	ListItem,
	Typography,
	RadioGroup,
	FormControlLabel,
	Radio,
} from '@material-ui/core';

import { useAppDispatch } from '../../components/store';
import { FameKingdomLevel, FameValue, KingdomFame } from './kingdomUtils';
import { fameUpdated } from './kingdomSlice';

export interface FameKingdomSizeChoicesDialogProps {
	fameInfo: KingdomFame;
	kingdomSize: number;
	open: boolean;
	onClose: () => void;
}

export function FameKingdomSizeChoicesDialog(
	props: FameKingdomSizeChoicesDialogProps
): ReactElement {
	const { fameInfo, kingdomSize, open, onClose } = props;

	const dispatch = useAppDispatch();

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Fame/Infamy Kingdon Size Bonuses</DialogTitle>
			<List dense>
				{Object.entries(fameInfo).map(([level, info]) =>
					kingdomSize >= Number(level) ? (
						<ListItem key={`fame-level-${level}`}>
							<Typography>
								Size {level} Bonus:&nbsp;&nbsp;&nbsp;&nbsp;
							</Typography>
							<RadioGroup
								row
								value={info.value}
								onChange={(e) =>
									dispatch(
										fameUpdated({
											level: Number(level) as FameKingdomLevel,
											value: e.target.value as FameValue,
										})
									)
								}
							>
								<FormControlLabel
									value={FameValue.FAME}
									control={<Radio />}
									label="Fame"
								/>
								<FormControlLabel
									value={FameValue.INFAMY}
									control={<Radio />}
									label="Infamy"
								/>
							</RadioGroup>
						</ListItem>
					) : null
				)}
			</List>
		</Dialog>
	);
}
