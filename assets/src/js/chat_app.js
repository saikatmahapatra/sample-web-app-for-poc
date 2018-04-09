$(function () {
    var socket = io.connect();

    //Message Form
    var $chatWindow = $('#chatWindow');
    var $messageForm = $('#messageForm');
    var $messageTxt = $('#messageTxt');
    var $conversationMessages = $('#conversationMessages');

    //User Login Form
    var $loginFormContainer = $('#loginFormContainer');
    var $loginForm = $('#loginForm');
    var $usersContainer = $("#usersContainer");
    var $onlineUsers = $('#onlineUsers');
    var $username = $('#username');

    $messageForm.submit(sendChat);

    // $messageTxt.on('keyup', function (e) {
    //     if (e.which == 13 || e.keyCode == 13) {
    //         //code to execute here
    //         console.log(e);            
    //         sendChat(e);
    //         return false;
    //     }
    //     return true;
    // });

    function sendChat(e) {
        e.preventDefault();
        //console.log('Send Clicked');
        socket.emit('send message', $messageTxt.val());
        $messageTxt.val('');
    }

    socket.on('new message', function (data) {
        var curTime = new Date();
        var displayTime = formatAMPM(curTime);
        var html = '';
        html += '<div class="row chat-msg-container sent-msg-container">';
        html += '<div class="col-10 msg-txt">';
        html += '<div class="messages sent-msg-txt">';
        html += '<p>' + data.msgTxt + '</p>';
        html += '<time datetime="">' + data.userName +' '+displayTime+ ' </time>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        $conversationMessages.append(html);
        scrollToBottom();
    });
    

    $loginForm.submit(function (e) {
        e.preventDefault();
        socket.emit('new user', $username.val(), function (data) {
            if (data) {
                $loginFormContainer.addClass('d-none');
                $usersContainer.removeClass('d-none');
                $chatWindow.removeClass('d-none');
            }
        });
        $username.val('');
    });

    socket.on('get users', function (data) {
        var html = '';
        for (i = 0; i < data.length; i++) {
            html += '<li class="list-group-item">' + data[i] + '</li>'
        }
        $onlineUsers.html(html);
    })

});

function scrollToBottom() {
    $scrollableArea = $('.messageContainer');
    $scrollableArea.scrollTop($scrollableArea[0].scrollHeight);
}
scrollToBottom();

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}