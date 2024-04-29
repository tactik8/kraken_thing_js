
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


export function cardGrid(elements){

    let part_element = document.createElement('div');

    let content =  `

<div class="row row-cols-1 row-cols-md-2 g-4">
  <div class="col">

       
    
  </div>
</div>

      `

    part_element.innerHTML = content;

    for (let i=0; i< elements.length; i++){
        part_element.appendChild(elements[i]);
    };

    return part_element;
}