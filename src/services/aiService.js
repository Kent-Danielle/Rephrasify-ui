import createRestApi from "./createRestApi";

const api = createRestApi("/huggingface", true);

const huggingfaceService = {
    paraphraseText: (data) => api.get("paraphrase?text=" + encodeURIComponent(data.text)),
};

export default huggingfaceService;
