import createRestApi from "./createRestApi";

const api = createRestApi("/huggingface");

const huggingfaceService = {
	paraphraseText: (data) => api.post("paraphrase", true, data), // Uncomment once updated on backend
};

export default huggingfaceService;
