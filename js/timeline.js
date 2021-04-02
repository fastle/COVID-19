
var myChart = echarts.init(document.getElementById("timeline1"), 'style');
var base = +new Date(2020, 4, 16);
var oneDay = 24 * 3600 * 1000;

var data = [[base,0]];

for (var i = 1; i < 300; i++) {
    var now = new Date(base += oneDay);
    data.push([
        [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
       0
    ]);
}
console.log(data);
option = {
    tooltip: {
        trigger: 'axis',
        position: function (pt) {
            return [pt[0], '10%'];
        }
    },
    dataZoom: [
        {
            show: true,
            realtime: true,
            start: 0,
            end: 100
        },
        {
            type: 'inside',
            realtime: true,
            start: 0,
            end: 100
        }
    ],
    title: {
        left: 'center',
        text: '疫情数据变化',
    },
    legend: {
        left: 'left',
        data: ['确诊数', '死亡数'],
    },
    toolbox: {
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'time',
        boundaryGap: false
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%']
    },
    series: [
        {
            name: '确诊数',
            type: 'line',
            smooth: true,
            symbol: 'none',
            areaStyle: {},
            data: data
        },
        {

            name: '死亡数',
            type: 'line',
            smooth: true,
            symbol: 'none',
            areaStyle: {},
            data: data
        }
    ]
};

myChart.setOption(option);
$.ajax({
    url: "http://localhost:8080/all",
    method: "POST",
    // dataType: "json",
    success: function (data) {
        console.log(data);
        base = +new Date(2020, 4, 16);
        var data2 = [[base, 0]];

        var data3 = [[base, 0]];

        var length = data.length;

        for (i = length - 1; i >= 1; i--) {
            var now = new Date(base += oneDay);
            if (data[i].b == null)
            {
                data2.push([
                    [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
                     data2[length - i - 1][1]
                ]);
            }
            else
            {
                data2.push([
                    [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
                    data[i].b
                ]);
            }
            if (data[i].c == null)
            {
                data3.push([
                    [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
                    data3[length - i - 1][1]
                ]);
            }
            else
            {
                data3.push([
                    [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
                    data[i].c
                ]);
            }
        }
        console.log(data3);
        option1 = {
            series: [
                {
                    data: data2
                },
                {
                    data: data3
                }
            ]
        };

        myChart.setOption(option1);
    }
})