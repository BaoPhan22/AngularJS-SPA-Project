// account controller
app.controller("taikhoan", function ($scope, $http) {
  $scope.students = [];
  $scope.students = listsv;

  $scope.usernameExisted = [];
  $scope.emailExisted = [];
  $scope.dktc = true;

  for (let i = 0; i < $scope.students.length; i++) {
    $scope.usernameExisted.push($scope.students[i].username);
    $scope.emailExisted.push($scope.students[i].email);
  }

  $scope.dangky = function () {
    $scope.student = {
      username: $scope.tenDN,
      password: $scope.passWord,
      fullname: $scope.hoTen,
      email: $scope.email,
      gender: $scope.gioitinh,
      birthday: $scope.ngaysinh,
      schoolfee: $scope.hocphi,
      marks: $scope.diem,
    };
    if (
      !$scope.usernameExisted.includes($scope.tenDN) &&
      !$scope.emailExisted.includes($scope.email)
    ) {
      $scope.dktc = true;
      $scope.students.push($scope.student);
      document.location = 'index.html#!/dangnhap';
    } else {
      $scope.dktc = false;
    }
    console.log($scope.dktc);
  };

  $scope.dangnhap = function () {
    let u = $scope.username;
    let p = $scope.password;
    // console.log(u,p);
    let tc = false;
    let motsv;
    for (let i = 0; i < listsv.length; i++) {
      motsv = listsv[i];
      if (u == motsv.username && p == motsv.password) {
        tc = true;
        break;
      }
    }
    if (tc === true) {
      sessionStorage.setItem("username", motsv.username);
      sessionStorage.setItem("hoten", motsv.fullname);
      sessionStorage.setItem("email", motsv.email);
      document.location = "index.html";
      // alert('Đăng nhập thành công');
    } else {
      alert("Đăng nhập thất bại");
    }
  };
});
