angular.module('ModalModule', [])
.controller('ModalController', ['$scope', '$location', '$aside', 'localStore', 'messageBus',
function ($scope, $location, $aside, localStore, messageBus) {
    'use strict';
    messageBus.subscribe($scope, 'itemSelected', function (event, selectedItem) {
        $scope.openAside('top', true, selectedItem);
    });

    $scope.asideState = { open: false };
    $scope.openAside = function (position, backdrop, dataModel) {
        $scope.asideState = { open: true, position: position };
        function postClose() {
            $scope.asideState.open = false;
        }

        $aside.open({
            templateUrl: '../Widgets/modal/modal.html',
            placement:
        position,
            size: 'sm',
            backdrop: backdrop,
            keyboard: false,
            controller:
                function ($scope, $uibModalInstance, messageBus) {

                    $scope.dataModel = dataModel;

                    $scope.close = function (e) { $uibModalInstance.dismiss(); };

                    $scope.ok = function (e, selectedEntity) {
                        $uibModalInstance.close();
                        e.stopPropagation();
                    };
                }
        }).result.then(postClose, postClose);
        angular.extend({}, $scope, $aside.open.controller);
    };

}
]);