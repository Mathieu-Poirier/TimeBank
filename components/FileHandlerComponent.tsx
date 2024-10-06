import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';

const FileHandlerComponent = () => {
  const [fileName, setFileName] = useState('example.txt');
  const [fileContent, setFileContent] = useState('');
  const [readContent, setReadContent] = useState('');

  const fileUri = `${FileSystem.documentDirectory}${fileName}`;

  const createAndWriteFile = async () => {
    try {
      await FileSystem.writeAsStringAsync(fileUri, fileContent);
      alert('File created and data written successfully!');
    } catch (error) {
      console.error('Error writing to file:', error);
    }
  };

  const readFile = async () => {
    try {
      const content = await FileSystem.readAsStringAsync(fileUri);
      setReadContent(content);
    } catch (error) {
      console.error('Error reading file:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter File Name:</Text>
      <TextInput
        style={styles.input}
        value={fileName}
        onChangeText={(text) => setFileName(text)}
        placeholder="example.txt"
      />

      <Text style={styles.label}>Enter File Content:</Text>
      <TextInput
        style={styles.input}
        value={fileContent}
        onChangeText={(text) => setFileContent(text)}
        placeholder="Enter content to write to file"
      />

      <Button title="Create and Write File" onPress={createAndWriteFile} />
      <Button title="Read File" onPress={readFile} />

      {readContent ? (
        <View style={styles.readContentContainer}>
          <Text style={styles.label}>File Content:</Text>
          <Text>{readContent}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  readContentContainer: {
    marginTop: 20,
  },
});

export default FileHandlerComponent;