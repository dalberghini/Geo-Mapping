# Geo-Mapping

Leaflet utilized to plot earthquake data from https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson, the United States government's website dedicated to tracking earthquakes around the world. 

Data was uploaded using D3 and the above url to get a geoJson format. The earthquakes were plotted on leaflet using the L.geoJson function. A pop-up was binded to each marker, which was a circle. The pop-up is clickable and shows of additional information that is given via Leaflet's visual format. 

The data format is as such, the radius of the circle is related to the reported magniutde of the earthquake. The larger the radius the higher the magnitude earthquake. The color of the circle relates to the depth of the epicenter. The legend provides this information as as well. 

A control layer was put in as well as a legend.
