window.onload = function () {
    
}

function find_epsilon() {
    var dps = []; // dataPoints
    var chart = new CanvasJS.Chart("chartContainer", {
        title :{
            text: "Machine Epsilon (Drag to zoom in)"
        },
	    zoomEnabled: true,
        axisY: {
            title: "Epsilon Value",
            minimum: 0,
            includeZero: false
            //setting a maximum messes with the zoom
        },      
        axisX: {
            title: "Count",
            minimum: 0,
            includeZero: false
        },
        data: [{
            type: "line",
            dataPoints: dps
        }],
        toolTip: {
            contentFormatter: function ( e ) {
                return "Epsilon: " +  e.entries[0].dataPoint.y;
            }
        }
    });
    
    //var dataLength = 8; // number of dataPoints visible at any point
    
    var updateChart = function (count, eps) {
        dps.push({
            x: count,
            y: eps
        });
    
        /*if (dps.length > dataLength) {
            dps.shift();
        }*/
    
        chart.render();
    };


    //disable button
    $("#start")[0].disabled = true;

    count = $("#count");
    epsilon = $("#epsilon");
    x = $("#x");

    cnt = 0;
    eps = 1;
    comp = 1 + eps;

    updateChart(cnt, eps);
    eps_loop(cnt, eps, comp, updateChart)
}

function eps_loop(cnt, eps, comp, uc) {
    eps = eps / 2;
    comp = 1 + eps;
    cnt = cnt + 1;

    count.text(cnt);
    epsilon.text(eps);
    x.text(comp);
    uc(cnt, eps);

    if (comp > 1){
        //time in ms (1000ms = 1 second)
        setTimeout(function() {eps_loop(cnt, eps, comp, uc)}, 200);
    }
    else{
        //re-enable button
        $("#start")[0].disabled = false;
    }
}