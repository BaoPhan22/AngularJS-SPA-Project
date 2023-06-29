// default controller
app.controller("myctrl", myfnc);
function myfnc($scope, $http) {


  $scope.cacmonhoc = [];
  $http.get("db/Subjects.js").then(function (d) {
    $scope.cacmonhoc = d.data;
  });

  $scope.dangxuat = function () {
    sessionStorage.clear();
    document.location = "index.html";
  };

  $scope.show = 10;
  $scope.showAll = function (flag) {
    if (flag == true) $scope.show = $scope.cacmonhoc.length;
    else $scope.show = 10;
  };

  let ht = sessionStorage.getItem("hoten");
  if (ht !== "") $scope.hoten = ht;

  $scope.pageSize = 4;
  $scope.start = 0;
  $scope.currentPage = 1;

  $scope.totalPage = function () {
    return Math.ceil($scope.cacmonhoc.length / $scope.pageSize);
  };

  $scope.next = function () {
    if ($scope.start < $scope.cacmonhoc.length - $scope.pageSize) {
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
    $scope.start = $scope.cacmonhoc.length - $scope.pageSize;
    for (let i = $scope.pageSize; i <= $scope.cacmonhoc.length; i++) {
      $scope.currentPage = Math.ceil($scope.cacmonhoc.length / $scope.pageSize);
    }
  };
}
