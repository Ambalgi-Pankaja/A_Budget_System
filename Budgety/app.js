// BUDGET CONTROLLER

var budgetController = function (){
    

    return {
        
    }
}();




// UI CONTROLLER

var UIController = function (){
  
var DOMStrings = {
    inputType : '.add__type',
    inputDescp : '.add__description',
    inputValue : '.add__value',
    inbutton : '.add__btn'
}
    
    
return {
    getInput: function(){
        return{
        inType : document.querySelector(DOMStrings.inputType).value,
        inDesc : document.querySelector(DOMStrings.inputDescp).value,
        inValue : document.querySelector(DOMStrings.inputValue).value
        }
    },
    
    getDOMStrings: DOMStrings 
}    
}();


var controller = function (budgCntrl,uiCntrl){
    
    var setEventListeners = function(){
        var DOM = uiCntrl.getDOMStrings;
        document.querySelector(DOM.inbutton).addEventListener('click',cntrlAddItem);
        document.addEventListener('keypress',function(event){
        if (event.keyCode === 13 || event.which === 13){
            cntrlAddItem();
            }
        });   
    }
     
    var cntrlAddItem  = function(){
        var obj = uiCntrl.getInput();
        console.log (obj);
    }
    
    return {
        init: function() {
            setEventListeners();
        }
    } 
    
}(budgetController,UIController);

controller.init();