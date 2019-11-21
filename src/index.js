const email = document.getElementById("email"),
      password = document.getElementById("password"),
      buttonRegister = document.getElementById("buttonRegister"),
      buttonLogin = document.getElementById("buttonLogin"),
      answer = document.getElementById("answer");

buttonRegister.onclick = () => {
    firebase.auth().createUserWithEmailAndPassword(email.value,password.value)
        .catch(
            (error) => {
                answer.innerText = `${error.code}: ${error.message}`;
            }
        )
};

buttonLogin.onclick = () => {
    firebase.auth().signInWithEmailAndPassword(email.value,password.value)
        .catch(
            (error) => {
                answer.innerText = `${error.code}: ${error.message}`;
            }
        );
    // setTimeout( "location.href =" + "'" + "home.html" + "'",1000);
    let user = firebase.auth().currentUser;
    if (user){
        user.updateProfile({
            displayName:"Christian",
            phoneNumber:"+5521995465308",
            photoURL:"photourl",
        })
            .then(() => {})
            .catch(
                (error) => {
                    answer.innerText = `${error.code}: ${error.message}`;
            });
        answer.innerText = `${user.email}` + `${user.displayName}` + `${user.phoneNumber}` +`${user.photoURL}`;
    }
};