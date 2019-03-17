import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, FlatList, ScrollView, StyleSheet } from 'react-native';
import { Button, PickerInput, Input } from '../general';
import data from '../../data/Categories.json';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CheckBox } from 'react-native-elements';

const categories = [];
data.map(category => {categories.push(category.key)});

// Add college array

let i = 0;

// Move styles to bottom and destructure them to decluter code
export default class CreateStatisticForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categories: categories,
			pickerInput: []
		};
	};

	onchangeSelection = (key, text) => {
		let pickerInput = this.state.pickerInput;
		let index = pickerInput.findIndex(obj => obj.key === key);
		let type;

		for (let obj of data) {
			if (obj.key == text) {
				type = obj.type;
			}
		}
		
		switch (type) {
			case "string":
				pickerInput[index].child = (
					<Text>Test</Text>
					// Render two pickerInputs College AND Major, although the latter can be optional
					// Array will be the one in Colleges.json
				)
				break;
			// Render components in a row
			case "number":
				pickerInput[index].child = (
					<View> 
						<View>
							<Input
								placeholder="Enter min."
								keyboardType="numeric"
							/>
						</View>
						<View>
							<Input
								placeholder="Enter max."
								keyboardType="numeric"
							/>
						</View>
					</View>
				)
				break;
			// Title should be array under values found on Categories.json
			// Perhaps it would be useful to render them in an array inside .child
			// At the same time, you would want them not to take up much space on the screen
			case "checkbox":
				pickerInput[index].child = (
					<View>
						<CheckBox
							title="Hi" 
							checked={() => this.onCheck()}
						/>
					</View>
				)
				break;

		}
		this.setState({pickerInput});
	};

	// Create function so that it can become unchecked (plus deal with backend)
	oncheck = () => {

	}

	addPicker = (index) => {
		let pickerInput = this.state.pickerInput;

		pickerInput.push({
			key: index,
			component: this.pickerComponent(this.state.categories, index)
		});

		this.setState({ pickerInput });
	};

	// Find way of removing pickers when a selection has been made
	// Key of the component is corrent, but it is not being filtered out
	removePicker = (key) => { 
		if (this.state.pickerInput.length != 1) {

			alert(`Gonna filter out this key: ${key}`);
			let newArray = this.state.pickerInput.filter(obj => obj.key !== key);

			this.setState({ pickerInput: newArray })
		}
		
	}
	// Could possibly be refactored to only return the component regardless of where it is called
	// And not worry about any extra view or button
	pickerComponent(data, key, title="Category", placeholder="Select Category", removable=true) {
		if (removable) {
			return (
				<View style={styles.buttonContainerStyling}>
						<View style={{flexDirection: 'column', flex: 0.2, justifyContent: 'center'}}>
							<Ionicons size={50} name="md-remove" onPress={() => this.removePicker(key)} />
						</View>
						<View style={{flex: 2, flexDirection: 'column', justifyContent: 'center'}}>
							<PickerInput
								title={title}
								placeholder={placeholder}
								data={data}
								onSelect={(text) => {this.onchangeSelection(key, text)}}
							/>
						</View>
					</View>
			)
		}
		else {
			return (
				<View style={styles.buttonContainerStyling}>
						<View style={{flex: 2, flexDirection: 'column', justifyContent: 'center'}}>
							<PickerInput
								title={title}
								placeholder={placeholder}
								data={data}
								onSelect={(text) => {this.onchangeSelection(index, text)}}
							/>
						</View>
					</View>
			)
		}
		
	}

	renderComponent() {
		return (
			this.state.pickerInput.map((value) => {return (
				<View>
					{value.component}
					{value.child}
				</View>)
			})
		);
	}

	render() {
		const {
			page,
			buttonContainerStyling,
			icon
		} = styles;
		
		return (
			<View style={page}>
				<View style={{backgroundColor: '#fff', borderWidth: 1, borderStyle: "solid", borderColor: "#0005", flexDirection: "row"}}>
					<View style={{flexDirection:'column', justifyContent:'center', margin: 15}}>
					<Ionicons size={25} name="md-arrow-back" onPress={() => Actions.Statistics()} />
				</View>
					<View style={{flexDirection:'column', justifyContent:'center'}}>
						<Text style={{color: '#000',
		fontSize: 20,
		margin: 20,
		alignSelf: "center"}}>Statistics</Text>
					</View>
				</View>
				<ScrollView style={{flex: 1}}>
					{this.renderComponent()}
				</ScrollView>

				<View style={buttonContainerStyling}>
					<View style={icon}>
						<Ionicons size={50} name="md-add" onPress={() => this.addPicker(i++)} />
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
