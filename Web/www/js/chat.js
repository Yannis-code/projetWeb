$("#submitmsg").click(function(e) {
    e.preventDefault();
    postChat();
    updateChat();
})

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
            $('#usermsg').val("");
        }
    });
}

function updateChat() {
    var output = "";
    $.get("htbin/chatget.py", function(response) {
        resLenght = response.length;
        for (let i = 0; i < resLenght; i++) {
            const element = response[i];
            output += `
            <div class="messages" style="background-color: ${i%2 ? "rgb(237, 237, 237);": "white;"}">
                <span class='msg_time'>
                    ${element["time"]}
                </span>
                <span class='msg_user'>
                    ${element["user"]}:
                </span> 
                <span class='msg_content'>
                    ${element["msg"]}
                </span>
            </div>
            `
        }
        chatBox = $("#chatbox");
        if (chatBox.scrollTop() + chatBox.innerHeight() + 10 >= chatBox[0].scrollHeight) {
            $("#chatbox").html(output);
            var d = $('#chatbox');
            d.scrollTop(d.prop("scrollHeight"));
        } else {
            $("#chatbox").html(output);
            var d = $('#chatbox');
        }

    })
}

updateChat();
setInterval(() => updateChat(), 1000);