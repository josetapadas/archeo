import React from "react";
import { styled } from "baseui";
import { withRouter } from "react-router-dom";
import withAuthorization from "../Firebase/withAuthorization";
import { inject, observer } from "mobx-react";
import { H1, ParagraphMedium } from "baseui/typography";
import { Button } from "baseui/button";
import * as ROUTES from "../../routes/routes";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { Spinner } from "baseui/spinner";

const Container = styled("div", {
  margin: "20px",
});

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

    if (!currentId)
      return (
        <Container>
          <div>Item não encontrado.</div>
          <Button
            onClick={() => this.props.history.push(ROUTES.HOME)}
            overrides={{ BaseButton: { style: { width: "100%" } } }}
          >
            Voltar
          </Button>
        </Container>
      );
      
    if (loading || coins.length === 0)
      return (
        <Centered>
          <Spinner />
        </Centered>
      );

    const currentCoin = this.props.coinsStore.coinsList.find(
      (coin: any) => coin.id === currentId
    ).data;

    return (
      <Container>
        <H1>{currentCoin.name}</H1>
        {currentCoin.frontImage && currentCoin.backImage && (
          <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={40}
            totalSlides={2}
          >
            <Slider>
              <Slide index={0}>
                <img
                  src={currentCoin.frontImage}
                  alt="front"
                  style={{ maxWidth: "50%", cursor: "pointer" }}
                  onClick={() => window.open(currentCoin.frontImage, "_blank")}
                />
              </Slide>
              <Slide index={1}>
                <img
                  src={currentCoin.backImage}
                  alt="back"
                  style={{ maxWidth: "50%" }}
                  onClick={() => window.open(currentCoin.backImage, "_blank")}
                />
              </Slide>
            </Slider>
            <ButtonBack>Anterior</ButtonBack>
            <ButtonNext>Proxima</ButtonNext>
          </CarouselProvider>
        )}
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
      </Container>
    );
  }
}

export default withAuthorization(withRouter(CoinView));
