import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { db } from '../firebaseConfig';

const DetailPostScreen = ({ route }) => {
  const { conId, postId } = route.params;
  const [name, setName] = useState('');
  const [ingd, setIngd] = useState([]);
  const [steps, setSteps] = useState([]);
  const [comment, setComment] = useState([]);
  const [uhashtag, setUHashTag] = useState([]);
  const [hashtag, setHashTag] = useState([])
  const [newComment, setNewComment] = useState('');
  const [chatData, setChatData] = useState([]);

  const readCommDB = async () => {
    try {
      const doc = await db.collection('Community').doc(postId).get();
      const data = doc.data();
      const { title, material, sequence, Comment, hashTag, uHashTag, chat } = data;
      const cookNames = title;
      const ingredients = material;
      const recipe = sequence;
      const comm = Comment;
      const uTag = uHashTag;
      const tag = hashTag;
      const chats = chat;
      setName(cookNames);
      setIngd(ingredients);
      setComment(comm);
      setUHashTag(uTag);
      setChatData(chats);
      setSteps(recipe)

      const extractedSteps = [];
      Object.entries(tag).forEach(([key, value]) => {
        extractedSteps.push(value);
      });
      setHashTag(extractedSteps);
      console.log(hashTag)
    } catch (error) {
      console.log(error.message);
    }
  };

  const addComment = async () => {
    try {
      const updatedChatData = [conId, newComment, ...chatData]; 
      const commentData = db.collection('Community').doc(postId);
      await commentData.update({
        chat: updatedChatData,
      });
      setChatData(updatedChatData); 
      setNewComment('');
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAddComment = async () => {
    addComment();
    await readCommDB();
  };

  useEffect(() => {
    readCommDB();
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={-200}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.ingredient}>재료: {ingd.join(', ')}</Text>
          <Text>조리법:</Text>
          {steps.map((step, index) => (
            <Text key={index} style={styles.step}>{step}</Text>
          ))}
          <Text>코멘트:</Text>
          <Text style={styles.comment}>{comment}</Text>
          <Text style={styles.hashtag}>{uhashtag}</Text>
        </View>
        <View style={styles.chatView}>
          {chatData.map((chat, index) => {
            if (index % 2 === 0) {
            } else {
              return (
                <View key={index} style={styles.chatBubble}>
                  <Text style={styles.chatText}>{chatData[index - 1]}</Text>
                  <Text style={styles.chatText}>{chat}</Text>
                </View>
              );
            }
          })}
        </View>
      </ScrollView>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          value={newComment}
          onChangeText={(text) => setNewComment(text)}
          placeholder="댓글 입력"
          placeholderTextColor="#888"
        />
        <TouchableOpacity onPress={handleAddComment}>
          <View style={styles.btnshape}>
            <Text>입력</Text>
          </View>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 80,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ingredient: {
    fontSize: 16,
    marginBottom: 20,
  },
  step: {
    fontSize: 16,
    marginBottom: 5,
  },
  comment: {
    fontSize: 14,
    marginTop: 20,
    color: '#666666',
  },
  hashtag: {
    fontSize: 14,
    marginTop: 15,
    color: '#666666',
  },
  inputText: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    height: 40,
    width: '80%',
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 16,
  },
  chatView: {
    marginTop: 20,
    marginBottom: 20,
  },
  chatBubble: {
    backgroundColor: '#e2e2e2',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  chatText: {
    fontSize: 14,
  },
  inputView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  btnshape: {
    backgroundColor: '#3498db',
    width: 50,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});

export default DetailPostScreen;
