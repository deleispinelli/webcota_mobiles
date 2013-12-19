				function onDeviceReady(){
                    //Populate the databse
                    db.transaction(populateDB, errorCB, successCB);
                    //Override the back button functionality
                    document.addEventListener('backbutton', onBack, false);
                }
                 
                function onBack(){
                    //If the current page is index page then exit other wise navigate to index page
                    if($.mobile.activePage.is('#phonegap')){
                        navigator.app.exitApp();
                    }
                    else{
                        db.transaction(queryDB, errorCB);
                    }
                }               
 
                function populateDB(tx){
                    //Create the table
                    //tx.executeSql('DROP TABLE IF EXISTS MyContacts');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS MyContacts (id INTEGER PRIMARY KEY AUTOINCREMENT, \
                            name TEXT NOT NULL, nickName TEXT, mobilePhoneNumber INT, \
                            workPhoneNumber INT, emailId TEXT, website TEXT, happyBirthDay TEXT)\
                             ');
                    tx.executeSql('SELECT id, name, nickName FROM MyContacts ORDER BY name', [], querySuccess, errorCB);
                }
 
                function successCB(){
                    db.transaction(queryDB, errorCB);
                }
 
                function queryDB(tx){
                    tx.executeSql('SELECT id, name, nickName FROM MyContacts ORDER BY name', [], querySuccess, errorCB);
                }
 
                function querySuccess(tx, results){
                    $.mobile.showPageLoadingMsg(true);
                    var len = results.rows.length;
                    $("#userList").html('');
                    for (var i=0; i<len; i++){
                        var row= results.rows.item(i);
                        var htmlData = '<li id="'+row["id"]+'"><a href="#"><h2>'+row["name"]+'</h2><p class="ui-li-aside">'+row["nickName"]+'</p></a></li>';
                        $("#userList").append(htmlData).listview('refresh');
                    }
                    $.mobile.changePage($("#index"), { transition : "slide"});
                    $.mobile.hidePageLoadingMsg();
                }
 
                function errorCB(err){
 
                }