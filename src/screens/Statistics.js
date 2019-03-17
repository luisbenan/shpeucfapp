import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { ScrollView, StyleSheet, FlatList, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

const menuItems = [
	{
		title: 'Create Graph',
		icon: 'build',
		screen: 'CreateStatistics'
	},
	{
		title: 'View Graph',
		icon: 'search',
		screen: 'ViewStatistics'
	}];

const dimension = Dimensions.get('window');


export default class Statistics extends Component {
	renderItem  = ({item}) => {
		if (!('privilege' in item) || this.props.privilege[item.privilege] === true ) {
			return (
				<ListItem
					title={item.title}
					leftIcon={{name: item.icon}}
					onPress={() => Actions[item.screen]()}
				/>
			)
		}
	}

	_keyExtractor = (item, index) => index;
	render() {
		const {
			page,
			tabBar,
			tabBarText
		} = styles;

	return (
		<View style={page}>
			<View style={tabBar}>
				<View style={{flexDirection:'column', justifyContent:'center', margin: 15}}>
					<Ionicons size={25} name="md-arrow-back" onPress={() => Actions.more()} />
				</View>
				<View style={{flexDirection:'column', justifyContent:'center'}}>
					<Text style={tabBarText}>Statistics</Text>
				</View>
			</View>

			  <ScrollView>
			  <FlatList
					data={menuItems}
					extraData={this.state}
					keyExtractor={this._keyExtractor}
					renderItem={this.renderItem}
			  />
			  </ScrollView>
		 </View>
	 );
	};
}

const styles = StyleSheet.create({
	page: {
		flex: 1,
		backgroundColor: '#ebebf1',
	},
	tabBar: {
		height: dimension.height * .1,
		backgroundColor: '#fff',
		borderWidth: 1,
		borderStyle: "solid",
		borderColor: "#0005",
		flexDirection: "row"
	},
	tabBarText: {
		color: '#000',
		fontSize: 20,
		margin: 20,
		alignSelf: "center"
	}
});
