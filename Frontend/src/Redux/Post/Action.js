
import { ADD_BLOG ,DELETE_BLOG, UPDATE_BLOG,GET_FEATURED_BLOG,GET_SAVED_BLOG,SAVE_BLOG,
    UNSAVE_BLOG,GET_BLOG_FOR_CURRENT_USER,SEARCH_BLOGS,GET_ALL_BLOGS,GET_BLOG_BY_ID,GET_BLOG_BY_CATEGORY,
GET_ALL_BLOGS_BY_USER_ID} from "./ActionType";

const BASE_URL = "http://localhost:8080/posts";



export const addBlog = (blogpost,jwt) => async (dispatch) => {
  try {
     const res = await fetch(`${BASE_URL}/add`, {
     method: "POST",

     headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + jwt,
    },
    body: JSON.stringify(blogpost),
  });
   const post = await res.json();

  // console.log("--- req user --- ",post)

  dispatch({ type: ADD_BLOG, payload: post });
  console.log("blogpost added - ",blogpost);
  } catch (error) {
    console.log("catch error - ",error)
  }

};

export const deleteBlog = (id, jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to delete blog post");
    }
 console.log("deleted");
    dispatch({ type: DELETE_BLOG, payload: id });
  } catch (error) {
    console.log("catch error - ",error)
  }
}

export const updateBlog = (post, jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/update/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
      body: JSON.stringify(post),
    });
    const updatedPost = await res.json();
    console.log("upadted" ,updatedPost);

    dispatch({ type: UPDATE_BLOG, payload: updatedPost });
  } catch (error) {
    console.log("catch error - ",error)
  }
};
export const getFeaturedBlog = (jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/featured`, {
        method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    });
    const featuredPosts = await res.json();

    dispatch({ type: GET_FEATURED_BLOG, payload: featuredPosts });
  } catch (error) {
    console.log("catch error - ",error)
  }
};

export const getSavedBlog = (userId,jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/saved/${userId}`, {
        method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    });
    const savedPosts = await res.json();
    console.log("saved  asf",savedPosts)

    dispatch({ type: GET_SAVED_BLOG, payload: savedPosts });
  } catch (error) {
    console.log("catch error - ",error)
  }
};
export const saveBlog = (userId,post ,jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/save/${userId}/${post.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
      
      
    });
    const savedPosts = await res.json();
    console.log("saved post", savedPosts)

    dispatch({ type: SAVE_BLOG, payload: savedPosts });
   
  } catch (error) {
    console.log("catch error - ",error)
  }
};


export const unsaveBlog = (userId,postId,jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/unsave/${userId}/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    });
    const savedPosts = await res.json();
    console.log("saved post", savedPosts)

    dispatch({ type: UNSAVE_BLOG, payload: savedPosts });
  } catch (error) {
    console.log("catch error - ",error)
  }
};

export const getBlogForCurrentUser = (userId,jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    });
    const userPosts = await res.json();

    dispatch({ type: GET_BLOG_FOR_CURRENT_USER, payload: userPosts });
  } catch (error) {
    console.log("catch error - ",error)
  }
};
export const searchBlogs = (query,jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/search?q=${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    });
    const searchResults = await res.json();

    dispatch({ type: SEARCH_BLOGS, payload: searchResults });
  } catch (error) {
    console.log("catch error - ",error)
  }
};
export const getAllBlogs = (jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/allBlog`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    });
    const globalPosts = await res.json();

    dispatch({ type: GET_ALL_BLOGS, payload: globalPosts });
  } catch (error) {
    console.log("catch error - ",error)
  }
};
export const getBlogById = (id,jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/post/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    });
    const postById = await res.json();
    dispatch({ type: GET_BLOG_BY_ID, payload: postById });
    console.log("postById - ",postById)
  } catch (error) {
    console.log("catch error - ",error)
  }
};
export const getBlogByCategory = (category,jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/category/${category}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    });
    const postByCategory = await res.json();

    dispatch({ type: GET_BLOG_BY_CATEGORY, payload: postByCategory });
  } catch (error) {
    console.log("catch error - ",error)
  }
};
export const getAllBlogsByUserId = (userId,jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/author/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    });
    const allPostsByUserId = await res.json();

    dispatch({ type: GET_ALL_BLOGS_BY_USER_ID, payload: allPostsByUserId });
  } catch (error) {
    console.log("catch error - ",error)
  }
};