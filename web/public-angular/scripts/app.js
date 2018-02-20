/* Author: Braden Shill

Simple page that demonstrates 3-way databinding. Open to internet browsers and
load the website in each. Then, edit the table in some way and watch the real time
update occure in the other browsers.

*/


let fikit = angular.module("fikit",["firebase","ngSanitize"]);

fikit.controller("BoardingProcessManagerController",["$scope","$firebaseArray",($scope,$firebaseArray)=>{
    // 'HouseBoat' would be defined when a user logs in.
    // The boarding list belongs to the property and not to the user.
    let ref = firebase.database().ref().child("/Properties/HouseBoat/bordingList"); //Create a link to firebase
    $scope.items = $firebaseArray(ref); //Bind firebase to Angular Scope
    //Function to add an item to Firebase
    $scope.addItem = ()=>{
        $scope.items.$add({name:$scope.new_name,description:$scope.new_description, inputType:$scope.new_input, listItems:[""]});

        //Reset Parameters for User Expirience
        $scope.new_name = "";
        $scope.new_description = "";
        $scope.new_input = "";
    }
//items.$save(items[edit_i])
    //Called when someone clicks the Edit Button in the Edit Modal
    $scope.editItem = ()=>{
        console.log($scope.items);
        $scope.items.$save($scope.items[$scope.edit_i]).then((ref)=>{
        })
    }
    //Called when someone clicks the Delete Button on the list
    $scope.delete = (id)=>{
        $scope.items.$remove(id);
    }
    //Called when the Edit Modal is opening
    $('#edit-modal').on('show.bs.modal', function (event) {
      var button = $(event.relatedTarget) // Button that triggered the modal
      //Grabst the index of the item in Firebase
      $scope.edit_i = button.data('item') // Extract info from data-* attributes
      //Update Angular to display the correct data
      $scope.$apply();

      //Im not sure what this does, but if I delete it then the modal doesnt open
      var modal = $(this)
    })
}]);

fikit.controller("UseBoardingProcessController",["$scope","$firebaseArray",($scope,$firebaseArray)=>{
    $scope.use = [];
    let ref = firebase.database().ref().child("/Properties/HouseBoat/bordingList"); //Create a link to firebase
    $scope.list = $firebaseArray(ref); //Bind firebase to Angular Scope
    //$scope.list = ["Generator","Ropes","Another thing","Clean the Deck","Something Else"];

    $scope.log = ()=>{
        console.log($scope.use);
    }

    $scope.publish = ()=>{
        const date = new Date();
        let use_ref = firebase.database().ref().child("/Properties/HouseBoat/BoardingListLogs/"+date.toString());
        let useList = $firebaseArray(use_ref)
        useList.$add($scope.use);
    }

}])
