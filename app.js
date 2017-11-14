var key ="eab85d16a611da0505d6feea7184e16c",
    token = "2cd190dcfd2850a178cf48e52afe4ea49d3102bd2d05b3c389359d9dee485cc1",
    boardId = "59fa17caf755d8746621c77b";

$(document).ready(function () {

    listService(boardId,function (lists) {
        cardService(lists);
    });
    });




