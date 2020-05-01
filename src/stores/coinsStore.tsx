import { observable, action, computed } from "mobx";

export type CoinsStoreType = {
  rootStore: object | null,
  setCoins: (coins: object) => void,
  coinsList: any,
  coins: any,
  empires: any,
  locations: any,
};

export type CoinsObject = {
  description: string,
  empire: number,
  foundDate: number,
  location: number,
  name: string,
  position: number,
};

export type LocationsObject = {
  name: string,
  description: string,
}


export type EmpiresObject = {
  name: string,
  description: string,
}

class CoinsStore {
  rootStore: object | null;

  constructor(rootStore: any) {
    this.rootStore = rootStore;
  }

  @observable coins: any = null;
  @observable empires: any = null;
  @observable locations: any = null;
  
  @action setCoins = (coins: object) => {
    this.coins = coins;
  };

  @action setEmpires = (empires: object) => {
    this.empires = empires;
  };

  @action setLocations = (locations: object) => {
    this.locations = locations;
  };

  @computed get coinsList() {
    return Object.keys(this.coins || {}).map((key) => ({
      id: key,
      data: {
        ...this.coins[key],
      },
    }));
  }

  @computed get empiresList() {
    return Object.keys(this.empires || {}).map((key) => ({
      id: key,
      data: {
        ...this.empires[key],
      },
    }));
  }

  @computed get locationsList() {
    return Object.keys(this.locations || {}).map((key) => ({
      id: key,
      data: {
        ...this.locations[key],
      },
    }));
  }
}

export default CoinsStore;
