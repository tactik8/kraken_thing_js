


import { data } from '../data/data.js';

import { library} from '../library/library.js';


export var things = {
    
    //avatar: avatar,
    card: {
            cardRight: get_cardRight,
            cardSmall: get_cardSmall,
            cardVertical: get_cardVertical
        },
    //cardGrid: cardGrid,
    //table: table,
    footer: get_footer,
    hero: {
        heroLeft: get_heroLeft,
        heroRight: get_heroRight,
        heroCentered: get_heroCentered
    },
    invoice: get_invoice,
    //features: features,
    //pricing: pricing,
    header: get_header,
    //pagination: pagination,
    review: get_review,
    starRating: get_starRating,
    //testimonial: testimonial
    
}


function get_cardRight(record){

    let template_library = 'main';
    
    let html_element = library.main.card.card_right(
        data.image(record), 
        null, 
        data.heading1(record), 
        data.heading2(record)
    );
    
    return html_element;

}


function get_cardSmall(record){

    let template_library = 'main';

    let html_element = library.main.card.card_small(
        data.image(record), 
        data.heading1(record), 
        data.heading2(record)
    );

    return html_element;

}

function get_cardVertical(record){

    let template_library = 'main';

    let html_element = library.main.card.card_vertical(
        data.image(record), 
        data.heading1(record), 
        data.heading2(record)
    );

    return html_element;

}


function get_footer(record){

    let template_library = 'main';


    let link_names = [];
    let link_urls = [];

    for(let i=0; i< record.hasPart.length; i++){
        link_names.push(data.heading1(record.hasPart[i]));
        link_urls.push(record.hasPart[i].url);
    };
    
    let html_element = library.main.footer(
        data.image(record),
        data.heading1(record),
        link_names,
        link_urls
    );

    return html_element;

}

function get_header(record){

    let template_library = 'main';


    let link_names = [];
    let link_urls = [];

    for(let i=0; i< record.hasPart.length; i++){
        link_names.push(data.heading1(record.hasPart[i]));
        link_urls.push(record.hasPart[i].url);
    };
    
    let html_element = library.main.header(
        data.image(record),
        data.heading1(record),
        link_names,
        link_urls
    );

    return html_element;
    
}

function get_heroLeft(record){
    let template_library = 'main';

    let html_element = library.main.hero.hero_left(
        data.image(record), 
        data.heading1(record), 
        data.text(record)
    );

    return html_element;
    
}

function get_heroRight(record){
    let template_library = 'main';

    let html_element = library.main.hero.hero_right(
        data.image(record), 
        data.heading1(record), 
        data.text(record)
    );

    return html_element;

}


function get_heroCentered(record){
    let template_library = 'main';

    let html_element = library.main.hero.hero_centered(
        data.image(record), 
        data.heading1(record), 
        data.text(record)
    );

    return html_element;

}


function get_invoice(record){
    let template_library = 'main';

    let html_element = library.main.invoice(
        record
    );

    return html_element;

}




function get_review(record){

    let template_library = 'main';

    let html_element = library.main.testimonial(
        data.image(record), 
        data.heading1(record), 
        data.text(record),
        data.heading1(record.author)
    );

    return html_element;
}



function get_starRating(record){

    let template_library = 'main';

    let html_element = library.main.star_rating(record.score, record.max_score);

    return html_element;
}

function get_table(records){

    let template_library = 'main';

    let html_element = library.main.table(
        records,
        data.tableKeys(),
        data.tableKeys(),
    );

    return html_element;

}