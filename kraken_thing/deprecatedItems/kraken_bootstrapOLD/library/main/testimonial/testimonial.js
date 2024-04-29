
import {star_rating } from '../star_rating/star_rating.js';



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

export function testimonial(rating_score, heading1='', text='', author_name=''){

    let part_element = document.createElement('div');


    let star_rating_content = star_rating(rating_score).innerHTML;
    

    let content =  `

    <div >
    
        <div class="border rounded-2 h-100 p-2 aos-init aos-animate" data-aos="fade-down" data-aos-delay="500">
            <div class="pt-1 pb-1">
            ${star_rating_content}
            </div>
            <div class="pt-1 pb-1">
                <h5 class="kr-heading1 card-title kr-heading1">${String(heading1)}</h5>
            </div>
         
            <figure>
              <blockquote class="blockquote">
                <p>${String(text)}</p>
              </blockquote>
              <figcaption class="blockquote-footer">
                ${String(author_name)}
              </figcaption>
            </figure>
        
        </div>
    </div>

`;


    part_element.innerHTML = content;

    return part_element;

    star_rating

}

