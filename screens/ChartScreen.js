import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

class ChartScreen extends React.Component {

    render() {

        return(
            <View
                style={styles.container}
            >
                <Text>ChartScreen</Text>
                <Text>ChartScreen</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default ChartScreen;