debug = "";
mySQL = "";
queryResult = null;
function storage()
{
    this.db = null;
    this.databaseName = "loglog";
    //alert(this.databaseName)
    console.log(this.databaseName)
    this.version = "1.0";
    this.display_name = "loglog";
    this.size = 10000;
}
storage.prototype.destory = function(){
    this.db.transaction(function(tx){
        tx.executeSql('drop table if exists loglog');
    }
    ,errorCB,successCB);
}
storage.prototype.opendata=function(){
    this.db = window.openDatabase(this.databaseName,this.version,this.display_name,this.size);
    this.db.transaction(loadData,errorCB,successCB);
}
storage.prototype.operation = function(SQL,callback) {
    mySQL = SQL; 
    this.db.transaction(function (tx){
        tx.executeSql(mySQL);
        callback();
    },errorCB,successCB);
}
lock  = false;
storage.prototype.query = function(SQL,callback){
    mySQL = SQL;
    error = SQL;
    queryResult = new Array();
    this.db.transaction(function (tx){
        tx.executeSql(mySQL,[],function (tx,results){
        var len = results.rows.length;
        for (i=0;i<len;i++){
            queryResult.push(new loglog(results.rows.item(i).logid,results.rows.item(i).color,results.rows.item(i).water,results.rows.item(i).type,results.rows.item(i).feeling,results.rows.item(i).notes,results.rows.item(i).date));    
        };
        callback(queryResult);
        })},errorCB,successCB);
}
function loadData(tx){
    tx.executeSql("SELECT name from sqlite_master WHERE type='table'", [],checkData, errorCB);
}
function checkData(tx,result){
    tx.executeSql('create table if not exists loglog(logid INTEGER PRIMARY KEY AUTOINCREMENT,color TEXT,water TEXT, type TEXT, feeling TEXT, notes TEXT, date TEXT)')
}
function errorCB(tx,err){
    console.log("Something error in processing data"+err);
}
function successCB(){

}
function loglog(id,color,water,type,feeling,notes,date)
{
    this.logid = id
    this.color = color
    this.water = water
    this.type = type
    this.feeling = feeling
    this.notes = notes
    this.date  = date
}
