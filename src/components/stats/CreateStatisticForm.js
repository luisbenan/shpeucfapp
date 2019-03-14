import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet } from 'react-native';
import { Button, PickerInput } from '../general';
import data from '../../data/Categories.json';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class CreateStatisticForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categories: [...data[0]],
			pickerInput: []
		};
	};

	componentWillMount() {
		this.state.pickerInput.push(
			<PickerInput
				title="Category"
				placeholder="Choose a Category"
				data={this.state.categories}
				onSelect={() => {}}
			/>
		);
	};

	changeSelection = () => {

	};

	addPicker = () => {
		let pickerInput = this.state.pickerInput;

		pickerInput.push(
			<PickerInput
				title="Category"
				placeholder="Choose a Category"
				data={this.state.categories}
				onSelect={this.changeSelection}
			/>);
		this.setState({ pickerInput });
	};

	removePicker = () => {
		let pickerInput = this.state.pickerInput;

		if (pickerInput.length == 1) {
			alert("Must have at least 1 category");
		}
		else {
			pickerInput.splice(-1);
			this.setState({ pickerInput });
		}
	}

	renderPickers() {
		return (
			this.state.pickerInput.map((value, index) => {
				return value;
			})
		);
	}

	render() {
		const {
			page,
			buttonContainerStyling,
			icon
		} = styles;
		let i = 0;
		return (
			<View style={page}>
				<ScrollView style={{flex: 1}}>
					{this.renderPickers()}
				</ScrollView>

				<View style={buttonContainerStyling}>
					<View style={icon}>
						<Ionicons size={50} name="md-add" style={{flex: 1}} onPress={() => this.addPicker()} />
					</View>
					<View style={icon}>
						<Ionicons size={50} name="md-remove" style={{flex: 1}}  onPress={() => this.removePicker()} />
					</View>
				</View>
			</View>
	 	)
	};
};

const styles = StyleSheet.create({
	page: {
		flex: 1
	},
	icon: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center'
	},
	buttonContainerStyling: {
		flex: .1,
		margin: 10,
		flexDirection: 'row',
	}
});
