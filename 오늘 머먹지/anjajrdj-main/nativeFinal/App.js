import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RecipeDetailsScreen from './components/RecipeDetailsScreen';
import CommunityScreen from './components/CommunityScreen';
import CreatePostScreen from './components/CreatePostScreen';
import DetailPostScreen from './components/DetailPostScreen';
import { db } from './firebaseConfig';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let connectingId;
  let postId;

  const handleLogin = () => {
    // 로그인 로직을 여기에 구현합니다.
    // 예시: 사용자 이름과 비밀번호의 유효성을 확인하고, API 요청을 수행합니다.
    setIsLoggedIn(true);
  };

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeStack}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Favorites"
            component={SearchScreen}
            options={{ title: '검색' }}
          />
          <Tab.Screen name="커뮤니티" component={CommunityScreen} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" options={{ headerShown: false }}>
            {(props) => <LoginScreen {...props} onLogin={handleLogin} />}
          </Stack.Screen>
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{ title: '회원가입' }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

// 로그인 화면 컴포넌트
const LoginScreen = ({ navigation, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let readId = [];
  let readPwd = [];
  let flag = 0;
  let loginSuccessful = false;

  const readUserDB = async () => {
    try {
      const data = await db.collection('User').get();
      let tempArray = [];
      data.forEach((doc) => {
        tempArray.push({ ...doc.data() });
      });
      readId = tempArray.map((row) => row.email);
      readPwd = tempArray.map((row) => row.password);
      return tempArray;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };

  const handleLogin = async () => {
    try {
      await readUserDB();

      while (flag < readId.length && !loginSuccessful) {
        if (username === readId[flag] && password === readPwd[flag]) {
          loginSuccessful = true;
        }
        flag++;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginPress = async () => {
    // 사용자 이름과 비밀번호 유효성 검사
    // 예시: 사용자 이름과 비밀번호를 데이터베이스와 일치하는지 확인합니다.
    await handleLogin();

    if (loginSuccessful) {
      connectingId = username;
      onLogin();
      alert('Login success');
    } else {
      alert('Login fail');
    }
  };

  const handleSignupPress = () => {
    navigation.navigate('Signup');
  };
  const styles = StyleSheet.create({
    loginContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      backgroundColor: 'skyblue',
      borderRadius: 10,
      width: 200,
      height: 50,
      marginBottom: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
      fontWeight: 'bold', // 글꼴 굵게 설정
      fontSize: 18, // 글꼴 크기 조정
    },
    input: {
      width: '80%',
      height: 40,
      backgroundColor: '#fff',
      borderWidth: 1, // 테두리 두께
      borderColor: '#ccc', // 테두리 색상
      borderRadius: 5, // 테두리 둥글기
      marginBottom: 10,
      paddingHorizontal: 10,
    },
    title: {
      fontSize: 24, // 큰 글씨 크기
      fontWeight: 'bold', // 글씨 굵기
      marginBottom: 20, // 위로 조금 떨어뜨리기
    },
  });
  return (
  <View style={styles.loginContainer}>
    <Text style={[styles.title, { marginTop: 30 }]}>로그인</Text>
    <TextInput
      style={styles.input}
      placeholder="사용자 이름"
      value={username}
      onChangeText={setUsername}
    />
    <TextInput
      style={styles.input}
      placeholder="비밀번호"
      secureTextEntry
      value={password}
      onChangeText={setPassword}
    />
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleLoginPress}
        style={styles.button}
      >
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleSignupPress}
        style={styles.button}
      >
        <Text style={styles.buttonText}>회원가입</Text>
      </TouchableOpacity>
    </View>
  </View>
);
};

// 회원가입 화면 컴포넌트
const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const pushUserDB = async () => {
    try {
      await db.collection('User').doc(email).set({
        email: email,
        password: password,
        name: username,
        like: [],
        view: [],
        rateing: {},
      });
      alert('회원가입 성공');
      handleLoginPress();
    } catch {
      console.log(error.message);
      alert('회원가입 실패');
    }
  };

  const handleSignupPress = () => {
    // 회원가입 로직을 여기에 구현합니다.
    // 예시: 새로운 사용자 계정을 생성하고, 사용자 이름과 비밀번호를 데이터베이스에 저장합니다.
    pushUserDB();
    console.log('등록된 사용자:', { username, password });
  };

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };
  const styles = StyleSheet.create({
    loginContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      backgroundColor: 'skyblue',
      borderRadius: 10,
      width: 200,
      height: 50,
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
    input: {
      width: '80%',
      height: 40,
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      marginBottom: 10,
      paddingHorizontal: 10,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
  });
  return (
  <View style={styles.loginContainer}>
    <Text style={styles.title}>회원가입</Text>
    <TextInput
      style={styles.input}
      placeholder="사용자 이름"
      value={username}
      onChangeText={setUsername}
    />
    <TextInput
      style={styles.input}
      placeholder="이메일"
      secureTextEntry
      value={email}
      onChangeText={setEmail}
    />
    <TextInput
      style={styles.input}
      placeholder="비밀번호"
      secureTextEntry
      value={password}
      onChangeText={setPassword}
    />
    <TouchableOpacity
      onPress={handleSignupPress}
      style={styles.button}
    >
      <Text style={styles.buttonText}>회원가입</Text>
    </TouchableOpacity>
  </View>
);
};

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="KoreanMenuScreen"
        component={KoreanMenuScreen}
        options={{ title: '한식' }}
      />
      <Stack.Screen
        name="ChineseMenuScreen"
        component={ChineseMenuScreen}
        options={{ title: '중식' }}
      />
      <Stack.Screen
        name="JapaneseMenuScreen"
        component={JapaneseMenuScreen}
        options={{ title: '일식' }}
      />
      <Stack.Screen
        name="WesternMenuScreen"
        component={WesternMenuScreen}
        options={{ title: '양식' }}
      />
      <Stack.Screen
        name="RecipeDetails"
        component={RecipeDetailsScreen}
        options={{ title: '레시피' }}
      />
      <Stack.Screen
        name="Community"
        component={CommunityScreen}
        options={{ title: '커뮤니티' }}
      />
      <Stack.Screen
        name="CreatePost"
        component={CreatePostScreen}
        options={{ title: '글 작성' }}
      />
      <Stack.Screen
        name="PostDetails"
        component={DetailPostScreen}
        options={{ title: '게시판' }}
        initialParams={{ conId: connectingId }}
      />
      <Stack.Screen
        name="details"
        component={RecipeDetailsScreen}
        options={{ title: '게시판' }}
        //initialParams={{ postId: postId }}
      />
    </Stack.Navigator>
  );
};

const HomeScreen = ({ navigation }) => {
  const [userArr, setUserArr] = useState([]);
  const [docName, setDocName] = useState([]);
  const [kor, setKor] = useState([])
  const [jap, setJap] = useState([])
  const [chi, setChi] = useState([])
  const [wes, setWes] = useState([])

  navigation = useNavigation();

  useEffect(() => {
    const fetchMore = async () => {
      try {
        console.log('API 호출을 시도합니다…');
        const response = await fetch('http://192.168.25.35:5000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: connectingId, // 유저 이름을 전달
          }),
        });
        console.log('API 호출 성공!');
        const data = await response.json();
        console.log('data: ', data);
        setUserArr(data);
        const stringArray = [];
        data.forEach((num) => {
          stringArray.push(num.toString());
        });
        console.log('userArr:', userArr);
        try {
          const collectionRef = db.collection('Recipe');
          const querySnapshot = await collectionRef
            .where('index', 'in', stringArray)
            .get();
          const documentIds = querySnapshot.docs.map((doc) => doc.data().title);
          setDocName(documentIds);
          console.log('rcmdSize: ', querySnapshot.size);
        } catch (error) {
          console.log(error.message);
        }
      } catch (error) {
        console.error('API 호출 중 오류가 발생했습니다:', error);
      }
    };
    const fetchData = async () => {
        try {
          const collectionRef = db.collection('Recipe');
          const categories = ["Korean", "Japanese", "Chinese", "Western"];
          const querySnapshot = await collectionRef.where('hashTag.category', 'in', categories).get();

          querySnapshot.forEach((doc) => {
          const { title } = doc.data();
          const category = doc.data().hashTag.category;

          switch (category) {
            case "Korean":
              setKor((prevData) => [...prevData, title]);
              break;
            case "Japanese":
              setJap((prevData) => [...prevData, title]);
              break;
            case "Chinese":
              setChi((prevData) => [...prevData, title]);
              break;
            case "Western":
              setWes((prevData) => [...prevData, title]);
              break;
            default:
              break;
          }
        });
        } catch (error) {
          console.log(error.message);
        }
    }
    fetchData()
    const unsubscribe = navigation.addListener('focus', fetchMore);

    return () => {
      unsubscribe();
    };
  }, [navigation]);

  const categories = [
    {
      name: '한식',
      image: require('./assets/korean-food.jpg'),
      screen: 'KoreanMenuScreen',
      menu: kor,
    },
    {
      name: '중식',
      image: require('./assets/chinese-food.png'),
      screen: 'ChineseMenuScreen',
      menu: chi,
    },
    {
      name: '양식',
      image: require('./assets/western-food.jpg'),
      screen: 'WesternMenuScreen',
      menu: wes,
    },
    {
      name: '일식',
      image: require('./assets/japanese-food.png'),
      screen: 'JapaneseMenuScreen',
      menu: jap,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { marginTop: 30 , textAlign: 'center'}]}>우리 오늘 뭐먹어?</Text>
      </View>
      <View style={styles.main}>
        <View style={styles.foodImage}>
          {docName.map((item, index) => (
            <Text key={index}>{item}</Text>
          ))}
        </View>
        <View style={styles.categoryList}>
          {categories.map((category, index) => (
            <TouchableOpacity
              style={styles.category}
              key={index}
              onPress={() =>
                navigation.navigate(category.screen, { menu: category.menu })
              }>
              <Image source={category.image} style={styles.categoryImage} />
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const SearchScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [readtitle, setReadTitle] = useState([]);
  const [control, setControl] = useState([]);
  const [userView, setUserView] = useState([]);
  const [selectids, setSelectids] = useState([]);
  const [upView, setUpView] = useState([]);

  const handleRecipePress = async(post) => {
    setSearchText('')
    setUpView([...userView, ...selectids])
    navigation.navigate('RecipeDetails', { postId: post });
  };

  const readUserView = async () => {
    try {
      const doc = await db.collection('User').doc(connectingId).get();
      const data = doc.data();
      const { view } = data;
      setUserView(view);
    } catch (error) {
      console.log('Error reading user data:', error);
    }
    console.log("SIVAL", userView);
  };

  const updateUserView = async () => {
    try {
      await db.collection('User').doc(connectingId).update({
        view: upView,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const readRecipeDB = async () => {
    const cookNames = [];
    try {
      for (let i = 0; i < control.length; i++) {
        const doc = await db.collection('Recipe').doc(control[i]).get();
        const data = doc.data();
        const { title } = data;
        cookNames.push(title);
      }
      setReadTitle(cookNames);
      console.log(connectingId);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSearch = async () => {
    console.log('searchText: ', searchText);
    try {
      const collectionRef = db.collection('Recipe');
      const querySnapshot = await collectionRef
        .where('title', '==', searchText)
        .get();
      const documentNames = querySnapshot.docs.map((doc) => doc.id);
      console.log('ids: ', documentNames);
      setControl(documentNames);

      const indexArray = [];
      console.log('searchSize: ', querySnapshot.size);

      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        const index = docData.index;

        console.log('docData: ', docData);
        console.log('index: ', index);

        indexArray.push(index);
      });
      setSelectids(indexArray);
      console.log('indexArray: ', indexArray);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    readRecipeDB();
  }, [control]);

  useEffect(() => {
    readUserView();
  }, []);

  useEffect(() => {
    updateUserView();
  }, [upView]);
const searchStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
 
  postItem: {
    backgroundColor: 'lightgray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  postTitle: {
    fontSize: 16,
  },
});

  return (
    <View style={searchStyles.container}>
      <TextInput
        style={searchStyles.input}
        placeholder="검색어를 입력하세요"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
      <Button title="검색" onPress={handleSearch} />
      <ScrollView>
        {readtitle?.map((input, index) => (
          <TouchableOpacity
            style={searchStyles.postItem}
            key={index}
            onPress={() => {
              handleRecipePress(control[index]);
            }}
          >
            <Text style={searchStyles.postTitle}>{`Title : ${input}`}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>

);
};


const SettingsScreen = ({ navigation }) => {
  const handleCommunityPress = () => {
    navigation.navigate('Community');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleCommunityPress}>
        <Text style={styles.buttonText}>커뮤니티</Text>
      </TouchableOpacity>
    </View>
  );
};

const KoreanMenuScreen = ({ route }) => {
  const { menu } = route.params;
  const [control, setControl] = useState([]);
  const [userView, setUserView] = useState([]);
  const [selectids, setSelectids] = useState([]);
  const [upView, setUpView] = useState([]);
  const handleRecipePress = async(post) => {
    setUpView([...userView, ...selectids])
    navigation.navigate('RecipeDetails', { postId: post });
  };

  navigation = useNavigation();

  useEffect(()=>{
    const handleSearch = async () => {
      try {
        const collectionRef = db.collection('Recipe');
        const querySnapshot = await collectionRef
          .where('title', 'in', menu)
          .get();
        const documentNames = querySnapshot.docs.map((doc) => doc.id);
        console.log('ids: ', documentNames);
        setControl(documentNames);

        const indexArray = [];
        console.log('searchSize: ', querySnapshot.size);

        querySnapshot.forEach((doc) => {
          const docData = doc.data();
          const index = docData.index;

          console.log('docData: ', docData);
          console.log('index: ', index);

          indexArray.push(index);
        });
        setSelectids(indexArray);
        console.log('indexArray: ', indexArray);
      } catch (error) {
        onsole.log(error.message);
      }
    };
    handleSearch()
  }, [navigation])
  

  return (
    <View style={styles.menuContainer}>
      <Text style={styles.menuTitle}>한식 메뉴</Text>
      <ScrollView>
      {menu.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
              handleRecipePress(control[index]);
            }}
          >
          <Text style={styles.menuItem}>{item}</Text>
        </TouchableOpacity>
      ))}
      </ScrollView>
    </View>
  );
};

const ChineseMenuScreen = ({ route }) => {
  const { menu } = route.params;

  return (
    <View style={styles.menuContainer}>
      <Text style={styles.menuTitle}>중식 메뉴</Text>
      <ScrollView>
      {menu.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => navigation.navigate('details', { item })}
        >
          <Text style={styles.menuItem}>{item}</Text>
        </TouchableOpacity>
      ))}
      </ScrollView>
    </View>
  );
};

const WesternMenuScreen = ({ route }) => {
  const { menu } = route.params;

  return (
    <View style={styles.menuContainer}>
      <ScrollView>
      {menu.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => navigation.navigate('details', { item })}
        >
          <Text style={styles.menuItem}>{item}</Text>
        </TouchableOpacity>
      ))}
      </ScrollView>
    </View>
  );
};

const JapaneseMenuScreen = ({ route }) => {
  const { menu } = route.params;

  return (
    <View style={styles.menuContainer}>
      <Text style={styles.menuTitle}>일식 메뉴</Text>
      <ScrollView>
      {menu.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => navigation.navigate('details', { item })}
        >
          <Text style={styles.menuItem}>{item}</Text>
        </TouchableOpacity>
      ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  main: {
    flex: 1,
    padding: 20,
  },
  foodImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    marginBottom: 20,
  },
  foodImageItem: {
    width: 200,
    height: 200,
    marginRight: 20,
    borderRadius: 20,
  },
  categoryList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  category: {
    width: '48%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  categoryImage: {
    width: '100%',
    height: 100,
    marginBottom: 10,
    borderRadius: 5,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  menuContainer: {
    flex: 1,
    padding: 20,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  menuItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  postItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  postTitle: {
    fontSize: 16,
  },
});

export default App;
