	$(document).bind('mobileinit',function(){
   		$.mobile.selectmenu.prototype.options.nativeMenu = false;
	});
	$(document).on("pagecreate", function(){    
    var opts = $("#select-custom-18 option");
    $( "#select-custom-18-listbox-popup" ).on( "popupafteropen", function( event, ui ) {
        $("#select-custom-18-menu li").each(function(index){
            if ($(this).find("img").length == 0){
                var imageURL = opts.eq(index).data("image");
                var imgElem = '<img src=' + imageURL + ' width="125px" height="75px" />';
                $(this).find("a").prepend(imgElem);
            }
        });
    });
    $(document).ready(function(){
        $(".heart").click(function(){
            index = parseInt($(this).attr("attr"))
            for(i=1;i<=index;i++){
                $("#h"+i).css('background','url(img/pink.png)')
            }
            for(i=index+1;i<=5;i++){
                $("#h"+i).css('background','url(img/gray.png)')   
            }
            $("#rate").html(index)
        })
        $(".link").click(function() {
            window.location.href = $(this).attr("href")
        })
        $("#save").click(function() {
            // body...
            //create table if not exists loglog(logid INTEGER PRIMARY KEY AUTOINCREMENT,color TEXT,water TEXT, type TEXT, feeling TEXT, notes TEXT)
            color = $("#color").val()
            water = $("#water").val()
            type  = $("#select-custom-18-button .type").text()
            rate  = $("#rate").html()
            note  = $("#notes").val()
            sql   = "insert into loglog(color,water,type,feeling,notes,date) values('"+color+"','"+water+"','"+type+"','"+rate+"','"+note+"','"+ChangeDateToString()+"')"
            insertData(sql)
        })
        $("#delete").click(function(){
            window.location.href = "index.html"
        })
        function insertData(SQL){
            data = new storage()
            data.opendata()
            data.operation(SQL,function(){
                alert("successfully insert log!")
            })
        }
        //this the demo function for get data
        function queryData(SQL){
            data = new storage()
            data.opendata()
            data.query(SQL,function(result){
                for(i=0;i<result.length;i++){
                    //fetch result here result[i].color retrieve color  result[i].water retrieve water
                    //
                }
            })
        }
        //this is function is for me to debug, igonore it
        function destoryData(){
            data = new storage();
            data.opendata()
            data.destory()
        }
        //convert data to string
        function ChangeDateToString(){   
            DateIn = new Date();
            var Year=0;
            var Month=0;
            var Day=0;
            var CurrentDate="";
            Year      = DateIn.getFullYear();
            Month     = DateIn.getMonth()+1;
            Day       = DateIn.getDate();
            CurrentDate = Year + "-";
            if (Month >= 10 ){
                CurrentDate = CurrentDate + Month + "-";
            }
            else{
                CurrentDate = CurrentDate + "0" + Month + "-";
            }
            if (Day >= 10 ){
                CurrentDate = CurrentDate + Day ;
            }
            else{
                CurrentDate = CurrentDate + "0" + Day ;
            }
            return CurrentDate;
        }
    })
});