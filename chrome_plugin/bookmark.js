
console.log("executed bookmark content");
(function (){
    var linkpool=[]
    qait_current_url=window.location.href;
    qait_currnt_title=document.title;
    var max_recommendation=10;  //latest 10 value record will be stored
    // console.log(qait_current_url+"is current url")
    // console.log(qait_currnt_title+"is current title")
    function validateiflinkNotexist(){
      
      for(let qait_j=0;qait_j<linkpool.length;qait_j++){

              if(linkpool[qait_j].link===qait_current_url){
                linkpool[qait_j].counter++;
                console.log('you have all ready seen the'+linkpool[qait_j].link+linkpool[qait_j].counter)
                linkpool.sort(function(a,b){return b.counter-a.counter})
                return false;
              }
      }
      linkpool.sort(function(a,b){return b.counter-a.counter})

      return true;
    }


    chrome.storage.sync.get(['value'],function(data){
    console.log("value stored\t"+data.value)
    linkpool=data.value;
    if(linkpool==undefined){linkpool=[]}
    if(validateiflinkNotexist()){   
      var qait_p;
      if(linkpool.length>max_recommendation || true){
        console.log('greater than one')
        linkpool.sort(function(a,b){return b.counter-a.counter})
        for(qait_p=0;qait_p<linkpool.length;qait_p++){
          if(linkpool[qait_p].counter===1){break;}
        }
        console.log(linkpool.length+'exectued herer')
      }
       linkpool.splice(qait_p,0,{"link":qait_current_url,"title":qait_currnt_title,"counter":1});
       linkpool.splice(max_recommendation);
       console.log(linkpool.length+"testing phase is there")

      
    }
    
    chrome.storage.sync.set({'value':linkpool},function(){
    //console.log(linkpool.length)
             });


                                                      });
})();
