

/*
Write the code necessary to do the following:

Select the section with an id of container without using querySelector.
Select the section with an id of container using querySelector.
Select all of the list items with a class of “second”.
Select a list item with a class of third, but only the list item inside of the ol tag.
Give the section with an id of container the text “Hello!”.
Add the class main to the div with a class of footer.
Remove the class main on the div with a class of footer.
Create a new li element.
Give the li the text “four”.
Append the li to the ul element.
Loop over all of the lis inside the ol tag and give them a background color of “green”.
Remove the div with a class of footer
*/
function allEdits() {
    const containerId = document.getElementById('container');
    //let holder = containerId.firstElementChild;
    setTimeout(function() {
        containerId.style.color = 'red';
    }, 1000);
    const containerId0 = document.querySelector('#container');
    holder = containerId0
    setTimeout(function() {
        holder.style.color = 'blue';
    }, 2000);
    const second = document.querySelectorAll('li.second');
    setTimeout(function() {
        for (let items of second){
            items.style.color = 'green';
        }
    }, 3000);
    const third_ol = document.querySelector('ol > li.third');
    setTimeout(function() {
        third_ol.style.color = 'orange';
    }, 4000);
    setTimeout(function() {
        let header_2 = document.createElement('h2');
        header_2.innerText = 'Hello!';
        header_2.style.color = 'purple';
        containerId.prepend(header_2);
    }, 5000);
    const div_footer_h2 = document.querySelector('div.footer > h2');
    setTimeout(function() {
        div_footer_h2.classList.toggle('main');
    }, 6000);
    setTimeout(function() {
        div_footer_h2.classList.toggle('main');
    }, 7000);
    const list_elem = document.createElement('li');
    list_elem.innerText = 'four';
    const unordered_list = containerId.querySelector('ul');
    setTimeout(function() {
        unordered_list.append(list_elem);
    }, 8000);
    const ordered_list = document.querySelectorAll('ol > li');
    setTimeout(function() {
        for (let list_item of ordered_list) {
            list_item.style.backgroundColor = 'coral';
        }
    }, 9000);
    const div_footer = document.querySelector('div.footer');
    setTimeout(function() {
        div_footer.remove();
    }, 10000);
}

allEdits();