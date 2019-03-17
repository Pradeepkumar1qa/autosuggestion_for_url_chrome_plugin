window.onload=function(){
function addLink() {
  
  
  //console.log(newlink)
  linkpool=[];
  // Save it using the Chrome extension storage API.
  chrome.storage.sync.get(['value'],function(data){
    //console.log("value stored\t"+data.value)
    if(data.value===undefined){
        chrome.storage.sync.set({'value':linkpool }, function() {
        //console.log(linkpool);
        });
        renderLinkUi(linkpool)
      return;
    }
    linkpool=data.value;
    
  
  renderLinkUi(linkpool)

  });

  
}



function test(){
    
    qait_current_url='';
    qait_currnt_title='';
    chrome.tabs.getSelected(null, function(tab){
    // qait_current_url=tab.url;
    // qait_current_title=tab.title;
    addLink();
});
    
}
// 
setTimeout(test,200)
function renderLinkUi(linkpool){

  for(var qait_i=0;qait_i<linkpool.length;qait_i++){
     anchor=document.createElement('a')
     anchor.href=linkpool[qait_i].link;
     anchor.innerHTML=linkpool[qait_i].title;
     anchor.target='blank';
     span_el=document.createElement('span');
     span_el.innerHTML=linkpool[qait_i].counter;
     anchor.appendChild(span_el);
     document.body.appendChild(anchor); 
  }
    

 }

document.getElementById('clearbtn').onclick=function(){
  chrome.storage.sync.remove('value',function(){
    //alert('clear all value here')
    let linkpool=[];
    chrome.storage.sync.set({'value':undefined})
    renderLinkUi(linkpool)
    location.reload();
  })
}

}
