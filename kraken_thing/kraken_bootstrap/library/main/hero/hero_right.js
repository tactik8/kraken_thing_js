





/*

classes: 
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

export function hero_right(image_url='', heading1='', text='', other=''){

    let part_element = document.createElement('div');

    let content =  `

    <div class="container col-xxl-8 px-4 py-5">
        <div class="row align-items-center g-5 py-5">
          <div class="col-10 col-sm-8 col-lg-6">
            <img src="${String(image_url)}" class="d-block mx-lg-auto img-fluid" alt="" width="700" height="500" loading="lazy">
          </div>
          <div class="col-lg-6">
            <h1 class="display-5 fw-bold text-body-emphasis lh-1 mb-3 kr-heading1">${String(heading1)}</h1>
            <p class="lead kr-text">${String(text)}</p>
            <div class="d-grid gap-2 d-md-flex justify-content-md-start">
              <span class="kr-other">${other}</span>
            </div>
          </div>
        </div>
      </div>`

    part_element.innerHTML = content;

    return part_element;
}