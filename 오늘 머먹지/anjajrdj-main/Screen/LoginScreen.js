import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import DrawerStackScreen from '../components/DrawerStackScreen'

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // 로그인 처리 로직 작성
    // 예시: 이메일과 비밀번호를 서버로 보내고 유효성 검사를 수행한 후 로그인 성공 여부를 처리합니다.
    if (email === '123' && password === '123') {
      alert('로그인 성공');
      navigation.navigate('Main');
    } else {
      // 로그인 실패 처리
      alert('로그인 실패');
    }
  };

  const handleSignup = () => {
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="이메일"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <View style={styles.buttonContainer}>
        <Button title="로그인" onPress={handleLogin} style={styles.button} />
        <Button title="회원가입" onPress={handleSignup} style={styles.button} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    width: '100%',
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
  },
  button: {
    width: '48%',
  },
});

export default LoginScreen;
