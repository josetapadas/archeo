import React from "react";
import { styled } from "baseui";
import { Button } from "baseui/button";
import { withRouter } from "react-router-dom";
import * as ROUTES from "../../routes/routes";
import { Input } from "baseui/input";
import { Textarea } from "baseui/textarea";
import { RadioGroup, Radio, ALIGN } from "baseui/radio";
import { Select } from "baseui/select";
import withAuthorization from "../Firebase/withAuthorization";
import { inject, observer } from "mobx-react";
import FileUploader from "react-firebase-file-uploader";
import { Card } from "baseui/card";
import { H1, H4 } from "baseui/typography";
import { Spinner } from "baseui/spinner";


const Container = styled("div", {
  margin: "20px",
});

type CoinAddStateType = {
  value: any;
  newEra: string;
  newLocation: string;
  loading: boolean;
  saving: boolean;
};

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
class CoinAdd extends React.Component<any, CoinAddStateType> {
  constructor(props: any) {
    super(props);

    this.state = {
      value: {
        createEmpire: false,
        createLocation: false,
        newLocation: {
          name: "",
          description: "",
        },
        newEmpire: {
          name: "",
          description: "",
        },
        frontImage: null,
        backImage: null,
      },
      newEra: "1",
      newLocation: "1",
      loading: false,
      saving: false,
    };
  }

  async componentDidMount() {
    if (
      !this.props.coinsStore.empires ||
      this.props.coinsStore.empires.length === 0 ||
      !this.props.coinsStore.locations ||
      this.props.coinsStore.locations.length === 0
    ) {
      this.setState({ loading: true });
    }

    const empireSnapshot = await this.props.firebase.empires().once("value");
    const empires = empireSnapshot.val();
    this.props.coinsStore.setEmpires(empires);

    const locationSnapshot = await this.props.firebase
      .locations()
      .once("value");
    const locations = locationSnapshot.val();
    this.props.coinsStore.setLocations(locations);

    this.setState({ loading: false });
  }

  componentWillUnmount() {
    this.props.firebase.coins().off();
    this.props.firebase.empires().off();
    this.props.firebase.locations().off();
  }

  setValue = (element: object) =>
    this.setState((currentState: any) => ({
      ...currentState,
      value: { ...currentState.value, ...element },
    }));

  setLocation = (element: object) =>
    this.setState((currentState: any) => ({
      ...currentState,
      value: {
        ...currentState.value,
        newLocation: {
          ...currentState.value.newLocation,
          ...element,
        },
      },
    }));

  setEmpire = (element: object) =>
    this.setState((currentState: any) => ({
      ...currentState,
      value: {
        ...currentState.value,
        newEmpire: {
          ...currentState.value.newEmpire,
          ...element,
        },
      },
    }));

  createNewCoint = async () => {
    const { value } = this.state;
    let empire = value.empire;
    let location = value.location;

    this.setState({ saving: true });

    if (value.createEmpire) {
      const newEmpire = await this.props.firebase.addEmpire(value.newEmpire);
      empire = newEmpire;
    }

    if (value.createLocation) {
      const newLocation = await this.props.firebase.addLocation(
        value.newLocation
      );
      location = newLocation;
    }

    const newCoin = {
      name: value.name,
      description: value.description,
      frontImage: value.frontImage,
      backImage: value.backImage,
      location,
      empire,
    };

    const createdCoin = await this.props.firebase.addCoin(newCoin);
    this.setState({ saving: false });

    if (createdCoin) this.props.history.push(ROUTES.ARCHIVE);
  };

  handleUploadError = (error: any) => {
    console.error(error);
  };

  handleUploadSuccess = async (filename: any, isBack: boolean = false) => {
    const fileName = await this.props.firebase.storage
      .ref("images")
      .child(filename)
      .getDownloadURL();
    isBack ? this.setValue({ backImage: fileName }) : this.setValue({ frontImage: fileName });
  };

  render() {
    const { value, newEra, newLocation, loading, saving } = this.state;
    const { locationsList, empiresList } = this.props.coinsStore;

    if (saving || loading || !locationsList || !empiresList) return <Centered><Spinner /></Centered>;

    const locationOptions = locationsList.map((location: any) => ({
      id: location.id,
      label: location.data.name,
    }));

    const empireOptions = empiresList.map((empire: any) => ({
      id: empire.id,
      label: empire.data.name,
    }));

    return (
      <Container>
        <H1>Adicionar nova moeda</H1>
        <div>
          <H4>Moeda</H4>
          <span>Nome</span>
          <Input
            value={value.name}
            onChange={(e: any) => this.setValue({ name: e.target.value })}
          />
        </div>
        <div>
          <span>Descrição</span>
          <Textarea
            value={value.description}
            onChange={(e: any) =>
              this.setValue({ description: e.target.value })
            }
          />
        </div>
        <div>
          <Card>
            <p>Foto frontal</p>
            {this.state.value.frontImage ? (
              <img src={this.state.value.frontImage} alt="frontal" style={{ maxWidth: "20%" }}/>
            ) : (
              <FileUploader
                accept="image/*"
                name="frontImage"
                randomizeFilename
                storageRef={this.props.firebase.storage.ref("images")}
                onUploadSuccess={(filename: any) => this.handleUploadSuccess(filename, false)}
                onUploadError={this.handleUploadError}
              />
            )}
          </Card>
        </div>
        <div>
          <Card>
            <p>Foto traseira</p>
            {this.state.value.backImage ? (
              <img src={this.state.value.backImage} alt="back" style={{ maxWidth: "20%" }}/>
            ) : (
              <FileUploader
                accept="image/*"
                name="backImage"
                randomizeFilename
                storageRef={this.props.firebase.storage.ref("images")}
                onUploadSuccess={(filename: any) => this.handleUploadSuccess(filename, true)}
                onUploadError={this.handleUploadError}
              />
            )}
          </Card>
        </div>
        <div>
          <H4>Era</H4>
          <RadioGroup
            value={newEra}
            onChange={(e) => {
              this.setState({ newEra: e.target.value });
              this.setValue({ createEmpire: e.target.value === "2" });
            }}
            name="number"
            align={ALIGN.vertical}
          >
            <Radio value="1">Seleccionar</Radio>
            <Radio value="2">Criar nova</Radio>
          </RadioGroup>
          {newEra === "2" ? (
            <div>
              <span>Nome</span>
              <Input
                value={value.newEmpire.name}
                onChange={(e: any) => this.setEmpire({ name: e.target.value })}
              />
              <span>Descrição</span>
              <Textarea
                value={value.newEmpire.description}
                onChange={(e: any) =>
                  this.setEmpire({ description: e.target.value })
                }
              />
            </div>
          ) : (
            <Select
              options={empireOptions}
              value={empireOptions.find(
                (el: any) => el.id === this.state.value.empire
              )}
              onChange={(params) =>
                this.setValue({ empire: params.value[0].id })
              }
            />
          )}
        </div>

        <div>
          <H4>Local</H4>
          <RadioGroup
            value={newLocation}
            onChange={(e) => {
              this.setState({ newLocation: e.target.value });
              this.setValue({ createLocation: e.target.value === "2" });
            }}
            name="number"
            align={ALIGN.vertical}
          >
            <Radio value="1">Seleccionar</Radio>
            <Radio value="2">Criar novo</Radio>
          </RadioGroup>
          {newLocation === "2" ? (
            <div>
              <span>Nome</span>
              <Input
                value={value.newLocation.name}
                onChange={(e: any) =>
                  this.setLocation({ name: e.target.value })
                }
              />
              <span>Descrição</span>
              <Textarea
                value={value.newLocation.description}
                onChange={(e: any) =>
                  this.setLocation({ description: e.target.value })
                }
              />
            </div>
          ) : (
            <Select
              options={locationOptions}
              value={locationOptions.find(
                (el: any) => el.id === this.state.value.location
              )}
              onChange={(params) =>
                this.setValue({ location: params.value[0].id })
              }
            />
          )}
        </div>

        <Container>
          <Button
            onClick={this.createNewCoint}
            overrides={{ BaseButton: { style: { width: "100%" } } }}
          >
            Adicionar
          </Button>
        </Container>
        <Container>
          <Button
            onClick={() => this.props.history.push(ROUTES.HOME)}
            overrides={{ BaseButton: { style: { width: "100%" } } }}
          >
            Voltar
          </Button>
        </Container>
      </Container>
    );
  }
}

export default withRouter(withAuthorization(CoinAdd));
