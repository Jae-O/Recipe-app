import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity,StyleSheet } from 'react-native';

const RecipeApp = () => {
  const [searchText, setSearchText] = useState('');

  // 검색어 입력 핸들러
  const handleSearch = (text) => {
    setSearchText(text);
  };

  // 검색 실행 핸들러
  const handleSearchSubmit = () => {
    // 검색 기능 구현 로직
    // ...
  };

  // 음식 이미지 카테고리
  const categories = [
    { name: '한식', image: require('./assets/korean-food.jpg')},
    { name: '중식', image: require('./assets/chinese-food.png')},
    { name: '양식', image: require('./assets/western-food.jpg')},
    { name: '일식', image: require('./assets/japanese-food.png')},
    // ...
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>우리 오늘 뭐먹어?</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            value={searchText}
            onChangeText={handleSearch}
            placeholder="레시피 검색"
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearchSubmit}>
            <Text style={styles.searchButtonText}>검색</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.main}>
        <View style={styles.foodImage}>
        </View>
        <View style={styles.categoryList}>
          {categories.map((category, index) => (
            <View style={styles.category} key={index}>
              <Image source={category.image} style={styles.categoryImage,{width:40,height:30}}   />
              <Text style={styles.categoryName}>{category.name}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
  },
  header: {
    padding: 36,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'#FF9933'
   
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  searchButton: {
    backgroundColor: 'skyblue',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  main: {
    flex: 1,
    padding: 16,
  },
  foodImage: {
    flex: 1,
    backgroundColor: '#eee',
    marginBottom: 16,
  },
  categoryList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  category: {
    width: '50%',
    marginBottom: 16,
    alignItems: 'center',
  },
  categoryImage: {
    width: 150,
    height: 150,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: 'bold'
  },
};

export default RecipeApp;
