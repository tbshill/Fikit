


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
    $scope.edit = (id)=>{

    }
    $scope.delete = (id)=>{
        $scope.items.$remove(id);
    }

    $('#edit-modal').on('show.bs.modal', function (event) {
      var button = $(event.relatedTarget) // Button that triggered the modal
      var item = button.data('item') // Extract info from data-* attributes
      // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
      // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
      console.log("triggered");
      var modal = $(this)
      modal.find('#edit-title').val(item.name)
      modal.find('#edit-description').val(item.description)
      modal.find('#edit-input').val(item.inputType)
    })
}])
