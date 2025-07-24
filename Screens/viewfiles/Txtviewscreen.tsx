

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export const TxtViewScreen = ({ navigation, route }) => {
  const [fileContent, setFileContent] = useState('');
  const { url } = route.params; // Ensure the 'url' is passed correctly from navigation

  useEffect(() => {
    // Fetch content from the remote URL
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.text(); // Read the text from the response
        } else {
          throw new Error('Failed to fetch file');
        }
      })
      .then((content) => {
        setFileContent(content); // Set the file content to state
      })
      .catch((err) => {
        console.log('Error fetching file:', err);
      });
  }, [url]);

  return (
    // <View style={styles.container}>
    //   <ScrollView>
    //     <View style={{ padding: 16 }}>
    //       <Text style={{ color: 'black' }}>{fileContent}</Text>
    //     </View>
    //   </ScrollView>
    // </View>
    <View style={styles.container}>
    <ScrollView 
      horizontal={true} 
      contentContainerStyle={{ flexGrow: 1 }} 
      showsHorizontalScrollIndicator={true}
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }} 
        showsVerticalScrollIndicator={true}
      >
        <View style={{ padding: 16 }}>
          <Text style={{ color: 'black' }}>{fileContent}</Text>
        </View>
      </ScrollView>
    </ScrollView>
  </View>
  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
  },
});

