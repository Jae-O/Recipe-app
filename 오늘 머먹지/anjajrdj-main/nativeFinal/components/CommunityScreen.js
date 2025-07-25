import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import { db } from '../firebaseConfig';

const CommunityScreen = ({ navigation }) => {
  const [readtitle, setReadTitle] = useState([]);
  const [control, setControl] = useState([])

  const handlePostPress = (post) => {
    navigation.navigate('PostDetails', { postId: post });
  };

const readCommDB = async () => {
  try {
    const data = await db.collection('Community').get();
    const tempArray = [];
    data.forEach((doc) => {
      const { title,  id } = doc.data();
      tempArray.push({ title , id });
    });
    const CookNames = tempArray.map((row) => row.title);
    const CommIndices = tempArray.map((row) => row.id);
    setReadTitle(CookNames);
    setControl(CommIndices);
  } catch (error) {
    console.log(error.message);
  }
  readCommDB()
};

  useEffect(() => {
    readCommDB();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        {readtitle.map((input, index) => (
          <TouchableOpacity 
            style={styles.postItem}
            onPress={()=> {handlePostPress(control[index])}}
            key={index}
          >
            <Text style={styles.postTitle}>{input}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('CreatePost')}>
        <Text style={styles.addButtonText}>글쓰기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  postItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  postTitle: {
    fontSize: 16,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#f4511e',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CommunityScreen;
