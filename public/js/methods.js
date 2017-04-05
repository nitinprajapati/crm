"use strict";
/*$(function (){
	$('#registration').bind('click', function (){
		send_registration_data();
	});
});*/

/*var send_registration_data	=	function (){
	var f_name	=	$('#first_name').val();
	var l_name	=	$('#last_name').val();
	var email_id=	$('#email_id').val();
	var json_data	=	{"first_name" : f_name, "last_name" : l_name, "email_id" : email_id};
	var out	=	send_external_request("./../register_user", json_data);
}

var send_external_request	=	function (url, json_data){
	$.ajax({
		type: "POST",
	    url: url,   
	    data: data,
	    async: true,
	    statusCode: {
	        404: function() {
	    		alert( "page not found" );
	        }
		},
		success: function(data){
			console.log('call successfuly');
			var return_data	=	data;
		}
	});
	return return_data;
}*/