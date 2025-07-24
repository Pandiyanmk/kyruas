

import { ActivityIndicator, Alert, Animated, Button, Dimensions, GestureResponderEvent, Image, LayoutChangeEvent, Linking, NativeSyntheticEvent, PanResponder, PanResponderGestureState, StyleSheet, Text, TextInput, TextInputFocusEventData, TouchableOpacity, View } from "react-native"
import { strings } from "../../Localization"
import { colorScheme, style as getStyles , screenHeight,  width } from "../../Values/AppStyles"
import { useEffect, useRef, useState } from "react"
import { routes } from "../../Values/Routes"
import Pdf from "react-native-pdf"
import { colors } from "../../Values/AppColores"
import { Title } from "react-native-paper"
import { AddCommantBottomSheet } from "../../Global/Modales"
import { PDFDocument, PDFPage } from "@shogobg/react-native-pdf"
import { eyeImage, fontFamily } from "../../store/LocalDataStore"
import ReactNativeBlobUtil from "react-native-blob-util"
import React from "react"
import RNSketchCanvas, { SketchCanvas } from "@kichiyaki/react-native-sketch-canvas"
import { PanGestureHandler, State } from "react-native-gesture-handler"
import { Colors } from "react-native/Libraries/NewAppScreen"
import { useKeyboard } from "../../utils/Extentions"
import Draggable from "react-native-draggable"
import { useSelector } from 'react-redux';
export const pdfurl = 'https://api.printnode.com/static/test/pdf/multipage.pdf'
const dirs = ReactNativeBlobUtil.fs.dirs.DocumentDir;

export const PDFViewScreen = ({ navigation, route }) => {
    let style;
style = getStyles()
const theme = useSelector(state => state.appState.theme)

    useEffect(() => {
        colorScheme(theme)
        style = getStyles()
    }, [theme])

    const [show, isShow] = useState(false)
    function alert(page: number): void {
        throw new Error("Function not implemented.")
    }
    const isKeyboardOpen = useKeyboard();
    const [xy, setxy] = useState({ x: 0, y: 0 })

    const [annotations, setAnnotations] = useState([]);
    const [isDrawingMode, setIsDrawingMode] = useState(false);
    const [page, setPage] = useState(1);
    const [isEditable, setIsEditable] = useState(false);

    const pdfViewRef = useRef<Pdf>();
    const [comment, setAddCommet] = useState("this is text");

    const [localUrl, setLocalUrl] = useState(route.params ? route.params.url : undefined)

    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        console.log("Local URL", route.params.url)
        if (!isKeyboardOpen && show && isEditable == false) {
           // addTextUnderlineAnnotation(xy)
           // isShow(false)
        }
    }, [isKeyboardOpen])

    const addTextUnderlineAnnotation = (xyaxis: any) => {

        if (comment != "" || isEditable) {
            var page1 = null
            if (isEditable) {
                page1 = PDFPage
                    .modify(page - 1)
                    .drawRectangle({
                        x: xyaxis.x,
                        y: screenHeight - xyaxis.y,
                        width: width - 40,
                        height: 2,
                        color: colors.lightRed,
                    });
            } else {
                page1 = PDFPage
                    .modify(page - 1)
                    .drawText(comment, {
                        x: xyaxis.x,
                        y: screenHeight - xyaxis.y,
                        color: '#F62727',
                        fontName: fontFamily.rotobotMediume
                    })

                    setAddCommet("")
            }

            console.log(localUrl, dirs);
            //console.warn(xyaxis);

            PDFDocument
                .modify(localUrl)
                .modifyPage(page1)
                .write() // Returns a promise that resolves with the PDF's path
                .then((path: string) => {
                    setLocalUrl(path)
                    setRefresh(!refresh)
                    console.log('PDF modified at: ' + path);
                }).catch((error: any) => {
                    console.log("Error", error);

                })
        }
    }

    return <View style={[style.viewBox, { padding: 0 }]}>
        {/* <View style={{
            flexDirection: 'row', justifyContent: 'flex-end',
            borderColor: colors.dark_grey, borderBottomWidth: 1, borderTopWidth: 1
        }}>
            <OpenTab isVisible={false} title="Text" onClick={() => {

            }} />
            <OpenTab title="T" onClick={() => {

            }} />
            <OpenTab title="Color" onClick={() => {

            }} />

        </View> */}


        <Pdf
            ref={pdfViewRef}
            trustAllCerts={false}
            source={{
                uri: localUrl ? decodeURI(localUrl) : pdfurl,
            }}
            page={1}
            scale={1.0}
            minScale={0.5}

            onPageChanged={(page: number, numberOfPages: number) => {
                console.log(page);

                setPage(page)
            }}
            maxScale={3.0}
            renderActivityIndicator={() => (
                <ActivityIndicator color={colors.blue} size="large" />
            )}
            // enablePaging={true}
            onError={(error) => {console.log("Error", error.toString()) 
            Alert.alert("Error", error.toString())}}
            onPressLink={(link) => Linking.openURL(link)}
            spacing={10}
            style={[style.viewBox, {
                padding: 0, backgroundColor: colorScheme() === 'dark' ? 'black' : colors.grey,
            }]}
        />
        {/* {
            show ? <DraggableTextInput isLine={isEditable} text={comment} onTextChange={(it: string) => [
                setAddCommet(it)
            ]} onXY={(x: number,
                y: number) => {
                const xyaxis = { x: x, y: y }
                console.log(xyaxis)

                setxy(xyaxis)
                if (isEditable) {
                    addTextUnderlineAnnotation(xyaxis)
                    isShow(false)
                }
            }} onFocus={(e: NativeSyntheticEvent<TextInputFocusEventData>) => {


            }} /> : null
        } */}
        {/* <TouchableOpacity onPress={() => {
            //isShow(true)
            addPdf()
        }} style={{
            borderColor: 'white',
            borderWidth: 1,
            padding: 6,
            borderRadius: 100,
            justifyContent: 'center',
            position: 'absolute',
            top: 20,
            end: 20
        }}>
            <Image source={eyeImage}
                style={{
                    height: 18,
                    width: 18,
                    tintColor: 'white'
                }} />
        </TouchableOpacity> */}

        {isDrawingMode && (
            <View style={{ flex: 1, flexDirection: "row", position: 'absolute' }}>
                <RNSketchCanvas
                    containerStyle={{ backgroundColor: "transparent", flex: 1, height: 350 }}
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
        )}

        {/* {!isKeyboardOpen ? <View style={{ position: 'absolute', bottom: 20, flexDirection: 'row', justifyContent: 'space-around', width: width }}>


            <Button title="Add Text" onPress={() => {
                setIsEditable(false)
                isShow(true)
                //  addTextAnnotation()
            }} />
            {/* <Button title="Add Underline Annotation" onPress={addUnderlineAnnotation} />
        <Button title="Add Score Annotation" onPress={addScoreAnnotation} /> */}
            {/* <Button
                title={'Add Underline'}
                onPress={() => {
                    if (!show)
                        isShow(true)
                    setIsEditable(true)
                }}
            />
        </View> : null} */}
        {/* {show ? <AddCommantBottomSheet isShow={true} onClick={() => {
            isShow(false)
        }} /> : null} */}
    </View>

}


export const OpenTab = ({ title = '', isVisible = true, onClick }) => {

    return <TouchableOpacity onPress={onClick} style={{
        borderColor: colors.dark_grey,
        borderStartWidth: 1, padding: 10
    }}>
        <Text style={style.textStyle}>{title + "  "}{isVisible ? <Image source={eyeImage}
            style={{
                height: 18,
                width: 18,
                tintColor: 'white'
            }} /> : null}</Text>
    </TouchableOpacity>
}




const DraggableTextInput = ({ text, onTextChange, isLine = false, onXY, onFocus }) => {
    // Create a ref to store the position of the card 
    const position =
        useRef(new Animated.ValueXY()).current;


    // State to track if the card is being dragged 
    const [dragging, setDragging] = useState(false);
    const [xy, setxy] = useState({ x: 0, y: 0 })
    const onLayout = (event: LayoutChangeEvent) => {
        const { x, y, width, height } = event.nativeEvent.layout;
        console.log('onLayout:', x, y, width, height);
    };

    // Create a pan responder to handle touch events 
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => false,
            onPanResponderGrant: () => {
                console.log("dkdks");

                // When touch gesture starts,  
                //set dragging to true 
                setDragging(true);
            },
            onPanResponderMove: (evt, gestureState) => {
                Animated.event(
                    [
                        null,
                        {
                            dx: position.x,
                            dy: position.y,
                        },
                    ],
                    { useNativeDriver: false }
                )
                setxy({
                    x: gestureState.dx,
                    y: gestureState.dy,
                })
            },
            onPanResponderRelease: () => {
                console.log("dkdk");
                // When touch gesture is released,  
                //set dragging to false 
                setDragging(false);
            },
        })
    ).current;

    const [isPanResponderActive, setIsPanResponderActive] = useState(false)

    const panResponder1 = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => {
            setIsPanResponderActive(true);
            return true;
        },
        onPanResponderMove: (evt, gestureState) => {
            setxy({
                x: gestureState.dx,
                y: gestureState.dy,
            })
        },
        onPanResponderEnd: (evt, gestureState) => {
            setIsPanResponderActive(false);
        },
    });

    const viewRef = useRef(null);

    const getPosition = () => {
        viewRef.current.measure((x, y, width, height, pageX, pageY) => {
            console.log('X:', pageX);
            console.log('Y:', pageY);
            onXY(
                pageX,
                pageY,
            )
        });
    };

    return (
        <Draggable
            x={20}
            y={20}
            renderColor={colors.dirtyWhite}
            onDragRelease={(event: GestureResponderEvent, gestureState: PanResponderGestureState, bounds:
                { left: number, top: number, right: number, bottom: number }) => {
                // onXY(
                //     gestureState.dx,
                //     gestureState.dy,
                // )
                getPosition()
            }}
        >
            <TouchableOpacity style={[
                {
                    position: 'absolute',
                    borderWidth: isLine ? undefined : 1,
                    borderColor: colors.dark_grey, width: isLine ? undefined : 220,
                    backgroundColor: isLine ? undefined : 'rgba(0, 0,0, .3 )',
                    borderRadius: 10,
                    margin: 20
                },
            ]}>
                {isLine ?
                    <View ref={viewRef} style={{ paddingVertical: 20 }}><View style={[{ width: width - 40, height: 2, backgroundColor: 'red' }]}></View></View>

                    : <View style={{ paddingVertical: 10 }}>
                        <TextInput ref={viewRef} style={{ color: 'red', }}
                            multiline={true} focusable={true} value={text} onChangeText={onTextChange} onFocus={onFocus} />
                    </View>
                }
                {/* <TextInput style={{ color: 'red' }} multiline={true} value={text} onChangeText={onTextChange} /> */}
            </TouchableOpacity>
        </Draggable>
    );
};

const styles = StyleSheet.create({
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