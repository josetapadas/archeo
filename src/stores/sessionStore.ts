import { observable, action } from 'mobx';

export type SessionStoreType = {
    rootStore: object|null,
    authUser: any,
}

class SessionStore {
    rootStore: object|null;

    @observable authUser: object|null = null;

    constructor(rootStore: any) {
        this.rootStore = rootStore;
    }

    @action setAuthUser = (authUser: object|null) => {
        this.authUser = authUser;
    }
}

export default SessionStore;