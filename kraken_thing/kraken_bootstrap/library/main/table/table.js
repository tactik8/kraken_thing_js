



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

export function table(records, keys, headings){


    if (!keys){
        keys = Object.keys(records[0]);
    };
    if (!headings){
        headings=keys;
    };
    
    
    let table_element = document.createElement('div');


    let content = `
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">test </th>
                        <th scope="col">test2 </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>tt</td>
                        <td>tt</td>
                    </tr>
                    <tr>
                        <td>tt</td>
                        <td>tt</td>
                    </tr>
                    <tr>
                        <td>tt</td>
                        <td>tt</td>
                    </tr>
                </tbody>
            </table>
            `
   
    table_element.innerHTML = content;

    re_populate_table(records, keys, headings, table_element)
    
    return table_element;
}



function re_populate_table(records, keys, headings, table_element){



    // ------- retrieve templates ---------
    // header 
    let table_head = table_element.getElementsByTagName('thead')[0];
    let table_head_row = table_head.getElementsByTagName('tr')[0];
    let table_head_row_col = table_head_row.getElementsByTagName('th')[0];

    // body
    let table_body = table_element.getElementsByTagName('tbody')[0];
    let table_body_row = table_body.getElementsByTagName('tr')[0];
    let table_body_row_col = table_body_row.getElementsByTagName('td')[0];


    // Empty table

    remove_elements_by_tagName(table_head_row, 'th');
    remove_elements_by_tagName(table_body_row, 'td');
    remove_elements_by_tagName(table_body, 'tr');

    // populate header
    let new_col_head;
    for(let i=0; i < headings.length; i++){
        new_col_head = table_head_row_col.cloneNode(true);
        new_col_head.innerHTML = headings[i];
        table_head_row.appendChild(new_col_head);
    };

    // Populate table
    let new_table_body_row_col;
    let new_body_row;

    for(let r=0; r< records.length; r++){

        // generate new row
        new_body_row = table_body_row.cloneNode(true);
        table_body.appendChild(new_body_row);

        for(let i=0; i<keys.length; i++){
            // generate new column
            new_table_body_row_col = table_body_row_col.cloneNode(true);
            new_table_body_row_col.innerHTML = records[r][keys[i]] || '';
            new_body_row.appendChild(new_table_body_row_col);
        };
    };

    return table_element;
    
}




function remove_elements_by_tagName(element, tagName){

    while(element.getElementsByTagName(tagName).length > 0){
        element.getElementsByTagName(tagName)[0].remove();
    };
    return;

    
}