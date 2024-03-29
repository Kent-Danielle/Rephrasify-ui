import createRestApi from "./createRestApi";

const api = createRestApi("/huggingface");

const huggingfaceService = {
    paraphraseText: (data) => api.get("paraphrase?text=" + encodeURIComponent(data.text)),
};

export default huggingfaceService;
