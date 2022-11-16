var data= new Array();
let moneyUs = Intl.NumberFormat('en-US',{
    style: "currency",
    currency: "USD"
});
function AddCart () {
    var obj = this.event.target.parentElement;
    var name = obj.querySelector(".card-title").textContent;
    var desc = obj.querySelector(".card-text").textContent;
    var price = obj.querySelector(".price").textContent.replace("$", "");
    var idprod = obj.querySelector(".btn").getAttribute('id');
    //console.log(obj, parseFloat(precio), idprod);
    //localStorage.setItem("cart", idprod);
    var item= new Array({"id":idprod,"name":name,"price":price, "desc": desc});
    AddItem(item);
} 
function loadData(){
    if(localStorage.getItem("cart") != null){
        data = localStorage.getItem("cart");
        data = JSON.parse("data");
        //alert("existe");
    }else{
        localStorage.setItem("cart","[]");
        //alert("No existe");
    }
    //alert("Loading...");
}
function recoveryData(){
    if(localStorage.getItem("cart") != null){
        data = localStorage.getItem("cart");
        data = JSON.parse(data);
        //alert("existe");
    }else{
        localStorage.setItem("cart","[]");
        //alert("No existe");
    }
    //alert("Loading...");
    var list = document.getElementById("list-item");
    console.log(data.length);
    document.getElementById("count").innerHTML=data.length;
    for(var id in data){
        console.log("indice: "+ id+ "---> " + data[id] );
        var li = renderItem(data[id]);

        list.appendChild(li);
    }
    getAmount();
}
function AddItem(item){
    data= JSON.parse(localStorage.getItem("cart"));
    data.push(item);
    localStorage.setItem("cart",JSON.stringify(data));
}
function renderItem(d){
    var li = document.createElement("li");
    var div = document.createElement("div");
    var h6 = document.createElement("h6");
    var small = document.createElement("small");
    var span = document.createElement("span");
    var del = document.createElement("a");
    del.setAttribute("href", "#");
    li.className="list-group-item d-flex justify-content-between lh-sm";
    h6.className="my-0";
    small.className="text-muted";
    span.className="text-muted";
    del.clasName="btn btn-danger btn-sm";



    var deltxt=document.createTextNode(" X ");
    var h6txt=document.createTextNode(d[0].name);
    var smalltxt=document.createTextNode(d[0].desc.slice(0,20)+ "...");
    var spantxt=document.createTextNode(moneyUs.format(d[0].price) +"  ");
    li.dataset.id = d[0].id;
    //event DEL
    del.addEventListener("click", function(event){
        //alert("clicked");
        event.preventDefault();
        var list = document.getElementById("list-item");
        var nodes = Array.from(list.children);
        var li = event.target.parentElement.closest('li');
        var index = nodes.indexOf(li);
        console.log(index);
        data.splice(index,1); //borrado
        localStorage.setItem("cart", JSON.stringify(data));
        //list.innerHTML="";
        list.removeChild(li);
        //recoveryData();
        document.getElementById("count").innerHTML=data.length;


    });

    del.appendChild(deltxt);
    h6.appendChild(h6txt);
    small.appendChild(smalltxt);
    span.appendChild(spantxt);
    span.appendChild(del);
    div.appendChild(h6);
    div.appendChild(small);
    li.appendChild(div);
    li.appendChild(span);

    return li;
}
function getAmount(){
     var amount=parseFloat(0);
    for(var i in data){
        amount=amount+ parseFloat(data[i][0].price);
    }
    document.getElementById("amount").innerHTML="<b>"+moneyUs.format(amount)+"<b/>";
}