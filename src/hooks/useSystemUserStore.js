import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getItemLocalStorage, setItemLocalStorage } from '@/utils';

const baseUser = {
	id: 0,
	name: '',
	lastname: '',
	active: true,
	code: '',
	role: '',
	password: ''
};

function userInitialState() {
	let user = getItemLocalStorage('user');

	if (!user) {
		setItemLocalStorage('user', baseUser);
		user = getItemLocalStorage('user');
	}

	return user;
}

export const useUserSystemStore = create(
	persist(
		(set, get) => ({
			userSystem: userInitialState(),
			login: (newUser) =>
				set(() => {
					return { userSystem: { ...newUser } };
				}),
			logout: () =>
				set(() => {
					return { userSystem: baseUser };
				}),
			editUserSystem: (data) =>
				set((state) => {
					const userSystem = { ...state, ...data };
					return { userSystem };
				})
		}),
		{
			name: 'userSystem'
		}
	)
);
