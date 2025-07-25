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
import { SelectList } from 'react-native-dropdown-select-list';

const RecipeDetailsScreen = ({ route }) => {
  const { postId } = route.params;
  const [name, setName] = useState('');
  const [ingd, setIngd] = useState([]);
  const [steps, setSteps] = useState([]);
  const [selected, setSelected] = useState([]);
  const [rating, setRating] = useState('');

  const rateData = [
    { key: '1', value: '1' },
    { key: '2', value: '2' },
    { key: '3', value: '3' },
    { key: '4', value: '4' },
    { key: '5', value: '5' },
  ];

  const updataUserDB = async () => {
    try {
      const like = db.collection('Community').doc(postId);
      await commentData.update({
        like: updatedChatData,
      });
      setChatData(updatedChatData); 
      setNewComment('');
    } catch (error) {
      console.log(error.message);
    }
  };

  const readRecipeDB = async () => {
    try {
      const doc = await db.collection('Recipe').doc(postId).get();
      const data = doc.data();
      const { material, title, sequence } = data;
      const cookNames = title;
      const ingredients = material;
      const recipe = sequence;
      setName(cookNames);
      setIngd(ingredients);
      const extractedSteps = [];
      Object.entries(recipe).forEach(([key, value]) => {
        extractedSteps.push(value);
      });
      setSteps(extractedSteps);
    } catch (error) {
      console.log(error.message);
    }
  };

  const rateSelect = (value) => {
    const selectedValue = value;
    setSelected(selectedValue);
    setRating(selectedValue);
  };

  useEffect(() => {
    readRecipeDB();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{name}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.subtitle}>재료:</Text>
          <Text style={styles.ingredient}>{ingd.join(', ')}</Text>
          <Text style={styles.subtitle}>조리법:</Text>
          {steps.map((step, index) => (
            <Text key={index} style={styles.step}>
              {step}
            </Text>
          ))}
        </View>
        <View style={styles.inputContainer}>
          <SelectList setSelected={rateSelect} data={rateData} />
          <TouchableOpacity onPress={() => {
            alert('S2');
          }}>
            <Text style={styles.buttonText}>좋아요</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  detailsContainer: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  ingredient: {
    fontSize: 12,
    marginBottom: 10,
  },
  step: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  buttonText: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default RecipeDetailsScreen;
