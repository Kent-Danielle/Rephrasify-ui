import { useState } from "react";

const setWithExpiry = (key, value, ttl) => {
	const now = new Date();

	const item = {
		value: value,
		expiry: now.getTime() + ttl,
	};
	localStorage.setItem(key, JSON.stringify(item));
};

const getWithExpiry = (key) => {
    if (!localStorage) {
        return null;
    }

	const itemStr = localStorage.getItem(key);
    console.log(key)
    console.log(itemStr)
	if (!itemStr) {
		return null;
	}
	const item = JSON.parse(itemStr);
	const now = new Date().getTime();
    console.log(item)
	if (now > item.expiry) {
		localStorage.removeItem(key);
		return null;
	}
	return item.value;
};

const useLocalStorage = (initialData, key, ttl = 3600000) => {
	const [data, setData] = useState(() => {
		const storedData = getWithExpiry(key);
        console.log(storedData)
		return storedData !== null ? storedData : initialData;
	});

	const setDataWithExpiry = (value) => {
		setWithExpiry(key, value, ttl);
		setData(value);
	};

	const clearData = () => {
		localStorage.removeItem(key);
		setData(initialData);
	};

	return [data, setDataWithExpiry, clearData];
};

export default useLocalStorage;
