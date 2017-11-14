var key ="eab85d16a611da0505d6feea7184e16c",
    password;

var setPassword = function (pass) {
    password = parseInt(pass);
    password -= 5010;
    return password;
};

var getToken = function (password) {
    return "2cd190dcfd2850a178cf48e52afe4ea49d3102bd2d05b3c" + password + "59d9dee485cc1";
};

var setBoardId = function (data) {
    boardId = data[0].id;
    return data[0].id;
};

var getLists = function () {
    listService(boardId,function (lists) {
        cardService(lists);
    });
    $("#login").hide();
    $("#main").show()
};


$(document).ready(function () {

});




