const form=document.querySelector('#rfq');
if(form){
 const stages=[...form.querySelectorAll('fieldset')], product=form.elements.Product, hints={"Corrugated Boxes":"Internal L × W × H · Ply and flute preference · Packed weight · Stacking and transit conditions","Printed Cartons":"Carton style and dimensions · Board preference · Print colours and artwork · Finish and barcode position","Shoe Boxes":"Shoe sizes and size mix · Box and lid style · Board and print preference · Size label position","Paper Carry Bags":"Width, gusset and height · Paper weight · Handle style · Expected load and artwork","E-commerce Mailers":"Internal dimensions · Packed weight · Closure style · Print and inserts","Divider Packaging":"Item dimensions · Number of compartments · Divider height · Outer carton and packed weight"};
 const back=document.querySelector('#back'), next=document.querySelector('#next'), progress=document.querySelector('#progress'), review=document.querySelector('#review'), send=document.querySelector('#send');
 let stage=0, brief='';
 function show(){
   stages.forEach((field,index)=>{field.hidden=index!==stage;field.disabled=index!==stage;});
   progress.textContent='Step '+(stage+1)+' of '+stages.length;
   back.hidden=stage===0;
   next.hidden=stage===3;
   next.textContent=stage===2?'Review request →':'Continue →';
   document.querySelector('#format-hints').textContent=hints[product.value]||'Include the dimensions, material and expected load if known.';
   if(stage===3){
     const values=[...form.querySelectorAll('[name]')].filter(field=>field.value.trim()).map(field=>field.name+': '+field.value.trim());
     brief=['Royal Pack | Packaging quote request','',...values].join('\n');
     review.textContent=brief;
     send.href='https://wa.me/919990569220?text='+encodeURIComponent(brief);
   }
 }
 form.addEventListener('submit',event=>{event.preventDefault();if(stage<3){stage++;show();stages[stage].querySelector('input,select,a')?.focus({preventScroll:true});}});
 back.addEventListener('click',()=>{if(stage>0){stage--;show();}});
 document.querySelector('#export').addEventListener('click',()=>{const url=URL.createObjectURL(new Blob([brief],{type:'text/plain;charset=utf-8'}));const link=document.createElement('a');link.href=url;link.download='royal-pack-quote-request.txt';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
 document.querySelectorAll('[data-quote]').forEach(button=>button.addEventListener('click',()=>{stage=0;product.value=button.dataset.quote;show();location.hash='quote';product.focus({preventScroll:true});}));
 document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(tag=>tag.setAttribute('aria-pressed',String(tag===button)));document.querySelectorAll('[data-product]').forEach(card=>{card.hidden=button.dataset.filter!=='all'&&card.dataset.product!==button.dataset.filter;});}));
 show();
}
