
function plotGauge(wfreq){
    var trace = {
		domain: { x: [0, 1], y: [0, 1] },
		value: wfreq,
		title: { text: "Belly Button Washing Frequency <br> Scrubs per Week <br>"},
		type: "indicator",
		mode: "gauge+number"
	};
    var data = [trace];
    var layout={};
    Plotly.newPlot('gauge', data, layout);

};
