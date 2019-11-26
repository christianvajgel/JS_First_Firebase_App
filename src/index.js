const email = document.getElementById("email"),
      password = document.getElementById("password"),
      buttonRegister = document.getElementById("buttonRegister"),
      buttonLogin = document.getElementById("buttonLogin"),
      buttonSend = document.getElementById("buttonSend");
      answer = document.getElementById("answer");

var db = firebase.firestore();

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
        .then(() => {
            div_login.style.display = "none";
            div_msg.style.display = "block";

            db.collection("messages").get().then(
                (result) => {
                    // console.log(result);
                    result.forEach(
                        (doc) => {
                            p_message.innerHTML += `${doc.data().message}<br>`;
                            console.log(doc.data().message);
                        }
                    )
                }
            )
            })
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
            // phoneNumber:"+5521999999999",
            photoURL:"photourl",
        })
            .then(() => {})
            .catch(
                (error) => {
                    answer.innerText = `${error.code}: ${error.message}`;
            });
        // answer.innerText = `${user.email}` + `${user.displayName}` + `${user.phoneNumber}` +`${user.photoURL}`;
    }
};

// buttonSend.onclick = () => {
//     db.collection("cities").doc("message").set(
//         {
//             country : "BR",
//             created_at : new Date(Date.now()).toUTCString(),
//             updated_at : new Date(Date.now()).toUTCString()
//         }
//     ).then(() => {
//         console.log("City logged!")
//     }).catch((error) => {
//         console.log(`${error.code}: ${error.message}`);
//     });
// };

db.collection("message").onSnapshot().then(() => {});

buttonSend.onclick = () => {
    let user = firebase.auth().currentUser;
    db.collection("messages").add(
        {
            message : message.value,
            user : user.uid,
            created_at : new Date(Date.now()).toUTCString(),
            update_at : new Date(Date.now()).toUTCString()
        }
    ).then(() => {
        console.log("Message sent!")
    }).catch((error) => {
        console.log(`${error.code}: ${error.message}`);
    })
};