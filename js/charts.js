var COLORS = ["#ffffff", "#fae0d2", "#e9a188", "#d56355","#CC0033", "#bb3937", "#772526", "#663300", "#480f10"];//图例里的颜色
USAMap();
//const Rooturl = 'localhost:8080';

function USAMap() {
    var myChart = echarts.init(document.getElementById("USAMap"), 'style');

    $.get('data/USA.json', function (usaJson) {


        echarts.registerMap('USA', usaJson, {

            Alaska: {
                left: -131,
                top: 25,
                width: 15
            },
            Hawaii: {
                left: -110,
                top: 22,
                width: 5
            },
            'Puerto Rico': {
                left: -76,
                top: 26,
                width: 2
            }
        });
    });
    var option = {
        visualMap: {
            type: 'piecewise',
            orient: 'horizontal',

            left: 'center',
            top: 'bottom',//位置

            pieces: [{
                value: 0, color: COLORS[0]
            }, {
                min: 1, max: 9, color: COLORS[1]
            }, {
                min: 10, max: 4999, color: COLORS[2]
            }, {
                min: 5000, max: 99999, color: COLORS[3]
            }, {
                min: 100000, max: 299999, color: COLORS[4]
            }, {
                min: 300000, max: 499999, color: COLORS[5]
            }, {
                min: 500000, max:699999, color: COLORS[6]
            },{
                min: 700000, max: 899999, color: COLORS[7]
            },{
                min: 900000, color: COLORS[8]
            }],
            inRange: {
                color:COLORS //取值范围的颜色
            },
            text: ['High', 'Low'],
            calculable: true,
            show:true,

        },
        // 提示框组件

        tooltip: {
            trigger: 'item',
            // 浮层显示的延迟
            showDelay: 0,
            // 提示框浮层的移动动画过渡时间
            transitionDuration: 0.2,
            // 按要求的格式显示提示框
            formatter: function (params) {

                var value = (params.value + '').split('.');

                value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');


                return params.seriesName + '<br/>' + getZHName(params.name) + ': ' + value;
            }
        },
        series: [
            {
                name: '美国',
                type: 'map',

                map: 'USA',
                // 显示标签
                emphasis: {
                    label: {
                        show: true
                    }
                },
                // 文本位置修正
                nameMap:{

                }
            }
        ]
    };
    myChart.setOption(option);
    $.ajax({
        url:"http://localhost:8080/chart1",
        method: "POST",
        // dataType: "json",
        success: function (data)
        {
            console.log(data);


            var option1 = {

                series: {
                    type: 'map',
                    data: data,
                }
            }
            myChart.setOption(option1);
        }

    })

}

function getZHName(name) {
    var nameZH = name;
    if(name=='Alabama'){
        nameZH = '亚拉巴马州';
    }else if(name=='Alaska'){
        nameZH = '阿拉斯加州';
    }else if(name=='Arizona'){
        nameZH = '亚利桑那州';
    }else if(name=='California'){
        nameZH = '加利福尼亚州';
    }else if(name=='Colorado'){
        nameZH = '科罗拉多州';
    }else if(name=='Connecticut'){
        nameZH = '康涅狄格州';
    }else if(name=='Delaware'){
        nameZH = '特拉华州';
    }else if(name=='District of Columbia'){
        nameZH = '哥伦比亚特区';
    }else if(name=='Florida'){
        nameZH = '佛罗里达州';
    }else if(name=='Georgia'){
        nameZH = '佐治亚州';
    }else if(name=='Hawaii'){
        nameZH = '夏威夷州';
    }else if(name=='Idaho'){
        nameZH = '爱达荷州';
    }else if(name=='Illinois'){
        nameZH = '伊利诺伊州';
    }else if(name=='Indiana'){
        nameZH = '印第安纳州';
    }else if(name=='Iowa'){
        nameZH = '艾奥瓦州';
    }else if(name=='Kansas'){
        nameZH = '堪萨斯州';
    }else if(name=='Kentucky'){
        nameZH = '肯塔基州';
    }else if(name=='Louisiana'){
        nameZH = '路易斯安那州';
    }else if(name=='Maine'){
        nameZH = '缅因州';
    }else if(name=='Maryland'){
        nameZH = '马里兰州';
    }else if(name=='Massachusetts'){
        nameZH = '马萨诸塞州';
    }else if(name=='Michigan'){
        nameZH = '密歇根州';
    }else if(name=='Minnesota'){
        nameZH = '明尼苏达州';
    }else if(name=='Mississippi'){
        nameZH = '密西西比州';
    }else if(name=='Missouri'){
        nameZH = '密苏里州';
    }else if(name=='Montana'){
        nameZH = '蒙大拿州';
    }else if(name=='Nebraska'){
        nameZH = '内布拉斯加州';
    }else if(name=='Nevada'){
        nameZH = '内华达州';
    }else if(name=='New Hampshire'){
        nameZH = '新罕布什尔州';
    }else if(name=='New Jersey'){
        nameZH = '新泽西州';
    }else if(name=='New Mexico'){
        nameZH = '新墨西哥州';
    }else if(name=='New York'){
        nameZH = '纽约州';
    }else if(name=='North Carolina'){
        nameZH = '北卡罗来纳州';
    }else if(name=='North Dakota'){
        nameZH = '北达科他州';
    }else if(name=='Ohio'){
        nameZH = '俄亥俄州';
    }else if(name=='Oklahoma'){
        nameZH = '奥克拉荷马州';
    }else if(name=='Oregon'){
        nameZH = '俄勒冈州';
    }else if(name=='Pennsylvania'){
        nameZH = '宾夕法尼亚州';
    }else if(name=='Rhode Island'){
        nameZH = '罗得岛州';
    }else if(name=='South Carolina'){
        nameZH = '南卡罗来纳州';
    }else if(name=='Tennessee'){
        nameZH = '田纳西州';
    }else if(name=='Texas'){
        nameZH = '得克萨斯州';
    }else if(name=='Utah'){
        nameZH = '犹他州';
    }else if(name=='Vermont'){
        nameZH = '佛蒙特州';
    }else if(name=='Virginia'){
        nameZH = '弗吉尼亚州';
    }else if(name=='Washington'){
        nameZH = '华盛顿州';
    }else if(name=='West Virginia'){
        nameZH = '西弗吉尼亚州';
    }else if(name=='Wisconsin'){
        nameZH = '威斯康星州';
    }else if(name=='Puerto Rico'){
        nameZH = '波多黎各';
    }else if(name=='Country Of Mexico'){
    }else if(name=='Arkansas'){
        nameZH = '阿肯色州';
    }else if(name=='Virgin Islands'){
        nameZH = '美属维尔京群岛';
    }else if(name=='South Dakota'){
        nameZH = '南达科他州';
    }else if(name=='Wyoming'){
        nameZH = '怀俄明州';
    }else if(name=='Guam'){
        nameZH = '关岛';
    }else if(name=='Canada'){
        nameZH = '加拿大';
    }
    nameZH += "确诊";
    return nameZH;
}

