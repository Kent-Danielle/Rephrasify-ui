import createRestApi from "./createRestApi";

const api = createRestApi("/huggingface");

const huggingfaceService = {
    paraphraseText: (data) => api.get("paraphrase", true, data),
};

export default huggingfaceService;
