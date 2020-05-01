import React from "react";
import { styled } from "baseui";
import { Card, StyledBody } from "baseui/card";
import { withRouter } from "react-router-dom";
import withAuthorization from "../Firebase/withAuthorization";
import { CoinsStoreType } from "../../stores/coinsStore";
import { inject, observer } from "mobx-react";
import { H1, ParagraphMedium } from "baseui/typography";
import { Button } from "baseui/button";
import * as ROUTES from '../../routes/routes';

const Centered = styled("div", {
  display: "flex",
  justifyContent: "center",
  height: "100%",
  marginTop: "20px",
  marginLeft: "20px",
  marginRight: "20px",
});

type CoinViewProps = {
  firebase: any;
  match: any;
  coinsStore: CoinsStoreType;
};

@inject("coinsStore")
@observer
class CoinView extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  async componentDidMount() {
    if (
      !this.props.coinsStore.coins ||
      this.props.coinsStore.coins.length === 0
    ) {
      this.setState({ loading: true });
    }

    const coinsSnapshot = await this.props.firebase.coins().once("value");
    const coins = coinsSnapshot.val();
    const modifiedCoins = Object.keys(coins || {}).map((key) => ({
      id: key,
      data: {
        ...coins[key],
      },
    }));

    const composedCoins = await Promise.all(
      modifiedCoins.map(async (coin: any) => {
        const empireSnapshot = await this.props.firebase
          .empires()
          .child(coin.data.empire)
          .once("value");
        const currentEmpire = empireSnapshot.val();

        const locationSnapshot = await this.props.firebase
          .locations()
          .child(coin.data.location)
          .once("value");
        const currentLocation = locationSnapshot.val();

        return {
          ...coin.data,
          id: coin.id,
          empire: currentEmpire,
          location: currentLocation,
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
    const currentId = this.props.match.params.id;

    if (!currentId) return <div>Item não encontrado.</div>;
    if (loading || coins.length === 0) return <div>loading</div>;

    const currentCoin = this.props.coinsStore.coinsList.find(
      (coin: any) => coin.id === currentId
    ).data;
    return (
      <Centered>
        <Card>
          <StyledBody>
            <H1>{currentCoin.name}</H1>
            <ParagraphMedium>{currentCoin.description}</ParagraphMedium>
            <div>
              <ul>
                <li>
                  <b>Era:</b>
                  <span>{" " + currentCoin.empire.name}</span>
                </li>
                <li>
                  <b>Localização:</b>
                  <span>{" " + currentCoin.location.name}</span>
                </li>
              </ul>
            </div>
            <Button
              onClick={() => this.props.history.push(ROUTES.HOME)}
              overrides={{ BaseButton: { style: { width: "100%" } } }}
            >
              Voltar
            </Button>
          </StyledBody>
        </Card>
      </Centered>
    );
  }
}

export default withAuthorization(withRouter(CoinView));
