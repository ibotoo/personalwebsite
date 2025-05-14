import { createState, useState } from '@hookstate/core';
import { Persistence } from '@hookstate/persistence';
import { useEffect } from 'react';

import type { State } from '@hookstate/core';

import type { Settings } from '~/types';

// Varsayılan olarak animasyonları kapalı tutuyoruz
const DEFAULT_STATE = createState<Settings>({
	animations: true,
	sound: false,
});

export const STATE_KEY = 'settings';

export function usePersistantState(): State<Settings> {
	const persistance = Persistence(STATE_KEY);
	const state = useState<Settings>(DEFAULT_STATE);

	useEffect(() => {
		state.attach(persistance);
	}, [persistance, state]);

	return state;
}
