var locations = [
    {name: 'National Bank of Egypt',address: '26 Salah Salem, Al Attarin Sharq, Qesm Al Attarin, Alexandria Governorate, Egypt', workTime: '8.30AM To 4.30PM',location: {lat: 31.2252414, lng: 29.9336453},website: 'nbe.com.eg'},                   
    {name: 'CIB Bank',address: 'San Stifano, Qesm AR Ramel, Alexandria Governorate, Egypt', workTime: '8.30AM To 5PM',location: {lat: 31.2456544, lng: 29.9636007},website: 'cibeg.com'},
    {name: 'Bank of Alexandria',address: 'Fleming, Qesm AR Ramel, Alexandria Governorate, Egypt', workTime: '9PM To 5PM',location: {lat: 31.2445894, lng: 29.9618572},website: 'alexbank.com'}, 
    {name: 'Banque du Caire',address: 'Al Amrawi Qism El-Montaza Alexandria Governorate Egypt', workTime: '8AM To 4PM',location: {lat: 31.2820751, lng: 30.0191353},website: 'banqueducaire.com'}, 
    {name: 'Arab International Bank',address: '606 طريق الحرية، جليم، Qism El-Raml, Alexandria Governorate, Egypt',workTime: '11AM To 6PM',location: {lat: 31.246131, lng: 29.9592393},website: 'aaib.com'}, 
    {name: 'Crédit Agricole',address: 'Ezbet El-Nozha, Qism Sidi Gabir, Alexandria Governorate, Egypt',workTime: '8.30AM To 4.30PM',location: {lat: 31.2102253, lng: 29.9595023},website: 'ca-egypt.com'},          
    {name: 'Blom',address: 'AR Riyadah, Qesm Sidi Gaber, Alexandria Governorate, Egypt', workTime: '8Pm To 4PM',location: {lat: 31.2102241, lng: 29.944133},website: 'blombankegypt.com'}
    ];

//markers array to store marker
	var locationsArray = locations;
var markers = ko.observableArray([]);

//initalization of google map
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 31.205753,lng: 29.924526},
        zoom: 13,
        mapTypeControl: false
    });
    //loop to create marker for each location
    var j=0;
    while(j < locations.length){
        var position = locations[j].location;
        var website = locations[j].website;
        var address = locations[j].address;
        var name = locations[j].name;
        var workTime = locations[j].workTime;
        insertMarker(j,position,name,website,address,workTime);
        j++;
    }

    //push each marker of location in arrayin marker
    function insertMarker(id,position,name,website,address,workTime) {
        var marker = new google.maps.Marker({
            map: map,
            position: position,
            name:name,
            website:website,
            address:address,
            workTime:workTime,
            id: id
        });
        markers.push(marker);
        //click event to display info window of each marker of each location 
        marker.addListener('click', function () {
            populateInfoWindow(this, largeInfowindow);
        });
    }

    var largeInfowindow = new google.maps.InfoWindow();
}

function mapError() {
    alert('Ops, sorry there is something is wrong');
}

function populateInfoWindow(marker, infowindow) {
        
        //using wikipedia api to search for each location    
        var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + marker.name + '&format=json&callback=wikiCallback';        
        var url;

        $.ajax({
            url: wikiUrl,
            dataType: "jsonp",
            success: function(response) {
                var results = response[1];
                // var bankName = results[0].replace(" ","_");
                var url = 'http://en.wikipedia.org/wiki/' + results[0];
                
                    infowindow.setContent('<ul class="infowindow"><li class="h4">' + marker.name + '</li><li>Address: ' + marker.address + '</li><li>website: '+ marker.website + '</li><li>WorkTime: '+ marker.workTime +'</li><a href="'+url+'" target="_blank"> wikipedia result </a></ul>');
            }
        }) .fail(function() {
    // handle error here
            alert('Ops, there is something is wrong');

  		});
        //open info window of marker
        infowindow.open(map, marker);  
        marker.setAnimation(google.maps.Animation.DROP);

        //call close window method to close infowindow of marker       
        closeWindow(infowindow);
}


function closeWindow(infowindow) {
    infowindow.addListener('click', function () {
        infowindow.setMarker(null);
    });
}
//////////////////////AppViewModel///////////////////////
$(document).ready(function(){
    function AppViewModel() {
    var self = this;

     self.searchable= ko.observableArray([
    {name: 'National Bank of Egypt',address: '26 Salah Salem, Al Attarin Sharq, Qesm Al Attarin, Alexandria Governorate, Egypt', workTime: '8.30AM To 4.30PM',location: {lat: 31.2252414, lng: 29.9336453},website: 'nbe.com.eg'},                   
    {name: 'CIB Bank',address: 'San Stifano, Qesm AR Ramel, Alexandria Governorate, Egypt', workTime: '8.30AM To 5PM',location: {lat: 31.2456544, lng: 29.9636007},website: 'cibeg.com'},
    {name: 'Bank of Alexandria',address: 'Fleming, Qesm AR Ramel, Alexandria Governorate, Egypt', workTime: '9PM To 5PM',location: {lat: 31.2445894, lng: 29.9618572},website: 'alexbank.com'}, 
    {name: 'Banque du Caire',address: 'Al Amrawi Qism El-Montaza Alexandria Governorate Egypt', workTime: '8AM To 4PM',location: {lat: 31.2820751, lng: 30.0191353},website: 'banqueducaire.com'}, 
    {name: 'Arab International Bank',address: '606 طريق الحرية، جليم، Qism El-Raml, Alexandria Governorate, Egypt',workTime: '11AM To 6PM',location: {lat: 31.246131, lng: 29.9592393},website: 'aaib.com'}, 
    {name: 'Crédit Agricole',address: 'Ezbet El-Nozha, Qism Sidi Gabir, Alexandria Governorate, Egypt',workTime: '8.30AM To 4.30PM',location: {lat: 31.2102253, lng: 29.9595023},website: 'ca-egypt.com'},          
    {name: 'Blom',address: 'AR Riyadah, Qesm Sidi Gaber, Alexandria Governorate, Egypt', workTime: '8Pm To 4PM',location: {lat: 31.2102241, lng: 29.944133},website: 'blombankegypt.com'}
    ,
]);

     self.places = ko.observableArray(locations);



self.userInput = ko.observable('');

  self.filterNames = function() {
    //convert search input to lowercase then search in array of location about identicl name
    UserInput = self.userInput().toLowerCase();
    self.places.removeAll();
    self.searchable().forEach(function(data) {
      if (data.name.toLowerCase().indexOf(UserInput) !== -1) {
          var banks = markers();
            for (var j = 0;j<banks.length;j++) {
                banks[j].setVisible(false);

            }

            for (var i = 0; i < banks.length; i++) {
                if (!banks[i].name.toLowerCase().includes(UserInput.toLowerCase())) {
                    banks[i].setVisible(false);
                } else {
                    banks[i].setVisible(true);
                }
            }
           	if(UserInput.length===0){
                for (var k = 0;k<banks.length;k++) {
                    banks[k].setVisible(true);
                }
            }
            self.places.push(data);

      }

    });
},
    //to display infowindo of chosen search results  
    this.info =function(name) {
        var banks = markers();
        // select the marker that has a matching title and open it
        for (var j = 0; j<banks.length;j++) {
            if(banks[j].name === name) {
                google.maps.event.trigger(markers()[j], 'click');
            }
        }
    };
}

ko.applyBindings(new AppViewModel());


});



/* Set the width of the side navigation to 3000px */
function openNav() {
    document.getElementById("mySidenav").style.width = "300px";
    document.getElementById("list").style.display = "none";
    document.getElementById("mySidenav").style.padding = "10px 17px"; 
}
/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("list").style.display = "inline";
    document.getElementById("mySidenav").style.padding = "0"; 

}

// $(window).on('load',function(){

//         $('.loading-page').fadeOut(4000);
// });
