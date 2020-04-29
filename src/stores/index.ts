import SessionStore, { SessionStoreType } from './sessionStore';

class RootStore {
    sessionStore: SessionStoreType;

    constructor() {
        this.sessionStore = new SessionStore(this);
    }
}

const rootStore = new RootStore();

export default rootStore;