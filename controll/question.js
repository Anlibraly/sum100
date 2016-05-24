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
    $scope.numTo100 = [[85,57,22,48,25,12,64,41,3,16,38,79],[22,56,38,92,48,29,76,15,2,64,81,90],[56,35,24,46,79,33,4,80,57,16,88,63],[19,20,26,27,5,10,13,38,17,40,34,31]];
    $scope.numNoTo100 = [11,15,61,27,18,42,57,3,30,8,19,69];
    $scope.selected = [];
    $scope.selectedTags = [];
    $scope.tags = [];
    $scope.start = false;
    $scope.numTo100.sort(function(a,b){ return Math.random()>.5 ? -1 : 1;});
    $scope.$watch('sum', function() {
            if($scope.sum == 100){
                $scope.times.push(parseInt($scope.timeOk));
                /*$scope.totalTime += parseInt($scope.timeOk);*/
                $scope.timeOk = 0;
                clearAllNums();
                if($scope.times.length==4){
                    generate12NumsNo100();
                }else if($scope.times.length==5){
                    stopTimer();
                }else{
                    generate12Nums();
                }           
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
            $scope.totalTime += 0.1;
        },100);
    };
    var stopTimer = function(){
        clearInterval($scope.timer);
        $scope.totalTime = parseInt($scope.totalTime);
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
    var generate12NumsNo100 = function(){
        /*console.log(22);
        var ns = [];
        for (var i = 0; i < 6; i++) {
            var m = Math.floor(Math.random()*49+50);
            ns.push(m);
        }
        for (var i = 0; i < 6; ) {
            var m = Math.floor(Math.random()*25+25);
            var j = 0;
            for (; j < 6; j++) {
                if (m+ns[j] == 100) {
                    break;
                }
            }
            if (j == 6) {
                i++;
                ns.push(m);
            }
        }*/
        var ns = $scope.numNoTo100;
        ns.sort(function(a,b){ return Math.random()>.5 ? -1 : 1;});
        var tags = [];
        for (var i = 0; i<ns.length; i++) {
            var tag = {
                    id:i+1,
                    name:ns[i]
                };
            tags.push(tag); 
        }
        $scope.tags = tags;     
    };
    var generateNums100 = function(n){
        console.log(11);
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
        var n = $scope.times.length;
        /*var N = Math.floor(Math.random()*3+3);
        var nums = generateNums100(N);
        var otherNums = randNums(12-N);*/
        var numbers = $scope.numTo100[n];//nums.concat(otherNums);
        //console.log(numbers);
        //numbers.sort(function(a,b){ return Math.random()>.5 ? -1 : 1;});
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
