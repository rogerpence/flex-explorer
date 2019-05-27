const flexRow = document.getElementById('flex-row');
let counter = 0;

camelize = function camelize(str) {
    return str.replace(/\W+(.)/g, function(match, chr)
     {
          return chr.toUpperCase();
      });
  }

const actions = {
    addFlexChild : function() {
        const text = document.getElementById('child-class-names').value;
        let content = document.getElementById('child-content').value;
        const flexGrow = document.getElementById('select-flex-grow').value;
        
        const classNames = 'flex-child ' + ' ' + flexGrow + ' '+ text;
    
        if (content == '') {
            content = `id${counter}`;
        }

        const elem = `<div id="id${counter}" class="${classNames}">${content}</div>`;
        counter++;
        flexRow.insertAdjacentHTML('beforeend', elem);
    },

    removeAllFlexChildren : function() {
        flexRow.innerHTML = '';
        counter = 0;
    },

    removeLastFlexChild: function() { 
        if (flexRow.children.length === 0) {
            return;
        }      
        const kids = flexRow.children;
        console.log(kids);
        const lastChild = document.getElementById(kids[kids.length - 1].id)
        flexRow.removeChild(lastChild);
    },

    selectFlexDirection: function(flexDirection) {
        flexRow.classList.remove('flex-row', 'flex-row-reverse', 'flex-col', 'flex-col-reverse'); 
        flexRow.classList.add(flexDirection);        
    },

    selectFlexType: function(flexType) {
        flexRow.classList.remove('flex', 'inline-flex'); 
        flexRow.classList.add(flexType);        
    },

    selectJustifyContent: function(justifyContent) {
        flexRow.classList.remove('justify-start', 'justify-center', 'justify-end', 'justify-between', 'justify-around'); 
        flexRow.classList.add(justifyContent);        
    },

    selectAlignItems: function(alignItems) {
        flexRow.classList.remove('items-stretch', 'items-start', 'items-center', 'items-end', 'items-baseline'); 
        flexRow.classList.add(alignItems);        
    },

    selectAlignContent: function(alignContent) {
        flexRow.classList.remove('content-start', 'content-center', 'content-end', 'content-between', 'content-around'); 
        flexRow.classList.add(alignContent);        
    },

    selectFlexWrap: function(flexWrap) {
        flexRow.classList.remove('flex-no-wrap', 'flex-wrap', 'flex-wrap-reverse'); 
        flexRow.classList.add(flexWrap);        
    }

}

const actionButtons = Array.from(document.querySelectorAll('.action-button'));

actionButtons.forEach(button => {
    button.addEventListener('click', (args) => {
        const methodName = camelize(button.id);
        actions[methodName]();
    });
    
})

const actionSelects = Array.from(document.querySelectorAll('.action-select'));

actionSelects.forEach(elem => {
    elem.addEventListener('change', (e) => {
        const methodName = camelize(elem.id);
        console.log(e.target.value);
        actions[methodName](e.target.value);
    });
    
})

document.getElementById('select-flex-type').value = 'flex';
actions.selectFlexType('flex');

document.getElementById('select-flex-direction').value = 'flex-row';
actions.selectFlexDirection('flex-row');

document.getElementById('select-justify-content').value = 'justify-start';
actions.selectJustifyContent('justify-start');

document.getElementById('select-align-items').value = 'items-stretch';
actions.selectAlignItems('items-stretch');

document.getElementById('select-align-content').value = 'content-start';
actions.selectAlignContent('content-start');

document.getElementById('select-flex-wrap').value = 'flex-no-wrap';
actions.selectFlexWrap('flex-no-wrap');

document.getElementById('select-flex-grow').value = 'none';
