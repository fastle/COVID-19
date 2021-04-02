var myChart = echarts.init(document.getElementById("chartists"), 'style');
var myChart1 = echarts.init(document.getElementById("list"), 'style');
var options = new Array();
var name2 = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","District of Columbia","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming","Puerto Rico"];
var com1 = [18203, 23489, 29034, 104970, 131744, 630230, 0, 0, 0, 0, 0,18203, 23489, 29034, 104970, 131744, 630230, 0, 0, 0, 0, 0,18203, 23489, 29034, 104970, 131744, 630230, 0, 0, 0, 0, 0,18203, 23489, 29034, 104970, 131744, 630230, 0, 0, 0, 0, 0,18203, 23489, 29034, 104970, 131744, 630230, 0, 0, 0, 0, 0,0,0];
var die1 = [18203, 23489, 29034, 104970, 131744, 630230, 0, 0, 0, 0, 0,18203, 23489, 29034, 104970, 131744, 630230, 0, 0, 0, 0, 0,18203, 23489, 29034, 104970, 131744, 630230, 0, 0, 0, 0, 0,18203, 23489, 29034, 104970, 131744, 630230, 0, 0, 0, 0, 0,18203, 23489, 29034, 104970, 131744, 630230, 0, 0, 0, 0, 0,0,0];

window.onload = function () {
    var obj_select = document.getElementById("c1");
    options[0] = {
        title: {
            text: '最近十天相对数据变化',
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['确诊数', '死亡数']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '确诊数',
                type: 'line',

                data: [0, 0, 0, 0, 0, 0, 0, 0,0,0]
            },
            {
                name: '死亡数',
                type: 'line',

                data: [0, 0, 0, 0, 0, 0, 0, 0,0,0]
            },

        ]
    };
    for(i = 1; i <= 7; i++)
    {
        options[i] = {
            series: [
                {
                    name: '确诊数',
                    type: 'line',

                    data: [0, 0, 0, 0, 0, 0, 0, 0,0,0]
                },
                {
                    name: '死亡数',
                    type: 'line',

                    data: [0, 0, 0, 0, 0, 0, 0, 0,0,0]
                },
            ]
        }
    }
   optionl1 = {
            title: {
                text: '各州数据',
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['确诊数', '死亡数']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                type: 'category',
                data: name2
            },
            series: [
                {
                    name: '确诊数',
                    type: 'bar',
                    data: com1
                },
                {
                    name: '死亡数',
                    type: 'bar',
                    data: die1
                }
            ]
    }
    myChart1.setOption(optionl1 );


    myChart.setOption(options[0]);
    obj_select.onchange = function () {
        myChart.setOption(options[this.value]);
    }
}


$.ajax({
    url: "http://localhost:8080/nearlist",
    method: "POST",
    // dataType: "json",

    success: function (data) {
        console.log(data);

        var name1 = new Array("tmd","Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut");

        for(i = 0; i <= 9; i++){
            if(i == 9)
            {
                for(j = 0; j <= 57; j++){
                    for(k = 0;k <= 51; k++)
                    {
                        if(data[i][j].Province_State == name2[k])
                        {
                            com1[k] = data[i][j].Confirmed;
                            die1[k] = data[i][j].Deaths;
                        }
                    }
                }
            }
            for(j = 0; j <= 57; j++){
                for(k = 0; k <= 7; k++)
                {
                    if(data[i][j].Province_State == name1[k])
                    {
                        options[k].series[0].data[10 - i - 1] = data[i][j].Confirmed;
                        options[k].series[1].data[10 - i - 1] = data[i][j].Deaths;
                    }
                }
            }
        }
        for(i = 9; i >= 0; i--)
        {
            for(k = 0; k <= 7; k++)
            {
                options[k].series[0].data[i] -=   options[k].series[0].data[0];
                options[k].series[1].data[i] -=   options[k].series[1].data[0];
            }
        }
        optionlist = {
            series: [
                {
                    name: '确诊数',
                    type: 'bar',
                    data: com1
                },
                {
                    name: '死亡数',
                    type: 'bar',
                    data: die1
                }
            ]
        }
        myChart1.setOption(optionlist);
    }
})
