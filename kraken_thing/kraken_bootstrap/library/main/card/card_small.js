
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


export function card_small(image_url, heading1, text, other) {

    let part_element = document.createElement('div');

    let content = `
        
        <div class="row align-items-center">
            <div class="col-auto">
                <img src="${String(image_url)}" alt="" class="kr-image img-fluid rounded-circle" width=48 height=48 onerror='this.style.display = "none"'>
            </div>
            <div class="col ps-1">
                <ul class="list-unstyled mb-0 mt-0">
                <li class="m-0">
                        ${String(heading1)}
                </li>
                <li class="m-0">
                    <small>    ${String(text)} </small>
                </li>
                </ul>
            </div>
        </div>
`;


    part_element.innerHTML = content;

    return part_element;

}
