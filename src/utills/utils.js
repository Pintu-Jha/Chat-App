import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';



// export async function getHeaders() {
// 	let userData = await AsyncStorage.getItem('userData');
// 	// console.log("userData>>>",userData?.token)
// 	if (!!userData) {
// 		userData = JSON.parse(userData);
// 		// console.clear();
// 		// console.log('UserHeader>>>',userData)
// 		return {

// 			headers: {
// 				'Content-Type': 'application/json',
// 				'Content-Type': 'multipart/form-data',
// 				"Authorization": `${userData?.token}`,

// 			},
// 		};
// 	}
// 	return {};
// }


// export async function apiReq(
// 	endPoint,
// 	data,
// 	method,
// 	headers,
// 	requestOptions = {}
// ) {

// 	return new Promise(async (res, rej) => {

// 		const getTokenHeader = await getHeaders();

// 		headers = {
// 			...getTokenHeader,
// 			...headers,
// 		};

// 		// console.log('header>>', endPoint);

// 		if (method === 'get' || method === 'delete') {
// 			data = {
// 				...requestOptions,
// 				...data,
// 				headers
// 			};
// 		}

// 		// console.log("endPointendPoint", endPoint)

// 		await axios[method](endPoint, data, { headers })
// 			.then(result => {
// 				console.log("api result response", result)
// 				const { data } = result;
// 				// console.log('header>>', headers);

// 				if (data.success === false) {
// 					return rej(data);
// 				}

// 				return res(data);
// 			})
// 			.catch(error => {
// 				console.log(error)
// 				console.log(error && error?.response, 'the error respne')
// 				if (error && error.response && error.response.status === 400) {
// 					//logout user
// 					alert("user not valid")
// 				}
// 				if (error && error.response && error.response.data) {
// 					if (!error.response.data.message) {
// 						return rej({ ...error.response.data, message: error.response.data.message || "Network Error" })
// 					}
// 					return rej(error.response.data)
// 				} else {
// 					return rej({ message: "Network Error", message: "Network Error" });
// 				}
// 			});
// 	});
// }

export async function getHeaders() {
	try {
	  let userData = await AsyncStorage.getItem('userData');
	  if (!!userData) {
		return {
		  headers: {
			"Content-Type": "multipart/form-data", 
			'Authorization': `${userData}`,
		  },
		};
	  } else {
		console.log('User data not found in AsyncStorage');
		return {};
	  }
	} catch (error) {
	  console.error('Error retrieving user data from AsyncStorage:', error);
	  return {};
	}
  }

export async function apiReq(endPoint, data, method, headers) {
	try {
		const tokenHeader = await getHeaders();
		headers = {
			...tokenHeader.headers,
			...headers,
		};

		let config = {
			method: method,
			url: endPoint,
		};
	
		if (method === 'get' || method === 'delete') {
			config.params = data;
		} else {
			config.data = data;
		}

		const response = await axios(config,{headers});
		
		console.log('formPostResponse>>>',response);
		return response.data;
	} catch (error) {
		console.log('API Request error:', error);
		throw error;
	}
}



export function apiPost(endPoint, data, headers = {}) {
	return apiReq(endPoint, data, 'post', headers);
}

export function apiDelete(endPoint, data, headers = {}) {
	return apiReq(endPoint, data, 'delete', headers);
}

export function apiGet(endPoint, data, headers = {}, requestOptions) {
	return apiReq(endPoint, data, 'get', headers, requestOptions);
}

export function apiPut(endPoint, data, headers = {}) {
	return apiReq(endPoint, data, 'put', headers);
}

