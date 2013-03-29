$( function() {
    navigator.webkitGetUserMedia( {video: true, audio: true}, successCallback, errorCallback );

    function successCallback( stream ) {
    	var videoElement = $( "#yea" )[0];
        videoElement.src = window.URL.createObjectURL( stream );
    };

    function errorCallback( error ) {
        console.log( error );
    };
});