


var cardService2 = function (list) {
    var newList = [];

    var url = "https://api.trello.com/1/lists/" + list.id +"/cards/?fields=name&members=true&member_fields=fullName&key=" + key + "&makeToken="+ makeToken;
    for(var i = 0; i<list.length; i++){
        $.ajax({
            method:"GET",
            url:url,
            success:function (cards) {
                var cardsLocal = {
                    category: list.name,
                    cards: []
                };
                cards.forEach(function (card) {
                    var card = {
                        title: card.name.split(" ")[0],
                        value: card.name.split(" ")[1]
                    };

                    cardsLocal.cards.push(card);
                });
                newLists.push(cardsLocal);
            },
            error: function () {
                console.log("Error");
            }
        })
    }

    return newList;
};