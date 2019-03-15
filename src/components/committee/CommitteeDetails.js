import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    View,
    TouchableOpacity,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    Dimensions,
    FlatList,
    Linking
} from 'react-native';
import {Button} from '../general'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    getPrivilege,
    pageLoad,
    fetchAllUsers,
} from '../../actions'
import { Actions } from 'react-native-router-flux';

const dimension = Dimensions.get('screen');

class CommitteeDetails extends Component {
    

    componentWillMount() {
        this.props.pageLoad()
        this.props.getPrivilege()
    }

    convertNumToDate(date) {
        var months = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
        temp_date = date.split("-");
        return months[Number(temp_date[1]) - 1] + " " + temp_date[2];
    }


    renderComponent(item) {
        if(this.props.userList !== undefined && this.props.userList[item] !== undefined){
            const {
                firstName,
                lastName
            } = this.props.userList[item]
            return(
                <View style={{flex: 1}}>
                    <Text style={{fontSize: 16, alignSelf:'center'}}>{firstName} {lastName}</Text>
                </View>
            )
        }
    }

    convertArrayOfObjectsToCSV(args) {  
        var result, ctr, keys, columnDelimiter, lineDelimiter, data;

        data = args.data || null;
        if (data == null || !data.length) {
            return null;
        }

        columnDelimiter = args.columnDelimiter || ',';
        lineDelimiter = args.lineDelimiter || '\n';

        keys = Object.keys(data[0]);

        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;

        data.forEach(function(item) {
            ctr = 0;
            keys.forEach(function(key) {
                if (ctr > 0) result += columnDelimiter;

                result += String(item[key]).replace('&','and').replace('\n',' ');
                ctr++;
            });
            result += lineDelimiter;
        });

        return result;
    }

    sendListToMail(attendants) {

        const {
            privilege,
            userList,
            name,
        } = this.props

        var users = [];
        const email = userList[privilege.id].email
        attendants.map(attendant => {users.push(userList[attendant])})


        var csv = this.convertArrayOfObjectsToCSV({
            data: users
        });

        if (csv == null) return;

        filename = `${name}.csv` || 'export.csv';
        
        data = `Instructions: \n1.Open a plain text Editor(Not microsoft Word)\n2.Copy everything under the line and paste it into the text editor\n3.save the file and change the extension to .csv(Look up how to do this if you dont know how)\n` +
         `4.Open the file in either Numbers or Excel\n------------------\n\n` + csv
        var link = `mailto:${email}?subject=Committee: "${name}" MemberList&body=`+ data
        if(!Linking.canOpenURL(link)){
            alert('Email could not be sent', 'Failure')
        }else{
            Linking.openURL(link)
            alert('Email app should be Opened')
        }
    }

    renderAttendance() {
        
        const {
            privilege,
        } = this.props
        
        const {
            lineOnTop,
            attendance,
            attendanceContainer,
            icon
        } = styles

        var attendants = []

        if(privilege !== undefined && privilege.board === true){
            return(
                <View style={[{flex: 1, flexDirection: 'column'}, lineOnTop]}>
                    <View style={attendanceContainer}>
                        <View style={{flex:.5}}/>
                        <Text style={attendance}>Member List</Text>
                        <Ionicons 
                        style={[icon, {alignSelf: 'center'}]} 
                        name="md-mail" 
                        size={35} 
                        color='#000000'
                        onPress={() => this.sendListToMail(attendants)}/>
                    </View>
                    <FlatList
                    data={attendants}
                    extraData={this.state}
                    numColumns={2}
                    keyExtractor={this._keyExtractor}
                    renderItem={({item, separators}) => (
                    this.renderComponent(item)
                    )}/>
                </View>
            )
        }
    }
    
    deleteButton(){

    }
    
    renderButtons(){
        if(this.props.privilege !== undefined && this.props.privilege.board === true){
            return (
                <View>
                    <Button 
                        title = "DELETE COMMITTEE"
                        onPress={() => deleteButton()}
                    />
                    <Button 
                        title = "EDIT COMMITTEE"
                        onPress={() => Actions.CreateCommittee()}
                    />
                </View>
            )
            }else
            return(
            <View>
                <Button 
                    title = "JOIN COMMITTEE"
                    onPress={() => {
                        
                    }}
                />
            </View>
        )
    }
    render() {

        if (this.props.loading) {
            return <Spinner/>
        } 
        else {
            const {
                cName,
                cDescription,
                ownerID,
                ownerFName,
                ownerLName,
                ownerEmail
            } = this.props

            const { 
                page,
                tabBar,
                tabBarText,
                container,
                icon_container,
                icon,
                text,
                final
            } = styles

            var iconSize = 25
            return (
                <View style={page}>
                    <View style={tabBar}>
                        <Text style={tabBarText}>{cName}</Text>
                    </View>
                    <View style={container}>
                        <View style={icon_container}>
                            <Ionicons style={icon} name="md-person" size={iconSize} color='#000000'/>
                            <Text style={text}>{ownerFName} {ownerLName}</Text>
                        </View>
                        <View style={icon_container}>
                            <Ionicons style={icon} name="md-mail" size={iconSize} color='#000000'/>
                            <Text style={text}>{ownerEmail}</Text>
                        </View>
                        <View style={[icon_container, {flex: .7}]}>
                            <Ionicons style={icon} name="md-list" size={iconSize} color='#000000'/>
                            <Text style={text}>{cDescription}</Text>
                        </View>
                        <View style = {[icon_container, final]}>
                            {this.renderAttendance()}
                        </View>
                    </View>
                    {this.renderButtons()}
                    <Button 
                        title = "CANCEL"
                        onPress={() => Actions.pop()}
                    />
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: .95,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 25,
    },
    modalText: {
        alignSelf: 'center',
        fontSize:16
    },
    modalTextInput: {
        marginTop: dimension.height*.05,
        height: 80,
        textAlign: 'center',
        width: dimension.width*.6,
        backgroundColor: '#FECB0022',
        borderColor: '#FECB00',
        borderRadius: 16,
        borderWidth: 3,
        borderStyle: 'solid',
        fontWeight: 'bold',
        fontSize: 60
    },
    modalContent: {
        height: dimension.height*.5,
        width: dimension.width*.8,
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 12,
    },
    modalBackground: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
        height: dimension.height,
        width: dimension.width,
        backgroundColor: '#000a'
    },
    final: {
        flex: 1
    },
    icon_container: {
        flex: .2,
        flexDirection: 'row'
    },
    icon: {
        flex: .2
    },
    attendanceContainer: {
        flex: .5,
        flexDirection: 'row',
    },
    attendance: {
        fontSize: 20,
        alignSelf: 'center', 
        flex: .8,
    },
    text: {
        flex: 1,
        fontSize: 20
    },
    lineOnTop: {
        borderTopColor: 'black',
        borderTopWidth: 1,
    },
    codeText: {
        margin:60,
        color: '#FECB00',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 50,
    }, 
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
        padding: 10
    },
    tabBarText: {
        color: '#000',
        fontSize: 20,
        margin: 20,
        alignSelf: "center"
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
    }
});

const mapStateToProps = ({ auth, members, committee }) => {
  const { privilege } = auth
  const { userList } = members
  const { cName, cDescription, ownerID, ownerFName, ownerLName, ownerEmail } = committee

  return { privilege, userList, cName, cDescription, ownerID, ownerFName, ownerLName, ownerEmail};
};

const mapDispatchToProps = {
    getPrivilege,
    pageLoad,
    fetchAllUsers,
}


export default connect(mapStateToProps, mapDispatchToProps)(CommitteeDetails);
