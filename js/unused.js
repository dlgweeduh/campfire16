	// Twitter Feed //
	$('.tweet').twittie({
		dateFormat: '%B %d, %Y',
		template: '<div class="date">{{date}}</div> {{tweet}}',
		count: 3, // define the number of tweets to be displayed, if it's one, read the lines below
		hideReplies: true
	});
	// if you want to display only one tweet, please remove the following lines:
	// if so, don't forget you need to change style.css line 1036 display property to display: block;
	setInterval(function () {
		var item = $('.tweet ul').find('li:first');
		item.animate({
			'opacity': '0'
		}, 1000, function () {
			$(this).detach().appendTo('.tweet ul').removeAttr('style');
		});
	}, 12000);

	
	// Contact Form //
	$('#contactform').validationEngine();
    
    // send the form by ajax when sumbitted
    $('#contactform').submit(function(e){
        e.preventDefault();
        var submitUrl = $(this).attr('action');
        $.ajax({
            url: submitUrl,
            type: 'POST',
            data: $(this).serialize(),
            dataType: "json",
            beforeSend: function () {
                $('#submit').attr('disabled', 'disabled');
                $('#ErrorMsgs').fadeOut('slow').html('<div class="alert alert-info">Checking...<a href="#" class="close">&times;</a></div>').fadeIn('slow');
            },
            success: function(data) {
                if(data.status === 'success'){
                    $('#contactform')[0].reset();
                }
                $('#ErrorMsgs').html(data.message).fadeIn('slow');
                $('#submit').removeAttr('disabled');
            }
        });
        return false;
    });