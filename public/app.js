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
