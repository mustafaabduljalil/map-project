// Array that has locations data
var locations = [
    {
        name: 'National Bank of Egypt', 
        address: '26 Salah Salem, Al Attarin Sharq, Qesm Al Attarin, Alexandria Governorate, Egypt', 
        workTime: '8.30AM To 4.30PM',location: {lat: 31.2252414, lng: 29.9336453},website: 'nbe.com.eg'
    },                   

    {
        name: 'CBI', 
        address: 'Al Mansheyah Al Kubra, Qesm Al Mansheyah, Alexandria Governorate, Egypt', 
        workTime: '8.30AM To 5PM',location: {lat: 31.2252035, lng: 29.9333018},website: 'cibeg.com'
    }, 


    {
        name: 'Alexandria Bank', 
        address: '172 Omar Lotfy, Al Ibrahimeyah Bahri WA Sidi Gaber, Qesm Bab Sharqi, Alexandria Governorate, Egypt', 
        workTime: '9PM To 5PM',location: {lat: 31.2339727, lng: 29.9333016},website: 'alexbank.com'
    }, 

    {
        name: 'Banque Du Caire', 
        address: '49 ش عمر لطفى، كامب شيزار، Qesm Bab Sharqi, Alexandria Governorate, Egyp', 
        workTime: '8AM To 4PM',location: {lat: 31.2339348, lng: 29.9329581},website: 'banqueducaire.com'
    }, 

    {
        name: 'Arab African International Bank - AAIB', 
        address: '74 ش البرت الاول، سموحة، Qism Sidi Gabir, Alexandria Governorate, Egypt', 
        workTime: '11AM To 6PM',location: {lat: 31.2338968, lng: 29.9326145},website: 'aaib.com'
    }, 

    {
        name: 'Credit Agricole Bank - Smouha Branch', 
        address: 'Ezbet El-Nozha, Qism Sidi Gabir, Alexandria Governorate, Egypt', 
        workTime: '8.30AM To 4.30PM',location: {lat: 31.2102253, lng: 29.9595023},website: 'ca-egypt.com'
    },          

    {
        name: 'Blom Bank Egypt', 
        address: 'AR Riyadah, Qesm Sidi Gaber, Alexandria Governorate, Egypt', 
        workTime: '8Pm To 4PM',location: {lat: 31.2102241, lng: 29.944133},website: 'blombankegypt.com'
    },





];

//markers array to store marker
var markers = ko.observableArray(locations);

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
                var url = 'http://en.wikipedia.org/wiki/' + results[0];
                
                    infowindow.setContent('<ul class="infowindow"><li class="h4">' + marker.name + '</li><li>Address: ' + marker.address + '</li><li>website: <a href='+marker.website+''+ marker.name + '</a></li><li>WorkTime: '+ marker.workTime +'</li><a href="'+url+'" target="_blank"> wikipedia result </a></ul>');
            },
            error:function(){
                alert('Ops, there is something is wrong');
            }
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
    {
        name: 'National Bank of Egypt', 
        address: '26 Salah Salem, Al Attarin Sharq, Qesm Al Attarin, Alexandria Governorate, Egypt', 
        workTime: '8.30AM To 4.30PM',location: {lat: 31.2252414, lng: 29.9336453},website: 'nbe.com.eg'
    },                   

    {
        name: 'CBI', 
        address: 'Al Mansheyah Al Kubra, Qesm Al Mansheyah, Alexandria Governorate, Egypt', 
        workTime: '8.30AM To 5PM',location: {lat: 31.2252035, lng: 29.9333018},website: 'cibeg.com'
    }, 


    {
        name: 'Alexandria Bank', 
        address: '172 Omar Lotfy, Al Ibrahimeyah Bahri WA Sidi Gaber, Qesm Bab Sharqi, Alexandria Governorate, Egypt', 
        workTime: '9PM To 5PM',location: {lat: 31.2339727, lng: 29.9333016},website: 'alexbank.com'
    }, 

    {
        name: 'Banque Du Caire', 
        address: '49 ش عمر لطفى، كامب شيزار، Qesm Bab Sharqi, Alexandria Governorate, Egyp', 
        workTime: '8AM To 4PM',location: {lat: 31.2339348, lng: 29.9329581},website: 'banqueducaire.com'
    }, 

    {
        name: 'Arab African International Bank - AAIB', 
        address: '74 ش البرت الاول، سموحة، Qism Sidi Gabir, Alexandria Governorate, Egypt', 
        workTime: '11AM To 6PM',location: {lat: 31.2338968, lng: 29.9326145},website: 'aaib.com'
    }, 

    {
        name: 'Credit Agricole Bank - Smouha Branch', 
        address: 'Ezbet El-Nozha, Qism Sidi Gabir, Alexandria Governorate, Egypt', 
        workTime: '8.30AM To 4.30PM',location: {lat: 31.2102253, lng: 29.9595023},website: 'ca-egypt.com'
    },          

    {
        name: 'Blom Bank Egypt', 
        address: 'AR Riyadah, Qesm Sidi Gaber, Alexandria Governorate, Egypt', 
        workTime: '8Pm To 4PM',location: {lat: 31.2102241, lng: 29.944133},website: 'blombankegypt.com'
    },
]);

     self.places = ko.observableArray(locations);



self.userInput = ko.observable('');
  self.filterNames = function() {
    //convert search input to lowercase then search in array of location about identicl name
    UserInput = self.userInput().toLowerCase();
    self.places.removeAll();
    self.searchable().forEach(function(data) {
      if (data.name.toLowerCase().indexOf(UserInput) !== -1) {
        self.places.push(data);
        console.log();
    	}
    });
},
    //to display infowindo of chosen search results  
    this.info =function(name) {
        var banks = markers();
        // select the marker that has a matching title and open it
        for (var j in banks) {
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

$(window).on('load',function(){

        $('.loading-page').fadeOut(4000);
});
