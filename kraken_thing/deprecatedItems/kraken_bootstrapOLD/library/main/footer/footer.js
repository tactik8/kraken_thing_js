


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

export function footer(logo, heading1, link_names, link_urls ){

    let part_element = document.createElement('div');

    let content =  `
    
        <div class="container">
          <footer class="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-5 border-top">
            <div class="col mb-3">
                <span class="kr-brand">${logo}</span>
                <p class="text-body-secondary">© 2024</p>
            </div>
        
            <div class="col mb-3">
        
            </div>
        
            <div class="col mb-3">
            
                <span class="kr-other">${other_1}</span>
            </div>
        
            <div class="col mb-3">
             
                <span class="kr-other">${other_2}</span>
            </div>
        
            <div class="col mb-3">
              
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
          </footer>
        </div>
        
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




