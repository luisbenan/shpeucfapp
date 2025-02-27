import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { NavBar } from '../components/general'
import {
  fetchMembersPoints,
  fetchMemberProfile,
  goToOtherProfile,
  pageLoad,
  getPrivilege,
  loadUser
} from '../actions';
import _ from 'lodash';
import * as Progress from 'react-native-progress';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image } from 'react-native';

const dimension = Dimensions.get('window');
const iteratees = ['points','lastName','firstName'];
const order = ['desc','asc','asc'];

class Leaderboard extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.loadUser()
    this.props.fetchMembersPoints();
  }

  viewBreakDown() {
    Actions.pointsBreakDown();
  }

  callUser(id){
    this.props.pageLoad();
    this.props.fetchMemberProfile(id);
    this.props.goToOtherProfile();
  }
    

  renderComponent(item, sortedMembers) {
    const {picture} = this.props;
    const {
      containerStyle,
      contentContainerStyle,
      progress,
      curUserHighlight,
      textStyle,
      index,
      textColor,
      indexText
    } = styles;
    var action
    if(item.id === this.props.id){
      var curUser = curUserHighlight
      action = this.viewBreakDown
    }
    // else{
    //   action = this.callUser
    // }

    // if(item.points !== 0){
      return (
        // <TouchableOpacity onPress = {() => action(item.id)}>
          <View style={contentContainerStyle}>
              <View style={containerStyle}>
              {/* <Image    ***For Profile Picture Update***
                large
                rounded
                style={{alignSelf: 'flex-end', width: dimension.width *.14, height: dimension.height *.085}}
                source={{uri: picture}}
                /> */}
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={index}>
                    <Text style={textColor} style={indexText}>{item.index}</Text>
                  </View>
                <View>
                  <Text style={ [textStyle, {fontWeight: 'bold'}]}>{`${item.firstName} ${item.lastName}`}</Text>
                  <Text style={[textStyle, {fontSize: 15}]}>Points: {item.points}</Text>
                    <Progress.Bar
                  style={progress}
                  progress={item.points / Math.max(sortedMembers[0].points,1)}
                  indeterminate={false}
                  height={dimension.width*.03}
                  width={dimension.width * .75}
                  color= {'#ffd700'}
                />
                </View>
                </View>
              
              </View>
          </View>
        // </TouchableOpacity>
      )
    }

   _keyExtractor = (item, index) => index;

  render() {
    const {
      screenBackground,
       } = styles;
    const sortedMembers = _.orderBy(this.props.membersPoints, iteratees, order);
    var currentMember;
    var pastPoints = 0;
    var pastIndex = 1;
    sortedMembers.forEach((x, index) => {
      x.index = (x.points !== 0) ? index + 1 : sortedMembers.length;
      if (x.points === pastPoints) {
        x.index = pastIndex
      }
    
      pastPoints = x.points;
      pastIndex = x.index;
    });
    return (
      <View style={screenBackground}>
        <NavBar title="Leaderboard" back onBack={() => Actions.pop()} />
        <FlatList
            style={{flex: 1}}
            data={sortedMembers}
            extraData={this.state}
            keyExtractor={this._keyExtractor}
            renderItem={({item, separators}) => (
            this.renderComponent(item, sortedMembers)
          )}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#21252b',
    paddingVertical: 30,
    paddingHorizontal: 15,
  },
  screenBackground: {
    flex: 1,
    backgroundColor: '#0c0b0b',
  },
  curUserHighlight: {
    // backgroundColor: '#ffd70024',
    color: '#aa9100'
  },
  textStyle: {
    color: "#e0e6ed",
    fontSize: 18,
    paddingBottom: 5,
  },
  contentContainerStyle: {
    margin: 1,
    backgroundColor: '#2C3239',
  },
  progress: {
    // flex: 1,
    justifyContent: 'center',
    height: dimension.width*.03,
    borderColor: '#2C3239',
    backgroundColor: '#2C3239',
  },
  textColor: {
    color: '#e0e6ed'
  },
  	indexText: {
  	  alignSelf: 'center',
  	  fontWeight: "700",
  	  fontSize: 20,
  	  color: "#e0e6ed"
  	},
  index: {
    color: '#000',
    borderColor: '#e0e6ed',
    borderStyle: 'solid',
    borderWidth: 3,
    borderRadius: 20,
    marginRight: '4%',
    justifyContent: 'center',
    height: 40,
    width: 40,
    elevation: 1
  }
});

const mapStateToProps = ({ auth,members }) => {
  const { membersPoints } = members;
  const { picture, id } = auth

  return { membersPoints, id, picture};
};

const mapDispatchToProps = {
  fetchMembersPoints,
  fetchMemberProfile,
  goToOtherProfile,
  pageLoad,
  getPrivilege,
  loadUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);
