import React from "react";
import { StyleSheet, View, ToastAndroid } from "react-native";
import CodeInput from "react-native-code-input";
import { Button } from "react-native-paper";
import { connect } from "react-redux";
import { checkCode } from "../actions";

class LoginScreen extends React.Component {
    
  codeFilled(text) {
    this.props.checkCode(text);
  }

  verifyCode() {
    if(this.props.code === '2282') {
        this.props.navigation.navigate('map');    
    } else {
        ToastAndroid.showWithGravity('Incorrect code', ToastAndroid.SHORT, ToastAndroid.CENTER);
    }

  }

  render() {
    return (
      <View style={styles.container}>
        <CodeInput
          ref="codeInputRef2"
          secureTextEntry
          codeLength={4}
          space={10}
          borderType={"square"}
          activeColor="#007aff"
          inactiveColor="#007aff"
          autoFocus={true}
          inputPosition="center"
          size={50}
          onFulfill={text => this.codeFilled(text)}
          containerStyle={{
            justifyContent: "center",
            alignItems: "center",
            margin: 0,
            padding: 0
          }}
          codeInputStyle={{
            borderWidth: 1.5,
            margin: 0,
            padding: 0
          }}
        />

        <Button
          style={{
            height: 60,
            justifyContent: "center"
          }}
          dark={true}
          raised
          theme={{ roundness: 0 }}
          icon="navigate-next"
          mode="contained"
          onPress={() => this.verifyCode()}
        >
          Login
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center"
  },
  labelStyle: {
    fontSize: 17,
    fontWeight: "600",
    marginLeft: 22,
    marginVertical: 50,
    color: "#007aff"
  }
});

const mapStateToProps = ({ login_reducer }) => {
  const { code } = login_reducer;

  return { code };
};

export default connect(
  mapStateToProps,
  {checkCode}
)(LoginScreen);
