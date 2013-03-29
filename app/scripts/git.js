$( function() {
    var pipeline,
        gCommit,
        dataManager,
        commitStore;

    pipeline = AeroGear.Pipeline([{
        name: "githubcommits",
        settings: {
            baseURL: "https://api.github.com/orgs/aerogear/",
            endpoint: "repos",
            pageConfig: {
                previousIdentifier: "prev",
                nextIdentifier: "next"
            }
        }
    }]);

    gCommit = pipeline.pipes.githubcommits;

    dataManager = AeroGear.DataManager({
        name: "commitStore",
        type: "SessionLocal",
        settings: {
            storageType: "localStorage"
        }
    });

    commitStore = dataManager.stores.commitStore;

    $( "#nextButton" ).on( "click", doNext );
    $( "#prevButton" ).on( "click", doPrevious );
    gCommit.read({
        query: {
            per_page: 10
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
            $( "#stuff>ul" ).append( "<li>Repo Name:" + element.name + "</li>" );
        });
    }

    function doNext() {
        commitStore.read().next({success: onSuccess, error: onError });
    }

    function doPrevious() {
        commitStore.read().previous( {success: onSuccess, error: onError } );
    }
});