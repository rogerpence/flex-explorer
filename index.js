const flexRow = document.getElementById('flex-row');
let counter = 0;

camelize = function camelize(str) {
    return str.replace(/\W+(.)/g, function(match, chr)
    {
        return chr.toUpperCase();
    });
}

deselectAllChildren = function() {
    const kids = Array.from(flexRow.children);

    kids.forEach(kid => {
        kid.classList.remove('selected');
    });
}

const actions = {
    childClicked: function(childId) {
        const child = document.getElementById(childId);
        const msg = document.getElementById('selected-child-message');
        msg.textContent = `Selected child is: ${child.id}`;
        msg.setAttribute('data-selected-child', child.id);

        if (child.classList.contains('selected')) {
            deselectAllChildren();
        }
        else {
            deselectAllChildren();
            child.classList.add('selected');
        }


        if (child.classList.contains('flex-grow')) {
            document.getElementById('select-flex-grow').value = 'flex-grow';
        }
        else if (child.classList.contains('flex-grow-0')) {            
            document.getElementById('select-flex-grow').value = 'flex-grow-0';
        } 
        else {
            document.getElementById('select-flex-grow').value = '';
        }

        if (child.classList.contains('flex-shrink')) {
            document.getElementById('select-flex-shrink').value = 'flex-shrink';
        }
        else if (child.classList.contains('flex-shrink-0')) {            
            document.getElementById('select-flex-shrink').value = 'flex-shrink-0';
        } 
        else {
            document.getElementById('select-flex-shrink').value = '';
        }

        document.getElementById('select-align-self').value = '';
        const alignSelfOptions = Array.from(document.getElementById('select-align-self').children);
        alignSelfOptions.forEach(option => {
            const value = option.getAttribute('value');
            if (child.classList.contains(value)) {
                document.getElementById(`select-align-self`).value = value;
            }
        })
    },

    addFlexChild : function() {
        let content = document.getElementById('child-content').value;

        const text = document.getElementById('child-class-names').value;
        const flexGrow = document.getElementById('select-flex-grow').value;
        const flexShrink = document.getElementById('select-flex-shrink').value;
        const flexAlignSelf = document.getElementById('select-align-self').value;
        
        const classNames = 'flex-child ' + `${flexGrow} ${flexShrink} ${flexAlignSelf} ${text}`;
    
        if (content == '') {
            content = `id${counter}`;
        }

        const elem = `
        <div id="id${counter}" class="${classNames}">        
        <a href="#" class="" onclick="javascript:actions.childClicked('id${counter}');return false;">
        ${content}
        </a>
        </div>`;
        counter++;
        flexRow.insertAdjacentHTML('beforeend', elem);
    },

    removeAllFlexChildren : function() {
        flexRow.innerHTML = '';
        counter = 0;
    },

    removeFlexChild: function() { 
        const selectedChild = document.querySelector('div.flex-child.selected');
        if (! selectedChild) {
            return;
        }
        flexRow.removeChild(selectedChild);
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
    },

    copyHtmlToClipboard: function() {
        console.log(flexRow.parentElement.innerHTML);
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

document.getElementById('select-flex-grow').value = '';
document.getElementById('select-flex-shrink').value = '';
document.getElementById('select-align-self').value = '';
