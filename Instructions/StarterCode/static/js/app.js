function buildMetadata(sample){
  d3.json("../data/samples.json").then(function(data){
       metadata = data.metadata;
       resultsArray = metadata.filter(function(data){
          return data.id == sample;
      })
          result = resultsArray[0];
          PANEL = d3.select("#sample-metadata");
      
      // Clear any existing data 
      PANEL.html("");

      Object.entries(result).forEach(function([key, value]){
          PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
      })

  })
}

function buildCharts(sample){
  d3.json("../data/samples.json").then(function(data){
          samples = data.samples;
          resultsArray = samples.filter(function(data){
          return data.id === sample;
      })
          result = resultsArray[0];

          otu_ids = result.otu_ids;
          otu_labels = result.otu_labels;
          sample_values = result.sample_values;
      
      console.log(otu_ids);
      console.log(otu_labels);
      console.log(sample_values);

      //Build bubble chart 
      bubbleLayout = {
          title: "Bacteria Cultures Per Sample",
          hovermode: "closest",
          xaxis: {title: "OTU ID"}, 
          margin: {t: 30}
      }

      bubbleData = [
          {
              x: otu_ids, 
              y: sample_values,
              text: otu_labels,
              mode: "markers",
              marker: {
                  size: sample_values,
                  color: otu_ids,
                  colorscale: "Earth"
              }
          }
      ];

      Plotly.newPlot("bubble", bubbleData, bubbleLayout)

          yticks = otu_ids.slice(0,10).map(function(otuID){
          return `OTU ${otuID}`;
      }).reverse();

          barData = [
          {
              y:yticks, 
              x: sample_values.slice(0,10).reverse(),
              text:otu_labels.slice(0,10).reverse(),
              type: "bar",
              orientation: "h"
          }
      ];

          barLayout = {
          title: "Top Bacteria Cultures Found",
          margin : {t:30, l:150}
      };

      Plotly.newPlot("bar", barData, barLayout);
  })
}

function init(){
  console.log("hello world!")
  
      selector = d3.select("#selDataset")
  console.log(selector);
  
  d3.json("../data/samples.json").then(function(data){
      console.log(data);
          sampleNames = data.names;

      sampleNames.forEach(function(name){
          selector
          .append("option")
          .text(name)
          .property("value", name)
      })
      
          firstSample = sampleNames[0];
      buildCharts(firstSample)
      buildMetadata(firstSample);
  })
}

function optionChanged(newSample){
  buildCharts(newSample);
  buildMetadata(newSample);
}


init()