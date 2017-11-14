var fillTemplate = function (data) {
    data.forEach(function (list) {
        var value = 0;
        list.cards.forEach(function (card) {
            value += parseInt(card.value);
        });
        list.total = value;
        if(value >= parseInt(list.categoryLimit)*(0.8) && value < parseInt(list.categoryLimit)){
            list.condition = "danger";
        }else if (value >= parseInt(list.categoryLimit)){
            list.condition = "very-danger";
        }
    });

    var content = $("#template").html();
    var result = _.template(content)({data:data});
    $(".list").html(result);
};

var listService = function (id,callback) {
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


