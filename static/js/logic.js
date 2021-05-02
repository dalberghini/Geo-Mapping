var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson";

d3.json(url, function(data) {
    createFeatures(data.features);
});
function colorMarker(mag) {
	if (-10 <= mag & mag <=9.99) {
		return "#7cfc00";
	} 
    else if (10 <= mag & mag <39.99) {
		return "#aec0ff";
	} 
    else if ( 40<= mag & mag <=89.99) {
		return "#db7300";
	} 
    else if (90 <= mag & mag <=399.99) {
		return "#63000c";
	}
    else if( mag <=400){
		return "#170004";
	}
}
function createFeatures(earthquakeData) {
    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.place + 
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>"
        + "<p>Magnitude: " + feature.properties.mag + "</p>" + "<p>Depth: " + feature.geometry.coordinates[2] + "</p>");
    }
    function circleRadius(mag) {
        return mag*50000;
    }
    var earthquakes = L.geoJSON(earthquakeData, { 
        pointToLayer : function (data, latlng) {
            return L.circle(latlng, {
                radius : circleRadius(data.properties.mag), 
                color : colorMarker(data.geometry.coordinates[2]),
                fillOpacity : 1
            });
        },
        onEachFeature: onEachFeature
    });
    createMap(earthquakes);
}

function createMap(earthquakes) {
    var lightMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
  });
  var satelliteMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/satellite-v9",
    accessToken: API_KEY
  });
  var outdoorsMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/outdoors-v11",
    accessToken: API_KEY
  });
  var baseMaps = {
      "Light Map" : lightMap,
      "Satellite Map" : satelliteMap,
      "Outdoors Map" : outdoorsMap
  };
  var overlayMaps = {
      "Earthquakes" : earthquakes
  };
  var myMap = L.map("mapid", {
      center: [0,0],
      zoom : 2,
      layers : [outdoorsMap, earthquakes]
  });
  L.control.layers(baseMaps,overlayMaps, {
      collapsed: false
  }).addTo(myMap);

  var legend = L.control({
      position : "bottomright"
  });
  legend.onAdd = function(map) {
      var div = L.DomUtil.create("div", "info legend"),
      legends = [-10, 10, 40, 90, 400]
      div.innerHTML +=
        '<p>Legend</p>'
      for (var i = 0; i < legends.length; i++) {
            if (legends[i] == 400) {
                div.innerHTML +=
                '<i style="background:' + colorMarker(legends[i]) + '"></i> ' +
                legends[i]+ '+'}

            else {
                div.innerHTML +=
                '<i style="background:' + colorMarker(legends[i]) + '"></i> ' +
                legends[i] + " " + (legends[i ] ? '&ndash;' + " " + (legends[i + 1]-.01) + '<br>' : '+')};
    }
    return div;
  };
  legend.addTo(myMap);
}