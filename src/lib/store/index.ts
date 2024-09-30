import { writable } from "svelte/store";

export type User = {
  uid: string;
  displayName: string;
  photoUrl: string;
  providerId: string;
};

type AuthState = {
  isLoggedIn: boolean | null;
  user: User | null;
  idToken: string | null;
};

export const authStore = writable<AuthState>({
  isLoggedIn: null,
  user: null,
  idToken: null,
});

export interface EditCarModalState {
  isOpen: boolean;
  carId: number | string;
}
export interface DeleteCarModalState {
  isOpen: boolean;
  carId: string;
  carName: string;
}

export interface DeleteCarModalState {
  isOpen: boolean;
}

export interface ShowToastErrorState {
  showToastError: boolean;
  text: string;
}

export interface CarState {
  id: string;
  name: string;
}

export const userSettingModal = writable(false);
export const ReceiptModal = writable(false);
export const DeleteModal = writable(false);
export const UserDelete = writable(false);
export const logInConfirmationResult = writable<any>(null);
export const logInPhoneNumber = writable<string | null>(null);
export const paymentReceiptDetails = writable<any>(null);
export const DisableOnlyTimeModal = writable<boolean>(false);
export const DisabledModal = writable<boolean>(false);

export const EditCarModal = writable<EditCarModalState>({
  isOpen: false,
  carId: "",
});
export const DeleteCarModal = writable<DeleteCarModalState>({
  isOpen: false,
  carId: "",
  carName: "",
});
export const ShowToastError = writable<ShowToastErrorState>({
  showToastError: false,
  text: "",
});

export const EnableModal = writable<boolean>(false);

export default {
  subscribe: authStore.subscribe,
  set: authStore.set,
};
