var MOCK_ESTATE_DOCS = {
    "estateDocs": [
        {
          "id": "111"
          "firstName":"Roger",
          "lastName": "Federer",
          "middleName": "Lefty",
          "suffix": "III",
          "socialSecurity": "555-99-0000",
          "address":"777 Tennis Pro Valley, Champion, World 90908",
          "telephone":"555-999-1234",
          "heir": "Dvorak",
          "createdAt": 1470012976609
        },
        {
            "id": "2222222",
            "firstName":"Howdy",
            "lastName": "Doody",
            "middleName": "Earl",
            "suffix": "",
            "socialSecurity": "555-99-1235",
            "address":"1 Van River Walk",
            "telephone":"555-999-0008",
            "heir": "Some clown I just met",
            "createdAt": 1470012976609
        },
        {
            "id": "333333",
            "firstName":"Bob",
            "lastName": "Dylan",
            "middleName": "Fingers",
            "suffix": "1",
            "socialSecurity": "555-99-1237",
            "address":"8 Awards and Stuff St",
            "telephone":"555-995-0008",
            "heir": "I forgot",
            "createdAt": 1470012976609
        },
        {
            "id": "4444444",
            "firstName":"Mike",
            "lastName": "Tyson",
            "middleName": "Birdy",
            "suffix": "",
            "socialSecurity": "555-10-1237",
            "address":"1 Lights Out, Las Vegas, Nevada",
            "telephone":"555-995-5678",
            "heir": "My tiger",
            "createdAt": 1470012976609
        }
    ]
};

function getEstateDocs(callbackFn) {
    setTimeout(function(){ callbackFn(MOCK_ESTATE_DOCS)}, 100);
}

// this function stays the same when we connect
// to real API later
function displayEstateDocs(data) {
    for (index in data.estateDocs) {
       $('body').append(
        '<p>' + data.estateDocs[index].text + '</p>');
    }
}

// this function can stay the same even when we
// are connecting to real API
function getAndDisplayEstateDocs() {
    getEstateDocs(displayEstateDocs);
}

$(function() {
    getAndDisplayEstateDocs();
})

$('.document-form').submit(function (event) {
    event.preventDefault();

    var form = {
      firstName:$('#fname').val(),
      lastName: $('#lname').val(),
      middleName: $('#mname').val(),
      suffix: $('#suffix').val(),
      socialSecurity: $('#socialsec').val(),
      address:$('#address').val(),
      telephone:$('#phone').val(),
      heir: $('#heir').val()
    };

    $.ajax({
            url: '/document',
            type: 'POST',
            data: form
        })
        .done(function (data) {

            $('.box').append(`<h1>` + 'THANK YOU, YOUR DOCUMENT WAS SENT');

        }).fail(function (error) {
            console.log(error);
        });
});
