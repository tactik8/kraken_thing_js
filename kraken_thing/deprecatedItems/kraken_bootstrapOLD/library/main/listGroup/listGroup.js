
/*
classes: 

    - kr-image
            ${String(image_url)}
    - kr-heading1
            ${String(heading1)}
    - kr-heading2
            ${String(heading2)}
    - kr-text 
            ${String(text)}
    - kr-other
            ${other}
            <span class="kr-other">${other}</span>
    - kr-date
        ${String(date)}
    - kr-price
        ${String(price)}


*/


export function pagination(link_names, link_urls){

    let part_element = document.createElement('div');

    let content =  `

        <ul class="list-group">
          <li class="list-group-item">An item</li>
          <li class="list-group-item">A second item</li>
          <li class="list-group-item">A third item</li>
          <li class="list-group-item">A fourth item</li>
          <li class="list-group-item">And a fifth one</li>
        </ul>


        `;


    part_element.innerHTML = content;


    // empty current links
    let link_list = part_element.getElementsByTagName('ul')[0];
    let link_template = part_element.getElementsByTagName('li')[0];

    remove_elements_by_tagName(link_list, 'li');

    // create links
    let new_link_item;
    let new_link_item_a;
    for(let i=0; i<link_names.length; i++ ){
        new_link_item = link_template.cloneNode(true);
        new_link_item_a = new_link_item.getElementsByTagName('a')[0];
        new_link_item_a.setAttribute('href', link_urls[i]);
        new_link_item_a.innerHTML = link_names[i];
        link_list.appendChild(new_link_item);

    };


    return part_element;

}

function remove_elements_by_tagName(element, tagName){

    while(element.getElementsByTagName(tagName).length > 0){
        element.getElementsByTagName(tagName)[0].remove();
    };
    return;


}

