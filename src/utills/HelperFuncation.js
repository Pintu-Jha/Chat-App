import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from "react-native-flash-message";


export const storeData = async (key, value) => {
    try {
        var jsonValue = value
        if (typeof (value) !== 'string') {
            jsonValue = JSON.stringify(value);
        }
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        return e
    }
};


export const getData = async (key) => {
    try {
        const res = await AsyncStorage.getItem(key);
        return res != null ? typeof (res) !== 'string' ? JSON.parse(res) : res : null;
    } catch (e) {
        return e
        // error reading value
    }
};


export function getFormData(data) {
    let formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
        if (Array.isArray(value) === true) {
            for (var i = 0; i < value.length; i++) formData.append(`${key}`, value[i]);
        }
        else formData.append(`${key}`, value);
    }
    return formData
}


export const showError = (message)=>{
    showMessage({
      type:'danger',
      icon:'danger',
      message,
      duration:2500,
    })
    }
    
    export const showSucess = (message)=>{
      showMessage({
        type:'success',
        icon:'success',
        message,
        duration:2500,
      })
      }