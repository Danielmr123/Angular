angular.module("calculator").controller('calc-controller', function($scope, mathService){
    var isDotSelected = false;
    var digitsAfterDot = 10;
    var isNumAfterOp = false;
    var firstNum = "";
    var secondNum = "";
    $scope.actionsCounter = -1;
    $scope.historyStr = "";
    $scope.history = [];
    $scope.numLimit = 33;
    $scope.output = 0;
    $scope.operation = "";    
    $scope.keyNumPress = function(key){
        if(key == '.'){
            isDotSelected = true;
        }
        else {       
            if(!isNumAfterOp){
                $scope.output = key;
                isNumAfterOp= true;
            }        
            else{
                if(!isDotSelected){ 
                    $scope.output =  $scope.output*10 + key; 
                }
                else{
                    var tmp = key / digitsAfterDot;
                    $scope.output += tmp;
                    digitsAfterDot *= 10;
                }                
            }
        }        
    };
    $scope.keyOperationPress = function(op){
       $scope.history.push($scope.output); // not working?!?!?!
       $scope.history.push(op); // not working?!?!?!
       $scope.historyStr += ($scope.output).toString();
       $scope.historyStr += op.toString();
        if(op == 'c'){
            $scope.reset();
        }
        else{                     
            if(!firstNum){                
                firstNum = $scope.output;
                $scope.operation =  op;
            }
            else{            
                if(!secondNum){
                    secondNum = $scope.output;                    
                    if(op == '='){
                        $scope.determineOpAndExecute($scope.operation);
                    }
                    else{
                        $scope.determineOpAndExecute(op);
                    }                    
                    $scope.operation = op;
                    firstNum = $scope.output;
                    secondNum = "";                                
                }
            }
            isNumAfterOp = false;
            isDotSelected = false;
            digitsAfterDot = 10;
        }
    };   
    $scope.determineOpAndExecute = function(op){
        switch($scope.operation) {
            case '+':                        
                $scope.output = mathService.add(firstNum, secondNum);
                break;
            case '-':                        
                $scope.output = mathService.substract(firstNum, secondNum);
                break;
            case 'x':                        
                $scope.output = mathService.multiply(firstNum, secondNum);
                break;
            case '/':                        
                $scope.output = mathService.divide(firstNum, secondNum);
                break;
            case 'neg':                        
                $scope.output = mathService.neg(secondNum);
                break;
            case 'SQRT':                        
                $scope.output = mathService.sqrt(secondNum);
                break;                                    
        }        
    }    
    $scope.reset = function(){
        $scope.output = 0;        
        firstNum = "";
        firstNum = "";
        $scope.operation = "";
        isNumAfterOp = false;
        isDotSelected = false;
        digitsAfterDot = 10;
    };
    $scope.$watch('historyStr', function(newValue, oldValue){
        $scope.actionsCounter++;
    });    
});

