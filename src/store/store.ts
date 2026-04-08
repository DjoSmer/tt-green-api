import { createListenerCollection, ListenerCallback } from '@djosmer/event-manager';

export interface IStore {
    apiUrl: string,
    idInstance: string,
    apiToken: string,
    phoneNumber: string,
    message: string,
    lastResponseData: {} | null
}

export interface IStoreContext {
    _store: IStore,
    _updateStore: (newStore: Partial<IStore>) => void,
    onStoreUpdate: (cb: ListenerCallback<[IStore]>) => () => void,
    getStore: () => IStore,
    setApiUrl: (value: string) => void,
    setIdInstance: (value: string) => void,
    setApiToken: (value: string) => void,
    setPhoneNumber: (value: string) => void,
    setMessage: (value: string) => void,
    setLastResponseData: (value: {}) => void,
}

const storeListener = createListenerCollection<[IStore]>();

export const appStore: IStoreContext = {
    _store: {
        apiUrl: '',
        idInstance: '',
        apiToken: '',
        phoneNumber: '',
        message: '',
        lastResponseData: null
    },
    onStoreUpdate: (cb) => {
        return storeListener.subscribe(cb)
    },
    _updateStore: (newStore) => {
        appStore._store = {...appStore._store, ...newStore};
        storeListener.notify(appStore._store);
    },
    getStore: () => appStore._store,
    setApiUrl: (value) => {
        appStore._updateStore({apiUrl: value});
    },
    setIdInstance: (value) => {
        appStore._updateStore({idInstance: value});
    },
    setApiToken: (value) => {
        appStore._updateStore({apiToken: value});
    },
    setPhoneNumber: (value) => {
        appStore._updateStore({phoneNumber: value});
    },
    setMessage: (value) => {
        appStore._updateStore({message: value});
    },
    setLastResponseData: (value) => {
        appStore._updateStore({lastResponseData: value});
    },
}