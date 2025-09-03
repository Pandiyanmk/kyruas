import { ActivityIndicator, Alert, Image, ImageBackground, Modal, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { colorScheme, screenHeight, style as getStyles, width } from "../Values/AppStyles"
import { colors } from "../Values/AppColores"
import { CommonButton } from "./Buttons"
import { CommonTextInput } from "./TextInputs"
import { strings } from "../Localization"
import { useEffect, useState,useCallback } from "react"
import { validCheck } from "./Validations"
import { localEnum, photo, upload, video,audioExtention,imageExtention,videoExtention} from "../store/LocalDataStore"
import { ImageWithTextVerticle } from "../Components/TitleWithForward"
import { AudioPlay, DatesCart, TeacherCommentCart } from "../Components/GameItem"
import useBackHandler from "./BackHandler"
import { useNavigation } from "@react-navigation/native"
import TrackPlayer from "react-native-track-player"
import { Platform } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import RenderHtml from 'react-native-render-html';
import { userInformation } from "../store/UserStorage"
import { RadioButton } from 'react-native-paper';
import { useSelector } from 'react-redux';
import {   ReferenceFilesInflate  } from "../Components/GameItem"
import { routes } from "../Values/Routes"
import { useFocusEffect } from '@react-navigation/native';
// React Navigation Hook
let style;
// Date 18/03/2024-Pravin
// Previously, the transition from dark mode to light mode or vice versa wasn't functioning properly. 
// Now, I've implemented Redux to handle this, so the app will automatically adjust its mode based on the mobile device's mode settings

export const ProgressDialog = ({ isShow = false }) => {
    style = getStyles()
    return <Modal transparent={true} visible={isShow} >
        <View style={[style.centeredView, style.botton_view, { marginHorizontal: 0 }]}>
            <ActivityIndicator size={Platform.OS == "ios" ? "large" : 70} color={colors.blue} />
        </View>
    </Modal>
}

export const ProgressView = () => {
    style = getStyles()
    return <View style={[style.centeredView, style.viewBox, { marginHorizontal: 0 }]}>
        <ActivityIndicator size={Platform.OS == "ios" ? "large" : 70} color={colors.blue} />
        <Text style={[style.textStyle, {textAlign:'center'}]}>Loading...</Text>

    </View>
}

export const GameprogressView = () => {
    style = getStyles()
    return <View style={[style.centeredView, style.viewBoxs, { marginHorizontal: 0 }]}>
        <ActivityIndicator size={Platform.OS == "ios" ? "large" : 70} color={colors.blue} />
        <Text style={[style.textStyle, {textAlign:'center'}]}>Loading The Circle...</Text>

    </View>
}

export const ErrorMessageDialog = ({ isShow = false, message = "Something is wrong please try after some time.", onClcik }) => {
    style = getStyles()
    return <Modal transparent={true} animationType={'slide'} visible={isShow} >
        <View style={[style.centeredView]}>
            <View style={[style.dialog, { padding: 0 }]}>

                <Text style={[style.textStyle, {
                    marginStart: 10, paddingTop: 10,
                    fontSize: 18, width: '100%', fontFamily: 'Roboto', textAlign: 'center'
                }]}>Message</Text>

                <View style={style.errorDialogLine} />


                <Text style={[style.textStyle,
                {
                    marginStart: 10, fontSize: 14, fontFamily: 'Roboto Medium',
                    marginVertical: 20, width: '100%', textAlign: 'center'
                }]}>{message}</Text>

                <View style={style.errorDialogLine} />
                <TouchableOpacity onPress={onClcik}>
                    <Text style={[style.textStyle, {
                        marginStart: 10, paddingBottom: 10, fontFamily: 'Roboto',
                        fontSize: 18, width: '100%', textAlign: 'center', color: colors.blue
                    }]}>OK</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
}




export const AddCommantBottomSheet = ({ isShow = false, message = "Something is wrong please try after some time.", onClick }) => {
    style = getStyles()
    const [comment, setComment] = useState("")
    const [score, setScore] = useState("")
    const [error, setError] = useState({ errorComment: "", erroScore: "" })

    const handleOnRequest = () => {
        onClick()
    };
    const commentButton = (() => {
        console.log("sss")
        let commentError = validCheck(localEnum.comment, comment)
        let scoreError = validCheck(localEnum.score, score)
        setError({ errorComment: commentError, erroScore: scoreError })
        let listError = [commentError, scoreError].map(it => it == "")
        if (!listError.includes(false)) {
            onClick(comment)
        }
    })

    return <Modal transparent={true} animationType={'slide'} visible={isShow} onRequestClose={handleOnRequest}>
        <View style={[style.botton_view]}>
            <View style={[style.bottom_sheet, { padding: 0 }]}>

                <TouchableOpacity onPress={() => {
                    onClick()
                }} style={{
                    justifyContent: 'flex-end', position: 'absolute', end: 30, top: 20,
                }}>
                    <Image source={require('../assets/images/close.png')}
                        style={{
                            height: 24,
                            width: 24,
                            tintColor: colorScheme() == "dark" ? 'white' : 'black',
                        }} /></TouchableOpacity>
                <View style={{ marginHorizontal: 20, marginBottom: 10, marginTop: 30 }}>

                    <CommonTextInput title={strings.add_comment}
                        placeholder={strings.type_a_comment}
                        value={comment.replace(/(<([^>]+)>)/ig, '').replace('&nbsp;', '')} onChangeText={(text: string) => {
                            setComment(text)
                        }} multiLine={true} lines={6} errorMesssage={error.errorComment} ht={120} />

                    <CommonTextInput title={strings.score}
                        placeholder={strings.type_a_score}
                        value={score} onChangeText={(text: string) => {
                            setScore(text)
                        }} errorMesssage={error.erroScore} />

                    <CommonButton text="Save" onClick={commentButton} />
                </View>
            </View>
        </View>
    </Modal>
}


export const EditFileTitleBottomSheet = ({ isShow = false, title = "", onClick }) => {
    style = getStyles()
    const handleOnRequest = () => {
        onClick()
    };

    const [comment, setComment] = useState(title)
    const [error, setError] = useState({ errorComment: "", })
    console.log(comment);

    useEffect(() => {
        const tl = title.lastIndexOf('.')
        setComment(title.replace(title.substring(tl), ''))
    }, [title])

    const commentButton = (() => {
        console.log("sss")
        let commentError = validCheck(localEnum.title, comment)
        setError({ errorComment: commentError })
        let listError = [commentError].map(it => it == "")
        if (!listError.includes(false)) {
            const type = title.split(".")[1]
            console.log(type);

            onClick(comment + "." + type)
            setComment("")
        }
    })

    return <Modal transparent={true} animationType={'slide'} visible={isShow} onRequestClose={handleOnRequest} >
        <View style={[style.botton_view]}>
            <View style={[style.bottom_sheet, { padding: 0 }]}>

                <TouchableOpacity onPress={() => {
                    onClick()
                }} style={{
                    justifyContent: 'flex-end', position: 'absolute', end: 30, top: 20,
                }}>
                    <Image source={require('../assets/images/close.png')}
                        style={{
                            height: 24,
                            width: 24,
                            tintColor: colorScheme() == "dark" ? 'white' : 'black',
                        }} /></TouchableOpacity>
                <View style={{ marginHorizontal: 20, marginBottom: 10, marginTop: 30 }}>

                    <CommonTextInput title={strings.update_file_title}
                        placeholder={strings.type_a_title}
                        value={comment.replace(/(<([^>]+)>)/ig, '').replace('&nbsp;', '')} onChangeText={(text: string) => {
                            setComment(text)
                        }} multiLine={false} errorMesssage={error.errorComment} ht={120} />



                    <CommonButton text="Save" onClick={commentButton} />
                </View>
            </View>
        </View>
    </Modal>
}


export const ReadMoreBottomSheet = ({ isShow = false, data, onClick }) => {
    const style = getStyles();
    const handleOnRequest = () => {
      onClick();
    };

    const cleanedHtml = data
      .replace(/<elem>(.*?)<\/elem>/g, '$1') // Removing <elem> tags
      .replace(/style="background-color:#ffffff;"/g, '')
      .replace(/0000ff/g, 'FF9900')
      .replace(/0000cd/g, 'FF9900')
      .replace(/style="background: white;"/g, '')
      .replace(/style="background:lightgrey;"/g, '')
      .replace(/<li\s*style="[^"]*background:\s*white;?[^"]*"/g, '<li')
      .replace(/<p\s*style="[^"]*background:\s*white;?[^"]*"/g, '<p')
      .replace(/<span\s*style="background:\s*white;?[^"]*">/g, '<span>')
      .replace(/<p style="margin-left: 36pt;">/g, '<p style= margin-left: 40px;">')
      .replace(/<p style=\"margin-left: 80px;\">/g, '<p style= margin-left: 40px;">');

      console.log("cleanedHtml", data)
      console.log("cleanedHtmlup", cleanedHtml)


      const renderers = {
        img: ({ tnode }) => {
          const { src, style } = tnode.attributes;
      
          // Default styles for responsive images
          const imageStyle = {
            maxWidth: '100%', // Full width of the container
            height: 'auto',   // Maintain aspect ratio
          };
      
          if (style) {
            // Parse inline styles from the `style` attribute
            const styleParts = style.split(';').filter(Boolean);
            styleParts.forEach((part) => {
              const [key, value] = part.split(':').map((str) => str.trim());
              if (key === 'width') {
                imageStyle.width = parseInt(value.replace('px', ''), 10);
              } else if (key === 'height') {
                imageStyle.height = parseInt(value.replace('px', ''), 10);
              }
            });
          }
      
          return (
            <Image
              style={imageStyle}
              source={{
                uri: src,
                headers: {
                  'User-Agent': 'MyMobileApp',
                },
              }}
              onError={(e) => {
                console.error('Image load error:', e.nativeEvent.error);
              }}
              resizeMode="contain" // Ensure the image scales within the container
            />
          );
        },
      };
      
  
    return (
      <Modal
        transparent={true}
        animationType={'slide'}
        visible={isShow}
        onRequestClose={handleOnRequest}
      >
        <View style={[style.botton_view, { backgroundColor: 'rgba(0, 0, 0, 0.7)' }]}>
          <View style={[style.bottom_sheet, { padding: 0, height: '80%' }]}>
            <TouchableOpacity
              onPress={onClick}
              style={{
                justifyContent: 'flex-end',
                position: 'absolute',
                end: 30,
                top: 20,
              }}
            >
              <Image
                source={require('../assets/images/close.png')}
                style={{
                  height: 24,
                  width: 24,
                  tintColor: colorScheme() == 'dark' ? 'white' : 'black',
                }}
              />
            </TouchableOpacity>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ marginTop: 50 }}
              contentContainerStyle={{ flexGrow: 1 }}
            >
              <View style={{ paddingHorizontal: 20 }}>
                {data ? (
                  <RenderHtml
                    contentWidth={width}
                    tagsStyles={{
                        ul: {
                          paddingLeft: 20, // Adds padding to the left of the list
                          marginVertical: 10,
                          color: colorScheme() == "dark" ? 'white' : 'black',
                        },
                        li: {
                          marginBottom: 8, // Adds spacing between list items
                          listStyleType: 'disc',
                          color: colorScheme() == "dark" ? 'white' : 'black',
                        },
                        p: {
                          margin: 0, // Removes default margin for paragraphs
                          padding: 0,
                          textAlign: 'justify', // Aligns text evenly
                          lineHeight: 22, // Adjust line height for better spacing
                          wordBreak: 'break-word', // Ensures long words break properly
                          color: colorScheme() == "dark" ? 'white' : 'black', // Text color based on mode
                        },
                      }}
                      
                    ignoredDomTags={['elem']}
                    renderers={renderers}
                    source={{
                      html: cleanedHtml,
                    }}
                  />
                ) : null}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };
  


export const MoreInfoBottomSheet = ({ isShow = false, isTeacherComment, data, onClick }) => {
    style = getStyles()
    const handleOnRequest = () => {
        onClick()
    };

    // console.log("data count", data)




    return <Modal transparent={true} animationType={'slide'} visible={isShow} onRequestClose={handleOnRequest} >
        <View style={[style.botton_view, { backgroundColor: 'rgba(0, 0,0, .7 )' }]}>
            <View style={[style.bottom_sheet, { padding: 0, }]}>
                <Text style={[style.textStyle, style.textInput, { marginStart: 20, textAlign: 'left', marginTop: 20 }]}>{isTeacherComment ? strings.teacherComments : strings.studentSubmission}</Text>

                <TouchableOpacity onPress={() => {
                    onClick()
                }} style={{
                    justifyContent: 'flex-end', position: 'absolute', end: 30, top: 20,
                }}>
                    <Image source={require('../assets/images/close.png')}
                        style={{
                            height: 24,
                            width: 24,
                            tintColor: colorScheme() == "dark" ? 'white' : 'black',
                        }} /></TouchableOpacity>

                <View style={{ marginHorizontal: 20, marginBottom: 10, marginTop: 10 }}>

                    {data ? <FlatList style={{ height: data != null && data.length > 5 ? screenHeight / 1.5 : undefined }} data={data}
                        renderItem={({ item, index }) => (<View style={{ margin: 2 }}>
                            {
                                isTeacherComment ? <TeacherCommentCart it={item} srn={index + 1} isVisible={false}
                                    onClick={() => { }} />
                                    : <DatesCart it={item} srn={index + 1} isVisible={false} onClick={() => { }} />
                            }
                        </View>)
                        } showsVerticalScrollIndicator={false} /> : null}
                </View>
            </View>
        </View>
    </Modal>
}

export const SelectImageAndVideoBottomSheet = ({ isShow = false, message = "Something is wrong please try after some time.", onClick }) => {
    style = getStyles()
    const handleOnRequest = () => {
        onClick()
    };

    return <Modal transparent={true} animationType={'slide'} visible={isShow} onRequestClose={handleOnRequest}>
        <View style={[style.botton_view]}>

            <View style={[style.bottom_sheet]}>

                <View style={{ marginHorizontal: 20 }}>
                    <View style={[style.rowContainer, { marginTop: 10, }]}>
                        <Text style={[style.letsPlayText, {}]}>{strings.select_image_videos}</Text>

                        <TouchableOpacity onPress={() => {
                            onClick()
                        }} style={{

                        }}>
                            <Image source={require('../assets/images/close.png')}
                                style={{
                                    height: 24,
                                    width: 24,
                                    tintColor: colorScheme() == "dark" ? 'white' : 'black',
                                }} /></TouchableOpacity>

                    </View>
                    <View style={{ marginStart: 10, marginBottom: 10, marginTop: 10, flexDirection: 'row', alignContent: 'center', width: '100%' }}>

                        <ImageWithTextVerticle onClick={() => {
                            onClick(localEnum.image)
                        }} />

                        <ImageWithTextVerticle title={strings.video} image={video} onClick={() => {
                            onClick(localEnum.video)
                        }} />

                    </View>
                </View>
            </View>
        </View>
    </Modal>
}


export const PlayAudioBottomSheet = ({ isShow = false, itemData, onClick }) => {
    style = getStyles()
    const handleOnRequest = () => {
        TrackPlayer.reset();
        onClick()
    };
    console.log("bottom",itemData)

    return <Modal transparent={true} animationType={'slide'} visible={isShow} onRequestClose={handleOnRequest} >
        <View style={[style.botton_view]}>

            <View style={[style.bottom_sheet, { backgroundColor: undefined }]}>
                <AudioPlay item={itemData} tracks={itemData} onClick={() => {
                    onClick(false)
                }} />

            </View>
        </View>
    </Modal>
}


export const ConfirmationDialog = ({ isShow = false, message = "Something is wrong please try after some time.", onClick }) => {
    style = getStyles()
    return <Modal transparent={true} animationType={'slide'} visible={isShow} >
        <View style={[style.centeredView]}>
            <View style={[style.dialog, { padding: 0 }]}>

                <Text style={[style.textStyle, {
                    marginStart: 10, paddingTop: 10,
                    fontSize: 18, width: '100%', fontFamily: 'Roboto', textAlign: 'center'
                }]}>Message</Text>

                <View style={{ backgroundColor: 'grey', marginVertical: 10, height: 1 }} />


                <Text style={[style.textStyle,
                {
                    marginStart: 10, fontSize: 14, fontFamily: 'Roboto Medium',
                    marginVertical: 20, width: '100%', textAlign: 'center'
                }]}>{message}</Text>

                <View style={{ width: '100%', flexDirection: 'row-reverse', marginTop: 20, paddingBottom: 2 }}>
                    <TouchableOpacity onPress={() => {
                        onClick(true)
                    }} style={{ marginEnd: 40 }}>
                        <Text style={[style.textStyle, {
                            marginStart: 10, paddingBottom: 10, fontFamily: 'Roboto',
                            fontSize: 18, textAlign: 'center', color: colors.blue
                        }]}>Yes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        onClick(false)
                    }} style={{ marginEnd: 60 }}>
                        <Text style={[style.textStyle, {
                            marginStart: 10, paddingBottom: 10, fontFamily: 'Roboto',
                            fontSize: 18, textAlign: 'center', color: colors.blue
                        }]}>No</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    </Modal>

}

// export const Modetype=({})=>{
//     const [Modal1, setModal] = useState(false);
//     const [checked, setChecked] = useState('single');
//     const [modalVisible, setModalVisible] = useState(false);
//     function handleRadioPress(value) {
//         setChecked(value)
//         if (value === 'Invite') {
//           setModalVisible(true);
//         }
//         else {
//           setModalVisible(false);
//         }
//         setModal(false)
//     }
//    return <Modal animationType="fade" transparent={true} visible={Modal1}>
//           <View style={{ flex: 1 }}>
//             <View
//               style={{ 
//                 marginTop: 105,
//                 marginLeft: 220,
//                 marginRight: 50,}}>
//               <View style={{ marginLeft: 90, marginTop: 2 }}>
//                 <TouchableOpacity
//                   onPress={() => setModal(false)}
//                 >
//                   <Image source={require('../assets/images/close.png')}
//                     style={[{
//                       tintColor: 'black',
//                       height: 24,
//                       width: 24,
//                       marginEnd: 10
//                     }]} />
//                 </TouchableOpacity>
//               </View>
//               <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
//                 <View>
//                   <RadioButton.Group
//                     onValueChange={handleRadioPress}
//                     value={checked}>
//                     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                       <RadioButton value="Single" />
//                       <Text
//                         style={{
//                           fontSize: 20,
//                           fontWeight: 'bold',
//                           color: 'black',
//                           fontFamily: 'Roboto'
//                         }}>
//                         Single
//                       </Text>
//                     </View>
//                     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                       <RadioButton value="Invite" />
//                       <Text
//                         style={{
//                           fontSize: 20,
//                           fontWeight: 'bold',
//                           color: 'black',
//                           fontFamily:'Roboto'
//                         }}>
//                         Invite
//                       </Text>
//                     </View>
//                   </RadioButton.Group>
//                 </View>
//               </View>
//             </View>
//           </View>
//         </Modal>

//New code implemented on December 11, 2024, by Pravin.
//TextReadMoreBottomSheet reference files button functioanlity
    export const TextReadMoreBottomSheet = ({ isShow = false, data, navigation, onClick }) => {
        const style = getStyles();
        const [player, isPlayer] = useState(false);
        const [itemData, setItemData] = useState();
        const [showModal, setShowModal] = useState(isShow)
        const handleOnRequest = () => {
            onClick(); // Close modal explicitly when requested
        };
        const calculatedHeight = data.length > 1
    ? screenHeight / 2.4
    : screenHeight / (1 + 0.2 * data.length);
console.log("height",calculatedHeight)
    // Reset modal visibility on screen focus
    useFocusEffect(
        useCallback(() => {
            setShowModal(isShow); // Sync the initial isShow state
        }, [isShow])
    );
        const handleNavigation = (route, params) => {
            setShowModal(false)
            navigation.navigate(route, params);
        };
    
        return (
            <Modal
                transparent={true}
                animationType="slide"
                visible={showModal}
                onRequestClose={handleOnRequest}
            >
                <View style={[style.botton_view, { backgroundColor: 'rgba(0, 0,0, .7 )' }]}>
                    <View style={[style.bottom_sheet, { padding: 0,height: calculatedHeight }]}>
                        <View style={{ width: '100%' }}>
                            <Text style={[style.letsPlayText, { marginTop: 20, marginLeft: 18 }]}>
                                Reference Files
                            </Text>
                        </View>
    
                        <TouchableOpacity
                            onPress={() => onClick()}
                            style={{
                                justifyContent: 'flex-end',
                                position: 'absolute',
                                end: 30,
                                top: 20,
                            }}
                        >
                            <Image
                                source={require('../assets/images/close.png')}
                                style={{
                                    height: 24,
                                    width: 24,
                                    tintColor: colorScheme() === 'dark' ? 'white' : 'black',
                                }}
                            />
                        </TouchableOpacity>
                        <View style={{ paddingHorizontal: 16, marginTop: 10, flex: 1 }}>
                        <ScrollView>
              {data.map((item, index) => (
                <ReferenceFilesInflate
                  key={index}
                  item={item}
                  isShow={false}
                  onClick={(type) => {
                    if (type === 1) {
                      // Handle edit file title (if needed)
                    } else if (type === 2) {
                      // Navigate based on file type
                      if (item.FileType === localEnum.pdf) {
                        handleNavigation(routes.pdf_view_screen, { url: item.BlobUrl });
                      } else if (audioExtention(item.FileType)) {
                        setItemData({ title: item.FileName, uri: item.BlobUrl });
                        isPlayer(true);
                      } else if (imageExtention(item.FileType)) {
                        handleNavigation(routes.image_view_screen, { url: item.BlobUrl });
                      } else if (videoExtention(item.FileType)) {
                        handleNavigation(routes.videoPlayerScreen, { url: item.BlobUrl });
                      } else if (
                        item.FileType === localEnum.text ||
                        item.FileType === localEnum.txt
                      ) {
                        handleNavigation(routes.text_screen, { url: item.BlobUrl });
                      } else if (
                        item.FileType === localEnum.office ||
                        item.FileType === localEnum.doc ||
                        item.FileType === localEnum.docx
                      ) {
                        handleNavigation(routes.doc_screen, { url: item.BlobUrl });
                      }
                    }
                  }}
                />
              ))}
            </ScrollView>
                    </View>
                    {player && (
                        <AudioPlay
                            item={itemData}
                            tracks={{ url: itemData.uri, title: 'Avaritia' }}
                            onClick={() => isPlayer(false)}
                        />
                    )}
                </View>
                </View>
            </Modal>
        );
    };
    
