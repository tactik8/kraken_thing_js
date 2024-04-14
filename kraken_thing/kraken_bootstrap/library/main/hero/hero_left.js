





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

export function hero_left(image_url='', heading1='', text='', other=''){

    let part_element = document.createElement('div');

    let content =  `

<div class="px-4 pt-5 my-5 text-center border-bottom">
    <h1 class="display-4 fw-bold text-body-emphasis kr-heading1">${String(heading1)}</h1>
    <div class="col-lg-6 mx-auto">
        <p class="lead mb-4 kr-text">${String(text)}</p>
        <span class="kr-other"></span>
    </div>
    <div class="" style="max-height: 30vh;">
      <div class="container px-5">
        <img src=" ${String(image_url)}" class="kr-image img-fluid border rounded-3 shadow-lg mb-4" alt="Example image" width="700" height="500" loading="lazy">
      </div>
    </div>
</div>
  `

    part_element.innerHTML = content;

    return part_element;
}