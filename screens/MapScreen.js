import React from "react";
import {
  StyleSheet,
  View,
  Picker,
  Text,
  BackHandler,
  DeviceEventEmitter,
  PermissionsAndroid,
  Alert,
  ToastAndroid,
  Platform
} from "react-native";
import { connect } from "react-redux";
import MapView, { PROVIDER_GOOGLE, Polygon, Marker } from "react-native-maps";
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import { Button } from "react-native-paper";
import Modal from "react-native-modalbox";
import Permissions from "react-native-permissions";
import axios from "axios";
import { 
  getInitState,
  changeState,
  changeDisease,
  selectState,
  selectDisease
} from "../actions";

class MapScreen extends React.Component {
  state = {
    coords: [],
    flag: false,
    error: "",
    loading: false,
    swipeToClose: false,
    modal: false
  };

  displayPolygon() {
    if (this.state.flag) {
      return (
        <MapView.Polygon
          coordinates={this.state.coords.map((item, index) => {})}
          strokeWidth={5}
          strokeColor="#f44336"
          fillColor="#ffcdd2"
        />
      );
    }
    return null;
  }

  _requestPermission() {
    Permissions.request("location").then(res => console.warn("res"));
  }

  async _alertForLocationPermission() {
    try {
      Alert.alert(
        "Enable Location Services On",
        "This app needs access to your location services," +
          "Please turn location services onn",
        [
          {
            text: "No",
            onPress: () => BackHandler.exitApp(),
            style: "cancel"
          },
          {
            text: "Yes",
            onPress: this._requestPermission
          }
        ]
      );
    } catch (err) {
      console.warn(err);
    }
  }

  componentDidMount() {
    if (Platform.OS === "android") {
      this._checkLocation();
    }
  }

  async _checkLocation() {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
    if (granted) {
      this._turnLocationOnn();
    } else {
      this._alertForLocationPermission();
    }
  }
  catch(err) {
    console.warn(err);
  }

  _turnLocationOnn() {
    try {
      LocationServicesDialogBox.checkLocationServicesIsEnabled({
        message:
          "<h2 style='color: #0af13e'>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
        ok: "YES",
        cancel: "NO",
        enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
        showDialog: true, // false => Opens the Location access page directly
        openLocationServices: true, // false => Directly catch method is called if location services are turned off
        preventOutSideTouch: true, // true => To prevent the location services window from closing when it is clicked outside
        preventBackClick: true, // true => To prevent the location services popup from closing when it is clicked back button
        providerListener: true // true ==> Trigger locationProviderStatusChange listener when the location state changes
      })
        .then(function(success) {
          console.warn(success); // success => {alreadyEnabled: false, enabled: true, status: "enabled"}
        })
        .catch(error => {
          console.warn(error.message); // error.message => "disabled"
        });

      BackHandler.addEventListener("hardwareBackPress", () => {
        //(optional) you can use it if you need it
        //do not use this method if you are using navigation."preventBackClick: false" is already doing the same thing.
        LocationServicesDialogBox.forceCloseDialog();
      });

      DeviceEventEmitter.addListener("locationProviderStatusChange", function(
        status
      ) {
        // only trigger when "providerListener" is enabled
        console.warn(status); //  status => {enabled: false, status: "disabled"} or {enabled: true, status: "enabled"}
      });
      this._getLatLng();
    } catch (err) {
      console.warn(err);
    }
  }

  _getLatLng = () => {
    var self = this;
    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          self.props.getInitState({ position })
        },
        error => {
          console.warn(error.message);
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
      this._giveCoords();
    } catch (err) {
      console.warn(err);
    }
  };

  _callGetInitState({position}) {
    console.warn({position})
    //this.props.getInitState({position});
  }

  componentWillUnmount() {
    // used only when "providerListener" is enabled
    LocationServicesDialogBox.stopListener(); // Stop the "locationProviderStatusChange" listener
  }

  onClose() {
    this.setState({ isOpen: false });
    console.warn("Modal just closed");
  }

  onOpen() {
    console.warn("Modal just opened");
  }

  onClosingState(state) {
    console.warn("the open/close of the swipeToClose just changed");
  }

  onRegionChangeComplete = region => {
    this.setState({ region });
  };

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  _changeState(id) {
    this.props.changeState(id);
    this._selectState();
  }

  _changeDisease(id) {
    this.props.changeDisease(id);
  }

  async _selectState() {
    this.props.selectState(this.props._state);
    //this._formatData(data);
  }

  _formatData(data) {
    this.setState({
      coords: data
    });
    console.warn(this.state.coords);
  }

  _selectDisease() {}

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.pickerStyle}>
          <Picker
            style={{ marginLeft: 15, color: "#007aff" }}
            // headerStyle={{ backgroundColor: "#000" }}
            // headerBackButtonTextStyle={{ color: "#fff", marginLeft:-20}}
            // headerTitleStyle={{ color:'#fff', alignSelf:'center', marginLeft:50, width:'100%'}}
            // textStyle={{ color:'#fff', fontSize:12, paddingLeft:8}}
            selectedValue={this.props._state}
            mode="dialog"
            prompt="State's in India"
            onValueChange={(id) => this._changeState(id)}
          >
            <Picker.Item label="Select State" value="" color="#000" />
            {this.props.state_lists.map((item, index) => {
              return (
                <Picker.Item
                  label={item.name}
                  value={item.id}
                  key={index}
                  color="#007aff"
                />
              );
            })}
          </Picker>
        </View>

        <View style={[styles.pickerStyle, { top: 80 }]}>
          <Picker
            style={{ marginLeft: 15, color: "#007aff" }}
            selectedValue={this.state.disease}
            mode="dialog"
            prompt="Disease's"
            onValueChange={id => this._changeDisease(id)}
          >
            <Picker.Item label="Select Disease" value="" color="#000" />
            {this.props.disease_lists.map((item, index) => {
              return (
                <Picker.Item
                  label={item.name}
                  value={item.id}
                  key={index}
                  color="#007aff"
                />
              );
            })}
          </Picker>
        </View>

        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: this.props.lat,
            longitude: this.props.lng,
            latitudeDelta: this.props.latitudeDelta,
            longitudeDelta: this.props.longitudeDelta
          }}
          loadingEnabled={true}
          showsUserLocation
          provider="google"
          followsUserLocation
          showsPointsOfInterest
          scrollEnabled
          loadingIndicatorColor="#007aff"
          loadingBackgroundColor="#FFFFFF"
          //onRegionChangeComplete={this.onRegionChangeComplete}
        >
          {/* {this.displayPolygon()} */}
          <Marker
            title="You location"
            description="You are here"
            pinColor="#007aff"
            coordinate={{
              latitude: this.props.lat,
              longitude: this.props.lng,
              latitudeDelta: this.props.latitudeDelta,
              longitudeDelta: this.props.longitudeDelta
            }}
          />
        </MapView>

        {/* <Modal
          style={[styles.modal]}
          isOpen={this.state.modal}
          position={"center"}
          swipeToClose={this.state.swipeToClose}
          onClosed={() => this.setState({ modal: false })}
          onOpened={() => this.setState({ modal: true })}
          key={this.state.modal ? 1 : 2}
        >
          <Text style={styles.text}>Basic modal</Text>

          <Button
            onPress={() =>
              this.setState({ swipeToClose: !this.state.swipeToClose })
            }
            mode="outlined"
            color="#007aff"
            style={styles.btn}
          >
            Disable swipeToClose(
            {this.state.swipeToClose ? "true" : "false"})
          </Button>
        </Modal> */}

        <View style={styles.buttonContainerStyle}>
          <Button
            icon="search"
            mode="contained"
            dark={true}
            color="#007aff"
            loading={this.state.loading}
            style={{
              height: 60,
              justifyContent: "center"
            }}
            onPress={() => alert(this.props.lat, this.props.lng)}
            //onPress={() => this.setState({ modal: !this.state.modal })}
          >
            Search data
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainerStyle: {
    alignItems: "stretch",
    position: "absolute",
    marginHorizontal: 20,
    left: 0,
    right: 0,
    bottom: 60
  },
  pickerStyle: {
    marginTop: 5,
    marginLeft: 15,
    marginRight: 15,
    zIndex: 9,
    elevation: 3,
    backgroundColor: "#fff",
    borderRadius: 4,
    position: "absolute",
    left: 0,
    right: 0,
    top: 20
  },
  modal: {
    position: "absolute",
    zIndex: 9999,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
    left: 0,
    right: 0
  },
  text: {
    color: "black",
    fontSize: 22
  },
  btn: {
    position: "absolute",
    margin: 10,
    backgroundColor: "#fff",
    color: "white",
    padding: 10
  }
});

const mapStateToProps = ({ map_reducer }) => {
  const {
    lat,
    lng,
    latitudeDelta,
    longitudeDelta,
    state_lists,
    disease_lists,
    _state,
    state_id,
    disease,
    disease_id
  } = map_reducer;

  return {
    lat,
    lng,
    latitudeDelta,
    longitudeDelta,
    state_lists,
    disease_lists,
    _state,
    state_id,
    disease,
    disease_id
  };
};

export default connect(
  mapStateToProps, { 
    getInitState,
    changeState,
    changeDisease,
    selectState,
    selectDisease
  }
)(MapScreen);
