angular.module('FBCApp')
  .directive('confirmation', ['$uibModal',
    function ($uibModal) {

        var ModalInstanceCtrl = function ($scope, $uibModalInstance) {
            $scope.ok = function () {
                $uibModalInstance.close();
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        };

        return {
            restrict: 'A',
            scope: {
                confirmation: "&",
                item: "="
            },
            link: function (scope, element, attrs) {
                element.bind('click', function () {
                    var message = attrs.confirmMessage || "Are you sure?";

                    var modalHtml = '<div class="modal-body">' + message + '</div>';
                    modalHtml += '<div class="modal-footer"><button class="btn btn-primary" ng-click="ok()">Save</button><button class="fr pt1 pb1" ng-click="cancel()">Cancel</button></div>';

                    var uibModalInstance = $uibModal.open({
                        template: modalHtml,
                        controller: ModalInstanceCtrl
                    });

                    uibModalInstance.result.then(function () {
                        scope.confirmation({ item: scope.item }); 
                    }, function () {
                        uibModalInstance.dismiss();
                    });

                });

            }
        }
    }
  ]);
                