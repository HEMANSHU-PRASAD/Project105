var y = Math.floor(Math.random() * 10 + 1);
var guess = 1;
var x = document.getElementById("guessField").value;

function submit() {
    if (x == y) {
        alert("CONGRATULATION!!!!!!!!!!" + playername + "YOU GUSSED IT RIGHT IN" + guess + "GUESS");
        guess = 1;
    } else if (x > y) {
        guess++;
        alert("OOPS SORRY!!!!! TRY A SMALLER NUMBER");
    } else {
        guess++;
        alert("OOPS SORRY!!!!! TRY A GREATER NUMBER");
    }
}

function playAgain() {
    y = Math.floor(Math.random() * 10 + 1);
}

function send() {
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name: user_name,
        message: msg,
        like: 0
    });

    document.getElementById("msg").value = "";
}

function getData() {
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();

            firebase_message_id = childKey;
            message_data = childData;
            console.log(firebase_message_id);
            console.log(message_data);
            name = message_data['name'];
            massage = massage_data['massage'];
            like = massage_data['like'];
            name_with_tag = "<h4> " + name + "<img class='user_tick' src='tick.png'></h4>";
            massage_with_tag = "<h4 class='massage_h4'> " + massage + "< /h4>";
            like_button = "<button class='btn btn-warning' id=" + firebase_message_id + "value=" + like + " onclick='updateLike(this.id)'>";
            span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>like: " + like + "</span></button><hr>";

            row = name_with_tag + massage_with_tag + like_button + span_with_tag;
            document.getElementById("output").innerHTML += row;

        });
    });
}
getData();

function updateLike(message_id) {
    confirm.log("clicked on like button - " + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    update_Likes = Number(likes) + 1;
    console.log(update_Likes);

    firebase.database().ref(room_name).child(message_id).update({
        likes: update_Likes
    })
}

function logout(name) {
    console.log(name);
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = ("index.html");
}