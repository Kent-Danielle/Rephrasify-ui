import createRestApi from "./createRestApi";

const api = createRestApi("/huggingface");

const huggingfaceService = {
	// paraphraseText: (data) => api.get("paraphrase", true, data), // Post request might be better for large amounts of text
	paraphraseText: (data) => api.post("paraphrase", true, data), // Uncomment once updated on backend
};

export default huggingfaceService;
