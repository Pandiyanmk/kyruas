import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from 'react-native';
import Pdf from 'react-native-pdf';
import { useSelector } from 'react-redux';
import { colors } from '../../Values/AppColores';
import { width, screenHeight, style as getStyles, colorScheme } from '../../Values/AppStyles';
import { eyeImage } from '../../store/LocalDataStore';

export const pdfurl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

export const PDFViewScreen = ({ navigation, route }) => {
  const style = getStyles();
  const theme = useSelector(state => state.appState.theme);

  const [localUrl, setLocalUrl] = useState(route.params ? route.params.url : pdfurl);
  const [page, setPage] = useState(1);

  const pdfViewRef = useRef<Pdf>();

  useEffect(() => {
    colorScheme(theme);
  }, [theme]);

  return (
    <View style={[style.viewBox, { padding: 0 }]}>
      {/* PDF Viewer */}
      <Pdf
        ref={pdfViewRef}
        trustAllCerts={false}
        source={{ uri: localUrl, cache: true }}
        page={1}
        scale={1.0}
        minScale={0.5}
        maxScale={3.0}
        spacing={10}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`PDF loaded: ${numberOfPages} pages`);
        }}
        onPageChanged={(pageNumber, numberOfPages) => {
          console.log(`Current page: ${pageNumber}`);
          setPage(pageNumber);
        }}
        onError={(error) => {
          console.log('PDF error:', error);
        }}
        onPressLink={(uri) => Linking.openURL(uri)}
        renderActivityIndicator={() => (
          <ActivityIndicator color={colors.blue} size="large" style={styles.loader} />
        )}
        style={[
          style.viewBox,
          {
            padding: 0,
            backgroundColor: colorScheme() === 'dark' ? 'black' : colors.grey,
          },
        ]}
      />

      {/* Example Header with title */}
      <View style={styles.header}>
        <Text style={styles.headerText}>PDF Viewer</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
      </View>

      {/* Example Page Indicator */}
      <View style={styles.pageIndicator}>
        <Text style={styles.pageText}>Page {page}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 8,
    borderRadius: 8,
  },
  headerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  closeText: {
    color: 'white',
    fontSize: 16,
  },
  pageIndicator: {
    position: 'absolute',
    bottom: 20,
    left: width / 2 - 40,
    width: 80,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingVertical: 4,
    borderRadius: 8,
  },
  pageText: {
    color: 'white',
    fontSize: 14,
  },
});
