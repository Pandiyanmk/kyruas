import { useEffect, useState } from 'react';
import { NativeModules, Platform, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { documents } from '../../store/LocalDataStore';
import RNSketchCanvas, { SketchCanvas } from '@kichiyaki/react-native-sketch-canvas';

var PSPDFKit = NativeModules.PSPDFKit;

export const PDFEditorScreen = ({ navigation, route }) => {
    //route.params.url
    const _onPressButton = () => {
        const url = Platform.OS == 'android' ? documents : decodeURI(route.params.url.replace('file://', ''))
        console.log(url)
        PSPDFKit.present(url, {
            showThumbnailBar: 'scrollable',
            pageTransition: 'scrollContinuous',
            scrollDirection: 'vertical',
        });
    }

    useEffect(() => {
        PSPDFKit.setLicenseKeys('YOUR_REACT_NATIVE_ANDROID_LICENSE_KEY_GOES_HERE', 'YOUR_REACT_NATIVE_IOS_LICENSE_KEY_GOES_HERE');

    }, [])

    return <View style={styles.container}>
         <View style={{ flex: 1, flexDirection: "row" }}>
          <RNSketchCanvas
            containerStyle={{ backgroundColor: "transparent", flex: 1 }}
            canvasStyle={{ backgroundColor: "transparent", flex: 1 }}
            defaultStrokeIndex={0}
            defaultStrokeWidth={5}
            closeComponent={
              <View style={styles.functionButton}>
                <Text style={{ color: "white" }}>Close</Text>
              </View>
            }
            undoComponent={
              <View style={styles.functionButton}>
                <Text style={{ color: "white" }}>Undo</Text>
              </View>
            }
            clearComponent={
              <View style={styles.functionButton}>
                <Text style={{ color: "white" }}>Clear</Text>
              </View>
            }
            eraseComponent={
              <View style={styles.functionButton}>
                <Text style={{ color: "white" }}>Eraser</Text>
              </View>
            }
            strokeComponent={(color) => (
              <View
                style={[{ backgroundColor: color }, styles.strokeColorButton]}
              />
            )}
            strokeSelectedComponent={(color, index, changed) => {
              return (
                <View
                  style={[
                    { backgroundColor: color, borderWidth: 2 },
                    styles.strokeColorButton,
                  ]}
                />
              );
            }}
            strokeWidthComponent={(w) => {
              return (
                <View style={styles.strokeWidthButton}>
                  <View
                    style={{
                      backgroundColor: "white",
                      marginHorizontal: 2.5,
                      width: Math.sqrt(w / 3) * 10,
                      height: Math.sqrt(w / 3) * 10,
                      borderRadius: (Math.sqrt(w / 3) * 10) / 2,
                    }}
                  />
                </View>
              );
            }}
            saveComponent={
              <View style={styles.functionButton}>
                <Text style={{ color: "white" }}>Save</Text>
              </View>
            }
            savePreference={() => {
              return {
                folder: "RNSketchCanvas",
                filename: String(Math.ceil(Math.random() * 100000000)),
                transparent: false,
                imageType: "png",
              };
            }}
          />
        </View>
        <TouchableHighlight onPress={_onPressButton}>
            <Text style={styles.text}>Tap to Open Document</Text>
        </TouchableHighlight>
    </View>
}




const styles = StyleSheet.create({
    container1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: 'black'
    },
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F5FCFF",
    },
    strokeColorButton: {
      marginHorizontal: 2.5,
      marginVertical: 8,
      width: 30,
      height: 30,
      borderRadius: 15,
    },
    strokeWidthButton: {
      marginHorizontal: 2.5,
      marginVertical: 8,
      width: 30,
      height: 30,
      borderRadius: 15,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#39579A",
    },
    functionButton: {
      marginHorizontal: 2.5,
      marginVertical: 8,
      height: 30,
      width: 60,
      backgroundColor: "#39579A",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 5,
    },
  });
  