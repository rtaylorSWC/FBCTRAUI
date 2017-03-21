angular.module('FBCTRAApp')
  .controller('EntitySelectorController', ['$location', '$scope', '$aside', 'localStore', 'messageBus',
    function ($location, $scope, $aside, localStore, messageBus) {
        'use strict';

        var vm = this;

        $scope.selectedEntity = null;
        var currentUserGUID = localStore.getCurrentUser();
        $scope.userEntities = localStore.getUserEntities();
        $scope.selectedEntity = localStore.getCurrentEntity();
 
        messageBus.subscribe($scope, 'entitySelected', function (event, selectedEntity) {
            $scope.selectedEntity = selectedEntity;
            $scope.getTollingAgenciesforEntity(selectedEntity);
        });

        //may move aside independent
        $scope.asideState = {
            open: false
        };

        $scope.openAside = function (position, backdrop) {
            $scope.asideState = {
                open: true,
                position: position
            };

            function postClose() {
                $scope.asideState.open = false;
            }
            $scope.ok = function (e) {
                $uibModalInstance.close();
                e.stopPropagation();
            };
            $scope.cancel = function (e) {
                $uibModalInstance.dismiss();
                e.stopPropagation();
            };

            $aside.open({
                templateUrl: 'FBCTRA/home/home.modal.html',
                placement: position,
                size: 'sm',
                //backdrop: backdrop,
                backdrop: 'static',
                keyboard: false,
                controller:
                        function ($scope, $uibModalInstance, messageBus) {
                            $scope.userEntities = localStore.getUserEntities();
                            $scope.ok = function (e, selectedEntity) {
                                $uibModalInstance.close();
                                e.stopPropagation();
                                localStore.setCurrentEntity(selectedEntity);
                                messageBus.publish('entitySelected', selectedEntity);
                            };
                            $scope.cancel = function (e) {
                                $uibModalInstance.dismiss();
                                e.stopPropagation();
                                $location.path("#/login");
                            };
                        }

            }).result.then(postClose, postClose);
        };

        $scope.changeEntity = function () {
            $scope.showEntitySelector = true;
        };

        //check if entity must be selected
        $scope.showEntitySelector = ($scope.userEntities.length > 1) ? $scope.openAside('left', true) : false;

    }
  ]);