// BUDGET CONTROLLER

var budgetController = function (){
    
    // Exppense Constructor
    var Expense = function (id, description, value){
        this.id = id,
        this.description = description,
        this.value = value
    };
    
    // Income Constructor
    var Income =  function  (id, description, value){
        this.id = id,
        this.description = description,
        this.value = value
    };

    // Data Structure
    var data = {
        allItems : {
            exp : [],
            inc : []
        },
        totals : {
            exp : 0,
            inc : 0
        }
    };
    
    return {
        addItem : function (type, desc, val){
            
        var newItem, type, ID;
        
            // [1 2 3 6] Calculating the next ID
        if (ID > 0) {
        ID = data.allItems[type][data.allItems[type].length -1].id + 1;
        }
        else {
            ID =0;
        }
            // Create Income or Expense Object
        if (type === 'exp') {
        newItem = new Expense (ID, desc, val);    
        } else if (type === 'inc') {
        newItem = new Income (ID, desc, val);
        }
        
            // Adding new item to array
        data.allItems[type].push(newItem);
        return newItem;
        },
        
        testItem : function(){
        console.log (data)
    }
        
}
}();




// UI CONTROLLER

var UIController = function (){
  
var DOMStrings = {
    inputType : '.add__type',
    inputDescp : '.add__description',
    inputValue : '.add__value',
    inbutton : '.add__btn',
    expenseContainer : '.expenses__list',
    incomeContainer : '.income__list'
}
    
    
return {
    getInput: function(){
        return{
        inType : document.querySelector(DOMStrings.inputType).value,
        inDesc : document.querySelector(DOMStrings.inputDescp).value,
        inValue : document.querySelector(DOMStrings.inputValue).value
        }
    },
    
    addListItem: function(obj, type){
        var html, newHtml;
        
        // Create HTML string and add placeholder text
        
        if (type === 'exp'){
        html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';    
        }
        
        else if (type === 'inc'){
        html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix">       <div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';    
        }
        
        // Replace the HTMl String
        newHtml = html.replace('%id%',obj.id);
        newHtml = newHtml.replace('%description%', obj.description);
        newHtml = newHtml.replace('%value%', obj.value);
        
        
        // Insert HTML string in DOM
        if (type === 'exp'){
        document.querySelector(DOMStrings.expenseContainer).insertAdjacentHTML('beforeend', newHtml);
        }
        else if (type === 'inc'){
        document.querySelector(DOMStrings.incomeContainer).insertAdjacentHTML('beforeend', newHtml);
        }
        
    },
    
    getDOMStrings: DOMStrings,
    
    
}    
}();

// Controller of UI and Budget
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
        var input, newItem;
        // Invoke getInput function
        input = uiCntrl.getInput();
        // Invoke addItem function
        newItem = budgCntrl.addItem(input.inType, input.inDesc, input.inValue);
        // Add List of Items in UI
        addItem = uiCntrl.addListItem(newItem, input.inType);
    }
            
    return {
        init: function() {
            setEventListeners();
        }
    } 
    
}(budgetController,UIController);

controller.init();