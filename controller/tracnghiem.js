app.controller("tnctrl", function ($scope, $http, $routeParams) {
  $scope.caccauhoi = [];
  $scope.pageSize = 1;
  $scope.start = 0;
  $scope.next = function () {
    if ($scope.start < $scope.caccauhoi.length - $scope.pageSize) {
      $scope.start += $scope.pageSize;
      $scope.currentPage++;
    }
  };

  $scope.prev = function () {
    if ($scope.start > 0) {
      $scope.start -= $scope.pageSize;
      if ($scope.currentPage <= 1) $scope.currentPage == 1;
      else $scope.currentPage--;
    }
  };

  $scope.movetohead = function () {
    $scope.start = 0;
    $scope.currentPage = 1;
  };

  $scope.movetofoot = function () {
    $scope.start = $scope.caccauhoi.length - $scope.pageSize;
    for (let i = $scope.pageSize; i <= $scope.caccauhoi.length; i++) {
      $scope.currentPage = Math.ceil($scope.caccauhoi.length / $scope.pageSize);
    }
  };

  $scope.isCountdown = false;
  $scope.countDown = 0;
  let timer;

  $scope.startTest = function (flag) {
    $scope.isCountdown = flag;
    if ($scope.isCountdown == true) {
      timer = setInterval(function () {
        $scope.countDown++;
        $scope.$apply();
        // console.log($scope.countDown);
      }, 1000);
    }
  };
  // tong so diem
  $scope.totalScore = 0;
  $scope.onTaskSelect = function (task) {
    console.log(task.selected);
    console.log(task.AnswerId);
    if (task.selected == task.AnswerId) $scope.totalScore += task.Marks;
    console.log($scope.totalScore);
  };

  $scope.isShowScore = false;
  // console.log($scope.isShowScore);

  $scope.showScore = function () {
    clearInterval(timer);
    // console.log($scope.countDown);

    let fileDes =
      "index.html#!/result/" +
      $scope.idMH +
      "/" +
      $scope.tenMH +
      "/" +
      $scope.countDown +
      "/" +
      $scope.totalScore;
    document.location = fileDes;
  };

  $scope.idMH = $routeParams.idMH;
  $scope.tenMH = $routeParams.tenMH;
  $scope.time = $routeParams.tglb;
  $scope.Score = $routeParams.totalScore;

  // $scope.totalScore=40;

  $http.get("db/Quizs/" + $scope.idMH + ".js").then(function (d) {
    $scope.caccauhoi = d.data;
    // console.log($scope.caccauhoi[1].Answers, $scope.caccauhoi[1].AnswerId);
  }),
    function (d) {
      alert("Lỗi");
    };
});
