import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Render data that was created from the CreateStatisticForm (should be saved on database)
// Display data in a table
// Different tables should be rendered depending on the one selected
// Add option to delete said table

export default class ViewStatistics extends Component {
	render() {
		return (
			<View>
				<Ionicons size={50} name="md-arrow-back" onPress={() => Actions.Statistics()} />
				<Text>I am empty.</Text>
			</View>
		)
	}
}