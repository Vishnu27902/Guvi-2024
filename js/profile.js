const username = document.getElementById("username")
const age = document.getElementById("age")
const secPhoneNumber = document.getElementById("secphnumber")

const payload = { username: "", age: "", secPhoneNumber: "", validUsername: true, validAge: true, validSecPhNum: true }

$(document).ready(function () {
    $.get("./php/profile.php",
        function (data, status) {
            // alert("Data: "+ data+"\n Status: "+status);
            // if(status=="success"){
            //     window.location.href="register.html";
            // }
            data = JSON.parse(data);
            username.value = data.name;
            document.getElementById("mailid").value = data._id;
            document.getElementById("phnumber").value = data.phnumber;
            age.value = data.age;
            secPhoneNumber.value = data.secPhNumber;
        });
    // e.preventDefault();
});

username.addEventListener("input", (e) => {
    const usernameVal = username.value
    if (/^[a-z0-9_.]+$/.test(usernameVal)) {
        document.getElementById("username-msg").classList.remove("error")
        payload.username = usernameVal
        payload.validUsername = true
    } else {
        payload.validUsername = false
        document.getElementById("username-msg").classList.add("error")
    }
})

age.addEventListener("input", (e) => {
    const ageVal = age.value
    if (ageVal) {
        if (/^[1-9]{1,3}$/.test(ageVal)) {
            document.getElementById("age-msg").classList.remove("error")
            payload.age = ageVal
            payload.validAge = true
        } else {
            payload.validAge = false
            document.getElementById("age-msg").classList.add("error")
        }
    } else {
        payload.validAge = true
    }
})

secPhoneNumber.addEventListener("input", (e) => {
    const secPhoneNumberVal = secPhoneNumber.value
    if (secPhoneNumberVal) {
        if (/^\d{10}$/.test(secPhoneNumberVal)) {
            document.getElementById("ph-num-msg").classList.remove("error")
            payload.secPhoneNumber = secPhoneNumberVal
            payload.validSecPhNum = true
        } else {
            payload.validSecPhNum = false
            document.getElementById("ph-num-msg").classList.add("error")
        }
    } else {
        payload.validSecPhNum = true
    }
})

document.getElementById("submit").addEventListener("click", (e) => {
    if (payload.validAge && payload.validSecPhNum && payload.validUsername) {
        $("#overall-context").removeClass("error");
        $.post("./php/profile.php",
            {
                age: payload.age,
                username: payload.username,
                secPhNumber: payload.secPhoneNumber
            },
            (data, status) => {
                if(data.includes("ERROR")){
                    window.location.href = "./index.html";
                }else{
                    $("#overall-context").addClass("success");
                    setTimeout(()=>{
                        window.location.href = "./index.html";
                    },3000)
                }
            })
    } else {
        $("#overall-context").addClass("error");
    }
})

if(window.onbeforeunload){
    $.get("./php/logout.php",(data,status)=> console.log(status));
}