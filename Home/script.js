const about=document.getElementById('about');
const navi=document.querySelector('.navigation');
const coords=about.getBoundingClientRect()
const nav=document.querySelector('.navigation-bar');
const links=document.querySelectorAll('.nav-elements');


//sticky navigation
window.addEventListener('scroll',function(){

    if(window.scrollY>=coords.top){
        navi.classList.add('wsticky');
navi.classList.add('sticky');}
    else{
    navi.classList.remove('sticky');  
    navi.classList.remove('wsticky');    
}  
})



//navigation effect
const mouse=function(e,opacity){
    if(e.target.classList.contains('nav-elements')){
        links.forEach(el=>{
        if(el!==e.target)
            el.style.opacity=opacity;
        })
          
        }
}
nav.addEventListener('mouseover',function(e){
mouse(e,0.5);
})
nav.addEventListener('mouseout',function(e){
mouse(e,1);
})
