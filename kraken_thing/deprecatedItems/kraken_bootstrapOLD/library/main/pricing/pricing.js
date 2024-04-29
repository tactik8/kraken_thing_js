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

export function pricing( heading1_1, price_1, text_1, other_1, heading1_2, price_2, text_2, other_2, heading1_3, price_3, text_3, other_3){

    let part_element = document.createElement('div');

    let content =  `
        <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
        
            <div class="col">
                <div class="card mb-4 rounded-3 shadow-sm">
                    <div class="card-header py-3">
                        <h4 class="my-0 fw-normal">${String(heading1_1)}</h4>
                    </div>
                    <div class="card-body">
                        <h1 class="card-title pricing-card-title kr-price">${String(price_1)}</h1>
                        <p class="kr-text"> ${String(text_1)}</p>
                        <span class="kr-other">${String(other_1)}</span>
                    </div>
                </div>
            </div>
            
            <div class="col">
                <div class="card mb-4 rounded-3 shadow-sm">
                    <div class="card-header py-3">
                        <h4 class="my-0 fw-normal">${String(heading1_2)}</h4>
                    </div>
                    <div class="card-body">
                        <h1 class="card-title pricing-card-title kr-price">${String(price_2)}</h1>
                        <p class="kr-text"> ${String(text_2)}</p>
                        <span class="kr-other">${String(other_2)}</span>
                    </div>
                </div>
            </div>
            
            <div class="col">
                <div class="card mb-4 rounded-3 shadow-sm">
                    <div class="card-header py-3">
                        <h4 class="my-0 fw-normal">${String(heading1_2)}</h4>
                    </div>
                    <div class="card-body">
                        <h1 class="card-title pricing-card-title kr-price">${String(price_2)}</h1>
                        <p class="kr-text"> ${String(text_2)}</p>
                        <span class="kr-other">${String(other_2)}</span>
                    </div>
                </div>
            </div>
            
      
        </div>
        `

    part_element.innerHTML = content;

    return part_element;
}

