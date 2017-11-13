var service = function () {
    var key ="eab85d16a611da0505d6feea7184e16c",
        token = "2cd190dcfd2850a178cf48e52afe4ea49d3102bd2d05b3c389359d9dee485cc1",
        boardId = "59fa17caf755d8746621c77b";
    var url = "https://api.trello.com/1/boards/59fa17caf755d8746621c77b/lists/?limit=2&fields=name&members=true&member_fields=fullName&key=" + key + "&token="+ token;


var fillTemplate = function (data) {
    var content = $("#template").html();
    var result = _.template(content)({data:data});
    $(".list").html(result);
};

var func = function (lists) {
    cards(lists);
  };

    $.ajax({
        method:"GET",
        url:url,
        success:func,
        error: function () {
            console.log("Error");
        }
    });

    var cards = function (lists,callback) {
        var allLists = [];
        var cardService = function (listParam) {
            $.ajax({
                method:"GET",
                url:"https://api.trello.com/1/lists/" + listParam.id +"/cards/?fields=name&members=true&member_fields=fullName&key=" + key + "&token="+ token,
                success:  function (result) {
                    var listDetail = function (listName,cards) {
                        this.listName = listName;
                        this.cards = cards;
                    };

                    var cardDetail = [];
                    result.forEach(function (card, p2, p3) {
                            var name = card.name.split(" ")[0];
                            var value = card.name.split(" ")[1];
                            cardDetail.push({name:name,value:value});
                    });
                        var listResult = new listDetail(listParam.name,cardDetail);
                        allLists.push(listResult);
                },
                error: function () {
                    console.log("Error");
                }
            })
        };

        lists.forEach(function (lst) {
           cardService(lst);
        });

        setTimeout(function () {
            fillTemplate(allLists);
            console.log(allLists)
        },5000)


    }

};


