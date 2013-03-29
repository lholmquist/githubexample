var dataManager = AeroGear.DataManager();

dataManager.add([
    {
        name: "myMemoryStore"
    },
    {
        name: "mySessionStore",
        type: "SessionLocal"
    }
]);


var myMemoryStore = dataManager.stores.myMemoryStore,
    mySessionStore = dataManager.stores[ "mySessionStore" ];
/*
for( var i=0; i<10; i++ ) {
    myMemoryStore.save( { "id": i, "name": "Yea" + i } );
    mySessionStore.save( { "id": i, "name": "Yea" + i } );
}*/

console.log("blah");
