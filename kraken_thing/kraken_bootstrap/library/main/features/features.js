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

export function features( heading1_1, text_1, other_1, heading1_2, text_2, other_2, heading1_3, text_3, other_3){

    let part_element = document.createElement('div');

    let content =  `
        <div class="container px-4 py-5" id="featured-3">
           
            <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
            
                <div class="feature col">
                    <div class="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
                        <svg class="bi" width="1em" height="1em"><use xlink:href="#collection"></use></svg>
                    </div>
                    <h3 class="fs-2 text-body-emphasis">${String(heading1_1)}</h3>
                    <p class="kr-text"> ${String(text_1)}</p>
                    <span class="kr-other">${String(other_1)} </span>
                </div>

                <div class="feature col">
                    <div class="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
                        <svg class="bi" width="1em" height="1em"><use xlink:href="#collection"></use></svg>
                    </div>
                    <h3 class="fs-2 text-body-emphasis">${String(heading1_2)}</h3>
                    <p class="kr-text"> ${String(text_2)}</p>
                    <span class="kr-other">${String(other_2)} </span>
                </div>

                <div class="feature col">
                    <div class="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
                        <svg class="bi" width="1em" height="1em"><use xlink:href="#collection"></use></svg>
                    </div>
                    <h3 class="fs-2 text-body-emphasis">${String(heading1_3)}</h3>
                    <p class="kr-text"> ${String(text_3)}</p>
                    <span class="kr-other">${String(other_3)} </span>
                </div>
        
              
            </div>
        </div>
        `

    part_element.innerHTML = content;

    return part_element;
}

