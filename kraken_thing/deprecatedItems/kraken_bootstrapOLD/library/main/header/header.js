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


export function header(logo_url, heading1, link_names, link_urls){

    let part_element = document.createElement('div');

    let content =  `

        
            <nav class="navbar navbar-expand-lg bg-body-tertiary bg-dark border-bottom border-body" data-bs-theme="dark">
                <div class="container-fluid align-items-center">
                    <a class="navbar-brand kr-heading1" href="#">
                        <img src="${logo_url}" alt="Logo" width="30"  class="d-inline-block align-text-top">
                    ${String(heading1)}
                    </a>
                    
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            
                            <li class="nav-item">
                                <a class="nav-link" href="#">Features</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Pricing</a>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </nav>

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