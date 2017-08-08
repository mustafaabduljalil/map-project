// Array that has locations data
var locations = [
    {
        name: 'Balbaa Restaurant', 
        address: '2 Mohammed Abd Al Salam No 1, Sidi Beshr Qebli, Qism El-Montaza, Alexandria Governorate, Egypt', 
        workTime: '9AM To 4AM',location: {lat: 31.2551539, lng: 29.9878924},phone: '+203 5497555'
    },                   

    {
        name: 'Asmak Shaaban', 
        address: 'Al Mansheyah Al Kubra, Qesm Al Mansheyah, Alexandria Governorate, Egypt', 
        workTime: '10AM To 1AM',location: {lat: 31.1989356, lng: 29.8865508},phone: '+20 114 401 9921'
    }, 


    {
        name: 'kadoura Restaurant', 
        address: '47  26 July street، Almanshya، Qism El-Mansheya, Alexandria Governorate, Egypt', 
        workTime: '12PM To 12:15AM',location: {lat: 31.2013308, lng: 29.888077},phone: '+203 4800967'
    }, 

    {
        name: 'Houda Gondel Restaurant', 
        address: 'Al Mansheyah Al Kubra, Qesm Al Mansheyah, Alexandria Governorate, Egypt', 
        workTime: '10AM To 12AM',location: {lat: 31.2034557, lng: 29.906636},phone: '+20 122 283 4511'
    }, 

    {
        name: 'Asmak Farag', 
        address: 'Souq at Tork, Qesm Al Mansheyah, Alexandria Governorate, Egypt', 
        workTime: '11AM To 6AM',location: {lat: 31.200097, lng: 29.888},phone: '+203 4811047'
    }, 

    {
        name: 'Samakmak Al-bahr Restaurant', 
        address: '60 Sidi Yakout, As Sayalah Gharb, Qesm Al Gomrok, Alexandria Governorate, Egypt', 
        workTime: '10AM To 2AM',location: {lat: 31.2075602, lng: 29.8780888},phone: '+203 4809523'
    },          

    {
        name: 'Elaa Restaurant', 
        address: '3 Kasr Al Tin, Ras at Tin, Qesm Al Gomrok, Alexandria Governorate, Egypt', 
        workTime: '12Pm To 1AM',location: {lat: 31.210168, lng: 29.8769975},phone: '+20 127 444 6887'
    },





];

//markers array to store marker
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
        var phone = locations[j].phone;
        var address = locations[j].address;
        var name = locations[j].name;
        var workTime = locations[j].workTime;
        insertMarker(j,position,name,phone,address,workTime);
        j++;
    }

    //push each marker of location in arrayin marker
    function insertMarker(id,position,name,phone,address,workTime) {
        var marker = new google.maps.Marker({
            map: map,
            position: position,
            name:name,
            phone:phone,
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
                
                    infowindow.setContent('<ul class="infowindow"><li class="h4">' + marker.name + '</li><li>Address: ' + marker.address + '</li><li>Phone: '+ marker.phone + '</li><li>WorkTime: '+ marker.workTime +'</li><a href="'+url+'" target="_blank"> wikipedia result </a></ul>');
            },
            error:function(){
                alert('Ops, there is something is wrong');
            }
        });
        //open info window of marker
        infowindow.open(map, marker);  
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
        name: 'Balbaa Restaurant', 
        address: '2 Mohammed Abd Al Salam No 1, Sidi Beshr Qebli, Qism El-Montaza, Alexandria Governorate, Egypt', 
        workTime: '9AM To 4AM',location: {lat: 31.2551539, lng: 29.9878924},phone: '+203 5497555'
    },                   

    {
        name: 'Asmak Shaaban', 
        address: 'Al Mansheyah Al Kubra, Qesm Al Mansheyah, Alexandria Governorate, Egypt', 
        workTime: '10AM To 1AM',location: {lat: 31.1989356, lng: 29.8865508},phone: '+20 114 401 9921'
    }, 


    {
        name: 'kadoura Restaurant', 
        address: '47  26 July street، Almanshya، Qism El-Mansheya, Alexandria Governorate, Egypt', 
        workTime: '12PM To 12:15AM',location: {lat: 31.2013308, lng: 29.888077},phone: '+203 4800967'
    }, 

    {
        name: 'Houda Gondel Restaurant', 
        address: 'Al Mansheyah Al Kubra, Qesm Al Mansheyah, Alexandria Governorate, Egypt', 
        workTime: '10AM To 12AM',location: {lat: 31.2034557, lng: 29.906636},phone: '+20 122 283 4511'
    }, 

    {
        name: 'Asmak Farag', 
        address: 'Souq at Tork, Qesm Al Mansheyah, Alexandria Governorate, Egypt', 
        workTime: '11AM To 6AM',location: {lat: 31.200097, lng: 29.888},phone: '+203 4811047'
    }, 

    {
        name: 'Samakmak Al-bahr Restaurant', 
        address: '60 Sidi Yakout, As Sayalah Gharb, Qesm Al Gomrok, Alexandria Governorate, Egypt', 
        workTime: '10AM To 2AM',location: {lat: 31.2075602, lng: 29.8780888},phone: '+203 4809523'
    },          

    {
        name: 'Elaa Restaurant', 
        address: '3 Kasr Al Tin, Ras at Tin, Qesm Al Gomrok, Alexandria Governorate, Egypt', 
        workTime: '12Pm To 1AM',location: {lat: 31.210168, lng: 29.8769975},phone: '+20 127 444 6887'
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
      }
    })
},
    //to display infowindo of chosen search results  
    this.info =function(name) {
        var restaurants = markers();
        // select the marker that has a matching title and open it
        for (var j in restaurants) {
            if(restaurants[j].name === name) {
                google.maps.event.trigger(markers()[j], 'click');
            }
        }
    }
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