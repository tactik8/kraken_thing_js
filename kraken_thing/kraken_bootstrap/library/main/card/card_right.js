
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


export function card_right(image_url='', category, heading1='', date='', text='', other=''){

    let part_element = document.createElement('div');

    let content =  `

<div class="style="width: 50rem;" row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
    <div class="col p-4 d-flex flex-column position-static">
        <strong class="d-inline-block mb-2 text-primary-emphasis kr-category">${String(category)}</strong>
        <h3 class="mb-0 kr-heading1">${String(heading1)}</h3>
        <div class="mb-1 text-body-secondary">${String(date)}</div>
        <p class="card-text mb-auto kr-text">${String(text)}</p>
    </div>
    <div class="col col-auto d-none d-lg-block">
         <img src="${String(image_url)}" class="kr-image img-fluid border rounded-3 shadow-lg mb-4" alt="Example image" width="200" height="150" loading="lazy">
    </div>
</div>
      
      `

    part_element.innerHTML = content;

    return part_element;
}