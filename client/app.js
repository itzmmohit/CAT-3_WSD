(function () {
    'use strict';

    angular.module('myApp', ["ngRoute"])

        .controller('MyController', function ($scope, $http) {
            $http.get('http://localhost:3308/').then(function (response) {
                $scope.datas = response.data
            })
        })

        .controller('createController', function ($scope) {
            $scope.createEntry = function () {
                var newData = "{\"Emp_ID\":\"" + $scope.Emp_ID + "\", \"Emp_Name\":\"" + $scope.Emp_Name + "\", \"Emp_Designation\":\"" + $scope.Emp_Designation + "\", \"Emp_Department\":\"" + $scope.Emp_Department + "\", \"Emp_Salary\":\"" + $scope.Emp_Salary + "\", \"Emp_Location\":\"" + $scope.Emp_Location + "\"}";

                fetch('http://localhost:3308/new', {
                    method: "POST",
                    body: newData,
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                })
                .then(response => response.json())
                .then(json => console.log(json))
                .catch(err => console.log(err))
                $scope.Emp_ID=""
                $scope.Emp_Name=""
                $scope.Emp_Designation=""
                $scope.Emp_Department=""
                $scope.Emp_Salary=""
                $scope.Emp_Location=""
            };
        })

        .controller('updateController', function ($scope, $http) {
            $http.get('http://localhost:3308/').then(function (response) {
                $scope.datas = response.data
            })

            $scope.getId = function () {
                var selectedId = $scope.Emp_ID
                console.log(selectedId)
                $scope.Emp_Name = selectedId['Emp_Name']
                $scope.Emp_Designation = selectedId['Emp_Designation']
                $scope.Emp_Department = selectedId['Emp_Department']
                $scope.Emp_Salary = selectedId['Emp_Salary']
                $scope.Emp_Location = selectedId['Emp_Location']
            }

            $scope.updateEntry = function () {
                var newData = "{\"Emp_ID\":\"" + $scope.Emp_ID + "\", \"Emp_Name\":\"" + $scope.Emp_Name + "\", \"Emp_Designation\":\"" + $scope.Emp_Designation + "\", \"Emp_Department\":\"" + $scope.Emp_Department + "\", \"Emp_Salary\":\"" + $scope.Emp_Salary + "\", \"Emp_Location\":\"" + $scope.Emp_Location + "\"}";

                fetch('http://localhost:3308/update', {
                    method: "POST",
                    body: newData,
                    headers: {"Content-type": "application/json; charset=UTF-8"}
                })
                .then(response => response.json()) 
                .then(json => console.log(json))
                .catch(err => console.log(err))
                $scope.Emp_ID=""
                $scope.Emp_Name=""
                $scope.Emp_Designation=""
                $scope.Emp_Department=""
                $scope.Emp_Salary=""
                $scope.Emp_Location=""
            };
        })

        .controller('searchController', function ($scope, $rootScope) {
            $scope.getData = function () {
                var searchJson = { Emp_Designation: $scope.Emp_Designation }
                var jsonObj = JSON.stringify(searchJson)
                fetch('http://localhost:3308/search', {
                    method: "POST",
                    body: jsonObj,
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                })
                .then(response => response.json())
                .then(json => {
                    console.log(json)
                    $scope.datas = json
                })
                .catch(err => console.log(err))
            }
        })

        .controller('deleteController', function ($scope, $http) {
            $http.get('http://localhost:3308/').then(function (response) {
                $scope.datas = response.data
            })
            $scope.deleteEntry = function () {
                var delJson = { delID: $scope.del.Emp_ID }
                var jsonObj = JSON.stringify(delJson)

                fetch('http://localhost:3308/delete', {
                    method: "POST",
                    body: jsonObj,
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                })
                .then(response => response.json())
                .then(json => console.log(json))
                .catch(err => console.log(err))
                $scope.del = ""
            }
        })

        .config(function ($routeProvider) {
            $routeProvider
                .when("/", {
                    templateUrl: "view.html"
                })
                .when("/create", {
                    templateUrl: "create.html",
                    controller: "createController"
                })
                .when("/update", {
                    templateUrl: "update.html",
                    controller: "updateController"
                })
                .when("/search", {
                    templateUrl: "search.html",
                    controller: "searchController"
                })
                .when("/delete", {
                    templateUrl: "delete.html",
                    controller: "deleteController"
                });
        })
        .config(['$locationProvider', function ($locationProvider) {
            $locationProvider.hashPrefix('');
        }])
})();