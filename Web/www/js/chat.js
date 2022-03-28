$("#submitmsg").click(function(e) {
    e.preventDefault();
    postChat();
    updateChat();
})

setInterval(() => updateChat(), 1000);

function postChat() {
    var msgForm = document.getElementById("chat_form");
    var fd = new FormData(msgForm);
    $.ajax({
        url: 'htbin/chatsend.py',
        data: fd,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function(response) {

        }
    });
}

function updateChat() {
    var output = "";
    $.get("htbin/chatget.py", function(response) {
        console.log(response);
        response.forEach(element => {
            output += "<p>" + element["time"] + " " + element["user"] + " : " + element["msg"] + "</p>";
        });
        $("#chatbox").html(output);
    })
}