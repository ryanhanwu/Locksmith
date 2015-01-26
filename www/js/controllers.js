angular.module('locksmith.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
      Chats.remove(chat);
    };
  })
  .controller('NearByCtrl', function($scope, $compile, LockSmith) {
      var myLatlng = new google.maps.LatLng(25.0480009, 121.5327376);
      var mapOptions = {
        center: myLatlng,
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map = new google.maps.Map(document.getElementById("map"), mapOptions);
      var markerImage = new google.maps.MarkerImage('//maps.gstatic.com/mapfiles/mobile/mobileimgs2.png',
        new google.maps.Size(22, 22),
        new google.maps.Point(0, 18),
        new google.maps.Point(11, 11));
      navigator.geolocation.getCurrentPosition(function(pos) {
        map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        var myLocation = new google.maps.Marker({
          position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
          map: map,
          clickable: false,
          icon: markerImage,
          shadow: null,
          zIndex: 999
        });
      },function (err) {
        alert(err);
      },{
        maximumAge: 3000,
        timeout: 5000,
        enableHighAccuracy: true
      });
      $scope.map = map;
      LockSmith.query(function(data) {
        $scope.locksmiths = data.results;
        for (var i = data.results.length; i--;) {
          var locksmith = data.results[i],
            latLng = new google.maps.LatLng(locksmith.location.latitude, locksmith.location.longitude),
            marker = new google.maps.Marker({
              position: latLng,
              map: map,
              title: locksmith.Name
            });
          var contentString = "<div><a ng-click='clickTest()'>" + locksmith.Name + "</a></div>";
          var compiled = $compile(contentString)($scope);
          var infowindow = new google.maps.InfoWindow({
            content: compiled[0]
          });
          google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
          });
        }
      });
  })
  .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
