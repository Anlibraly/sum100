/**
 * @author Anlibraly
 * @class  测评模板
 * time 2015-12-15

 */

var iApp = angular.module("App", []);
iApp.controller('AddStyleCtrl', function($scope){
    $scope.sum = 0;
    $scope.result = false;
    $scope.timer = null;
    $scope.times = [];
    $scope.timeOk = 0;
    $scope.totalTime = 0;
    $scope.selected = [];
    $scope.selectedTags = [];
    $scope.tags = [];
    $scope.start = false;
    $scope.$watch('sum', function() {
            if($scope.sum == 100){
                $scope.times.push(parseInt($scope.timeOk));
                $scope.totalTime += parseInt($scope.timeOk);
                $scope.timeOk = 0;
                clearAllNums();
                generate12Nums();
            }
    });
    $scope.startUp = function(){
        $scope.start = true;
        $scope.times = [];
        $scope.timeOk = 0;
        $scope.totalTime = 0;
        startTimer();
        clearAllNums();
        generate12Nums();
    };
    $scope.endUp = function(){
        stopTimer();
    };
    var startTimer = function(){
        $scope.timer=setInterval(function(){
            $scope.timeOk += 0.1;
        },100);
    };
    var stopTimer = function(){
        clearInterval($scope.timer);
        $scope.start = false;
        $scope.result = true;
    };
    var myRand = function(n){
        var m = Math.floor(Math.random()*(100-n)/2);
        return m;
    };
    var randNums = function(n){
        var ns = [];
        for (var i = 0; i < n; i++) {
            var m = Math.floor(Math.random()*99+1);
            ns.push(m);
        }
        return ns;
    };
    var generateNums100 = function(n){
        var ns = [];
        var num = 0;
        for (var i = 0; i < n-1; i++) {
            var m = myRand(num);
            ns.push(m);
            num += m;
        }
        ns.push(100-num);
        return ns;
    };
    var generate12Nums = function(){
        var N = Math.floor(Math.random()*3+3);
        var nums = generateNums100(N);
        var otherNums = randNums(12-N);
        var numbers = nums.concat(otherNums);
        //console.log(numbers);
        numbers.sort(function(a,b){ return Math.random()>.5 ? -1 : 1;});
        var tags = [];
        for (var i = 0; i<numbers.length; i++) {
            var tag = {
                    id:i+1,
                    name:numbers[i]
                };
            tags.push(tag); 
        }
        $scope.tags = tags; 
        //$scope.$apply();
    }
    
    var updateSelected = function(action,id,name){
        if(action == 'add' && $scope.selected.indexOf(id) == -1){
            $scope.selected.push(id);
            $scope.selectedTags.push(name);
            $scope.sum += parseInt(name);
        }
        if(action == 'remove' && $scope.selected.indexOf(id)!=-1){
            var idx = $scope.selected.indexOf(id);
            $scope.selected.splice(idx,1);
            $scope.selectedTags.splice(idx,1);
            $scope.sum -= parseInt(name);
        }
    }
    var clearAllNums = function(){
        $scope.sum = 0;
        $scope.selected = [];
        $scope.selectedTags = [];        
    };
    $scope.updateSelection = function($event, id){
        var checkbox = $event.target;
        var action = (checkbox.checked?'add':'remove');
        updateSelected(action,id,checkbox.name);
    }

    $scope.isSelected = function(id){
        return $scope.selected.indexOf(id)>=0;
    }
});
