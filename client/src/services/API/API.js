import axios from "axios";

export const getUsersData = async () => {
  let result = {};
  try {
    const res = await axios({
      method: "GET",
      url: "http://localhost:5000/apiv1/users",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    result.status = res.status;
    result.body = res.data;
  } catch (e) {
    result.status = e.response.status;
    result.body = e.response.data;
  }
  return result.body;
};

export const sendUsersData = async (sortUser) => {
  let result = {};
  try {
    let res = await axios({
      method: "PATCH",
      url: "http://localhost:5000/apiv1/users",
      data: {
        sortUser,
      },
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });

    result.status = res.status;
    result.body = res.data.message;
  } catch (e) {
    result.status = e.response.status;
    result.body = e.response.data;
  }
  return result;
};

export const sendChatsData = async (sortChats) => {
  let result = {};
  try {
    let res = await axios({
      method: "PATCH",
      url: "http://localhost:5000/apiv1/chats",
      data: {
        sortChats,
      },
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });

    result.status = res.status;
    result.body = res.data.message;
  } catch (e) {
    result.status = e.response.status;
    result.body = e.response.data;
  }
  return result;
};

export const getChatsData = async () => {
  let result = {};
  try {
    const res = await axios({
      method: "GET",
      url: "http://localhost:5000/apiv1/chats",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    result.status = res.status;
    result.body = res.data;
  } catch (e) {
    result.status = e.response.status;
    result.body = e.response.data;
  }
  return result.body;
};

export const deleteUserFromChat = async (chat_id, user_id) => {
  let result = {};
  try {
    const res = await axios({
      method: "DELETE",
      url: "http://localhost:5000/apiv1/chats",
      data: {
        chat_id,
        user_id,
      },
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    result.status = res.status;
    result.body = res.data;
  } catch (e) {
    result.status = e.response.status;
    result.body = e.response.data;
  }
  return result.body;
};

export const getSession = async (login, password) => {
  let result = {};
  try {
    const res = await axios.post("http://localhost:5000/apiv1/auth", {
      login,
      password,
    });
    result.status = res.status;
    result.body = res.data;
  } catch (e) {
    result.status = e.response.status;
    result.body = e.response.data;
  }
  return result;
};

export const responseFacebook = async (response) => {
  const profile = response.email;
  // console.log(response.email);
  const login = profile.split("@")[0] + "_facebook";
  const password = Math.random().toString(36).substring(2);
  const email = profile;
  const social = true;
  const res = await axios.post("http://localhost:5000/apiv1/auth", {
    login,
    password,
    email,
    social,
  });
  return res;
};

export const responseGoogle = async (auth2) => {
  try {
    const googleUser = await auth2.signIn();
    // console.log("googleUser: ", googleUser);
    const profile = googleUser.getBasicProfile();
    const login = profile.getEmail().split("@")[0] + "_google";
    const password = Math.random().toString(36).substring(2);
    const email = profile.getEmail();
    const social = true;
    const res = await axios.post("http://localhost:5000/apiv1/auth", {
      login,
      password,
      email,
      social,
    });
    console.log(res);
    return res;
  } catch (e) {
    return e;
  }
};

export const verifyToken = async () => {
  let result = {};
  try {
    const token = localStorage.getItem("token");
    const res = await axios({
      method: "POST",
      url: "http://localhost:5000/apiv1/verify",
      headers: { token },
    });
    result.status = res.status;
    result.body = res.data;
    return result;
  } catch (e) {
    return e;
  }
};
