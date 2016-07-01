$(function() {
    $('#container').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Blacks Beach Surf Report'
        },
        xAxis: {
            categories: ['5am', '11am', '5pm', '11pm']
        },
        yAxis: {
            title: {
                text: 'Surf Height ft.'
            }
        },
        series: [{
            name: 'Surf Min',
            data: [2, 3, 3, 4]
        }, {
            name: 'Surf Max',
            data: [4, 4.25, 5, 5.5]
        }]
    });
});


var chart1; // globally available
$(function() {
    chart1 = new Highcharts.StockChart({
        chart: {
            renderTo: 'container'
        },
        rangeSelector: {
            selected: 1
        },
        series: [{
            name: 'USD to EUR',
            data: usdtoeur // predefined JavaScript array
        }]
    });
});
