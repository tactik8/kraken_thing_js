

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

export function modal(modal_id, heading1, other){

    let part_element = document.createElement('div');

    let content =  `
        
        <!-- Modal -->
        <div class="modal fade" id="modal_id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="kr-heading1 modal-title fs-5" id="exampleModalLabel">${String(heading1)}</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                  <span class="kr-other">${other}</span>
              </div>
              <div class="modal-footer">
                
              </div>
            </div>
          </div>
        </div>
        
        `;
        

    part_element.innerHTML = content;

    return part_element;

}




