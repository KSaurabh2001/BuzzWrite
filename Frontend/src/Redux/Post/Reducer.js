import { ADD_BLOG ,DELETE_BLOG, UPDATE_BLOG,GET_FEATURED_BLOG,GET_SAVED_BLOG,SAVE_BLOG,
    UNSAVE_BLOG,GET_BLOG_FOR_CURRENT_USER,SEARCH_BLOGS,GET_ALL_BLOGS,GET_BLOG_BY_ID,GET_BLOG_BY_CATEGORY,
GET_ALL_BLOGS_BY_USER_ID} from "./ActionType";

const initialState={
    userPosts:[],
    savedPosts:[],
    featuredPosts:[],
    searchResults:[], 
    globalPosts:[], 
    postById:{},
    postByCategory:[],
    allPostsByUserId:[]
}

export const postReducer=(store=initialState,{type,payload})=>{

    if(type===ADD_BLOG){
        if (type === ADD_BLOG) {
    const alreadyExists = store.userPosts.some(post => post.id === payload.id);
    if (alreadyExists) {
       
        return store; // No changes if duplicate
    }
    return {
        ...store,
        userPosts: [...store.userPosts, payload],
    };
} //payload is the new blog post
    }

    else if(type===DELETE_BLOG){
        return {...store, userPosts:store.userPosts.filter(post=>post.id!==payload)}; //payload is the blog post ID to delete
    }
    else if(type===UPDATE_BLOG){
        return {...store, userPosts:store.userPosts.map(post=>post.id===payload.id?payload:post)}; //payload is the updated blog post
    }
    else if(type===GET_FEATURED_BLOG){
        return {...store, featuredPosts:payload}; //payload will have all featured blog posts
    }
    else if(type===GET_SAVED_BLOG){
        return {...store, savedPosts:payload}; //payload will have all saved blog posts
    }
    else if(type===SAVE_BLOG){
        return {...store, savedPosts:payload}; //payload will have all saved blog posts

    }
    else if(type===UNSAVE_BLOG){
        return {...store, savedPosts:payload}; //payload will have all saved blog posts
    }
    else if(type===GET_BLOG_FOR_CURRENT_USER){
        return {...store, userPosts:payload}; //payload will have all blog posts for the current user
    }
    else if(type===SEARCH_BLOGS){
        return {...store, searchResults:payload}; //payload will have the search results
    }
    else if(type===GET_ALL_BLOGS){
        return {...store, globalPosts:payload}; //payload will have all blog posts
    }
    else if(type===GET_BLOG_BY_ID){
        return {...store, postById:payload}; //payload will have the blog post by ID
    }
    else if(type===GET_BLOG_BY_CATEGORY){
        return {...store, postByCategory:payload}; //payload will have the blog posts by category
    }
    else if(type===GET_ALL_BLOGS_BY_USER_ID){
        return {...store, allPostsByUserId:payload}; //payload will have all blog posts by user ID
    }

    return store;
}
