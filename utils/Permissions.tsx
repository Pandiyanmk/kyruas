import { version } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import DeviceInfo from "react-native-device-info";
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, ScrollView, TouchableOpacity, Linking, Share, } from 'react-native';
import Contact from 'react-native-contacts';
import { colorScheme, style } from "../Values/AppStyles"
export const audioPermissions = async () => {
  if (Platform.OS === 'android') {
    try {


      const pn = [ PermissionsAndroid.PERMISSIONS.RECORD_AUDIO]


      const version = parseInt(DeviceInfo.getSystemVersion())
      //if (version < 13) {
        pn.push(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)
     // }


     // if (version < 10) {
        pn.push(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
     /// }

      const grants = await PermissionsAndroid.requestMultiple(pn);

      console.log('write external stroage', grants);

      if (grants['android.permission.RECORD_AUDIO'] ===
        PermissionsAndroid.RESULTS.GRANTED
      ) {
        let isGrant = true
        // if (version < 10) {
        //   isGrant = grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
        //     PermissionsAndroid.RESULTS.GRANTE
        // }
        // if (version < 13) {
        //   isGrant = grants['android.permission.READ_EXTERNAL_STORAGE'] ===
        //     PermissionsAndroid.RESULTS.GRANTE
        // }
        console.log('Permissions granted' + isGrant);
        return isGrant
      } else {
        console.log('All required permissions not granted');
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  } else {
    return true
  }
}

export const cameraPermissions = async () =>  {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'Your message to users about why you need camera access',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Camera permission granted');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

{/*In this code, I have implemented the Mobile Contact permissions */}
export const Contactnum = () => {
  const [contacts, setContacts] = useState([])

  useEffect(() => {
    getPermission();
  }, [])
  const getPermission = () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'Please accept bare mortal',
    })
      .then((res) => {
        if (res == 'granted') {
          console.log('Permission: ', res);
          Contact.getAll()
            .then((con) => {
              const sortedContacts = con.sort((a, b) =>
              a.givenName.localeCompare(b.givenName)
            );
            setContacts(sortedContacts);
            })
            .catch((e) => {
              console.log(e);
            });
        }
      })
  }
  return (
    <ScrollView nestedScrollEnabled={true} style={{ width: "100%" }}>
      <View>
        <ScrollView horizontal={true} style={{ width: "100%" }}>
          <FlatList
            data={contacts}
            renderItem={renderItemContacts}
            keyExtractor={(item, index) => index.toString()}
            style={{ flex: 1 }}
          />
        </ScrollView>
      </View>
    </ScrollView>
  )
}
const renderItemContacts = ({ item }) => {
  return (
    <TouchableOpacity >
      <View style={style.contact}>
        <View style={style.contactCircles}>
          <Text style={style.contactFirstletter}>{item.givenName[0]}</Text>
        </View>
        <View style={style.contactField}>
          <Text style={style.contactName}>{item.givenName} {item.middleName && item.middleName + ' '}
            {item.familyName}</Text>
          <Text style={style.contactNumber}>{item.phoneNumbers[0]?.number}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};