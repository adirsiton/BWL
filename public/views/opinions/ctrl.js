app.controller("opinionsCtrl", ['$scope', '$rootScope', 'facebookApi', '$mdDialog', function ($scope, $rootScope, facebookApi, $mdDialog) {

  $scope.newOpinionDialog = function (e) {
    $mdDialog.show({
      templateUrl: '/views/works/new-opinion/dialog.html',
      targetEvent: e,
      clickOutsideToClose: true
    })
  }

  var imagePath = $rootScope.smallUserPicPath;
  $scope.me = null;

  facebookApi.normalProfilePic().then(function (response) {
    $scope.normalSizePic = response.data.url;
  })

  /*$scope.getProfilePic = function () {
    facebookApi.normalProfilePic().then(function (response) {
      $rootScope.normalProfilePicPath = response.data.url;
      document.getElementById('profile-picture').src = response.data.url
    });
  };*/

  /*$scope.init = function () {
    facebookApi.me().then(function (response) {
      $rootScope.me = response;
    });

    $scope.getProfilePic();

    if (!$rootScope.smallUserPicPath) {
      facebookApi.userPic5656().then(function (response) {
        $rootScope.smallUserPicPath = response.data.url;
      });

    }
  }

  // If the user is not logged in yet
  if (!$rootScope.loggedIn) {
    setTimeout(function () {
      facebookApi.getLoginStatus().then(function (response) {
        if (response.status != 'connected') {
          facebookApi.logintoFB().then(function (response) {
            if (response.status == 'connected') {
              $rootScope.loggedIn = true;
              $scope.init()
            }
            else {
              swal(
                'סליחה...',
                'אירעה שגיאה בהתחברות לFacebook',
                'error'
              )
            }
          })
        }
      })

    }, 800);
  }
  else {
    $scope.init();
  }*/

  $scope.logIn = () => {

  }

  $scope.opinions = [
    {
      face: imagePath,
      what: 'רוטשילד',
      who: 'Adir Sation',
      when: '3:08PM',
      notes: "עבודה משוגעת התרשמתי לטובה ממש העובדים נחמדים רצח ואדיר בכלל חתיך"
    },
    {
      face: imagePath,
      what: 'רוטשילד',
      who: 'Adir Sation',
      when: '3:08PM',
      notes: "עבודה משוגעת התרשמתי לטובה ממש העובדים נחמדים רצח ואדיר בכלל חתיך"
    },
    {
      face: imagePath,
      what: 'רוטשילד',
      who: 'Adir Sation',
      when: '3:08PM',
      notes: "עבודה משוגעת התרשמתי לטובה ממש העובדים נחמדים רצח ואדיר בכלל חתיך"
    },
    {
      face: imagePath,
      what: 'רוטשילד',
      who: 'Adir Sation',
      when: '3:08PM',
      notes: "עבודה משוגעת התרשמתי לטובה ממש העובדים נחמדים רצח ואדיר בכלל חתיך"
    },
    {
      face: imagePath,
      what: 'רוטשילד',
      who: 'Adir Sation',
      when: '3:08PM',
      notes: "עבודה משוגעת התרשמתי לטובה ממש העובדים נחמדים רצח ואדיר בכלל חתיך"
    }
  ];
}])