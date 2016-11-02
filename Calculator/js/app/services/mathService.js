angular.module("calculator", []).service('mathService', function(){
   
   this.add = function(num1, num2){        
        return num1 + num2;
    };
    this.substract = function(num1, num2){        
        return num1 - num2;
    };
    this.multiply = function(num1, num2){        
        return num1 * num2;
    };
    this.divide = function(num1, num2){        
        if(num2 != 0){
            return num1 / num2;
        }        
        return 0;
    };
    this.neg = function(num){
        return num * -1;
    };
    this.sqrt = function(num){
        return Math.sqrt(num);
    };
});