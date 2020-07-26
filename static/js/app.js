


init();

function init(){

    var dropdownMenu = d3.select('#selDataset');

    d3.json('./samples.json').then((importedData) => {
        
        importedData.names.forEach(name => dropdownMenu.append('option').text(name));

        // initial the first sample.
        var firstSample = importedData.samples[0].id;
        optionChanged(firstSample);

    });

};



function metaDataInfo(sampleName){

    d3.json('./samples.json').then((importedData) => {

        var metaDataPanel = d3.select('#sample-metadata');
        var metadata = importedData.metadata;
        // console.log(metadata);

        // Clear the display
        metaDataPanel.html("");

        var filterResult = metadata.filter(d => d.id == sampleName)[0];

        console.log(filterResult);

        Object.entries(filterResult).forEach(([key, value]) => {
            metaDataPanel.append('h6').text(`${key}:${value}`);
        });

        // console.log(filterResult.wfreq)
        plotGauge(filterResult.wfreq);

    });

};



function plotChart(sampleName){

    d3.json('./samples.json').then((importedData) => {

        // var barChartLocation = d3.select('#bar');
        var samples = importedData.samples;

        var filterResult = samples.filter(d => d.id == sampleName)[0];

        console.log(filterResult);

        var otu_ids = filterResult.otu_ids;
        var sample_values = filterResult.sample_values;
        var otu_labels = filterResult.otu_labels;

        console.log(otu_ids);
        console.log(sample_values);
        console.log(otu_labels);
        
        // Plotting Bar Chart --------------------------------------------------
        var trace = {
            x: sample_values.slice(0,10).reverse(),
            y: otu_ids.slice(0,10).reverse().map(d => 'OTU' + d),
            text: otu_labels.slice(0,10).reverse(),
            type:'bar',
            orientation: 'h'
        };

        var data = [trace];

        var layout ={
            title: 'Top 10 OTUs'
        };

        Plotly.newPlot('bar', data, layout);


        // Plotting Bubble Chart --------------------------------------------------
        var trace = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode:'markers',
            marker: { 
                color: otu_ids,
                size: sample_values
            }
    
        };

        var data = [trace];

        var layout ={
            xaxis: {
                title: 'OTU IDs'
            },
            yaxis: {
                title: 'Sample Values'
            }
        };

        Plotly.newPlot('bubble', data, layout);

        // Plotting Gauge Chart --------------------------------------------------


    });   

};


function optionChanged(sampleName){

    // Clear console log and output the new result
    console.clear();
    console.log(sampleName);

    metaDataInfo(sampleName);
    plotChart(sampleName);

};





