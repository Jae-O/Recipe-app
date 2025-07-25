import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { db } from '../firebaseConfig';
import {
  SelectList,
} from 'react-native-dropdown-select-list';

const CreatePostScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [utag, setUTag] = useState([]);
  const [comment, setComment] = useState('');
  const [count, setCount] = useState();
  const [selected, setSelected] = useState([]);
  const [catagory, setCatagory] = useState('');
  const [level, setLevel] = useState();
  const [spiciness, setSpiciness] = useState();

  const catagotyData = [
    { key: 'Korean', value: 'Korean' },
    { key: 'Japanese', value: 'Japanese' },
    { key: 'Chinese', value: 'Chinese' },
    { key : 'Western', value : 'Western '}
  ];

  const spicinessData = [
    { key: '0', value: 0 },
    { key: '1', value: 1 },
    { key: '2', value: 2 },
    { key: '3', value: 3 },
    { key: '4', value: 4 },
  ];

  const levelData = [
    { key: '1', value: 1 },
    { key: '2', value: 2 },
    { key: '3', value: 3 },
  ];

  const handlePost = async () => {
    
    readtoRecipe();
    
    await addtoRecipe();
    await addtoCommu();
    navigation.navigate('Community');

    setTitle('');
    setIngredients([]);
    setRecipe([]);
    setUTag([]);
    setComment('');
  };

  const handleAddtitle = (event) => {
    setTitle(event);
  };

  const handleAddComment = (event) => {
    setComment(event);
  };

  const handleAddtag = () => {
    setUTag([...utag, '']);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const handleAddRecipe = () => {
    setRecipe([...recipe, '']);
  };

  const handleChangeIngredient = (index, value) => {
    const inputs = [...ingredients];
    inputs[index] = value;
    setIngredients(inputs);
  };

  const handleChangeRecipe = (index, value) => {
    const inputs = [...recipe];
    inputs[index] = value;
    setRecipe(inputs);
  };

  const handleChangeTag = (index, value) => {
    const inputs = [...utag];
    inputs[index] = value;
    setUTag(inputs);
  };

  const catagotySelect = (value) => {
 
  const selectedValue = value;
  
  setSelected(selectedValue);
  setCatagory(selectedValue);
};

const levelSelect = (value) => {
 
  const selectedValue = value;
  
  setSelected(selectedValue);
  setLevel(selectedValue);
};

const spicySelect = (value) => {
 
  const selectedValue = value;
  
  setSelected(selectedValue);
  setSpiciness(selectedValue);
};

  const readtoRecipe = async () => {
    try {
      const getDB = await db.collection('Recipe');
      getDB.get().then((querySnapshot) => {
        const numDocuments = querySnapshot.size;
        setCount(numDocuments);
        console.log(`Number of documents in the collection: ${count}`);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const addtoRecipe = async () => {
    try {
      const docRef = await db.collection('Recipe').doc();
      const tagMap = {
        category: catagory,
        spiciness: spiciness,
        level: level,
      };

      await docRef.set({
        title: title,
        material: [...ingredients],
        sequence: [...recipe],
        uHashTag: [...utag],
        hashTag: tagMap,
        score: '',
        index: count,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const addtoCommu = async () => {
    try {
      const docRef = await db.collection('Community').doc();
      const tagMap = {
        category: catagory,
        spiciness: spiciness,
        level: level,
      };

      // recipe 배열의 각 요소를 맵에 추가

      await docRef.set({
        title: title,
        material: [...ingredients],
        sequence: [...recipe],
        uHashTag: [...utag],
        hashTag : tagMap,
        Comment: comment,
        chat: [],
        id: docRef.id,
        index: count,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    readtoRecipe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>글 작성</Text>
      <ScrollView>
        <View>
          <Text>이름</Text>
          <TextInput
            style={styles.input}
            placeholder="요리이름"
            value={title}
            onChangeText={handleAddtitle}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>재료</Text>
          <ScrollView>
            {ingredients.map((input, index) => (
              <TextInput
                key={index}
                style={styles.input}
                placeholder="재료입력"
                value={input}
                onChangeText={(value) => handleChangeIngredient(index, value)}
              />
            ))}
            
            <TouchableOpacity
              style={styles.button}
              onPress={handleAddIngredient}
            >
              <Text style={styles.buttonText}>재료추가</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <View style={styles.inputContainer}>
          <Text>레시피</Text>
          <ScrollView>
            {recipe.map((input, index) => (
              <TextInput
                key={index}
                style={styles.input}
                placeholder={`Step ${index + 1}`}
                value={input}
                onChangeText={(value) => handleChangeRecipe(index, value)}
              />
            ))}
            <TouchableOpacity
              style={styles.button}
              onPress={handleAddRecipe}
            >
              <Text style={styles.buttonText}>레시피 추가</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <View>
          <Text>hashTags</Text>
          <ScrollView>
            {utag.map((input, index) => (
              <TextInput
                key={index}
                style={styles.input}
                placeholder={`#tag ${index + 1}`}
                value={input}
                onChangeText={(value) => handleChangeTag(index, value)}
              />
            ))}
            <TouchableOpacity
              style={styles.button}
              onPress={handleAddtag}
            >
              <Text style={styles.buttonText}>태그 추가</Text>
            </TouchableOpacity>
          </ScrollView>
          <View>
          <Text>catagorys</Text>
            <SelectList setSelected={catagotySelect} data={catagotyData}/>
            <Text>level</Text>
            <SelectList setSelected={levelSelect} data={levelData}/>
            <Text>spicy</Text>
            <SelectList setSelected={spicySelect} data={spicinessData}/>
          </View>
        </View>
        <View>
          <Text>코멘트</Text>
          <TextInput
            style={styles.inputComment}
            placeholder="추가적인 코멘트 입력"
            multiline={true}
            maxLength={300}
            value={comment}
            onChangeText={handleAddComment}
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handlePost}
      >
        <Text style={styles.buttonText}>글 작성</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  inputComment: {
    height: 80,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    alignSelf: 'flex-end',
    bottom: -10,
  },
  button: {
      backgroundColor: 'skyblue',
      borderRadius: 10,
      width: 150,
      height: 35,
      marginBottom: 10,
      justifyContent: 'center',
      alignItems: 'center',
      
    },
  buttonText: {
      color: 'white',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 18,
    },
  submitButton: {
    backgroundColor: 'skyblue',
    padding: 10,
    borderRadius: 10,
  },
});

export default CreatePostScreen;
