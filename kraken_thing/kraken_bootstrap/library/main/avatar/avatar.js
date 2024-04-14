

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


export function avatar(image_url=''){

    let part_element = document.createElement('div');

    let content =  `
        <img class="rounded-circle kr-image" src="${String(image_url)}" />

      `

    part_element.innerHTML = content;

    return part_element;
}