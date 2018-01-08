angular.module('ModalModule', [])
.controller('ModalController', ['$scope', '$aside', '$sce', '$controller', 'localStore', 'messageBus',
function ($scope, $aside, $sce, $controller, localStore, messageBus) {
    'use strict';
    messageBus.subscribe($scope, 'itemSelected', function (event, selectedItem) {
        $scope.openModal('top', true, selectedItem);
    });

    messageBus.subscribe($scope, 'iFrameItemSelected', function (event, selectedItem) {
        $scope.openIFrameModal('top', false, selectedItem);
    });

    messageBus.subscribe($scope, 'openPrivacyPolicy', function (event, selectedItem) {
        $scope.openModal('bottom', true, selectedItem);
    });

    messageBus.subscribe($scope, 'openHelpDesk', function (event, selectedItem) {
        $scope.openModalTemplateUrl('bottom', true, selectedItem);
    });

    $scope.asideState = { open: false };
    $scope.openModal = function (position, backdrop, dataModel) {
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
                    $scope.close = function (e) {
                        $uibModalInstance.dismiss();
                    };
                    $scope.ok = function (e, selectedEntity) {
                        $uibModalInstance.close();
                        e.stopPropagation();
                    };
                }
        }).result.then(postClose, postClose);
        angular.extend({}, $scope, $aside.open.controller);
    };

    $scope.openIFrameModal = function (position, backdrop, dataModel) {
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
                    $scope.close = function (e) {
                        $scope.dataModel.data ? messageBus.publish('payItemClosed', $scope.dataModel.data) : null;
                        $uibModalInstance.dismiss();
                    };
                    $scope.ok = function (e, selectedEntity) {
                        $uibModalInstance.close();
                        e.stopPropagation();
                    };
                }
        }).result.then(postClose, postClose);
        angular.extend({}, $scope, $aside.open.controller);
    };

    $scope.openModalTemplateUrl = function (position, backdrop, dataModel) {
        $scope.asideState = { open: true, position: position };
        function postClose() {
            $scope.asideState.open = false;
        }
        $aside.open({
            templateUrl: dataModel.templateUrl,
            placement: position,
            size: 'lg',
            backdrop: backdrop,
            keyboard: false,
            controller:
                function ($scope, $uibModalInstance, messageBus) {
                    $scope.dataModel = dataModel;
                    $scope.close = function (e) {
                        localStore.setCurrentNotice(null);
                        $uibModalInstance.dismiss();
                    };
                    $scope.ok = function (e, selectedEntity) {
                        localStore.setCurrentNotice(null);
                        $uibModalInstance.close();
                        e.stopPropagation();
                    };
                }
        }).result.then(postClose, postClose);
        angular.extend({}, $scope, $aside.open.controller);
    };
}
]);