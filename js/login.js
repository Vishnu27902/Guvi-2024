// console.log("on js");
$(document).ready(function () {
    $("#submit").click(function (e) {
        $.post("./php/login.php",
            {
                email: $("#email").val(),
                password: $("#password").val()
            },
            function (data, status) {
                if (status == "success") {
                    if (data == "profile.html")
                        window.location.href = "./" + data;
                    else
                        $("#status").text(data);
                }
            });
        e.preventDefault();
    });
});