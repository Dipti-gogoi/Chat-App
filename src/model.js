import { observable, toJS } from "mobx";

///
/// Model
///
export const Model = observable({
  EmailAddress: "",
  Password: "",
  loading: false,
  UserName: "",
  UserId: "",
  LoginStatus: "",
  payload: {},
  Jwt: "",
  friendList: [],
  posts: [],
  postContent: "",
  receipentId: ""
});

//
// Login
//
Model.Login = async function() {
  try {
    console.log("login response");
    // Endpoint.
    const Endpoint = "http://s28.ca/rest/bowspace/login";
    // this.loading = true;
    // Convert the payload to JSON.
    const ApiRequest = JSON.stringify({
      EmailAddress: this.EmailAddress,
      Password: this.Password
    });

    // Build out the request body.  The x-amz-* headers are required by AWS.
    let FetchData = {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "omit",
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Length": ApiRequest.length
      },
      body: ApiRequest
    };

    // Start the async call.
    console.log("[model.js] Preparing to fetch/put, payload -->");
    console.log(FetchData);
    let FetchReply = await fetch(Endpoint, FetchData);
    console.log("Heard back from fetch/put --> ");
    console.log(FetchReply);

    // Extract the JSON API reply from the http response.  If the login is successful,
    // this reply will include a JWT which you need to decode.  Recall that a JWT contains
    // three parts "header.payload.signature" and each part is encoded separately in base64.
    // Use string manipulation functions to split the string at the dots, and use the atob()
    // function to convert the payload from base64 (https://www.w3schools.com/jsref/met_win_atob.asp).
    let ApiReply = await FetchReply.json();
    console.log("ApiReply --> ");
    console.log("Hi this is --> ");
    console.log(ApiReply);
    this.Jwt = ApiReply.Jwt;
    const encodedPayload = this.Jwt.split(".")[1];
    console.log("encoded payload:12345", encodedPayload);
    this.LoginStatus = FetchReply.status === 200;
    const decodedPayload = JSON.parse(window.atob(encodedPayload));
    // this.setUserData(decodedPayload);
    this.setCookie("jwt", ApiReply.Jwt);
    this.loading = false;
    // this.payload = decodedPayload;
    this.UserName = decodedPayload.sub;
    // this.setCookie("UserId", decodedPayload, ApiReply.usid);
    // console.log("console get cookie u id", this.getCookie("UserId"));
    console.log("console get cookie jwt", this.getCookie("jwt"));
    this.UserId = decodedPayload.usid;
    console.log("user id", this.UserId, this.UserName, this.LoginStatus);
    // Return true/false based on http status.
    // return FetchReply.status === 200;
  } catch (e) {
    console.log("[Model] Exception! e -->");
    console.log(e);
  }
};

///
/// Reset
///
/// This method resets the model back to a known quiescent state.  It is often handy to have a reset
/// function built-in to a model, since it relieves the view components from knowing what it means to
/// be reset -- instead, all they need to do is call this method.
///

// Model.setUserData = function(decodedPayload) {
//   this.UserName = decodedPayload.sub;
//   this.UserId = decodedPayload.usid;
// };

Model.setCookie = function(cookieName, jwt) {
  document.cookie = cookieName + "=" + jwt;
  console.log("console set cookie", document.cookie);
};

Model.Reset = function() {
  this.EmailAddress = "";
  this.Password = "";
};

Model.getCookie = function(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

///
/// SetEmailAddress
///
Model.SetEmailAddress = function(newvalue) {
  this.EmailAddress = newvalue;
};

///
/// SetPassword
///
Model.SetPassword = function(newvalue) {
  this.Password = newvalue;
};

Model.setReceipentId = function(newvalue) {
  this.receipentId = newvalue;
};

Model.setPostContent = function(newvalue) {
  this.postContent = newvalue;
};

Model.searchForPosts = async function() {
  console.log("Search for Posts");
  try {
    // Endpoint.
    const Endpoint = "http://s28.ca/rest/bowspace/posts";
    // this.loading = true;
    // Convert the payload to JSON.
    const ApiRequest = JSON.stringify({
      Jwt: this.getCookie("jwt")
    });
    this.loading = true;

    // Build out the request body.  The x-amz-* headers are required by AWS.
    let FetchData = {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "omit",
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Length": ApiRequest.length
      },
      body: ApiRequest
    };

    // Start the async call.
    console.log("[model.js] Preparing to fetch/put, payload -->");
    console.log(Endpoint);
    console.log(FetchData);
    let FetchReply = await fetch(Endpoint, FetchData);
    console.log("Heard back from fetch/put --> ");
    console.log(FetchReply);

    let ApiReply = await FetchReply.json();
    console.log("Search  for posts response", ApiReply);
    this.posts = toJS(ApiReply.MatchingPosts);
    console.log("posts", this.posts);

    this.loading = false;
  } catch (e) {
    console.log("[Model] Exception! e -->");
    console.log(e);
  }
};

Model.searchForUsers = async function() {
  console.log("Search for User");
  try {
    // Endpoint.
    this.loading = true;
    const Endpoint = "http://s28.ca/rest/bowspace/users";
    // this.loading = true;
    // Convert the payload to JSON.
    const ApiRequest = JSON.stringify({
      Jwt: this.getCookie("jwt")
    });

    // Build out the request body.  The x-amz-* headers are required by AWS.
    let FetchData = {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "omit",
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Length": ApiRequest.length
      },
      body: ApiRequest
    };

    // Start the async call.
    console.log("[model.js] Preparing to fetch/put, payload -->");
    console.log(Endpoint);
    console.log(FetchData);
    let FetchReply = await fetch(Endpoint, FetchData);
    console.log("Heard back from fetch/put --> ");
    console.log(FetchReply);

    let ApiReply = await FetchReply.json();
    console.log("ApiReply --> ");
    console.log("Hi this is --> ");
    console.log("Search for user response", ApiReply);
    this.friendList = toJS(ApiReply.MatchingUsers);
    this.loading = false;
  } catch (e) {
    console.log("[Model] Exception! e -->");
    console.log(e);
  }
};

Model.createPost = async function() {
  console.log("Search for Posts");
  try {
    // Endpoint.
    const Endpoint = "http://s28.ca/rest/bowspace/post";
    // Convert the payload to JSON.
    console.log(
      "userid, reid",
      this.UserId,
      this.receipentId,
      this.postContent
    );
    const ApiRequest = JSON.stringify({
      Jwt: this.getCookie("jwt"),
      SenderSid: this.UserId,
      RecipientSid: this.receipentId,
      PostBody: this.postContent
    });

    // Build out the request body.  The x-amz-* headers are required by AWS.
    let FetchData = {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "omit",
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Length": ApiRequest.length
      },
      body: ApiRequest
    };

    // Start the async call.
    console.log("[model.js] Preparing to fetch/put, payload -->");
    console.log(Endpoint);
    console.log(FetchData);
    let FetchReply = await fetch(Endpoint, FetchData);
    console.log("Heard back from fetch/put --> ");
    console.log(FetchReply);

    let ApiReply = await FetchReply.json();
    console.log("ApiReply --> ");
    console.log("Hi this is --> ");
    console.log("Search for response", ApiReply);

    this.loading = false;
  } catch (e) {
    console.log("[Model] Exception! e -->");
    console.log(e);
  }
};
