
import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import FileViewer from 'react-native-file-viewer';
import RNFS from 'react-native-fs';
import { useNavigation } from '@react-navigation/native';
import { routes } from '../../Values/Routes';

export const DocViewScreen = ({ route }) => {
  const { url } = route.params; // Remote .doc or .docx URL
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //const localPath = `${RNFS.DocumentDirectoryPath}/url`; // Specify extension based on file type
    // Create a unique file path based on the URL or a timestamp
    const fileName = url.split('/').pop() || `temp_${Date.now()}.docx`;
    const localPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
    RNFS.downloadFile({
      fromUrl: url,
      toFile: localPath,
    }).promise
      .then(() => {
        FileViewer.open(localPath)
          .then(() => {
            // File opened successfully
            setLoading(false);
            navigation.goBack(); // Navigate only after successful open
          })
          .catch((error) => {
            console.error('Error opening file:', error);
            setLoading(false);
            // navigation.navigate(routes.files_screen); // Navigate on error too
            navigation.goBack();
          });
      })
      .catch((error) => {
        console.error('Error downloading file:', error);
        setLoading(false);
       // navigation.navigate(routes.files_screen); // Navigate on error too
       navigation.goBack();
      });

    // Cleanup navigation on unmount
    return () => {
      if (loading) {
        navigation.navigate(routes.files_screen);
      }
    };
  }, [url, navigation]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return null; // Render nothing when not loading
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// import React, { useState, useEffect } from 'react';
// import { View, ActivityIndicator, StyleSheet } from 'react-native';
// import FileViewer from 'react-native-file-viewer';
// import RNFS from 'react-native-fs';
// import { useNavigation } from '@react-navigation/native';
// import { routes } from '../../Values/Routes';
// import { sha256 } from 'react-native-sha256'; // Optional: Use this if you want to hash the URL

// export const DocViewScreen = ({ route }) => {
//   const { url } = route.params; // Remote .doc or .docx URL
//   const navigation = useNavigation();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Create a unique file path based on the URL or a timestamp
//     const fileName = url.split('/').pop() || `temp_${Date.now()}.docx`;
//     const localPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

//     RNFS.downloadFile({
//       fromUrl: url,
//       toFile: localPath,
//     }).promise
//       .then(() => {
//         FileViewer.open(localPath)
//           .then(() => {
//             // File opened successfully
//             setLoading(false);
//             navigation.navigate(routes.files_screen); // Navigate only after successful open
//           })
//           .catch((error) => {
//             console.error('Error opening file:', error);
//             setLoading(false);
//             navigation.navigate(routes.files_screen); // Navigate on error too
//           });
//       })
//       .catch((error) => {
//         console.error('Error downloading file:', error);
//         setLoading(false);
//         navigation.navigate(routes.files_screen); // Navigate on error too
//       });

//     // Cleanup navigation on unmount
//     return () => {
//       if (loading) {
//         navigation.navigate(routes.files_screen);
//       }
//     };
//   }, [url, navigation]);

//   if (loading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   return null; // Render nothing when not loading
// };

// const styles = StyleSheet.create({
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });





