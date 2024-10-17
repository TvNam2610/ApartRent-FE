/* eslint-disable no-unused-vars */
import { defer } from "react-router-dom";
import apiRequest from "./apiRequest";

export const singlePageLoader = async ({ request, params }) => {
    const res = await apiRequest("/posts/" + params.id);
    return res.data;
};
export const listPageLoader = async ({ request }) => {
    const urlParams = new URL(request.url);
    const type = urlParams.pathname === "/for-rent" ? "rent" : "buy";
    console.log("API request:", `/posts?type=${type}`); // Log để kiểm tra URL
    const postPromise = apiRequest(`/posts/?type=${type}`);

    return defer({
        postResponse: postPromise,
    });
};

export const profilePageLoader = async () => {
    const postPromise = apiRequest("/users/profilePosts");
    const chatPromise = apiRequest("/chats");
    return defer({
        postResponse: postPromise,
        chatResponse: chatPromise,
    });
};