function populateHomeTopNews(data){
    $("#qree").html(``);
    var $listItem = $(`<h4 class="mt-2 fw-bold text-main ms-2">Top Stories</h4>`);
    $("#qree").append($listItem);
    try {
        let imgsrc0 = data[0].thumbnail ? data[0].thumbnail : ``
        let imgsrc1 = data[1].thumbnail ? data[1].thumbnail : ``
        let imgsrc2 = data[2].thumbnail ? data[2].thumbnail : ``
        var $listItem = $(`                    
    <li class="list-group-item border-bottom py-4 bg-light mb-1">   
        <div class="card" style="width:100%;">
            <img src="${imgsrc0}" class="card-img-top" alt="">
            <div class="card-body">                    
                <h5 class="mt-0 fw-bold">${data[0].title}</h5>                    
            </div>
            <div class="card-footer small text-yellow fw-bold "><a href="${data[0].link}" class="text-yellow underline text-truncate" style="max-width:40px">${data[0].source}</a></div>
        </div> 
        <div class="row mt-2 g-0">
            <div class="col">
                <div class="card h-100" style="width:100%;">
                    <img src="${imgsrc1}" class="card-img-top" alt="">
                    <div class="card-body">                            
                        <h6 class="mt-0 fw-bold">${data[1].title}</h6>                            
                    </div>
                    <div class="card-footer small text-yellow fw-bold"><a href="${data[1].link}" class="text-yellow underline text-truncate" style="max-width:40px">${data[1].source}</a></div>
                </div> 
            </div>
            <div class="col">
                <div class="card h-100" style="width:100%;">
                    <img src="${imgsrc2}" class="card-img-top" alt="">
                    <div class="card-body">                             
                        <h6 class="mt-0 fw-bold">${data[2].title}</h6>                            
                    </div>
                    <div class="card-footer small text-yellow fw-bold"><a href="${data[2].link}" class="text-yellow underline text-truncate" style="max-width:40px">${data[2].source}</a></div>
                </div>
            </div>
        </div>
    </li>
    `);
        $("#qree").append($listItem);
        $.each(data.slice(3), function (k, v) {
            let imgsrc = v.thumbnail ? v.thumbnail : ``
            var $listItem = $(`                    
            <li class="list-group-item border-bottom py-4 bg-light mb-1">                                        
                <div class="d-flex gap-2 w-100 justify-content-between">
                    <div>                               
                        <h6 class="mb-0 mt-0 fw-bold">${v.title}</h6> 
                        <p class="mb-0 mt-0 small text-yellow fw-bold"><a href="${v.link}" class="text-yellow underline">${v.source}</a></p> 
                    </div>
                    <img src="${imgsrc}" alt="" width="96" height="96" class="flex-shrink-0 sqimg rounded" onerror='imgError(this)' />
                </div>
            </li>
            `);
            $("#qree").append($listItem);
        })
    } catch (err) {
        
    }
}

function populateHomeTrendingNews(results){
    arr = []
        var $listItem = $(`
            <li class="bg-light mb-1">        
                <div class="card mt-2" style="width:100%;">
                <div class="card-header">
                    <div class="row">
                        <div class="col-8">
                            <h4 class="fw-bold text-main ms-2">Trending News</h4>
                        </div>
                        <div class="col d-flex justify-content-end">
                            <div class="dropstart">                                
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-three-dots-vertical text-main dropdown-toggle" viewBox="0 0 16 16" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                                    </svg>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                    <li><a class="dropdown-item" href="#trendingNewsSection">See All</a></li>
                                </ul>
                            </div>
                           
                        </div>
                    </div>
                </div>
                    <div class="card-body">                    
                        <ol class="list-group list-group-flush mt-1 text-yellow" id="firstPageTrendingNews" style="max-width:calc(100vw - 10px);list-style-type: decimal;">
                        </ol>                   
                    </div>
                </div>
            </li>
            `);
        $("#qree").append($listItem);
        var count=1;
        $.each(results, function(k,v){
            var { hostname } = new URL(v.link);
            var $listItem = $(`                    
                <li class="list-group-item border-bottom mb-1"> 
                    <div class="row">
                        <div class="col-2 d-flex justify-content-center align-items-center">
                            <button type="button" class="btn btn-yellow btn-lg" disabled>${count}</button>
                        </div>
                        <div class="col">
                            <div class="d-flex gap-2 w-100 justify-content-between">
                                <div> 
                                    <a class="navbar-brand" href="${v.link}" target="_blank">
                                        <img src="https://icon.horse/icon/${hostname.replace("www.", "")}" alt="" width="24" height="24" class="d-inline-block align-text-top" onerror='imgError(this)'>
                                        <span class="mb-0 mt-0 smaller fw-bold text-yellow">${hostname.replace("www.", "")}</span> 
                                    </a>                                
                                    <h6 class="mb-0 mt-0 fw-bold">${v.title}</h6> 
                                </div>
                        </div>
                    </div>
                </li>
                `);
            $("#firstPageTrendingNews").append($listItem);
            count++;
        });

}

function populateWiki(data) {
   
    var mostread = data.mostread
    $("#qree").html(``);
    var image = data.image
    let imgsrc = image.thumbnail ? image.thumbnail : ``
    var $listItem = $(`                    
                    <li class="bg-light mb-1">   
                        <div class="card" style="width:100%;">
                            <div class="card-header text-yellow"><h5 class="fw-bold">Featured Image</h5></div>
                            <img src="${imgsrc}" class="card-img-top" alt="" onerror='imgError(this)' />
                            <div class="card-body"> 
                                <h5 class="mt-0 fw-bold">${image.description}</h5> 
                                <p class="mt-1 mb-0 small text-yellow fw-bold">Artist: ${image.artist}</p>
                            </details>         
                            </div>                            
                        </div>
                    </li>
                    `);
    $("#qree").append($listItem);
    var $listItem = $(`<h4 class="mt-4 fw-bold text-main ms-2">Most Read Articles</h4>`);
    $("#qree").append($listItem);    
    $.each(mostread.slice(0, 10), function (k, v) {
        let imgsrc = v.thumbnail ? v.thumbnail.source : ``
        var $listItem = $(`                    
        <li class="list-group-item border-bottom py-4 bg-light mb-1" >                                        
            <div class="d-flex gap-2 w-100 justify-content-between">
                <div>
                    <details>
                        <summary><h6 class="mb-0 mt-0 fw-bold">${v.title}</h6><br>
                            <p class="mb-0 mt-1 small fw-bold">${v.description}</p><br> 
                            <p class="mb-0 mt-1 small fw-bold text-yellow">Views: ${v.views.toLocaleString("en-GB")}</p>                         
                        </summary>
                        <p class="mb-0 mt-1 small">${v.extract}</p>  
                        <p class="mb-0 mt-1 small"><a href="${v.link}" target="_blank">Read full article on Wikipedia</a></p>   
                    </details>                                                        
                </div>
                <img src="${imgsrc}" alt="" width="96" height="96" class="flex-shrink-0 sqimg mt-0 rounded" onerror='imgError(this)' />
            </div>
        </li>
        `);
        $("#qree").append($listItem);
    });
    var tfa = data.tfa
    let taimgsrc = tfa.thumbnail ? tfa.thumbnail : ``
    var $listItem = $(`                    
                    <li class="bg-light mb-1">   
                        <div class="card mt-4" style="width:100%;">
                            <div class="card-header text-yellow"><h5 class="fw-bold">Featured Article</h5></div>
                            <img src="${taimgsrc}" class="card-img-top" alt="" onerror='imgError(this)' />
                            <div class="card-body"> 
                                <h5 class="mt-0 fw-bold">${tfa.title}</h5> 
                                <p class="mt-1 mb-0 small fw-bold">Artist: ${tfa.content}</p>
                            </details>         
                            </div>                            
                        </div>
                    </li>
                    `);
    $("#qree").append($listItem);
    
    var $listItem = $(`<h4 class="mt-4 fw-bold text-main ms-2">On this day</h4>`);
    $("#qree").append($listItem);
    $.each(data.otd, function(k,v){
        var details = ""     
        $.each(v.pages, function(i,j){
            details += `<div class="d-flex gap-2 w-100 justify-content-between my-4">
            <div>
                <details class="top-details" style="cursor:pointer"><summary><h6 class="mb-0 mt-0 fw-bold">${j.title}</h6><br>
                <p class="mb-0 mt-1 small fw-bold">${j.description}</p>                            
                </summary>
                <p class="mb-0 mt-1 small">${j.extract}</p>  
                <p class="mb-0 mt-1 small"><a href="${j.link}" target="_blank">Read full article on Wikipedia</a></p>   
                </details>                                                        
            </div>
            <img src="${j.thumbnail}" alt="" width="64" height="64" class="flex-shrink-0 sqimg mt-0 rounded" onerror='imgError(this)' />
        </div>`
        });
        var $listItem = $(`                    
        <li class="list-group-item border-bottom py-4 bg-light mb-1" >                                        
            <div class="d-flex gap-2 w-100 justify-content-between">
                <div>
                    <p class="mb-0 mt-1 fw-bold text-yellow">${v.year}</p> 
                    <details class="top-details" style="cursor:pointer"><summary><h6 class="mb-0 mt-0 fw-bold">${v.title}</h6>                
                    </summary>
                        ${details}
                    </details>                                                        
                </div>
               
            </div>	
           
        </li>
        `);           
        $("#qree").append($listItem);       
    });
}

function populateGoogleTrends(data){
    $("#qree").html(``);
    var $listItem = $(`<h4 class="mt-4 fw-bold text-main ms-2">Realtime trends</h4>`);
    $("#qree").append($listItem);
    $.each(data, function (k, v) {                
        let imgsrc = v.image.imgUrl ? `<img src="http:${v.image.imgUrl}" alt="" width="96" height="96" class="rounded sqimg d-flex justify-content-end" onerror='imgError(this)' />` : ``               
        var $listItem = $(`
        <li class="list-group-item border-bottom py-4 bg-light mb-0" style="cursor:pointer"> 
                <div class="d-flex gap-2 w-100 justify-content-between">
                    <div>                                                                              
                        <details>
                            <summary><h6 class="mt-0 fw-bold">${v.title}</h6></summary>
                            <ul class="list-group list-group-flush mt-3" id="${k}googleTrends">
                            </ul> 
                        </details>                   
                    </div>
                    ${imgsrc}
                </div>   
        </li>`);               
        $("#qree").append($listItem);
        $.each(v.articles, function (a, b) {                   
            var $listItem = $(
                            `<div class="d-flex gap-2 w-100 justify-content-between mb-2">
                            <details>
                                <summary><span class="">${b.articleTitle}</span></summary>
                                <div class="d-flex gap-2 w-100 justify-content-between mb-2 mt-2">
                                    <p class="small fw-bold">${b.snippet} <span class="text-muted"><a href="${b.url}" target="_blank" style="color:blue;text-decoration:underline">Read full article at ${b.source}</span></p>                                      
                                </div>                                                                           
                             </details> 
                            </div>`);                  
            $(`#${k}googleTrends`).append($listItem);
        });
    })
}

function populateEvents(data){    
    $("#qree").html("");    
    data  = JSON.parse(data);
    for (const [ key, value ] of Object.entries(data)) {
        var $listItem = $(`                    
            <li class="list-group-item border-bottom py-4 bg-light mb-1"> 
            <details>
                <summary><h6 class="mt-0 fw-bold">${key}</h6></summary>
                <ul class="list-group list-group-flush mt-2" id="${key.replaceAll(" ","").replaceAll("(","").replaceAll(")","")}" style="max-width:calc(100vw - 10px);">
                </ul>
            </details>   
            </li>
        `);
        $("#qree").append($listItem);
        $.each(value, function(k,v){ 
            if(v.properties.updates){
                v = v.properties.updates[v.properties.updates.length-1]
            }
            var unixtime = v.properties.lastUpdate;
            var currTime = Date.now();
            var timediff = Math.round(currTime / 1000 - unixtime/1000);
            if (timediff / 60 / 60 < 1) {
                timediff = Math.round(timediff / 60) + " minutes ago";
            } else if (Math.round(timediff / 60 / 60) === 1) {
                timediff = Math.round(timediff / 60 / 60) + " hour ago";
            } else {
                timediff = Math.round(timediff / 60 / 60) + " hours ago";
            }
            try{
                var $listItem = $(`                    
                <li class="list-group-item border-bottom py-2 bg-light mb-1">                                        
                    <div class="d-flex gap-2 w-100 justify-content-between">
                        <div>
                            <p class="small fw-bold text-yellow mb-0">${timediff}</p>
                            <details><summary>                              
                            <h6 class="mb-0 mt-0 fw-bold">${v.properties.title}</h6> 
                            </summary>
                            <p class="mb-0 mt-1 small">${v.properties.details}</p> 
                        </div>
                    </div>
                </li>
                `);       
                $(`#${key.replaceAll(" ","").replaceAll("(","").replaceAll(")","")}`).append($listItem);
            }catch(err){
                console.log(err,v);
            }
           
        })
    }  
    
}

function populateGoogleSearchTrends(data){
    $("#qree").html(``);
    var arr=[];
    $.each(data, function (k,v){
        $.each(v.default.trendingSearchesDays, function(i,j){            
            $.each(j.trendingSearches, function(a,b){                                
                arr.push({
                    "title":b.title,
                    "traffic":b.formattedTraffic,
                    "articles": b.articles,
                    "image": b.image.imageUrl,
                    "date": Date.parse(j.formattedDate),
                    "formattedDate": j.formattedDate

                })
            })
            
        })
    });
    arr = arr.sort(function (a, b) {
        return b.date - a.date;
    });
    var $listItem = $(`<h4 class="mt-4 fw-bold text-main ms-2">Trending Searches</h4>`);
    $("#qree").append($listItem);
    $.each(arr, function(k,v){        
        let imgsrc = v.image ? `<img src="${v.image}" alt="" width="96" height="96" class="rounded sqimg d-flex justify-content-end" onerror='imgError(this)' />` : ``    
        let article0imgsrc = v.articles[0].image ? v.articles[0].image.imageUrl : ``
        var $listItem = $(`
        <li class="list-group-item border-bottom py-4 bg-light mb-0" style="cursor:pointer"> 
                <div class="d-flex gap-2 w-100 justify-content-between">
                    <div>  
                        <p class="mb-0 mt-1 small">${v.formattedDate}</p>
                        <p class="mb-0 mt-0 fw-bold text-yellow">${v.traffic} Searches</p>                                                                             
                        <details>
                            <summary><h6 class="mt-0 fw-bold">${v.title.query}</h6><br>
                            <div class="d-flex gap-2 w-100 justify-content-between mb-2 mt-2">
                                <p class="mt-0">${v.articles[0].snippet}</p>
                                <img src="${article0imgsrc}" alt="" width="96" height="96" class="rounded sqimg d-flex justify-content-end" onerror='imgError(this)' />
                            </div>
                            </summary>
                            <ul class="list-group list-group-flush mt-3" id="${k}GoogleSearchTrends">
                            </ul> 
                        </details>                   
                    </div>                  
                </div>   
        </li>`);               
        $("#qree").append($listItem);
        $.each(v.articles.slice(1), function (a, b) { 
            let imgsrc1 = b.image ? b.image.imageUrl : ``  
            var $listItem = $(
                `<div class="d-flex gap-2 w-100 justify-content-between mb-2">
                    <details>
                        <summary><span class="">${b.title}</span></summary>
                        <div class="d-flex gap-2 w-100 justify-content-between mb-2 mt-2">
                            <p class="small fw-bold">${b.snippet} <span class="text-muted"><a href="${b.url}" target="_blank" style="color:blue;text-decoration:underline">Read full article at ${b.source}</span></p>                                      
                        </div>                                                                           
                    </details> 
                    <img src="${imgsrc1}" alt="" width="64" height="64" class="rounded sqimg d-flex justify-content-end" onerror='imgError(this)' />
                </div>`);   
            $(`#${k}GoogleSearchTrends`).append($listItem);
        });
    })
}

function populateWikiEvents(data){   
    $("#qree").html(``);
    var $listItem = $(`<h4 class="mt-2 mb-4 fw-bold text-main ms-2">Holidays, Births and Deaths</h4>`);
    $("#qree").append($listItem); 
    
    $("#qree").append(`
    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link active" id="holidays-tab" data-bs-toggle="tab" data-bs-target="#holidaysWiki" type="button" role="tab" aria-controls="holidays" aria-selected="true">Holidays</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="births-tab" data-bs-toggle="tab" data-bs-target="#birthsWiki" type="button" role="tab" aria-controls="births" aria-selected="false">Births</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="deaths-tab" data-bs-toggle="tab" data-bs-target="#deathsWiki" type="button" role="tab" aria-controls="deaths" aria-selected="false">Deaths</button>
        </li>        
    </ul>
    <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="holidaysWiki" role="tabpanel" aria-labelledby="holidays-tab"></div>
        <div class="tab-pane fade" id="birthsWiki" role="tabpanel" aria-labelledby="births-tab"></div>  
        <div class="tab-pane fade" id="deathsWiki" role="tabpanel" aria-labelledby="deaths-tab"></div>
    </div>
    `);

    $.each(data.holidays, function(k,v){
        var details = ""     
        $.each(v.pages, function(i,j){
            details += `<div class="d-flex gap-2 w-100 justify-content-between my-4">
            <div>
                <details class="top-details" style="cursor:pointer"><summary><h6 class="mb-0 mt-0 fw-bold">${j.title}</h6><br>
                <p class="mb-0 mt-1 small fw-bold">${j.description}</p>                            
                </summary>
                <p class="mb-0 mt-1 small">${j.extract}</p>  
                <p class="mb-0 mt-1 small"><a href="${j.link}" target="_blank">Read full article on Wikipedia</a></p>   
                </details>                                                        
            </div>
            <img src="${j.thumbnail}" alt="" width="64" height="64" class="flex-shrink-0 sqimg mt-0 rounded" onerror='imgError(this)' />
        </div>`
        });
        var $listItem = $(`                    
        <li class="list-group-item border-0 border-bottom py-4 bg-light mb-1" >                                        
            <div class="d-flex gap-2 w-100 justify-content-between">
                <div>                    
                    <details class="top-details" style="cursor:pointer"><summary><h6 class="mb-0 mt-0 fw-bold">${v.title}</h6>                
                    </summary>
                        ${details}
                    </details>                                                        
                </div>
               
            </div>	
           
        </li>
        `);           
        $("#holidaysWiki").append($listItem);       
    });
      
    $.each(data.births, function(k,v){
        var details = ""     
        $.each(v.pages.slice(0,1), function(i,j){
            details += `<div class="d-flex gap-2 w-100 justify-content-between">
                <div>
                <p class="mb-0 mt-2 fw-bold text-yellow">${v.year}</p> 
                <details class="top-details" style="cursor:pointer"><summary><h6 class="mb-0 mt-0 fw-bold">${j.title}</h6><br>
                <p class="mb-0 mt-1 small fw-bold">${j.description}</p>                            
                </summary>
                <p class="mb-0 mt-1 small">${j.extract}</p>  
                <p class="mb-0 mt-1 small"><a href="${j.link}" target="_blank">Read full article on Wikipedia</a></p>   
                </details>                                                        
            </div>
            <img src="${j.thumbnail}" alt="" width="64" height="64" class="flex-shrink-0 sqimg mt-0 rounded" onerror='imgError(this)' />
        </div>`
        });
        var $listItem = $(`                    
        <li class="list-group-item border-0 border-bottom py-2 bg-light mb-1" >                                        
            <div>                    
                ${details}                                                      
            </div> 	           
        </li>
        `);           
        $("#birthsWiki").append($listItem);      
    });
     
    $.each(data.deaths, function(k,v){
        var details = ""     
        $.each(v.pages.slice(0,1), function(i,j){
            details += `<div class="d-flex gap-2 w-100 justify-content-between">
                <div>
                <p class="mb-0 mt-2 fw-bold text-yellow">${v.year}</p> 
                <details class="top-details" style="cursor:pointer"><summary><h6 class="mb-0 mt-0 fw-bold">${j.title}</h6><br>
                <p class="mb-0 mt-1 small fw-bold">${j.description}</p>                            
                </summary>
                <p class="mb-0 mt-1 small">${j.extract}</p>  
                <p class="mb-0 mt-1 small"><a href="${j.link}" target="_blank">Read full article on Wikipedia</a></p>   
                </details>                                                        
            </div>
            <img src="${j.thumbnail}" alt="" width="64" height="64" class="flex-shrink-0 sqimg mt-0 rounded" onerror='imgError(this)' />
        </div>`
        });
        var $listItem = $(`                    
        <li class="list-group-item border-0 border-bottom py-2 bg-light mb-1" >                                        
            <div>                    
                ${details}                                                      
            </div> 	           
        </li>
        `);           
        $("#deathsWiki").append($listItem);       
    });
  
}

function populateTrendingNews(data){
    $("#qree").html(``);   
    var $listItem = $(`<h4 class="mt-4 fw-bold text-main ms-2">Trending News</h4>`);
    $("#qree").append($listItem); 
    var count=1;
    $.each(data, function (k, v) {
        var unixtime = v.created;
        var currTime = Date.now();
        var timediff = Math.round(currTime / 1000 - unixtime);
        if (timediff / 60 / 60 < 1) {
            timediff = Math.round(timediff / 60) + " minutes ago";
        } else if (Math.round(timediff / 60 / 60) === 1) {
            timediff = Math.round(timediff / 60 / 60) + " hour ago";
        } else {
            timediff = Math.round(timediff / 60 / 60) + " hours ago";
        }
         try{
            var { hostname } = new URL(v.link);
        }catch(err){
            console.error(v.link);
        }
        let thumbnail = v.thumbnail ? `<img src="${v.thumbnail}" alt="" width="96" height="96" class="flex-shrink-0 mt-2 sqimg rounded" onerror='imgError(this)' />` : `<img src="https://icon.horse/icon/${hostname.replace("www.", "")}" alt="" width="64" height="64" class="flex-shrink-0 sqimg mt-2 rounded" onerror='imgError(this)' />`               
        var $listItem = $(`                    
        <li class="list-group-item border-bottom mb-1 py-4"> 
            <div class="row">                
                <div class="col">
                    <div class="d-flex gap-2 w-100 justify-content-between">
                        <div> 
                            <a class="navbar-brand" href="${v.link}" target="_blank">                                
                                <span class="mb-0 mt-0 smaller fw-bold text-yellow">${hostname.replace("www.", "")}</span> 
                            </a>                                
                            <h6 class="mb-0 fw-bold">${v.title}</h6> 
                        </div>
                        ${thumbnail}
                </div>
            </div>
        </li>
        `);
        // var $listItem = $(`                    
        //                 <li class="list-group-item border-bottom mb-1 py-4"> 
        //                     <div class="row">
        //                         <div class="col-1 d-flex justify-content-center align-items-center">
        //                             <button type="button" class="btn btn-yellow btn-sm" disabled>${count}</button>
        //                         </div>
        //                         <div class="col">
        //                             <div class="d-flex gap-2 w-100 justify-content-between">
        //                                 <div>                                            
        //                                     <h6 class="mb-0 mt-0 fw-bold">${v.title}</h6> 
        //                                     <p class="mb-0 mt-0 small text-yellow fw-bold">${hostname.replace("www.", "")}</p> 
        //                                 </div>
        //                                 ${thumbnail}
        //                                 </div>
        //                         </div>
        //                     </div>
        //                 </li>
        //                 `);
        // $listItem.on("click", function (e) {
        //     getArticleExtract(v.link)
        //     window.location = "#DetailsSection";
        //     p();
        //     // window.open(v.link, '_blank');                   
        // });
        $("#qree").append($listItem);
        count++;
    });
}

function populateTopNews(data){  
    $("#loadertopNewsSection").addClass("d-flex align-items-center").show();
    $("#qree").html("");
    var count = 0
    $.each(data, function (k, v) {       
        try { 
            var { hostname } = new URL(v.link);
            let imgsrc = v.media ? v.media : ``          
            var $listItem = $(`                    
            <li class="list-group-item border-bottom py-4 bg-light mb-1">                                        
                <div class="d-flex gap-2 w-100 justify-content-between">
                    <div>                                                               
                        <details>
                            <summary><h6 class="mt-0 fw-bold">${v.title}</h6><br>                            
                            </summary>  
                            <p class="smaller fw-bold mb-0"><span class="text-yellow">${hostname}</span>, <span class="text-main">${v.date}</span></p>                           
                            <p class="mt-1 small">${v.excerpt}</p>
                            <p class="mt-1 small"><a href="#detailedHomeNews" onclick="javascript:populateDetails(${k})">Read full article</a></p>
                        </details>                   
                    </div>
                    <img src="${imgsrc}" alt="" width="96" height="96" class="flex-shrink-0 mt-2 sqimg rounded" onerror='imgError(this)' />
                </div>
            </li>
            `);           
            $("#qree").append($listItem);
        } catch (err) {
            // console.log(v.link, err);
        }
    });        
    $("body").css({ "opacity": "1" });
    $("body").css({"cursor": ""});
    $("#qree").focus();
    $("#loadertopNewsSection").removeClass("d-flex align-items-center").hide();
}

function populateDetails(k) {
    v = getLocalStorage("TopNews")[k]
    $("#qree").html(``);
    var { hostname } = new URL(v.link);
    var $listItem = $(`
                    <li class="list-group-item border-bottom bg-light py-4 mb-1">
                        <div class="row">                    
                            <div class="col-12">                                
                                <p class="smaller fw-bold mb-0"><span class="text-yellow">${hostname}</span>, <span class="text-main">${v.date}</span></p> 
                               <h5 class="mt-0 fw-bold">${v.title}</h5>
                                <p class="mt-1 small">${v.content}</p>
                            </div>                   
                        </div>
                    </li>                              
                    `);
    $("#qree").append($listItem);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function populateNearbyNews(data){
    $("#qree").html("");
    let imgsrc0 = data.items[0].banner_image ? data.items[0].banner_image : ``
    let imgsrc1 = data.items[1].banner_image ? data.items[1].banner_image : ``
    let imgsrc2 = data.items[2].banner_image ? data.items[2].banner_image : ``    
    var $listItem = $(`                    
                <li class="list-group-item border-bottom py-4 bg-light mb-1">   
                    <div class="card" style="width:100%;">
                        <img src="${imgsrc0}" class="card-img-top" alt="">
                        <div class="card-body">                    
                            <h5 class="mt-0 fw-bold">${data.items[0].title}</h5>                    
                        </div>
                        <div class="card-footer small text-yellow fw-bold "><a href="${data.items[0].url}" class="text-yellow underline text-truncate" style="max-width:40px">${new URL(data.items[0].url).hostname}</a></div>
                    </div> 
                    <div class="row mt-2 g-0">
                        <div class="col">
                            <div class="card h-100" style="width:100%;">
                                <img src="${imgsrc1}" class="card-img-top" alt="">
                                <div class="card-body">                            
                                    <h6 class="mt-0 fw-bold">${data.items[1].title}</h6>  
                                    <a href="${data.items[1].url}" class="text-yellow underline text-truncate fw-bold small" style="max-width:40px">source</a>
                                </div>                                
                            </div> 
                        </div>
                        <div class="col">
                            <div class="card h-100" style="width:100%;">
                                <img src="${imgsrc2}" class="card-img-top" alt="">
                                <div class="card-body">                             
                                    <h6 class="mt-0 fw-bold">${data.items[2].title}</h6>   
                                    <a href="${data.items[2].url}" class="text-yellow underline text-truncate small fw-bold" style="max-width:40px">source</a>                   
                                </div>                                
                            </div>
                        </div>
                    </div>
                </li>
                `);
    $("#qree").append($listItem);
    $.each(data.items.slice(3), function (k, v) {
        var { hostname } = new URL(v.url);
        var $listItem = $(`                    
        <li class="list-group-item border-bottom py-4 bg-light mb-1" style="cursor:pointer">                                        
            <div class="d-flex gap-2 w-100 justify-content-between">
                <div>                    
                    <h6 class="mb-0 mt-0 fw-bold">${v.title}</h6>       
                    <p class="mb-0 mt-0 small fw-bold text-yellow">${hostname}</p>         
                </div>
                <img src="${v.banner_image}" alt="" width="64" height="64" class="flex-shrink-0 sqimg rounded" onerror='imgError(this)' />
            </div>	
           
        </li>
        `);
        $listItem.on("click", function (e) {
            window.open(v.url, '_blank');
        });
        
        $("#newsNearMe").append($listItem);
    })
}

function populateTrendingPosts(data){
    $("#qree").html("");
    $.each(data, function (k, v) {       
        try {            
            let imgsrc = v.image ? v.image : ``          
            var $listItem = $(`                    
            <li class="list-group-item border-bottom py-4 bg-light mb-1">                                        
                <div class="d-flex gap-2 w-100 justify-content-between">
                    <div>     
                        <p class="small fw-bold text-main mb-0">${v.date}</p>                                                                            
                        <details>
                            <summary><h6 class="mt-0 fw-bold">${v.title}</h6><br>
                            <p class="mb-2 mt-0 small text-yellow fw-bold">${v.hostname}</p>
                            </summary>                            
                            <p class="mt-1 small">${v.excerpt}</p>
                            <p class="mt-1 small"><a href="#detailedHomeNews" onclick="javascript:populateWPDetails(${k})">Read full article</a></p>
                        </details>                   
                    </div>
                    <img src="${imgsrc}" alt="" width="96" height="96" class="flex-shrink-0 mt-2 sqimg rounded" onerror='imgError(this)' />
                </div>
            </li>
            `);           
            $("#qree").append($listItem);
        } catch (err) {
            // console.log(v.link, err);
        }
    });        
    $("body").css({ "opacity": "1" });
    $("body").css({"cursor": ""});
    $("#qree").focus();
}

function populateLongReads(data){
    $("#qree").html("");
    $.each(data, function (k, v) {       
        try {            
            let imgsrc = v.image ? v.image : ``          
            var $listItem = $(`                    
            <li class="list-group-item border-bottom py-4 bg-light mb-1">                                        
                <div class="d-flex gap-2 w-100 justify-content-between">
                    <div>     
                        <p class="small fw-bold text-main mb-0">${v.date}</p>                                                                            
                        <details>
                            <summary><h6 class="mt-0 fw-bold">${v.title}</h6><br>
                            <p class="mb-2 mt-0 small text-yellow fw-bold">${v.hostname}</p>
                            </summary>                            
                            <p class="mt-1 small">${v.excerpt}</p>
                            <p class="mt-1 small"><a href="#detailedHomeNews" onclick="javascript:populateWPDetails(${k})">Read full article</a></p>
                        </details>                   
                    </div>
                    <img src="${imgsrc}" alt="" width="96" height="96" class="flex-shrink-0 mt-2 sqimg rounded" onerror='imgError(this)' />
                </div>
            </li>
            `);           
            $("#qree").append($listItem);
        } catch (err) {
            // console.log(v.link, err);
        }
    });        
    $("body").css({ "opacity": "1" });
    $("body").css({"cursor": ""});
    $("#qree").focus();
}

function populateWPDetails(v) {
    v = getLocalStorage("LongReads")[v]
    $("#qree").html(``);
    var $listItem = $(`
                    <li class="list-group-item border-bottom bg-light py-4 mb-1">
                        <div class="row">                    
                            <div class="col-12">                                
                                <p class="small">${v.date}</p>
                                <h5>${v.title}</h5>
                                <p>${v.content}</p>
                            </div>                   
                        </div>
                    </li>                              
                    `);
    $("#qree").append($listItem);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function populateStreams(data){
    $("#qree").html(``);
    var $listItem = $(`<h4 class="mt-2 mb-4 fw-bold text-main ms-2">Trending Movies & Shows</h4>`);
    $("#qree").append($listItem);
    $("#qree").append(`
    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link active" id="movies-tab" data-bs-toggle="tab" data-bs-target="#streamMovies" type="button" role="tab" aria-controls="movies" aria-selected="true">Movies</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="shows-tab" data-bs-toggle="tab" data-bs-target="#streamShows" type="button" role="tab" aria-controls="shows" aria-selected="false">Shows</button>
        </li>        
    </ul>
    <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="streamMovies" role="tabpanel" aria-labelledby="movies-tab"></div>
        <div class="tab-pane fade" id="streamShows" role="tabpanel" aria-labelledby="shows-tab"></div>        
    </div>
    `);
    $.each(data[1], function (k, v) {
        var $listItem = $(`                    
        <li class="list-group-item border-0 border-bottom py-4 bg-light mb-1">                                        
            <div class="d-flex gap-2 w-100 justify-content-between">
                <div>    
                    <h6 class="mt-0 mb-0 fw-bold">${v.title}</h6> 
                    <p class="small text-main mb-0">Released: ${new Date(v.released_on.toString()).toDateString()}</p>  
                    <p class="mb-0 small text-yellow fw-bold">IMDB Ratings: ${v.imdb_rating}</p>                                                                                         
                    <details>
                        <summary>Availabile On                    
                        </summary>                 
                        <p class="mt-0 small">${v.availability_pros}</p>  
                    </details>                   
                    <details><summary>Overview</summary><p class="mt-1 small">${v.overview}</p> </details>
                    <!--<details><summary></summary></details>-->
                </div>
                <img src="https://img.reelgood.com/content/movie/${v.id}/poster-342.jpg" alt="" width="96" height="96" class="flex-shrink-0 mt-2 sqimg rounded" onerror='imgError(this)' />
            </div>
        </li>
        `);   
    $("#streamMovies").append($listItem);
    }); 
    $.each(data[0], function (k, v) {
        var $listItem = $(`                    
        <li class="list-group-item border-0 border-bottom py-4 bg-light mb-1">                                        
            <div class="d-flex gap-2 w-100 justify-content-between">
                <div>    
                    <h6 class="mt-0 mb-0 fw-bold">${v.title}</h6> 
                    <p class="small text-main mb-0">Released: ${new Date(v.released_on.toString()).toDateString()}</p>  
                    <p class="mb-0 small text-yellow fw-bold">IMDB Ratings: ${v.imdb_rating}</p>                                                                                         
                    <details>
                        <summary>Availabile On                    
                        </summary>                 
                        <p class="mt-0 small">${v.availability_pros}</p>  
                    </details>                   
                    <details><summary>Overview</summary><p class="mt-1 small">${v.overview}</p> </details>
                    <!--<details><summary></summary></details>-->
                </div>
                <img src="https://img.reelgood.com/content/show/${v.id}/poster-342.jpg" alt="" width="96" height="96" class="flex-shrink-0 mt-2 sqimg rounded" onerror='imgError(this)' />
            </div>
        </li>
        `);   
    $("#streamShows").append($listItem);
    });
}

function populateImagery(data){
    
    $("#qree").html("");
    var $listItem = $(`<h4 class="mt-4 fw-bold text-main ms-2">Trending News Imagery</h4>`);
    $("#newsImagery").append($listItem);
    $.each(data, function (k, v) {
        var details= "";
        $.each(v.imageweburls, function(i,j){
            details += `<a href="${j}">${new URL(j).hostname}</a><br>`;
        }); 
        var $listItem = $(`                    
        <li class="list-group-item border-bottom py-4 bg-light mb-1">                                        
            <div class="d-flex gap-2 w-100 justify-content-between">
                <div>             
                    Seen on <a href="${v.sourcearticleurl}">${new URL(v.sourcearticleurl).hostname}</a> and 
                        <span class="fw-bold text-yellow">${v.imagewebcount}</span> other websites including
                        <p class="mt-0 small">${details}</p>  
                </div>
                <img src="${v.imageurl}" alt="" width="96" height="96" class="flex-shrink-0 mt-2 sqimg rounded" onerror='imgError(this)' />
            </div>
        </li>
        `);   
    $("#qree").append($listItem);
    });   
}

function populateTrendingImages(data){    
    $("#qree").html(``);   
    var $listItem = $(`<h4 class="mt-4 fw-bold text-main ms-2">Trending Images</h4>`);
    $("#qree").append($listItem); 
    var count=1;
    $.each(data, function (k, v) {       
        let thumbnail = v.thumbnail ? v.thumbnail : `` 
       
         var $listItem = $(`                    
                        <li class="list-group-item border-bottom mb-1 py-4"> 
                            <div class="card" style="width:100%;">
                                <img src="${thumbnail}" class="card-img-top" alt="" onerror='imgParentError(this)'>
                                <div class="card-body">                    
                                    <h6 class="mt-0 fw-bold">${v.title}</h6>  
                                    <p class="mt-0 fw-bold small text-yellow">credit: ${v.author}</h6>                     
                                </div>
                            </div> 
                        </li>
                        `);
        ;   
         //    https://preview.redd.it/51p5ijus3y881.png?width=3384&format=png&auto=webp&s=e1659e2c75773633e5c5feab28078e2c71e3266e
        /* var $listItem = $(`                    
                        <li class="list-group-item border-bottom mb-1 py-4"> 
                            <div class="d-flex gap-2 w-100 justify-content-between">
                                <div>                                            
                                    <h6 class="mb-0 mt-0 fw-bold">${v.title}</h6>                                    
                                </div>
                                ${thumbnail}
                            </div>
                        </li>
                        `);
        ; */
        $("#qree").append($listItem);
        count++;
    });
}

function imgParentError(image) {
    $(image).parent().parent().hide(); 
 }
 function getWPORGFeaturedMediaURL(id){
    return new Promise((resolve, reject)=>{
        try{
            urls = ["id"]
            async.mapLimit(urls, 1, async function (url) {
                try {
                    const response = await fetch(url);
                    return response.json()
                } catch (err) {
                    resolve({})
                }
            }, (err, results) => {
                response = results[0].source_url;
                resolve(response)
            })
        }catch(err){reject(err)}        
    })  
    
}

