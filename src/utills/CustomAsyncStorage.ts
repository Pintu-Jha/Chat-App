import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Utils from "./index"

export const USER_DATA = Utils.Constants.KEY_USER_DATA;
export const TIME_OUT_TIME = 'TIME_OUT_TIME';

export const setUserData = (data: any) => {
    storeItem(USER_DATA, data);
}

export const getUserData = () => {
    return retrieveItem(USER_DATA).then((data) => {
        //this callback is executed when your Promise is resolved
    }).catch((error) => {
        //this callback is executed when your Promise is rejected
    })
}

export async function retrieveItem(key: string) {
    try {
        const retrievedItem = await AsyncStorage.getItem(key);
        const item = JSON.parse(retrievedItem);
        return item;
    } catch (error) {
    }
    return
}

export async function storeItem(key: string, item: any) {
    try {
        //we want to wait for the Promise returned by AsyncStorage.setItem()
        //to be resolved to the actual value before returning the value
        var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
        return jsonOfItem;
    } catch (error) {
    }
}

export async function clearAsyncKeyData(key: string) {
    await AsyncStorage.removeItem(key)
}

export async function clearData() {
    try {
        await AsyncStorage.clear();
    } catch (error) {
        // Error retrieving data
    }
}