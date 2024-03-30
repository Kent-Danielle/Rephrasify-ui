const BASE_URL =
	process.env.NODE_ENV === "production"
		? "https://api.example.com"
		: "http://localhost:8000";

/*
    Sample usage
    const api = createRestApi("/api/v1", true);
*/
const createRestApi = (url) => {
	return {
		get: (suburl, isAuthNeeded, data) =>
			fetchWrapper(`${url}/${suburl}`, "GET", isAuthNeeded, data),
		post: (suburl, isAuthNeeded, data) =>
			fetchWrapper(`${url}/${suburl}`, "POST", isAuthNeeded, data),
		put: (suburl, isAuthNeeded, data) =>
			fetchWrapper(`${url}/${suburl}`, "PUT", isAuthNeeded, data),
		delete: (suburl, isAuthNeeded, data) =>
			fetchWrapper(`${url}/${suburl}`, "DELETE", isAuthNeeded, data),
	};
};

const fetchWrapper = (url, method, isAuthNeeded, data) => {
	// default isAuthNeeded = false
	isAuthNeeded = isAuthNeeded || false;
	const options = {
		method: method,
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: isAuthNeeded,
	};

	// if (data && url === "/huggingface/paraphrase") {
	// 	console.log("data", data);
	// 	url += "?action=" + data.action + "&text=" + data.text;
	// }

	// if (data && method !== "GET") {
	// 	options.body = JSON.stringify(data);
	// }
	
	if (data) {
		options.body = JSON.stringify(data);
	}
	console.log("options", options);

	return fetch(BASE_URL + url, options).then((response) => {
		return response.json().then((json) => {
			if (response.ok) {
				return Promise.resolve(json);
			}
			return Promise.reject(json);
		});
	});
};

export default createRestApi;
