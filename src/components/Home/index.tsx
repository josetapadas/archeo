import React from "react";
import { SessionStoreType } from "../../stores/sessionStore";
import { CoinsStoreType, CoinsObject } from "../../stores/coinsStore";

import withAuthorization from "../Firebase/withAuthorization";
import { inject, observer } from "mobx-react";
import { styled } from "baseui";
import { H1 } from "baseui/typography";

import styles from "./Home.module.css";
import { Show, Delete } from "baseui/icon";

import {
  StringColumn,
  Unstable_StatefulDataTable as DataTable,
  RowActionT,
} from "baseui/data-table";
import { withRouter } from "react-router-dom";
import * as ROUTES from "../../routes/routes";

const Centered = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  marginTop: "20px",
  marginLeft: "20px",
  marginRight: "20px",
  flexDirection: "column",
});

type HomeProps = {
  sessionStore: SessionStoreType;
  firebase: any;
  coinsStore: CoinsStoreType;
};

@inject("coinsStore")
@observer
class Home extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  columns = [
    StringColumn({
      title: "Nome",
      lineClamp: 3,
      mapDataToValue: (data: any) => data.name,
    }),
    StringColumn({
      title: "Descrição",
      maxWidth: 250,
      lineClamp: 3,
      mapDataToValue: (data: any) => data.description,
    }),
    StringColumn({
      title: "Era",
      mapDataToValue: (data: any) => data.empire.name,
    }),
    StringColumn({
      title: "Local",
      mapDataToValue: (data: any) => data.location.name,
    })
  ];

  rowActions: RowActionT[] = [
    {
      label: "Detalhes",
      onClick: ({ row }: any) => this.props.history.push(`${ROUTES.COINS}/${row.id}`),
      renderIcon: Show,
    },
    {
      label: "Remover",
      onClick: ({ row }: any) => console.log(row),
      renderIcon: Delete,
    },
  ];

  async componentDidMount() {
    if (
      !this.props.coinsStore.coins ||
      this.props.coinsStore.coins.length === 0
    ) {
      this.setState({ loading: true });
    }

    const coinsSnapshot = await this.props.firebase.coins().once("value");
    const coins = coinsSnapshot.val();

    const composedCoins = await Promise.all(
      coins.map(async (coin: CoinsObject) => {
        const empireSnapshot = await this.props.firebase
          .empires()
          .child(coin.empire)
          .once("value");
        const currentEmpire = empireSnapshot.val();

        const locationSnapshot = await this.props.firebase
          .locations()
          .child(coin.location)
          .once("value");
        const currentLocation = locationSnapshot.val();

        const positionSnapshot = await this.props.firebase
          .positions()
          .child(coin.position)
          .once("value");
        const currentPosition = positionSnapshot.val();

        return {
          ...coin,
          empire: currentEmpire,
          location: currentLocation,
          position: currentPosition,
        };
      })
    );

    this.props.coinsStore.setCoins(composedCoins);
    this.setState({ loading: false });
  }

  componentWillUnmount() {
    this.props.firebase.coins().off();
    this.props.firebase.empires().off();
    this.props.firebase.locations().off();
    this.props.firebase.positions().off();
  }

  render() {
    const coins = this.props.coinsStore.coinsList;
    const { loading } = this.state;

    if (loading || coins.length === 0) return <div>loading</div>;

    return (
      <Centered>
        <H1>Lista de Moedas</H1>
        <div className={styles.dataTable}>
          <DataTable
            columns={this.columns}
            rows={coins}
            rowHeight={78}
            rowActions={this.rowActions}
          />
        </div>
      </Centered>
    );
  }
}

export default withAuthorization(withRouter(Home));
