import React, { Component } from 'react';
import { connect } from 'react-redux';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import { Input, Button, PickerInput } from '../general';
import { RkAvoidKeyboard, RkButton, RkPicker } from 'react-native-ui-kitten';
import {
    createCommittee,
    editCommittee,
    cNameChanged,
    cDescriptionChanged,
    loadUser
} from '../../actions'
import { Actions } from 'react-native-router-flux';


class CreateCommittee extends Component {
    componentWillMount() {
        this.props.loadUser()
        if(this.props.cName === ''){
            this.state = {
                title: "Create Committee"
            }
        }
        else {
            this.state = {
                title: "Edit Committee"
            }
        }
    }

    EventCreationError(text) {
        // this.props.eventError(text);
    }

    renderError() {
        // if (this.props.error) {
        //     return (
        //     <View>
        //         <Text style={styles.errorTextStyle}>
        //             {this.props.error}
        //         </Text>
        //     </View>
        //     );
        // }
    }

    onButtonPress() {
        const {
            cName,
            cDescription,
            createCommittee,
            id,
            firstName,
            lastName,
            email
        } = this.props;

        if (cName === '') {
            this.EventCreationError('Please enter committee name');
        } else if (cDescription === '') {
            this.EventCreationError('Please enter a short description of your goal');
        } else{
            if(this.state.title === "Create Committee")
                createCommittee(cName, cDescription, id, firstName, lastName, email);
            else
                editCommittee(cName, cDescription, id);
            Actions.pop();
        }
    }

    render() {

        const {
            cName,
            cNameChanged,
            cDescription,
            cDescriptionChanged
        } = this.props

        const {
            title
        } = this.state
            return (
                <View style={styles.formContainerStyle}>
                    <View style={styles.headerStyle}>
                        <Text style={styles.headerTextStyle}>{title}</Text>
                    </View>
                    <ScrollView
                    ref={(ref)=> (this.scrollView=ref)}
                    style={styles.scrollView}>
                    <RkAvoidKeyboard>
                        <View>
                            <Input
                            placeholder="Committee Name"
                            value={cName}
                            onChangeText={(text) => cNameChanged(text)}
                            />
                            <Input
                            placeholder="Your goal for the committee"
                            value={cDescription}
                            autoCapitalize="sentences"
                            maxLength={200}
                            onChangeText={(text) => cDescriptionChanged(text)}
                            />
                        </View>

                    </RkAvoidKeyboard>
                        {this.renderError()}
                        <Button 
                            title = {title}
                            onPress={() => this.onButtonPress()}
                        />
                        <Button 
                            title = "BACK"
                            onPress={() => Actions.pop()}
                        />
                    </ScrollView>
                </View>
            )
        }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E1E1E1',
        justifyContent: 'flex-end',
    },
    formContainerStyle: {
        flex: 1,
        padding: 20,
    },
    headerStyle: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        marginBottom: 10,
    },
    headerTextStyle: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    errorTextStyle: {
        fontSize: 14,
        alignSelf: 'center',
        color: 'red',
        fontWeight: 'bold',
        padding: 10,
    },
    pickerTextInput: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollView: {
        flex: 0,
        paddingTop: 0,
        paddingBottom: 0,
        paddingRight: 10,
    }
});

const mapStateToProps = ({ committee, auth }) => {
    const { cName, cDescription } = committee
    const { id, firstName, lastName, email } = auth

    return { cName, cDescription, id, firstName, lastName, email}
};

const mapDispatchToProps = {
    createCommittee,
    editCommittee,
    cNameChanged,
    cDescriptionChanged,
    loadUser
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateCommittee);
