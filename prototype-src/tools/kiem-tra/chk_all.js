new Promise(function(res){setTimeout(function(){
 var err=[],n=0;var keys=Object.keys(SCR);
 ['cn','tc'].forEach(function(lt){ try{window.LOAI_TK=lt;}catch(e){}
  keys.forEach(function(k){n++;var d=document.createElement('div');
   try{var root=ReactDOM.createRoot?ReactDOM.createRoot(d):null;
     if(root){ReactDOM.flushSync(function(){root.render(React.createElement(SCR[k][1]));});root.unmount();}
     else{ReactDOM.render(React.createElement(SCR[k][1]),d);ReactDOM.unmountComponentAtNode(d);}
   }catch(e){err.push(lt+':'+k+':'+String(e.message).slice(0,80));}});});
 res({screens:keys.length,runs:n,err:err.slice(0,10),nerr:err.length});},1500);})
