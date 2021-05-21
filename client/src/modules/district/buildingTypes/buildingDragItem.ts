import { LotType } from './lotType';

export interface BuildingDragItem {
	lotType: LotType[];
	lotNumber: number;
	isMove: boolean;
}
