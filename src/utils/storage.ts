import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAccessToken = async () => {
  return await AsyncStorage.getItem('access_token');
};

export const setAccessTokenStorage = (token: string) => {
  AsyncStorage.setItem('access_token', token);
};
