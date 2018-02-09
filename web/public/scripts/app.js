/* Author: Braden Shill

Simple page that demonstrates 3-way databinding. Open to internet browsers and
load the website in each. Then, edit the table in some way and watch the real time
update occure in the other browsers.

*/


let fikit = angular.module("fikit",["firebase"]);

fikit.controller("BoardingProcessManagerController",["$scope","$firebaseArray",($scope,$firebaseArray)=>{
    var ref = firebase.database().ref().child("items");
    $scope.items = $firebaseArray(ref);
    console.log($scope.items);


    $scope.addItem = ()=>{
        console.log("Adding an item");
        console.log($scope.items);
        $scope.items.$add({name:$scope.new_name,description:$scope.new_description, inputType:$scope.new_input});
        $scope.new_name = "";
        $scope.new_description = "";
        $scope.new_input = "";
    }

    $scope.editItem = (id)=>{
        console.log($scope.edit_item);
        $scope.items.$save($scope.edit_i).then((ref)=>{

        })
    }
    $scope.delete = (id)=>{
        $scope.items.$remove(id);
    }

    $('#edit-modal').on('show.bs.modal', function (event) {
      var button = $(event.relatedTarget) // Button that triggered the modal
      $scope.edit_i = button.data('item') // Extract info from data-* attributes
      $scope.$apply();
      var modal = $(this)
    })
}])
