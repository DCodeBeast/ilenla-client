import { FETCH_ALL,COMMENT,FETCH_POST,START_LOADING,END_LOADING,FETCH_BY_SEARCH, DELETE, UPDATE, LIKE, CREATE } from "../constants/actionTypes";
import * as api from "../api";







export const createProperty = (property, navigate) => async (dispatch) => {
  const property =  {
    id: "4",
    title: "2 Plot of Land ",
    price: 1100000,
    location: "lagos,nigeria",
    address: "No 12, Market Street, Idumota bus-stop",
    files: '',
    rooms: "",
    listing: "sale",
    type: "land",
    inviteOffers: true,
    status: "buynow",
    assignedRealtor: [
      { name: "Ade", phone: "0980890090", email: "dummy@gmail.com" },
    ],
    percentageCut: 10,
    verifiedOwner: [
      { id: "1", name: "Ade", phone: "0980890090", email: "dummy@gmail.com" },
    ],
    viewerCount: [
      { id: "1", viewedDate: "2022-06-08T22:57:19.024+00:00" },
      { id: "1", viewedDate: "2022-06-08T22:57:19.024+00:00" },
      { id: "1", viewedDate: "2022-06-08T22:57:19.024+00:00" },
      { id: "1", viewedDate: "2022-06-08T22:57:19.024+00:00" },
      { id: "1", viewedDate: "2022-06-08T22:57:19.024+00:00" },
      { id: "1", viewedDate: "2022-06-08T22:57:19.024+00:00" },
      { id: "1", viewedDate: "2022-06-08T22:57:19.024+00:00" },
      { id: "1", viewedDate: "2022-06-08T22:57:19.024+00:00" },
      { id: "1", viewedDate: "2022-06-08T22:57:19.024+00:00" },
      { id: "1", viewedDate: "2022-06-08T22:57:19.024+00:00" },
    ],
    favoriteCount: [
      { id: "1", viewedDate: "2022-06-08T22:57:19.024+00:00" },
      { id: "1", viewedDate: "2022-06-08T22:57:19.024+00:00" },
      { id: "1", viewedDate: "2022-06-08T22:57:19.024+00:00" },
      { id: "1", viewedDate: "2022-06-08T22:57:19.024+00:00" },
    ],
    currency: ["NGN"],
    createdAt: "2022-06-20T22:57:19.024+00:00",
    saleEndsOn: "2022-06-25T08:57:19.024+00:00",
    ownerHistory: [
      { name: "Dtwo", phone: "0980890090", email: "dummy@gmail.com" },
    ],
    saleHistory: [
      {
        dateOfSale: "2022-06-16T08:57:19.024+00:00",
        to: { name: "Ade", phone: "0980890090", email: "dummy@gmail.com" },
        amount: "5000000",
        currency: "US$",
      },
    ],
    offerHistory: [
      {
        dateOfOffer: "2022-06-14T08:57:19.024+00:00",
        by: { name: "Ade", phone: "0980890090", email: "dummy@gmail.com" },
        amount: "5000000",
        currency: "US$",
      },
    ],
  }
  try {
    const { data } = await api.createProperty(property);
  
    console.log(data)
    return
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};


export const getAllProperties = (page)=> async(dispatch) => {

  try {
      dispatch({type:START_LOADING})

      const {data} = await api.getAllProperties(page)

      console.log('propertyData',data)
      dispatch({type:FETCH_ALL, payload:data})

      dispatch({type:END_LOADING})

      
  } catch (error) {
      
  }

}













// export const getPost = (id) => async (dispatch) => {
//   try {
//     //   console.log(page)
//     dispatch({type:START_LOADING})
//     const { data } = await api.fetchPost(id);
//     console.log(data)
//     dispatch({ type: FETCH_POST, payload: data });
//     dispatch({type:END_LOADING})

//   } catch (error) {
//     console.log(error);
//   }
// };
// export const getPosts = (page) => async (dispatch) => {
//   try {
//     //   console.log(page)
//     dispatch({type:START_LOADING})
//     const { data } = await api.fetchPosts(page);
//     console.log(data)
//     dispatch({ type: FETCH_ALL, payload: data });
//     dispatch({type:END_LOADING})

//   } catch (error) {
//     console.log(error);
//   }
// };
// export const getPostsBySearch = (searchQuery) => async (dispatch) => {

//     try {
//     dispatch({type:START_LOADING})

//     const { data :{data} } = await api.fetchPostsBySearch(searchQuery);
//     // console.log(data)
//     dispatch({ type: FETCH_BY_SEARCH, payload: data });
//     dispatch({type:END_LOADING})

//   } catch (error) {
//     console.log(error);
//   }
// };




// export const updatePost = (id, post) => async (dispatch) => {
//   try {
//     const { data } = await api.updatePost(id, post);

//     dispatch({ type: UPDATE, payload: data });
//   } catch (error) {}
// };
// export const deletePost = (id, navigate) => async (dispatch) => {
//   try {
//     await api.deletePost(id);
//     navigate("/")
//     dispatch({ type: DELETE, payload: id });
//   } catch (error) {
//     console.log(error);
//   }
// };
// export const likePost = (id, navigate) => async (dispatch) => {
//   try {
//     const { data } = await api.likePost(id);

//     dispatch({ type: LIKE, payload: data });
//     // navigate("/")

//   } catch (error) {}
// };
// export const commentPost = (value, id) => async (dispatch) => {
//   try {
//     const { data } = await api.comment(value,id);

//     dispatch({ type: COMMENT, payload: data });
    
//     return data.comments

//   } catch (error) {}
// };
