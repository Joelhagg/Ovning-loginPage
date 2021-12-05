let isAuth = false; // Sätter isAuth till false som default
let users = []; // skapar en tom array som är till för användardata
let signedInUsername = ""; // Skapar en string med namnet på användarnamnet som syns på sidan

// kör initApp och kollar om det finns någon i dbUsers, sedan mappas användarna
const initApp = (dbUsers) => {
  if (dbUsers) {
    dbUsers.map((user) => {
      // kollar om isAuth är true
      if (user.isAuth) {
        // assign sign in users name to signedInUsername
        signedInUsername = user.userName;
        // then assign isAuth to true
        isAuth = true;
      } else {
        // else if the user is not signed in then assign isAuth to false
      }
    });
  }
  // check if user is sign in and toggle between signUp/login form or signed in
  if (isAuth) {
    // här tar lägger vi till classen isAuth som lägger till display none i css
    const signUpForm = document.getElementById("signUpLogInWraper");
    signUpForm.classList.add("isAuth");

    // vi skapar en h2 och sparar den till usersName för att sedan appenda-
    // -en h2:a med värdet av användarnamnet vid inloggad
    const usersName = document.createElement("h2");
    document.getElementById("loggedIn").appendChild(usersName).innerHTML =
      signedInUsername;

    // här tar vi mainApp elementet och tar bort classen för att få den att sluta döljas
    const mainApp = document.getElementById("mainApp");
    mainApp.classList.remove("isAuth");
  } else {
    // här görs det omvändna
    const signUpForm = document.getElementById("signUpLogInWraper");
    signUpForm.classList.remove("isAuth");

    const mainApp = document.getElementById("mainApp");
    mainApp.classList.add("isAuth");
  }
};

// Körs när knappen för att regestrera nu användare klickas
const signUp = () => {
  // Hämtar användarnamn från input
  const userName = document.getElementById("signUpUserName").value;
  // Hämtar lösen från input
  const pass = document.getElementById("signUpPassword").value;

  // en användare
  let user = {
    userName: userName,
    password: pass,
    isAuth: false,
  };

  // pushar en användare till arrayn med användare
  users.push(user);

  // sparar till saveData för att köra funktionen
  saveData(users);
};

// sparar alla användare till local storage som en sträng
const saveData = (data) => {
  //gör arrayn till en sträng
  const allUsersStringify = JSON.stringify(data);
  // sparar till local storage med nyckeln users
  localStorage.setItem("users", allUsersStringify);
  // laddar om sidan
  location.reload();
};

// läser users från local storage
const readData = () => {
  // lägger alla users i readUserData
  const readUserData = localStorage.getItem("users");
  // om det finns någon i readUserData så körs den här och parsar strängen-
  // -och returnar den till readUserData
  if (readUserData) {
    return JSON.parse(readUserData);
  }
  // den här laddas in som default genom att returnas till readUserData-
  // -när det inte finns någon annan data- i local storage
  return [
    {
      userName: "janne",
      password: "test",
      isAuth: false,
    },
  ];
};

// Den här körs när man klickat på logga in knappen och hämtar data ifrån input-
// fälten som sparas i variablar
const readUserNamePasswordInput = () => {
  const inputUserName = document.getElementById("loginUserName").value;
  console.log("inputUserName:", inputUserName);

  const inputPassword = document.getElementById("loginPassword").value;
  console.log("inputPassword:", inputPassword);

  // skickar användarnamn och lösen för att checkas
  checkUserNamePassword(inputUserName, inputPassword);
};

// checkar som användarnamn och lösen finns i users
const checkUserNamePassword = (userName, password) => {
  // mappar över alla users och letar efter en match
  users.map((user) => {
    // kollar om username är samma som från input
    if (user.userName == userName) {
      // kollar om password är samma som från input
      if (user.password == password) {
        // om användarnamn och lösen stämmer så sätts isAuth till true
        isAuth = true;
        // när det stämmer och isAuth blir true så loggas man in
        user.isAuth = true;
      } else {
        // om man angett fel användarnamn eller lösen sp visas alerten-
        // och isAuth förblir false
        alert("fel användarnamn eller lösenord");
        isAuth = false;
        user.isAuth = false;
      }
    } else {
      // om användarnamnet är fel så visas alerten
      // alert("wrong username");
    }
  });

  // sparar users efter att saveData har blivit ändrad till localStorage
  saveData(users);
};

// loggar ut en användare när knappen klickas
const logoutUser = () => {
  users.map((user) => {
    // loggar ut "alla" användare
    user.isAuth = false;
  });
  // sparar users till saveData och sedan ändrar i local storage
  saveData(users);
  // laddar sedan om sidan
  location.reload();
};
// läser in users från local storage
users = readData();
// laddar in users till initApp och "börjar om från början ;)"
initApp(users);
