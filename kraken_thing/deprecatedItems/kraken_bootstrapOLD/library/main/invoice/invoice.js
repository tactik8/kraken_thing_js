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

export function invoice(record){

    let part_element = document.createElement('div');

    let content =  `




<div class="container mt-4 border">

    <div class="row align-items-center">

        <div class="col col-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor"
                class="bi bi-4-square-fill" viewBox="0 0 16 16">
                <path d="M6.225 9.281v.053H8.85V5.063h-.065c-.867 1.33-1.787 2.806-2.56 4.218" />
                <path
                    d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm5.519 5.057q.33-.527.657-1.055h1.933v5.332h1.008v1.107H10.11V12H8.85v-1.559H4.978V9.322c.77-1.427 1.656-2.847 2.542-4.265Z" />
            </svg>
        </div>
        <div class="col col-6">
            <ul class="list-unstyled">
                <li><h1>INVOICE</h1></li>
                <li>
                    <h5>Cie name</h5>
                </li>
                <li>street</li>
                <li>city, province, postal code</li>
                <li>email</li>

            </ul>
        </div>
    </div>
</div>

<div class="container mt-4 border">

    <div class="row">

        <div class="col col-6">
            <ul class="list-unstyled">
                <li><strong>Cie name</strong></li>
                <li>street</li>
                <li>city, province, postal code</li>
                <li>email</li>

            </ul>
        </div>
        <div class="col col-6">
            <dl class="row">
                <dt class="col-sm-6">Invoice no</dt>
                <dd class="col-sm-6">in3334444</dd>
                <dt class="col-sm-6">Date</dt>
                <dd class="col-sm-6">22/03/23</dd>
                <dt class="col-sm-6">currency</dt>
                <dd class="col-sm-6">cad</dd>
                <dt class="col-sm-6">po</dt>
                <dd class="col-sm-6">444556</dd>


            </dl>
        </div>
    </div>
</div>

<div class="container">
    <table class="table">
        <thead>
            <tr>
                <th class="col-1" scope="col">#</th>
                <th class="col-6" scope="col">Product</th>
                <th class="text-end" scope="col">Price</th>
                <th class="text-end" scope="col">Quantity</th>
                <th class="text-end" scope="col">Total</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th scope="row">1</th>
                <td class="">
                    <ul class="mb-0 list-unstyled">
                        <li>Product 1</li>
                        <li><small>Description 1</small></li>
                    </ul>
                </td>
                <td class="text-end">4.95</td>
                <td class="text-end">10</td>
                <td class="text-end">49.50</td>
            </tr>
            <tr>
                <th scope="row">1</th>
                <td class="">
                    <ul class="mb-0 list-unstyled">
                        <li>Product 1</li>
                        <li><small>Description 1</small></li>
                    </ul>
                </td>
                <td class="text-end">4.95</td>
                <td class="text-end">10</td>
                <td class="text-end">49.50</td>
            </tr>
            <tr>
                <th scope="row">1</th>
                <td class="">
                    <ul class="mb-0 list-unstyled">
                        <li>Product 1</li>
                        <li><small>Description 1</small></li>
                    </ul>
                </td>
                <td class="text-end">4.95</td>
                <td class="text-end">10</td>
                <td class="text-end">49.50</td>
            </tr>
            <tr>
                <th scope="row">1</th>
                <td class="">
                    <ul class="mb-0 list-unstyled">
                        <li>Product 1</li>
                        <li><small>Description 1</small></li>
                    </ul>
                </td>
                <td class="text-end">4.95</td>
                <td class="text-end">10</td>
                <td class="text-end">49.50</td>
            </tr>
        </tbody>
    </table>


    <!--- taxes -->

    <table class="table table-borderless">
        <thead>

        </thead>
        <tbody>
            <tr>
                <th class="col-1 " scope="row"></th>
                <td class="col-6 "></td>
                <td class=""></td>
                <td class="text-end"><strong>Subtotal</strong></td>
                <td class="text-end"><strong>49.50</strong></td>
            </tr>
            <tr>
                <th class="col-1 " scope="row"></th>
                <td class="col-6 "></td>
                <td class=""></td>
                <td class="text-end">t</td>
                <td class="text-end">49.50</td>
            </tr>
            <tr>
                <th class="col-1 " scope="row"></th>
                <td class="col-6 "></td>
                <td class=""></td>
                <td class=" text-end ">tax 2</td>
                <td class="text-end ">49.50</td>
            </tr>
            <tr>
                <th class="col-1 " scope="row"></th>
                <td class="col-6 "></td>
                <td class=""></td>
                <td class="text-end "><strong>Total</strong></td>
                <td class="text-end "><strong>49.50</strong></td>
            </tr>

        </tbody>
    </table>
</div>


<!-- terms ---->

<div class="container">
    <h5>Terms and conditions</h5>
    <p>Terms......</p>
</div>






    `

    part_element.innerHTML = content;

    return part_element;
}