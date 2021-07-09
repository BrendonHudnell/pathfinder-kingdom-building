import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
	EntityId,
	PayloadAction,
} from '@reduxjs/toolkit';

import { RootState } from '../../components/store';
import { EventType } from './eventsUtils';

export interface KingdomEvent {
	id: EntityId;
	eventType: EventType;
	lore?: number;
	fame?: number;
}

const eventsAdapter = createEntityAdapter<KingdomEvent>();

const initialState = eventsAdapter.getInitialState();

export const fetchEvents = createAsyncThunk(
	// TODO fix when server is hooked up
	'events/fetchEvents',
	async (events: KingdomEvent[]) => {
		return events;
	}
);

export const addNewEvent = createAsyncThunk(
	// TODO fix when server is hooked up
	'events/addNewEvent',
	async (info: { eventType: EventType; lore?: number; fame?: number }) => {
		const id = Math.floor(Math.random() * 10000);
		const event: KingdomEvent = {
			id,
			...info,
		};

		return event;
	}
);

export const eventsSlice = createSlice({
	name: 'events',
	initialState,
	reducers: {
		terrainUpdated: (
			state,
			action: PayloadAction<{ hexId: EntityId; terrain: TerrainType }>
		) => {
			const { hexId, terrain } = action.payload;

			if (state.ids.includes(hexId)) {
				state.entities[hexId]!.terrain = terrain;
			}
		},
	},
	extraReducers: (builder) => {
		builder.addCase(
			fetchEvents.fulfilled,
			(state, action: PayloadAction<KingdomEvent[]>) => {
				eventsAdapter.setAll(state, action.payload);
			}
		);
		builder.addCase(
			addNewEvent.fulfilled,
			(state, action: PayloadAction<KingdomEvent>) => {
				eventsAdapter.addOne(state, action.payload);
			}
		);
	},
});

export const { terrainUpdated } = eventsSlice.actions;

export const { selectAll: selectAllEvents } =
	eventsAdapter.getSelectors<RootState>((state) => state.events);

export const eventsReducer = eventsSlice.reducer;
