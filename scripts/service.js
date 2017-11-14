var fillTemplate = function (data) {
    data.forEach(function (list) {
        var value = 0;
        list.cards.forEach(function (card) {
            value += parseInt(card.value);
        });
        list.total = value;
        if(value >= parseInt(list.categoryLimit)*(0.8) && value < parseInt(list.categoryLimit)){
            list.condition = "little-danger";
        }else if (value >= parseInt(list.categoryLimit)){
            list.condition = "very-danger";
        }
    });

    var content = $("#template").html();
    var result = _.template(content)({data:data});
    $(".list").html(result);
};

var listService = function (id,callback) {
    var token = getToken(password);
    var url = "https://api.trello.com/1/boards/" + id + "/lists/?limit=2&fields=name&members=true&member_fields=fullName&key=" + key + "&token="+ token;
    $.ajax({
        method:"GET",
        url:url,
        success:callback,
        error: function () {
            console.log("Error");
        }
    });
};

var cardService = function (lists) {
    var newLists = [];
    var ajaxRemainder = lists.length;

    lists.forEach(function (list) {
        var cardsLocal = {
            category: list.name.split("Max:")[0],
            categoryLimit: list.name.split("Max:")[1],
            total:0,
            cards: [],
            condition:"",
        };
        var token = getToken(password);
        var url = "https://api.trello.com/1/lists/" + list.id +"/cards/?fields=name&members=true&member_fields=fullName&key=" + key + "&token="+ token;
        $.ajax({
            method:"GET",
            url:url,
            success:function (cards) {
                for(var j = 0; j<cards.length; j++) {
                    var card = cards[j];

                    var cardPush = {
                        title: card.name.split(" ")[0],
                        value: card.name.split(" ")[1]
                    };
                    cardsLocal.cards.push(cardPush);
                };
                newLists.push(cardsLocal)
                ajaxRemainder--;
                if(ajaxRemainder == 0) {
                    fillTemplate(newLists)
                }
            },
            error: function () {
                console.log("Error");
            }
        })
    }) ;
};

var loginService = function () {
    var pass = $("#passwword").val();
    var username = $("#username").val();
    var password = setPassword(pass);
    var token = getToken(password);

    $.ajax({
        method: "GET",
        contentType:"text/html",
        url: "https://api.trello.com/1/members/" + username +"/boards/?fields=name&members=true&member_fields=fullName&key=eab85d16a611da0505d6feea7184e16c&token="+token,
        success:function (data) {
            console.log()
            setBoardId(data)
            getLists(pass);
            alarmService();

        },
        error:function () {
            $(".text-danger").show();
        }
    });
};

var alarmService = function () {
    setInterval(function () {
        $("th.very-danger").animateCss("pulse");
    },2000);
    setInterval(function () {
        $("th.little-danger").animateCss("pulse");
    },4000)
}


