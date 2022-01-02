const url = "http://localhost:2709/";
var username = "";
function isLogin() {
  if (sessionStorage.getItem("token")) {
    const token = sessionStorage.getItem("token");
    username = sessionStorage.getItem("username");
    //set username
    document.getElementById("username").innerText = username;

    //set listener
    document.getElementById("logout").addEventListener("click", logout);
    getAvatar();
    return true;
  } else {
    return false;
  }
}

//get profile
const getProfile = async() =>{
  try {
    const response = await axios.get(
      url + "user/profile/" + sessionStorage.getItem("slug"),
      {
        headers: {
          token: sessionStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    );
    const resMsg = response.data;
    if (resMsg.success) { 
     return resMsg.data;
    }
  } catch (error) {
    alert(error.response.data.userMsg);
  }
};

//get avatar
function getAvatar() {
  document.getElementById("avatar").src = sessionStorage.getItem("filename");
}

//log out
const logout = async() => {
  try {
    const response = await axios.post(
      url + "logout",
      {},
      {
        headers: {
          token: sessionStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    );
    const resMsg = response.data;
    if (resMsg.success) {
      window.location.href =
        window.location.origin + "/front-end/home-page/home.html";
    }
  } catch (error) {
    alert(error.response.data.userMsg);
  }
};

export { url, getAvatar, isLogin, logout, getProfile };
