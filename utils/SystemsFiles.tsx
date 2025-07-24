import { CameraOptions, ImageLibraryOptions, launchCamera, launchImageLibrary } from "react-native-image-picker";
import { localEnum } from "../store/LocalDataStore";
import DocumentPicker, {
    DirectoryPickerResponse,
    DocumentPickerResponse,
    isInProgress,types
} from 'react-native-document-picker'
import React, { useEffect } from "react";
import {Alert} from "react-native"

import { isCancel } from 'react-native-document-picker';

// 17-04-2024-Pravin previously file name not proper show now file name showed
export const cameraLaunch = (isImage = true, onSelect, id) => {
    let options: CameraOptions = {
        mediaType: isImage ? "photo" : "video",
        saveToPhotos: true,
        includeBase64: false,
    };
    launchCamera(options, (res) => {
        console.log('Response = ', res);
        if (res.assets != undefined) {
            const originalFilename = res.assets[0]?.fileName;

            // Get the current date and time
            const currentDate = new Date();


            // Format the current date
            const formattedDate = currentDate.toLocaleDateString('en-GB').replace(/\//g, '-'); // Format: DD-MM-YYYY
            const formattedTime = currentDate.toLocaleTimeString('en-GB', { hour12: false }).replace(/:/g, '-'); // Format: HH-MM-SS



            // Get the extension of the original filename
            const extension = originalFilename.split('.').pop();

            // Create the new filename
            const newFilename = `${id}_${formattedDate}_${formattedTime}.${extension}`;
            console.log('New filename:', newFilename);

            // Replace the fileName field with the new filename
            res.assets[0].fileName = newFilename;
            onSelect(localEnum.sucess, res.assets?.[0]);
            console.log('Response', JSON.stringify(res));
        } else if (res.didCancel) {
            console.log('User cancelled image picker');
        } else {
            onSelect(localEnum.error, res.errorMessage);
            console.log('ImagePicker Error: ', res.errorMessage);
        }
    });
}



export const selectFile = (isImage = true, onSelect) => {
    var options: ImageLibraryOptions = {
        selectionLimit: 1,
        mediaType: isImage ? "photo" : "video",
        includeBase64: false

    };
    launchImageLibrary(options, res => {
        if (res.assets != undefined) {
            const source = { uri: res.assets };
            const originalFilename = res.assets[0]?.fileName;
            const encodedText=encodeURIComponent(originalFilename);
            res.assets[0].fileName =encodedText;
            onSelect(localEnum.sucess, res.assets?.[0])

            console.log('response', JSON.stringify(res));
        }
        else if (res.didCancel) {
            console.log('User cancelled image picker');
        } else {
            onSelect(localEnum.error, res.errorMessage)
            console.log('ImagePicker Error: ', res.errorMessage);
        }
    });
};


// export const selectDoucmentFile = (onSelect) => {


//     const handleError = (err: unknown) => {
//         console.log("Error")
//         if (isCancel(err)) {
//             console.log('cancelled')
//             onSelect(localEnum.error, "Cancelled")
//             // User log the picker, exit any dialogs or menus and move on
//         } else {
//             onSelect(localEnum.error, err)
//         }
//     }

//     DocumentPicker.pick({
//         type: [types.pdf, types.plainText, types.doc, types.docx], // Include doc and docx types
//         copyTo: 'cachesDirectory',
//     })
//         .then(it => {
//             if (it != null && it != undefined) {
//                 console.log("success")
//                 console.log("FILE",it[0].name)
//                 const originalFilename = it[0].name;
//                 const encodedText=encodeURIComponent(originalFilename);
//                 it[0].name=encodedText
//                 onSelect(localEnum.pdf, it[0])
//             } else {
//                 console.log("failure")
//                 onSelect(localEnum.error, "Unable to select")
//             }
//         })
//         .catch(handleError)

// }

// export const selectDoucmentFile = (onSelect: (type: string, file: any) => void) => {

//     const handleError = (err: unknown) => {
//         console.log("Error");
//         if (isCancel(err)) {
//             console.log('Cancelled');
//             onSelect(localEnum.error, "Cancelled");
//         } else {
//             console.error('Error:', err);
//             onSelect(localEnum.error, err);
//         }
//     };

//     DocumentPicker.pick({
//         type: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'], // Include PDF, DOC, and DOCX types
//         copyTo: 'cachesDirectory',
//     })
//         .then(it => {
//             if (it != null && it.length > 0) {
//                 console.log("Success");
//                 console.log("FILE", it[0].name);
//                 console.log("MIME Type:", it[0].type); // Log MIME type

//                 const originalFilename = it[0].name;
//                 const encodedText = encodeURIComponent(originalFilename);
//                 it[0].name = encodedText;

//                 // Determine the file type based on the mime type
//                 let fileType: string;
//                 switch (it[0].type) {
//                     case 'application/pdf':
//                         fileType = localEnum.pdf;
//                         break;
//                     case 'application/msword':
//                         fileType = localEnum.office;
//                         break;
//                     case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
//                         fileType = localEnum.office;
//                         break;
//                     default:
//                         console.error('Unsupported file type:', it[0].type);
//                         fileType = localEnum.error; // Handle unknown types
//                         break;
//                 }
// console.log("checking",fileType)
//                 onSelect(fileType, it[0]);
//             } else {
//                 console.log("Failure");
//                 onSelect(localEnum.error, "Unable to select");
//             }
//         })
//         .catch(handleError);
// };

// export const selectDocumentFile = (onSelect: (type: string, file: any) => void,types) => {
// var typed=types
// console.log("before files allow",typed)
// var filesAllow = typed.filter(type => !["image", "audio", "video"].includes(type));
// console.log("files allow",filesAllow)
// //var allowtypes=types
//     const handleError = (err: unknown) => {
//         console.log("Error");
//         if (isCancel(err)) {
//             console.log('Cancelled');
//             onSelect(localEnum.error, "Cancelled");
//         } else {
//             console.error('Error:', err);
//             onSelect(localEnum.error, err);
//         }
//     };

//     DocumentPicker.pick({
//         type: [
//             'application/pdf', 
//             'application/msword', 
//             'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
//             'text/plain' // Add support for .txt files
//         ], 
//         copyTo: 'cachesDirectory',
//     })
//         .then(it => {
//             if (it != null && it.length > 0) {
//                 console.log("Success");
//                 console.log("FILE", it[0].name);
//                 console.log("MIME Type:", it[0].type); // Log MIME type

//                 const originalFilename = it[0].name;
//                 const encodedText = encodeURIComponent(originalFilename);
//                 it[0].name = encodedText;

//                 // Determine the file type based on the mime type
//                 let fileType: string;
//                 switch (it[0].type) {
//                     case 'application/pdf':
//                         fileType = localEnum.pdf;
//                         break;
//                     case 'application/msword':
//                     case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
//                         fileType = localEnum.office;
//                         break;
//                     case 'text/plain': // Handle .txt files
//                         fileType = localEnum.text;
//                         break;
//                     default:
//                         console.error('Unsupported file type:', it[0].type);
//                         fileType = localEnum.error; // Handle unknown types
//                         break;
//                 }
//                 console.log("Checking", fileType);
//                 onSelect(fileType, it[0]);
//             } else {
//                 console.log("Failure");
//                 onSelect(localEnum.error, "Unable to select");
//             }
//         })
//         .catch(handleError);
// };
// export const selectDocumentFile = (onSelect: (type: string, file: any) => void, types: string[]) => {
//     const typed = types;
//     console.log("Before filtering, allowed types:", typed);

//     // Filter out types not allowed
//     const filesAllow = typed.filter(type => !["image", "audio", "video"].includes(type));
//     console.log("Filtered allowed types:", filesAllow);

//     // Map the allowed types to MIME types for DocumentPicker
//     const mimeTypeMapping: { [key: string]: string } = {
//         pdf: 'application/pdf',
//         office: 'application/msword',
//         office: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
//         text: 'text/plain',
//     };

//     const pickerTypes = filesAllow
//         .map(type => mimeTypeMapping[type])
//         .filter(Boolean); // Exclude undefined mappings

//     if (pickerTypes.length === 0) {
//         console.error("No valid types to pick from");
//         Alert.alert("Messages", `You can upload ${typed} files only`)
//         //Alert.alert('No valid types to select from');
//         onSelect(localEnum.error, "No valid types to pick from");
//         return;
//     }

//     const handleError = (err: unknown) => {
//         console.log("Error occurred");
//         if (isCancel(err)) {
//             console.log('Cancelled');
//             onSelect(localEnum.error, "Cancelled");
//         } else {
//             console.error('Error:', err);
//             onSelect(localEnum.error, err);
//         }
//     };

//     DocumentPicker.pick({
//         type: pickerTypes, // Use dynamically generated MIME types
//         copyTo: 'cachesDirectory',
//     })
//         .then(it => {
//             if (it != null && it.length > 0) {
//                 console.log("Success");
//                 console.log("FILE:", it[0].name);
//                 console.log("MIME Type:", it[0].type); // Log MIME type

//                 const originalFilename = it[0].name;
//                 const encodedText = encodeURIComponent(originalFilename);
//                 it[0].name = encodedText;

//                 // Determine the file type based on the MIME type
//                 let fileType: string;
//                 switch (it[0].type) {
//                     case 'application/pdf':
//                         fileType = localEnum.pdf;
//                         break;
//                     case 'application/msword':
//                     case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
//                         fileType = localEnum.office;
//                         break;
//                     case 'text/plain': // Handle .txt files
//                         fileType = localEnum.text;
//                         break;
//                     default:
//                         console.error('Unsupported file type:', it[0].type);
//                         fileType = localEnum.error; // Handle unknown types
//                         break;
//                 }
//                 console.log("File type determined:", fileType);
//                 onSelect(fileType, it[0]);
//             } else {
//                 console.log("Selection failed");
//                 onSelect(localEnum.error, "Unable to select a file");
//             }
//         })
//         .catch(handleError);
// };
export const selectDocumentFile = (
    onSelect: (type: string, file: any) => void,
    types: string[]
) => {
    const typed = types;
    console.log("Before filtering, allowed types:", typed);

    // Include audio in the allowed types
    const filesAllow = typed.filter(type => !["image", "video"].includes(type));
    console.log("Filtered allowed types:", filesAllow);

    // Map the allowed types to MIME types for DocumentPicker
    const mimeTypeMapping: { [key: string]: string } = {
        pdf: 'application/pdf',
        office: 'application/msword',
        office: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        text: 'text/plain',
        audio: 'audio/*', 
        m4a: 'audio/mp4',
        wav: 'audio/wav',// Generic audio MIME type,
        wav_alternative: 'audio/x-wav', // Add alternative MIME type
    };
 
    // const pickerTypes = filesAllow
    //     .map(type => mimeTypeMapping[type])
    //     .filter(Boolean); // Exclude undefined mappings
    const pickerTypes = filesAllow
    .flatMap(type => type === 'audio' ? ['audio/*', 'audio/x-wav', 'audio/wav', 'audio/m4a','audio/x-m4a'] : mimeTypeMapping[type])
    .filter(Boolean);


    if (pickerTypes.length === 0) {
        console.error("No valid types to pick from");
        Alert.alert("Messages", `You can upload ${typed} files only`);
        onSelect(localEnum.error, "No valid types to pick from");
        return;
    }

    const handleError = (err: unknown) => {
        console.log("Error occurred");
        if (DocumentPicker.isCancel(err)) {
            console.log('Cancelled');
            onSelect(localEnum.error, "Cancelled");
        } else {
            console.error('Error:', err);
            onSelect(localEnum.error, err);
        }
    };

    DocumentPicker.pick({
         type: pickerTypes, // Use dynamically generated MIME types
        //type: [DocumentPicker.types.allFiles],
        copyTo: 'cachesDirectory',
    })
        .then(it => {
            if (it != null && it.length > 0) {
                console.log("Success");
                console.log("FILE:", it[0].name);
                console.log("MIME Type:", it[0].type);

                const originalFilename = it[0].name;
                console.log("original file",originalFilename)
                //const encodedText = encodeURIComponent(originalFilename);
                // console.log("after original file",encodedText)
                // it[0].name = encodedText;
                
 // Decode the file name if it's encoded
 const decodedText = decodeURIComponent(originalFilename);
 console.log("Decoded file name:", decodedText);
 it[0].name = decodedText;
                // Determine the file type based on the MIME type
                let fileType: string;
                switch (it[0].type) {
                    case 'application/pdf':
                        fileType = localEnum.pdf;
                        break;
                    case 'application/msword':
                    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                        fileType = localEnum.office;
                        break;
                    case 'text/plain': // Handle .txt files
                        fileType = localEnum.text;
                        break;
                    case 'audio/mpeg': // Handle MP3 files
                    case 'audio/wav':
                    case 'audio/x-wav':
                    case 'audio/ogg': // Handle OGG files
                    case 'audio/m4a': // Handle M4A files
                    case 'audio/opus': // Handle OPUS files
                    case 'audio/amr': // Handle AMR files
                    case 'audio/x-m4a': // Rare case
                        fileType = localEnum.audio;
                        break;
                    default:
                        console.error('Unsupported file type:', it[0].type);
                        fileType = localEnum.error; // Handle unknown types
                        break;
                }
                console.log("File type determined:", fileType);
                onSelect(fileType, it[0]);
            } else {
                console.log("Selection failed");
                onSelect(localEnum.error, "Unable to select a file");
            }
        })
        .catch(handleError);
};
