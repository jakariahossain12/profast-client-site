import axios from "axios";


// create image url form imageBb 
export const imageUrl = async (e) => {
    const imgPath = e.target.files[0];
    const imageFormData = new FormData();
    imageFormData.append("image", imgPath);

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMAGEBB_API_KEY
      }`,
      imageFormData
    );

    return res?.data?.data?.url
}


// user info set in mongodb

export const setUserInfoInDb = async(email,name,photoURL) => {
   const res = await axios.post("http://localhost:3000/user", {
    email,
    name,
    photoURL,
   });
  console.log(res);
}