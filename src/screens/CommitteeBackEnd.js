import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions } from 'react-native';
import { Button } from '../components/general'
import {
    fetchCommittees,
    cDescriptionChanged,
    cNameChanged,
    ownerIDChanged,
    ownerFNameChanged,
    ownerLNameChanged,
    ownerEmailChanged,
    cIDChanged
} from '../actions'

const dimension = Dimensions.get('window');

class CommitteeBackEnd extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchCommittees()
  }
  _keyExtractor = (item, index) => index;


  renderComponent(item) {

    const {
      containerStyle
    } = styles

    const {
      name,
      description,
      ownerID,
      ownerFName,
      ownerLName,
      ownerEmail
    } = item[1]

    const {
      cNameChanged,
      cDescriptionChanged,
      ownerIDChanged,
      ownerFNameChanged,
      ownerLNameChanged,
      ownerEmailChanged,
      cIDChanged
    } = this.props
    return(
      <TouchableOpacity 
      onPress={() => {
        cNameChanged(name)
        cDescriptionChanged(description)
        ownerIDChanged(ownerID)
        ownerFNameChanged(ownerFName)
        ownerLNameChanged(ownerLName)
        cIDChanged(item[0])
        ownerEmailChanged(ownerEmail)
        Actions.CommitteeDetails();
      }}>
        <View style={containerStyle}>
          <Text style={{fontSize: 20, fontWeight: "bold", flex: 1}}>{name}</Text>
          <Text style={{flex: .3, fontSize: 10}}>{ownerFName} {ownerLName}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  
  render() {

    const {
      committeeList
    } = this.props
    let data = []
    if(committeeList !== undefined && committeeList !== null){
      data = Object.entries(committeeList);
    }
    const {
        tabBar,
        tabBarText,
        content,
        buttonContainerStyling,
        page
    } = styles;
    return (
     <View style={page}>
        <View style={tabBar}>
            <Text style={tabBarText}>Committee</Text>
        </View>
        <View style={content}>
          <FlatList
          data={data}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={({item, separators}) => (
          this.renderComponent(item))}
          />
        </View>
         <View style={buttonContainerStyling}>
            <Button 
            onPress={() => Actions.CreateCommittee()}
            title={"CREATE COMMITTEE"}
            > 
            </Button>
        </View>
        <View style={buttonContainerStyling}>
            <Button 
            onPress={() => Actions.popTo('BackEnd')}
            title={"BACK"}
            > 
            </Button>
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  tabBar : {
    height: dimension.height * .1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#0005",
  },
  tabBarText : {
    color: '#000',
    fontSize: 20,
    margin: 20,
    alignSelf: "center"
  },
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingVertical: 30,
    paddingHorizontal: 15,
  },
  content: { 
    flex: 1,
  },
  buttonContainerStyle: {
      flex: 5,
      margin: 5
  },
  page: {
    flex: 1,
    backgroundColor: '#ebebf1',
  }
});

const mapStateToProps = ({ committee }) => {
    const { committeeList } = committee
    return { committeeList };
};

const mapDispatchToProps = {
   fetchCommittees,
   cDescriptionChanged,
   cNameChanged,
   ownerIDChanged,
   ownerFNameChanged,
   ownerLNameChanged,
   ownerEmailChanged,
   cIDChanged
};

export default connect(mapStateToProps, mapDispatchToProps)(CommitteeBackEnd);
