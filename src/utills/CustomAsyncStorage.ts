import AsyncStorage from '@react-native-async-storage/async-storage';

export const USER_DATA = 'userData';
export const TOKEN_KEY = 'token';


export async function retrieveItem(key: string) {
  try {
    const retrievedItem = await AsyncStorage.getItem(key);
    if (retrievedItem !== null) {
      const item = JSON.parse(retrievedItem);
      return item;
    }
    return null;
  } catch (error) {
    console.error('Error retrieving item:', error);
    return null;
  }
}

export async function storeItem(key: string, item: any) {
  try {
    const jsonOfItem = JSON.stringify(item);
    await AsyncStorage.setItem(key, jsonOfItem);
  } catch (error) {
    console.error('Error storing item:', error);
  }
}

export async function clearAsyncKeyData(key: string) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error clearing key data:', error);
  }
}

export async function clearData() {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error clearing data:', error);
  }
}
export const storeToken = async (token: string) => {
  await AsyncStorage.setItem(TOKEN_KEY, token);
};

export const getToken = async () => {
  return await AsyncStorage.getItem(TOKEN_KEY);
};
