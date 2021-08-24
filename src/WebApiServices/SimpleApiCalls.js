import axios from 'axios';

const token = null

const userAuthResource = (api, data) => {
	return new Promise((resolve, reject) => {
		axios
			.post(`${api}`, data)
			.then(response => {
				resolve(response);
			})
			.catch(error => {
				ErrorHelper.handleErrors("something went wrong", true)
				reject(error);
			});
	});
};

const createResource = (api, data, tok) => {
	return new Promise((resolve, reject) => {
		axios
			.post(`${api}`, data, { headers: { "token": tok } })
			.then(response => {
				resolve(response);
			})
			.catch(error => {
				reject(error);
			});
	});
};

const getResource = api => {
	return new Promise((resolve, reject) => {
		axios
			.get(`${api}`, { headers: { 'xt-user-token': token } })
			.then(response => {
				resolve(response);
			})
			.catch(error => {
				reject(error);
			});
	});
};

const getResourceById = (api, id) => {
	return new Promise((resolve, reject) => {
		axios
			.get(`${api}/${id}`, { headers: { 'x-user-token': token } })
			.then(response => {
				resolve(response);
			})
			.catch(error => {
				reject(error);
			});
	});
};

const updateResource = (api, data) => {
	return new Promise((resolve, reject) => {
		axios
			.put(`${api}`, data, {
				headers: { 'xt-user-token': token }
			})
			.then(response => {
				resolve(response);
			})
			.catch(error => {
				reject(error);
			});
	});
};

const deleteResource = api => {
	return new Promise((resolve, reject) => {
		axios({
			method: 'delete',
			url: `${api}`,
			headers: { 'x-user-token': token }
		})
			.then(response => {
				resolve(response);
			})
			.catch(error => {
				reject(error);
			});
	});
};

const uploadContent = (api, data) => {
	// let params = {
	//   file: data
	// }
	var formData = new FormData();
	formData.append('file', data[0]);

	console.log(api, data[0], 'ADSAASD');
	return new Promise((resolve, reject) => {
		axios
			.post(`${api}`, formData, { headers: { 'xt-user-token': token } })
			.then(res => {
				resolve(res);
			})
			.catch(err => {
				reject(err);
			});
	});
};

const forgotPasswordResource = (api, data, token) => {
	return new Promise((resolve, reject) => {
		axios
			.post(`${api}`, data, { headers: { 'xt-client-token': token } })
			.then(response => {
				resolve(response);
			})
			.catch(error => {
				reject(error);
			});
	});
};

const resetPasswordResource = (api, data, token) => {
	return new Promise((resolve, reject) => {
		axios
			.put(`${api}`, data, {
				headers: { 'xt-client-token': token }
			})
			.then(response => {
				resolve(response);
			})
			.catch(error => {
				reject(error);
			});
	});
};

export {
	createResource,
	getResource,
	getResourceById,
	updateResource,
	deleteResource,
	userAuthResource,
	uploadContent,
	forgotPasswordResource,
	resetPasswordResource
};
