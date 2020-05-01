import SessionStore, { SessionStoreType } from './sessionStore';
import CoinsStore, { CoinsStoreType } from './coinsStore';


class RootStore {
    sessionStore: SessionStoreType;
    coinsStore: CoinsStoreType;

    constructor() {
        this.sessionStore = new SessionStore(this);
        this.coinsStore = new CoinsStore(this);
    }
}

const rootStore = new RootStore();

export default rootStore;