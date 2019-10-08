var key ="eab85d16a611da0505d6feea7184e16c",
    password,
    username,
    boardName;

$.fn.extend({n
    animateCss: function (animationName, callback) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
            if (callback) {
                callback();
            }
        });
        return this;
    }
});

var setPassword = function (pass) {
    password = parseInt(pass);
    password -= 5010;
    return password;
};

var getToken = function (password) {
    return "2cd190dcfd2850a178cf48e52afe4ea49d3102bd2d05b3c" + password + "59d9dee485cc1";
};

var getBoards = function (data) {
    fillBoardsTemplate(data);
    activated("#boards");
};

var getLists = function (id) {
    listService(id,function (lists) {
        cardService(lists);
    });
    activated("#main");
    alarmService();
};

var activated = function (element) {
    $(".activeSection").hide().removeClass("activeSection");
    $(element).show().addClass("activeSection").show();
};


$(document).ready(function () {
    $("#back-btn").click(function () {
        loginService(password,username);
        activated("#boards");
    })
});




