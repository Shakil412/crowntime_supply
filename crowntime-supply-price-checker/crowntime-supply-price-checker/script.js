'use strict';
const $=id=>document.getElementById(id);
const fmt=n=>'৳'+Math.round(n).toLocaleString('en-US');
let mode='regular';let latest=null;
const rates={regular:[10,8,7,6,5],installment:[18,14,11,9,8]};
function tier(base){return base<=150000?0:base<=250000?1:base<=400000?2:base<=600000?3:4}
function handling(value){return value<15000?500:value<50000?1000:value<100000?1500:value<500000?2000:value<1000000?3500:5000}
function calculate(){
 const rm=Number($('rm').value),rate=Number($('rate').value);
 if(!Number.isFinite(rm)||!Number.isFinite(rate)||rm<0||rate<=0||$('rm').value===''||$('rate').value===''){$('status').textContent='Please enter a valid RM amount and exchange rate.';return}
 const base=rm*rate,pct=mode==='wholesale'?6:rates[mode][tier(base)];
 const baseRounded=Math.round(base),profit=Math.round(base*pct/100),subtotal=Math.round(base*(1+pct/100));
 const fee=handling(subtotal),total=subtotal+fee;
 // Align displayed base/profit with rounded subtotal for fractional exchange rates.
 const displayedProfit=subtotal-baseRounded;
 $('base').textContent=fmt(baseRounded);$('profit-label').textContent=`(${pct}%)`;$('profit').textContent=fmt(displayedProfit);$('handling').textContent=fmt(fee);$('total').textContent=fmt(total);
 $('installment-panel').hidden=mode!=='installment';
 const down=Math.round(total*.3),remaining=total-down,m1=Math.round(remaining/3),m2=Math.round(remaining/3),m3=remaining-m1-m2;
 $('down').textContent=fmt(down);$('remaining').textContent=fmt(remaining);$('month1').textContent=fmt(m1);$('month2').textContent=fmt(m2);$('month3').textContent=fmt(m3);
 latest={rm,rate,mode,base:baseRounded,pct,profit:displayedProfit,fee,total,down,remaining,m1,m2,m3};$('status').textContent='';
}
document.querySelectorAll('.tab').forEach(btn=>btn.addEventListener('click',()=>{mode=btn.dataset.mode;document.querySelectorAll('.tab').forEach(b=>{b.classList.toggle('active',b===btn);b.setAttribute('aria-selected',String(b===btn))});calculate()}));
$('price-form').addEventListener('submit',e=>{e.preventDefault();calculate();if(latest)$('status').textContent='Price calculated successfully.'});
['rm','rate'].forEach(id=>$(id).addEventListener('input',calculate));
$('reset').addEventListener('click',()=>{$('rm').value='5000';$('rate').value='32';mode='regular';document.querySelectorAll('.tab').forEach(b=>{b.classList.toggle('active',b.dataset.mode===mode);b.setAttribute('aria-selected',String(b.dataset.mode===mode))});calculate()});
$('copy').addEventListener('click',async()=>{calculate();if(!latest)return;const x=latest;const text=`CROWNTIME SUPPLY — WATCH PRICE ESTIMATE\nPlan: ${x.mode.toUpperCase()}\nWatch Price: RM ${x.rm}\nExchange Rate: ${x.rate} BDT/RM\nBase Price: ${fmt(x.base)}\nProfit (${x.pct}%): ${fmt(x.profit)}\nHandling Charge: ${fmt(x.fee)}\nFINAL PRICE: ${fmt(x.total)}`+(x.mode==='installment'?`\nDown Payment (30%): ${fmt(x.down)}\nRemaining: ${fmt(x.remaining)}\nMonth 1: ${fmt(x.m1)}\nMonth 2: ${fmt(x.m2)}\nMonth 3: ${fmt(x.m3)}`:'');try{await navigator.clipboard.writeText(text);$('status').textContent='Price breakdown copied.'}catch(e){$('status').textContent='Copy unavailable in this browser. Please use a secure (HTTPS) connection.'}});
$('year').textContent=new Date().getFullYear();calculate();
