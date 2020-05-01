import { observable, action, computed } from "mobx";

export type CoinsStoreType = {
  rootStore: object | null;
  setCoins: (coins: object) => void;
  coinsList: any;
  coins: any;
};

export type CoinsObject = {
  description: string;
  empire: number;
  foundDate: number;
  location: number;
  name: string;
  position: number;
};

class CoinsStore {
  rootStore: object | null;

  constructor(rootStore: any) {
    this.rootStore = rootStore;
  }

  @observable coins: any = null;

  @action setCoins = (coins: object) => {
    this.coins = coins;
  };

  @computed get coinsList() {
    return Object.keys(this.coins || {}).map((key) => ({
      id: key,
      data: {
        ...this.coins[key],
      },
    }));
  }
}

export default CoinsStore;
