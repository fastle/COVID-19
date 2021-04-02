const express = require('express');
const app = express();
const mysql = require('mysql');
const connection = mysql.createConnection({
    connectionLimit: 30,
    host:'localhost',
    user:'root',
    password:'fffffff',
    database:'fffffff'
})
const timit = 1587139200;

function gettim()
{
    return Math.round(((new Date() / 1000 - timit) / 86400)) ;
}

var cors = require('cors')//引入跨域模块
app.use(cors());//使用跨域模块

connection.connect(function(){
    console.log('链接成功')
});
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

function getdate(xx)
{
    var day1 = new Date();
    day1.setTime(day1.getTime()- (xx) *24*60*60*1000);
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
function getdate1(xx)
{
    var day1 = new Date();
    day1.setTime(day1.getTime()-  xx *24*60*60*1000);
    if (day1.getMonth() < 9 && day1.getDate() < 9)
    {
        var s1 = day1.getFullYear()+"/" + (day1.getMonth()+1) + "/" + day1.getDate();
        return s1;
    }
    else  if (day1.getMonth() < 9)
    {
        var s1 = day1.getFullYear()+"/" + (day1.getMonth()+1) + "/" + day1.getDate();
        return s1;
    }
    else if(day1.getDate() < 9)
    {
        var s1 = day1.getFullYear()+"/" + (day1.getMonth()+1) + "/" + day1.getDate();
        return s1;
    }
    else{
        var s1 = day1.getFullYear()+"/" + (day1.getMonth()+1) + "/" + day1.getDate();
        return s1;
    }
}

app.post('/chart1', function (req,res,next){
   // console.log('The solution is: ');
    var x = getdate(1);
    var sql = 'select  Province_State as \'name\',Confirmed as \'value\' from' + ' tot ' + 'where Last_Update like \'%' + x + '%\'';
   console.log(sql);
    connection.query(sql,function(error, results, fields){
        console.log(results);
        res.send(results);
    })
})

app.post('/nearlist', function (req,res,next){
   // console.log('The solution is: ');
    var data = new Array();
    var c = 0;
    for(i = 1; i <= 10; i++)
    {
        connection.query('select * from' + ' tot ' + 'where Last_Update like \'%' + getdate(i)+ '%\'',function(error, result1, fields) {
   //         console.log(result1);
              data[c] = result1;
          //  console.log(c);
              c++;
              if(c == 10)
              {
              //    console.log(data);
                  res.send(data);
              }
        })
    }
})


app.post('/main', function (req,res,next){

    connection.query('select * from' + ' tot ' + 'where Last_Update like \'%' + getdate(1)+ '%\'',function(error, result1, fields){

        connection.query('select * from' + ' tot ' + 'where Last_Update like \'%' + getdate(2)+ '%\'',function(error1, result2, fields1){
       //     console.log(result2);
            var length1 = result1.length;
            var length2 = result2.length;
            var datarpl = new Array();
            datarpl[0] = 0;
            datarpl[1] = 0;
            datarpl[2] = 0;
            datarpl[3] = 0;

            for(i = 0; i < length1; i++)
            {
                for(j = 0; j <length2; j++)
                {
                    if(result1[i].Province_State == result2[j].Province_State)
                    {
                        datarpl[0] += result1[i].Confirmed - result2[j].Confirmed;
                        datarpl[1] += result1[i].Deaths - result2[j].Deaths;
                        datarpl[2] += result1[i].Confirmed;
                        datarpl[3] += result1[i].Deaths;
                        break;
                    }
                }
            }
            res.send(datarpl);
        })
    })
})

app.post('/all', function (req,res,next){
    var data = new Array();
    const T = gettim();
    var time = new Date();
    console.log(T);
    var cnt = 0, cnt1 = 0;
    for(i = 1; i <= T; i++)
    {
        connection.query('select sum(Confirmed) as tot1 from' + ' tot ' + 'where Last_Update like \'%' + getdate(i)+ '%\'',function(error1, result1){
            cnt1++;
            if(error1)
            {
                console.log("zz");
            }
            else
            {
                connection.query('select sum(Deaths) as tot1 from' + ' tot ' + 'where Last_Update like \'%' + getdate(cnt1)+ '%\'',function(error2, result2){

                    cnt++;
                    data[cnt] = {"a":getdate1(cnt), "b": result1[0].tot1 ,"c": result2[0].tot1};
                    if(cnt == T)
                    {
                        console.log(data);
                        res.send(data);
                    }

                })
            }

        })
    }

})

app.listen(8080,"localhost",function(){
    console.log(8080);
})
