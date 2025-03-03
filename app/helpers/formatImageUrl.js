const formatImageUrl = (url) => {
    if (url.startsWith("//")) {
        return `https:${url}`;
    }
    return url;
};

export default formatImageUrl;