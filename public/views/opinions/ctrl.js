app.controller("opinionsCtrl", ['$scope', function ($scope) {

    //if($scope.$parent.userPicPath == '') {
        //$scope.$parent.getLoginStatus();
    //}
    var imagePath = $scope.$parent.userPicPath;

    $scope.todos = [
      {
        face : imagePath,
        what: 'רוטשילד',
        who: 'Adir Sation',
        when: '3:08PM',
        notes: "עבודה משוגעת התרשמתי לטובה ממש העובדים נחמדים רצח ואדיר בכלל חתיך"
      },
      {
        face : imagePath,
        what: 'רוטשילד',
        who: 'Adir Sation',
        when: '3:08PM',
        notes: "עבודה משוגעת התרשמתי לטובה ממש העובדים נחמדים רצח ואדיר בכלל חתיך"
      },
     {
        face : imagePath,
        what: 'רוטשילד',
        who: 'Adir Sation',
        when: '3:08PM',
        notes: "עבודה משוגעת התרשמתי לטובה ממש העובדים נחמדים רצח ואדיר בכלל חתיך"
      },
      {
        face : imagePath,
        what: 'רוטשילד',
        who: 'Adir Sation',
        when: '3:08PM',
        notes: "עבודה משוגעת התרשמתי לטובה ממש העובדים נחמדים רצח ואדיר בכלל חתיך"
      },
      {
        face : imagePath,
        what: 'רוטשילד',
        who: 'Adir Sation',
        when: '3:08PM',
        notes: "עבודה משוגעת התרשמתי לטובה ממש העובדים נחמדים רצח ואדיר בכלל חתיך"
      }
    ];
}])