$( function() {
    var pipeline,
        gCommit,
        dataManager,
        commitStore,
        myBaseURL;

    //myBaseURL = "https://corscontroller-aerogear.rhcloud.com/aerogear-controller-demo/";
    myBaseURL = "http://localhost:8080/aerogear-controller-demo/";

    pipeline = AeroGear.Pipeline([
    {
        name: "controllerWebLink",
        settings: {
            baseURL: myBaseURL,
            endpoint: "cars",
            pageConfig: true
        }
    }]);

    gCommit = pipeline.pipes.controllerWebLink;

    dataManager = AeroGear.DataManager({
        name: "commitStore"
    });

    commitStore = dataManager.stores.commitStore;

    $( "#nextButton" ).on( "click", doNext );
    $( "#prevButton" ).on( "click", doPrevious );

    gCommit.read({
        offsetValue: 0,
        limitValue: 2,
        query: {
            color: "red"
        },
        success: onSuccess,
        error: onError
    });


    function onSuccess( result ) {
        commitStore.save( result, true );
        spitOut( result );
    }

    function onError( error ) {
        console.log( error );
    }

    function spitOut( p ) {
        $( "#stuff" ).empty();
        $( "#stuff" ).append("<ul></ul>");
        p.forEach( function( element, index, array ) {
            $( "#stuff>ul" ).append( "<li> ID: " + element.id + " Brand:" + element.brand + " Color: " +  element.color + "</li>" );
        });
    }

    function doNext() {
        commitStore.read().next({success: onSuccess, error: onError });
    }

    function doPrevious() {
        commitStore.read().previous( {success: onSuccess, error: onError } );
    }
});