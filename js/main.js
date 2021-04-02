
function show() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();

    setTimeout(show, 1000);
    if(minute < 10) minute = "0" + minute;
    if(second < 10) second = "0" + second;

    document.getElementById("dateinner").innerText = year+"-"+month+"-"+ date+"   \ " + hour+":"+minute+":"+ second;

   // document.getElementById("clockinner").innerText = +"   \ " + hour+":"+minute+":"+ second;
}
function getdate(xx)
{
    var day1 = new Date();
    day1.setTime(day1.getTime()- xx *24*60*60*1000);
    if (day1.getMonth() < 9 && day1.getDate() < 9)
    {
        var s1 = day1.getFullYear()+"-0" + (day1.getMonth()+1) + "-0" + day1.getDate();
        return s1;
    }
    else  if (day1.getMonth() < 9)
    {
        var s1 = day1.getFullYear()+"-0" + (day1.getMonth()+1) + "-" + day1.getDate();
        return s1;
    }
    else if(day1.getDate() < 9)
    {
        var s1 = day1.getFullYear()+"-" + (day1.getMonth()+1) + "-0" + day1.getDate();
        return s1;
    }
    else{
        var s1 = day1.getFullYear()+"-" + (day1.getMonth()+1) + "-" + day1.getDate();
        return s1;
    }
}
$.ajax({
    url:"http://localhost:8080/main",
    method: "POST",
    // dataType: "json",
    success: function (data)
    {
        console.log(data);

        document.getElementById("nc").innerText = data[0];
        document.getElementById("nd").innerText = data[1];
        document.getElementById("sc").innerText = data[2];
        document.getElementById("sd").innerText = data[3];
    }
})