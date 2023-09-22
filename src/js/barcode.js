import {code128, drawingSVG} from 'bwip-js';


export function create_barcode(content, output_elem = '.barcode'){
    let svg = code128({
        text:        content,    // Text to encode
        height:      12,              // Bar height, in millimeters
        includetext: true,            // Show human-readable text
        textxalign:  'justify',        // Always good to set this
        textcolor:   '000000',        // black text
    }, drawingSVG());
    
    let [ , width, height ] = /viewBox="0 0 (\d+) (\d+)"/.exec(svg);
    let span = document.createElement('span');
    span.style.display = 'inline-block';
    span.style.width = width + 'px';
    span.style.height = height + 'px';
    span.innerHTML = svg;
    document.body.querySelector(output_elem).replaceChildren(span);
}

export function init_form(form_elem='.barform'){
    let form = document.body.querySelector(form_elem);
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        let data = new FormData(form);
        create_barcode(data.get('content'));
    });
}