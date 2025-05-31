/* eslint-disable no-unused-vars */
import { defer } from "react-router-dom";
import apiRequest from "./apiRequest";

// export const singlePageLoader = async ({ request, params }) => {
//     const res = await apiRequest("/posts/" + params.id);
//     return res.data;
// };
export const listPageLoader = async ({ request }) => {
    console.log("API request:", `/posts`);
    const postPromise = apiRequest("/posts/");

    return defer({
        postResponse: postPromise,
    });
};

export const profilePageLoader = async () => {
    const postPromise = apiRequest("/users/profilePosts");
    const chatPromise = apiRequest("/chat");
    return defer({
        postResponse: postPromise,
        chatResponse: chatPromise,
    });
};

export const ChatPageLoader = async () => {
    const chatPromise = apiRequest("/chat");
    return defer({
        chatResponse: chatPromise,
    });
};