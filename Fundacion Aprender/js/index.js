
  const productos=[
    {id:1,nombre:'Vela Artesanal',cat:'velas',precio:8000,img:'assets/velas/base.jpg',vela:true},
    {id:2,nombre:'Pulsera',cat:'pulseras',precio:5000,img:'assets/pulseras/1.jpg'},
    {id:3,nombre:'Collar',cat:'collares',precio:7000,img:'assets/collares/1.jpg'},
  ];

  let ventas=JSON.parse(localStorage.getItem('ventas'))||[];
  let velaConfig={envase:null,esencia:null};

  function showSection(id){
    document.querySelectorAll('section').forEach(s=>s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.querySelectorAll('nav button').forEach(b=>b.classList.remove('active'));
    event.target.classList.add('active');
  }

  function renderCatalogo(list){
    const grid=document.getElementById('catalogoGrid');
    grid.innerHTML='';
    list.forEach(p=>{
      grid.innerHTML+=`
        <div class="card">
          <img src="${p.img}">
          <h4>${p.nombre}</h4>
          <p>$${p.precio}</p>
          <button onclick="${p.vela?'openVela()':'addVenta('+p.id+')'}">Agregar</button>
        </div>`;
    });
  }

  function filterCat(cat){
    if(cat==='all')renderCatalogo(productos);
    else renderCatalogo(productos.filter(p=>p.cat===cat));
  }

  function addVenta(id){
    const p=productos.find(x=>x.id===id);
    ventas.push({...p,cant:1,total:p.precio});
    saveVentas();
  }

  function openVela(){
    document.getElementById('velaModal').style.display='flex';
    loadOptions();
  }

  function loadOptions(){
    const env=['pescera','whisky','cilindro','comun'];
    const es=['chicle','citrus','patchouli','sandalo','lavanda','vainilla','durazno'];
    envases.innerHTML=''; esencias.innerHTML='';
    env.forEach(e=>envases.innerHTML+=`<img src="assets/envases/${e}.jpg" onclick="selectOpt('envase','${e}',this)">`);
    es.forEach(e=>esencias.innerHTML+=`<img src="assets/esencias/${e}.jpg" onclick="selectOpt('esencia','${e}',this)">`);
  }

  function selectOpt(tipo,val,el){
    velaConfig[tipo]=val;
    el.parentNode.querySelectorAll('img').forEach(i=>i.classList.remove('selected'));
    el.classList.add('selected');
  }

  function addVela(){
    if(!velaConfig.envase||!velaConfig.esencia)return alert('Selecciona todo');
    const precio=10000;
    ventas.push({producto:'Vela '+velaConfig.envase+' '+velaConfig.esencia,cat:'velas',cant:1,precio,total:precio});
    saveVentas();
    document.getElementById('velaModal').style.display='none';
  }

  function saveVentas(){
    localStorage.setItem('ventas',JSON.stringify(ventas));
    renderVentas();
  }

  function renderVentas(){
    const tbody=document.querySelector('#tablaVentas tbody');
    tbody.innerHTML='';
    ventas.forEach((v,i)=>{
      tbody.innerHTML+=`<tr>
        <td>${v.producto||v.nombre}</td><td>${v.cat}</td><td>${v.cant}</td><td>${v.precio}</td><td>${v.total}</td>
        <td><button class="danger" onclick="delVenta(${i})">X</button></td></tr>`;
    });
  }

  function delVenta(i){ventas.splice(i,1);saveVentas();}

  function exportExcel(){
    let csv='Producto,Categoría,Cantidad,Precio,Total\n';
    let sum=0;
    ventas.forEach(v=>{csv+=`${v.producto||v.nombre},${v.cat},${v.cant},${v.precio},${v.total}\n`;sum+=v.total});
    csv+=`,,,TOTAL,${sum}`;
    const blob=new Blob([csv],{type:'text/csv'});
    const a=document.createElement('a');
    a.href=URL.createObjectURL(blob);
    a.download=`ventas_${new Date().toLocaleDateString()}.csv`;
    a.click();
  }

  renderCatalogo(productos);renderVentas();
