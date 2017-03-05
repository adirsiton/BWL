app.controller("opinionsCtrl", ['$scope', '$rootScope', 'facebookApi', '$mdDialog', function ($scope, $rootScope, facebookApi, $mdDialog) {

  $scope.newOpinionDialog = function (e) {
    $mdDialog.show({
      templateUrl: '/views/opinions/new-opinion/dialog.html',
      targetEvent: e,
      clickOutsideToClose: true,
      parent: angular.element(document.body),
      controller: "newOpinionCtrl",
      onComplete: function(scope, elem) {
        scope.$root = $rootScope;
      }
    })
  }

  $scope.opinions = [
    {
      what: 'רוטשילד',
      who: 'Adir Sation',
      when: '3:08PM',
      notes: "עבודה משוגעת התרשמתי לטובה ממש העובדים נחמדים רצח ואדיר בכלל חתיך"
    },
    {
      what: 'רוטשילד',
      who: 'Adir Sation',
      when: '3:08PM',
      notes: "עבודה משוגעת התרשמתי לטובה ממש העובדים נחמדים רצח ואדיר בכלל חתיך"
    },
    {
      what: 'רוטשילד',
      who: 'Adir Sation',
      when: '3:08PM',
      notes: "עבודה משוגעת התרשמתי לטובה ממש העובדים נחמדים רצח ואדיר בכלל חתיך"
    },
    {
      what: 'רוטשילד',
      who: 'Adir Sation',
      when: '3:08PM',
      notes: "עבודה משוגעת התרשמתי לטובה ממש העובדים נחמדים רצח ואדיר בכלל חתיך"
    },
    {
      what: 'רוטשילד',
      who: 'Adir Sation',
      when: '3:08PM',
      notes: "עבודה משוגעת התרשמתי לטובה ממש העובדים נחמדים רצח ואדיר בכלל חתיך"
    }
  ];
}])