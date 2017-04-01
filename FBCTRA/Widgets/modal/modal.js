angular.module('ModalModule', [])
.controller('ModalController', ['$scope', '$aside', '$sce', 'localStore', 'messageBus',
function ($scope, $aside, $sce, localStore, messageBus) {
    'use strict';
    messageBus.subscribe($scope, 'itemSelected', function (event, selectedItem) {
        $scope.openInfoModal('top', true, selectedItem);
    });

    messageBus.subscribe($scope, 'payItemSelected', function (event, selectedItem) {
        $scope.openPaymentModal('top', false, selectedItem);
    });

    messageBus.subscribe($scope, 'openPrivacyPolicy', function (event, selectedItem) {
        $scope.openInfoModal('bottom', true, selectedItem);
    });

    $scope.asideState = { open: false };
    $scope.openInfoModal = function (position, backdrop, dataModel) {
        $scope.asideState = { open: true, position: position };
        function postClose() {
            $scope.asideState.open = false;
        }
        $aside.open({
            templateUrl: 'Widgets/modal/modal.html',
            placement: position,
            size: 'lg',
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

    $scope.openPaymentModal = function (position, backdrop, dataModel) {
        $scope.asideState = { open: true, position: position };
        function postClose() {
            $scope.asideState.open = false;
        }
        $aside.open({
            templateUrl: 'Widgets/modal/modal.html',
            placement:
            position,
            size: 'lg',
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