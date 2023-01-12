import axios from "axios"

// const API = axios.create({baseURL:"https://memoirs-time.herokuapp.com/"})
const API = axios.create({baseURL:"http://localhost:8000"})

API.interceptors.request.use((req)=> {
    if(localStorage.getItem("profile")){
        req.headers.Authorization =`Bearer ${JSON.parse(localStorage.getItem("profile")).token}`
    }
    return req
})


//ilenla API
export const createProperty = (property) => API.post("/property", property)
export const getAllProperties = (page) => API.get(`/property?page=${page}`);

export const signIn = (user) => API.post(`/user/login`, user);
export const signUp = (user) => API.post(`/user/signup`, user);

export const createBooking = (booking) => API.post("/booking", booking)
export const getAllBookings = (page) => API.get(`/booking?page=${page}`);


// export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
// export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost)
// export const deletePost = (id) => API.delete(`/posts/${id}`)
// export const likePost = (id) => API.patch(`/posts/${id}/likePost`)
// export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, {value})







// export const fetchPost = (id) => API.get(`/posts/${id}`)
export const fetchAllDeals = (page) => API.get(`/property?page=${page}`)
// export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
export const createDeal = (newDeal) => API.post("/deals", newDeal)
// export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost)
export const deleteDeal = (id) => API.delete(`/deals/${id}`)
// export const likePost = (id) => API.patch(`/posts/${id}/likePost`)
// export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, {value})

// export const signIn = (formData) => API.post("/users/signin", formData)
// export const signUp = (formData) => API.post("/users/signup", formData)

export const postImages = (formData) => API.post("/admin", formData)
export const postProperty = (formData) => API.post("/property", formData)
export const deleteSelectedProperty = (ids) => API.patch(`/property/delete`,ids)


