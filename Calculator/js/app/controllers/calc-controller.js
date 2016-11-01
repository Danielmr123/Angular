angular.module("calculator").controller('calc-controller', function($scope){
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
                $scope.output = $scope.add(firstNum, secondNum);
                break;
            case '-':                        
                $scope.output = $scope.substract(firstNum, secondNum);
                break;
            case 'x':                        
                $scope.output = $scope.multiply(firstNum, secondNum);
                break;
            case '/':                        
                $scope.output = $scope.divide(firstNum, secondNum);
                break;
            case 'neg':                        
                $scope.output = $scope.neg(secondNum);
                break;
            case 'SQRT':                        
                $scope.output = $scope.sqrt(secondNum);
                break;                                    
        }        
    }
    $scope.add = function(num1, num2){        
        return num1 + num2;
    };
    $scope.substract = function(num1, num2){        
        return num1 - num2;
    };
    $scope.multiply = function(num1, num2){        
        return num1 * num2;
    };
    $scope.divide = function(num1, num2){        
        if(num2 != 0){
            return num1 / num2;
        }        
        return 0;
    };
    $scope.neg = function(num){
        return num * -1;
    };
    $scope.sqrt = function(num){
        return Math.sqrt(num);
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

