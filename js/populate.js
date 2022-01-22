
// Helper Functions
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
function imgParentError(image) {
    $(image).parent().parent().hide();
}
function getWPORGFeaturedMediaURL(id) {
    return new Promise((resolve, reject) => {
        try {
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
        } catch (err) { reject(err) }
    })

}
function imgErrorPeople(k, name) {
    $(`#fig${k}`).html(`
         <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" class="bi bi-person border-1" viewBox="0 0 16 16">
             <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
         </svg>
         <figcaption class="text-black small mt-0 fw-bold">${name}</figcaption>
         `);
    // console.clear();
}
function imgErrorloadicon(image,hostname) {
    $(image).attr("src",`https://icon.horse/icon/${hostname.replace("www.", "")}`);
}

// Home Page
function populateHomeTopNews(data) {
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
                        <h5 class="mt-0 mb-0 fw-bold">${data[0].title}</h5>
                        <a href="${data[0].link}" class="text-yellow fw-bold" target="_blank">
                          <u>source</u>
                        </a>                    
                    </div>          
                </div> 
                <div class="row mt-2 g-0">
                    <div class="col">
                        <div class="card h-100" style="width:100%;">
                            <img src="${imgsrc1}" class="card-img-top" alt="">
                            <div class="card-body">                            
                                <h6 class="mt-0 fw-bold">${data[1].title}</h6>  
                                <a href="${data[1].link}" class="text-yellow underline fw-bold" target="_blank">source</a>
                            </div>                    
                        </div> 
                    </div>
                    <div class="col">
                        <div class="card h-100" style="width:100%;">
                            <img src="${imgsrc2}" class="card-img-top" alt="">
                            <div class="card-body">                             
                                <h6 class="mt-0 fw-bold">${data[2].title}</h6>  
                                <a href="${data[2].link}" class="text-yellow underline fw-bold" target="_blank">source</a>
                            </div>                   
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
                        <p class="mb-0 mt-0 small text-yellow fw-bold"><a href="${v.link}" class="text-yellow underline" target="_blank">${v.source}</a></p> 
                    </div>
                    <img src="${imgsrc}" alt="" width="96" height="96" class="flex-shrink-0 sqimg rounded" onerror='imgErrorloadicon(this,"${v.source}")' />
                </div>
            </li>
            `);
            $listItem.on("click", function (e) {
                $("#modalTitle").html("");
                $("#modalBody").html("");
                getArticleExtract(v.link);
            });
            $("#qree").append($listItem);
        })
    } catch (err) {

    }
}
function populateHomeTopStoriesfromGoogle(data) {    
    $("#qree").html(``);
    var $listItem = $(`<h4 class="mt-2 fw-bold text-main ms-2">Top Stories</h4>`);
    $("#qree").append($listItem);
    try {
        var {hostname} =  new URL(data[0].alturl);
        let imgsrc0 = data[0].visual ? data[0].visual : data[0].alt_visual       
        var $listItem = $(`                    
            <li class="list-group-item border-bottom py-4 bg-light mb-1">   
                <div class="card" style="width:100%;">
                    <img src="${imgsrc0}" class="card-img-top" alt="">
                    <div class="card-body">  
                        <p class="mb-0 mt-0 small text-yellow fw-bold"><a href="${data[0].alturl}" class="text-yellow underline" target="_blank">${hostname}</a></p>                  
                        <h5 class="mt-0 mb-0 fw-bold">${data[0].title}</h5>  
                        <details class="mt-2">
                            <summary>Related Stories</summary>
                            ${data[0].summary}
                        </details>                                         
                    </div>          
                </div>                 
        </li>
        `);        
        $("#qree").append($listItem);        
        $.each(data.slice(1), function (k, v) {
            let imgsrc = v.visual ? v.visual : v.alt_visual
            var { hostname } = new URL(v.alturl)
            var $listItem = $(`                    
            <li class="list-group-item border-bottom py-4 bg-light mb-1">                                        
                <div class="d-flex gap-2 w-100 justify-content-between">
                    <div>       
                        <p class="mb-0 mt-0 small text-yellow fw-bold"><a href="${v.alturl}" class="text-yellow underline" target="_blank">${hostname}</a></p>                         
                        <h6 class="mb-0 mt-0 fw-bold">${v.title}</h6>
                    </div>
                    <img src="${imgsrc}" alt="" width="96" height="96" class="flex-shrink-0 sqimg rounded" onerror='imgErrorloadicon(this,"${hostname}")' />
                </div>
                <details class="mt-2">
                <summary>Related Stories</summary>
                    <div class="mt-2">${v.summary}</div>
                </details>
            </li>
            `);
            // $listItem.on("click", function (e) {
            //     $("#modalTitle").html("");
            //     $("#modalBody").html("");
            //     getArticleExtract(v.link);
            // });
            $("#qree").append($listItem);
        })
    } catch (err) {
    }
    // $('li:contains("View Full")').remove();
    // $('li > a:contains("View Full")').remove();
    $('li > strong > a:contains("View Full")').remove();
    $('li > strong').remove();
    $('ol li:last-child').remove();
}
function populateHomeTrendingNews(results) {
    arr = []
    var $listItem = $(`
            <li class="bg-light mb-1">        
                <div class="card mt-2" style="width:100%;">
                <div class="card-header bg-white">
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
    var count = 1;
    $.each(results, function (k, v) {
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

// Trending Wiki
function populateWiki(data) {
    $("#qree").html(``);
    var $listItem = $(`<h4 class="mt-4 mb-4 fw-bold text-main ms-2">Most Read Articles, Featured and On this day</h4>`);
    $("#qree").append($listItem);
    $("#qree").append(`
    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link active" id="mostread-tab" data-bs-toggle="tab" data-bs-target="#mostread" type="button" role="tab" aria-controls="mostread" aria-selected="true">Most Read</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="featured-tab" data-bs-toggle="tab" data-bs-target="#featured" type="button" role="tab" aria-controls="featured" aria-selected="false">Featured</button>
        </li>     
        <li class="nav-item" role="presentation">
        <button class="nav-link" id="otd-tab" data-bs-toggle="tab" data-bs-target="#otd" type="button" role="tab" aria-controls="otd" aria-selected="false">OTD</button>
    </li>   
    </ul>
    <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="mostread" role="tabpanel" aria-labelledby="mostread-tab"></div>
        <div class="tab-pane fade" id="featured" role="tabpanel" aria-labelledby="featured-tab"></div> 
        <div class="tab-pane fade" id="otd" role="tabpanel" aria-labelledby="otd-tab"></div>       
    </div>
    `);
    var mostread = data.mostread
    $.each(mostread, function (k, v) {
        let imgsrc = v.thumbnail ? v.thumbnail.source : ``
        var $listItem = $(`                    
        <li class="list-group-item border-0 border-bottom py-4 bg-light mb-1" >                                        
            <div class="d-flex gap-2 w-100 justify-content-between">
                <div>
                    <h6 class="mb-0 mt-0 fw-bold">${v.title}</h6>
                    <p class="mb-0 mt-1 small fw-bold">${v.description}</p> 
                    <p class="mb-0 mt-1 small fw-bold text-yellow">Views: ${v.views.toLocaleString("en-GB")}</p>                                                     
                </div>
                <img src="${imgsrc}" alt="" width="96" height="96" class="flex-shrink-0 sqimg mt-0 rounded" onerror='imgError(this)' />
            </div>
            <div>
                <details>
                    <summary><span class="smaller fw-bold mt-2">Read more about ${v.title}</span></summary>
                    <p class="mb-0 mt-1 small">${v.extract}</p>
                    <p class="mb-0 mt-1 small"><a href="${v.link}" target="_blank">Read full article on Wikipedia</a></p>
                </details>
            </div>
        </li>
        `);
        $("#mostread").append($listItem);
    });
    var image = data.image
    let imgsrc = image.thumbnail ? image.thumbnail : ``
    var $listItem = $(`                    
                    <li class="bg-light mt-4 mb-1">   
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
    $("#featured").append($listItem);
    var tfa = data.tfa
    let taimgsrc = tfa.thumbnail ? tfa.thumbnail : ``
    var $listItem = $(`                    
                    <li class="bg-light mb-1">   
                        <div class="card mt-4" style="width:100%;">
                            <div class="card-header text-yellow"><h5 class="fw-bold">Featured Article</h5></div>
                            <img src="${taimgsrc}" class="card-img-top" alt="" onerror='imgError(this)' />
                            <div class="card-body"> 
                                <h5 class="mt-0 fw-bold">${tfa.title}</h5> 
                                <p class="mt-1 mb-0 small fw-bold">${tfa.content}</p>
                            </details>         
                            </div>                            
                        </div>
                    </li>
                    `);
    $("#featured").append($listItem);


    $.each(data.otd, function (k, v) {
        var details = ""
        $.each(v.pages, function (i, j) {
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
        $("#otd").append($listItem);
    });
}

// Trending Searches
function populateGoogleTrends(data) {
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

// Trending Events
function populateEvents(data) {
    var byCategory = groupBy(data, (c) => c.category);
    $("#qree").html("");
    for (const [key, value] of Object.entries(byCategory)) {
        var $listItem = $(`                    
            <li class="list-group-item border-bottom py-4 bg-light mb-1"> 
            <details>
                <summary><h6 class="mt-0 fw-bold">${key}</h6></summary>
                <ul class="list-group list-group-flush mt-2" id="${key.replaceAll(" ", "").replaceAll("(", "").replaceAll(")", "")}" style="max-width:calc(100vw - 10px);">
                </ul>
            </details>   
            </li>
        `);
        $("#qree").append($listItem);
        $.each(value, function (k, v) {
            var unixtime = v.date;
            var currTime = Date.now();
            var timediff = Math.round(currTime / 1000 - unixtime / 1000);
            if (timediff / 60 / 60 < 1) {
                timediff = Math.round(timediff / 60) + " minutes ago";
            } else if (Math.round(timediff / 60 / 60) === 1) {
                timediff = Math.round(timediff / 60 / 60) + " hour ago";
            } else if (Math.round(timediff / 60 / 60) > 1 && Math.round(timediff / 60 / 60) < 24) {
                timediff = Math.round(timediff / 60 / 60) + " hours ago";
            } else if (Math.round(timediff / 60 / 60) === 24) {
                timediff = Math.round(timediff / 60 / 60) + " day ago";
            } else {
                timediff = Math.round(timediff / 60 / 60 / 24) + " days ago";
            }
            try {
                var $listItem = $(`                    
                <li class="list-group-item border-bottom py-2 bg-light mb-1">                                        
                    <div class="d-flex gap-2 w-100 justify-content-between">
                        <div>
                            <p class="small fw-bold text-yellow mb-0">${timediff}</p>
                            <details><summary>                              
                            <h6 class="mb-0 mt-0 fw-bold">${v.title}</h6> 
                            </summary>
                            <p class="mb-0 mt-2 text-main smaller">${new Date(v.date)}</p>
                            <p class="mb-0 mt-1 small">${v.details}</p> 
                        </div>
                    </div>
                </li>
                `);
                $(`#${key.replaceAll(" ", "").replaceAll("(", "").replaceAll(")", "")}`).append($listItem);
            } catch (err) {
                console.log(err, v);
            }

        })
    }

}

// Realtime Trends
function populateGoogleSearchTrends(data) {
    $("#qree").html(``);
    var arr = [];
    $.each(data, function (k, v) {
        $.each(v.default.trendingSearchesDays, function (i, j) {
            $.each(j.trendingSearches, function (a, b) {
                arr.push({
                    "title": b.title,
                    "traffic": b.formattedTraffic,
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
    $.each(arr, function (k, v) {
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

// HBD Today
function populateWikiEvents(data) {
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

    $.each(data.holidays, function (k, v) {
        var details = ""
        $.each(v.pages, function (i, j) {
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

    $.each(data.births, function (k, v) {
        var details = ""
        $.each(v.pages.slice(0, 1), function (i, j) {
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

    $.each(data.deaths, function (k, v) {
        var details = ""
        $.each(v.pages.slice(0, 1), function (i, j) {
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

// Trending News
function populateTrendingNews(data) {
    $("#qree").html(``);
    var $listItem = $(`<h4 class="mt-4 fw-bold text-main ms-2">Trending News</h4>`);
    $("#qree").append($listItem);
    var count = 1;
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
        try {
            var { hostname } = new URL(v.link);
        } catch (err) {
            console.error(v.link);
        }
        let thumbnail = v.thumbnail ? `<img src="${v.thumbnail}" alt="" width="96" height="96" class="flex-shrink-0 mt-2 sqimg rounded" onerror='imgErrorloadicon(this,"${hostname}")'  />` : `<img src="https://icon.horse/icon/${hostname.replace("www.", "")}" alt="" width="64" height="64" class="flex-shrink-0 sqimg mt-2 rounded" onerror='imgError(this)' />`
        var $listItem = $(`                    
        <li class="list-group-item border-bottom mb-1 py-4"> 
            <div class="row">                
                <div class="col">
                    <div class="d-flex gap-2 w-100 justify-content-between">
                        <div> 
                            <a class="navbar-brand" href="${v.link}" target="_blank">                                
                                <span class="mb-0 mt-0 smaller underline fw-bold text-yellow">${hostname.replace("www.", "")}</span> 
                            </a>                                
                            <h6 class="mb-0 fw-bold">${v.title}</h6> 
                        </div>
                        ${thumbnail}
                </div>
            </div>
        </li>
        `);        
        $("#qree").append($listItem);
         $listItem.on("click", function (e) {
                $("#modalTitle").html("");
                $("#modalBody").html("");
                getArticleExtract(v.link);
            });
        count++;
    });
}

// Top News
function populateTopNews(data) {
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
                        <p class="small fw-bold mb-0"><span class="text-yellow">${hostname}</span></p>
                        <h6 class="mt-0 fw-bold">${v.title}</h6>
                        <p class="smaller fw-bold mb-0"><span class="text-main">${v.date}</span></p>
                    </div>
                    <img src="${imgsrc}" alt="" width="96" height="96" class="flex-shrink-0 mt-2 sqimg rounded" onerror='imgError(this)' />
                </div>
                <p class="mt-1 small">${v.excerpt}</p> 
                <div>
                    <details>
                        <summary>Read Full article</summary>
                        
                    </details>  
                </div>
            </li>
            `);
            $("#qree").append($listItem);
        } catch (err) {
            // console.log(v.link, err);
        }
    });
    $("#loadertopNewsSection").removeClass("d-flex align-items-center").hide();
}

// Nearby News
function populateNearbyNews(data) {
    $("#qree").html("");
    let imgsrc0 = data.items[0].banner_image ? data.items[0].banner_image : ``
    let imgsrc1 = data.items[1].banner_image ? data.items[1].banner_image : ``
    let imgsrc2 = data.items[2].banner_image ? data.items[2].banner_image : ``
    var $listItem = $(`                    
                <li class="list-group-item border-bottom py-4 bg-light mb-1">   
                    <div class="card" style="width:100%;">
                        <img src="${imgsrc0}" class="card-img-top" alt="">
                        <div class="card-body">
                            <p class="mb-0 mt-0 fw-bold text-main">${data.items[0].title.split(":")[0].split(",")[0]}</p>                    
                            <h5 class="mb-0 mt-0 fw-bold">${data.items[0].title.split(":")[1]}</h5>       
                            <a href="${data.items[0].url}" class="text-yellow underline text-truncate small">source</a>
                        </div>
                    </div> 
                    <div class="row mt-2 g-0">
                        <div class="col">
                            <div class="card h-100" style="width:100%;">
                                <img src="${imgsrc1}" class="card-img-top" alt="">
                                <div class="card-body">                            
                                    <p class="mb-0 mt-0 fw-bold text-main">${data.items[1].title.split(":")[0].split(",")[0]}</p>                    
                                    <h6 class="mb-0 mt-0 fw-bold">${data.items[1].title.split(":")[1]}</h6>       
                                    <a href="${data.items[1].url}" class="text-yellow underline text-truncate small">source</a>
                                </div>                                
                            </div> 
                        </div>
                        <div class="col">
                            <div class="card h-100" style="width:100%;">
                                <img src="${imgsrc2}" class="card-img-top" alt="">
                                <div class="card-body">                             
                                    <p class="mb-0 mt-0 fw-bold text-main">${data.items[2].title.split(":")[0].split(",")[0]}</p>                    
                                    <h6 class="mb-0 mt-0 fw-bold">${data.items[2].title.split(":")[1]}</h6>       
                                    <a href="${data.items[2].url}" class="text-yellow underline text-truncate small">source</a>                   
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
                    <p class="mb-0 mt-0 small fw-bold text-main">${v.title.split(":")[0].split(",")[0]}</p>                    
                    <h6 class="mb-0 mt-0 fw-bold">${v.title.split(":")[1]}</h6>       
                    <p class="mb-0 mt-0 small fw-bold text-yellow">${hostname}</p>         
                </div>
                <img src="${v.banner_image}" alt="" width="64" height="64" class="flex-shrink-0 sqimg rounded" onerror='imgError(this)' />
            </div>	
           
        </li>
        `);
        $listItem.on("click", function (e) {
            window.open(v.url, '_blank');
        });

        $("#qree").append($listItem);
    })
}

// Trending Posts
function populateTrendingPosts(data) {
    $("#qree").html("");
    $.each(data, function (k, v) {
        try {

            let imgsrc = v.image ? v.image : ``
            var $listItem = $(`                    
            <li class="list-group-item border-bottom py-4 bg-light mb-1">                                        
                <div class="d-flex gap-2 w-100 justify-content-between">
                    <div>   
                        <p class="mb-2 mt-0 small text-yellow fw-bold">${v.hostname}</p>
                        <h6 class="mt-0 fw-bold">${v.title}</h6>
                    </div>
                    <img src="${imgsrc}" alt="" width="64" height="64" class="flex-shrink-0 mt-2 sqimg rounded" onerror='replaceErrImg(this,"${v.hostname}")' />
                </div>
                <p class="mt-1 small">${v.excerpt}</p>
                <p class="mt-1 small"><a href="#detailedHomeNews" onclick="javascript:populateWPDetails(${k})">Read full article</a></p>

            </li>
            `);
            $("#qree").append($listItem);
        } catch (err) {
            // console.log(v.link, err);
        }
    });
    $("body").css({ "opacity": "1" });
    $("body").css({ "cursor": "" });
    $("#qree").focus();
}

// Long Reads
function populateLongReads(data) {
    $("#qree").html("");
    $.each(data, function (k, v) {
        try {
            let imgsrc = v.image ? v.image : ``
            var $listItem = $(`                    
            <li class="list-group-item border-bottom py-4 bg-light mb-1">                                        
                <div class="d-flex gap-2 w-100 justify-content-between">
                    <div>   
                        <p class="mb-2 mt-0 small text-yellow fw-bold">${v.hostname}</p>
                        <h6 class="mt-0 fw-bold">${v.title}</h6>
                    </div>
                    <img src="${imgsrc}" alt="" width="64" height="64" class="flex-shrink-0 mt-2 sqimg rounded" onerror='replaceErrImg(this,"${v.hostname}")' />
                </div>
                <p class="mt-1 small">${v.excerpt}</p>
                <p class="mt-1 small"><a href="#detailedHomeNews" onclick="javascript:populateWPDetails(${k})">Read full article</a></p>

            </li>
            `);
            $("#qree").append($listItem);
        } catch (err) {
            // console.log(v.link, err);
        }
    });
    $("body").css({ "opacity": "1" });
    $("body").css({ "cursor": "" });
    $("#qree").focus();
}

// Trending Streams
function populateStreams(data) {
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

// Trending News Imagery
function populateImagery(data) {
    $("#qree").html("");
    var $listItem = $(`<h4 class="mt-4 fw-bold text-main ms-2">Trending News Imagery</h4>`);
    $("#qree").append($listItem);
    $.each(data, function (k, v) {
        var details = "";
        var count = 1;
        $.each(v.imageweburls, function (i, j) {
            details += `<a href="${j}">${count}</a> `;
            count++;
        });
        var $listItem = $(`                    
        <li class="list-group-item border-bottom py-4 bg-light mb-1">                                        
            <div class="d-flex gap-2 w-100 justify-content-between">
                <div>             
                    Seen on <a href="${v.sourcearticleurl}">${new URL(v.sourcearticleurl).hostname}</a> and 
                        <span class="fw-bold text-main">${v.imagewebcount}</span> other websites.
                        <p class="mt-0"><span class="fw-bold text-yellow">Top Links</span> ${details}</p>  
                </div>
                <img src="${v.imageurl}" alt="" width="96" height="96" class="flex-shrink-0 mt-2 sqimg rounded" onerror='imgError(this)' />
            </div>
        </li>
        `);
        $("#qree").append($listItem);
    });
}

// Trending Social Media Imagery
function populateTrendingImages(data) {
    $("#qree").html(``);
    var $listItem = $(`<h4 class="mt-4 fw-bold text-main ms-2">Trending Images</h4>`);
    $("#qree").append($listItem);
    var count = 1;
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

// Your Weather
function populateWeather(data) {
    $("#qree").html(``);
    var options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    var today = new Date();
    var date = today.toLocaleDateString("en-GB", options)
    var $listItem = $(`
        <p class="fw-bold mt-1 text-main">${date}</p>         
    `);
    $("#qree").append($listItem);
    var $listItem = $(`                    
    <li class="list-group-item border-1 rounded pt-4 pb-1 bg-light mb-1">
        <div class="d-flex gap-0 w-100 justify-content-between">
            <div class="col ps-2 mt-1">
                <h4 class="fw-bold mt-2"><span class="text-yellow">${Math.round((((data.currently.temperature) - 32) * 5 / 9))}&degC</span>, <span>${data.currently.summary}</span</h4>         
                <h6 class="fw-bold">${data.flags["ddg-location"]}</h6>
            </div>
            <div class="col d-flex align-items-start justify-content-end">
                <figure>
                    <img src="https://duckduckgo.com/assets/weather/icons/${data.currently.icon}.svg" alt="" width="64" height="64">                   
                </figure>
            </div>
        </div>
        <div class="row mt-1 mb-0 border-1">
            <div class="col">
                <figure>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-wind" viewBox="0 0 16 16">
                        <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5zm-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2zM0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5z"/>
                    </svg>   
                    <figcaption class="text-dark smaller mt-0 fw-bold">${data.currently.windSpeed}</figcaption>
                </figure>
            </div>
            <div class="col">
                <figure>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moisture" viewBox="0 0 16 16">
                        <path d="M13.5 0a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V7.5h-1.5a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V15h-1.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 .5-.5V.5a.5.5 0 0 0-.5-.5h-2zM7 1.5l.364-.343a.5.5 0 0 0-.728 0l-.002.002-.006.007-.022.023-.08.088a28.458 28.458 0 0 0-1.274 1.517c-.769.983-1.714 2.325-2.385 3.727C2.368 7.564 2 8.682 2 9.733 2 12.614 4.212 15 7 15s5-2.386 5-5.267c0-1.05-.368-2.169-.867-3.212-.671-1.402-1.616-2.744-2.385-3.727a28.458 28.458 0 0 0-1.354-1.605l-.022-.023-.006-.007-.002-.001L7 1.5zm0 0-.364-.343L7 1.5zm-.016.766L7 2.247l.016.019c.24.274.572.667.944 1.144.611.781 1.32 1.776 1.901 2.827H4.14c.58-1.051 1.29-2.046 1.9-2.827.373-.477.706-.87.945-1.144zM3 9.733c0-.755.244-1.612.638-2.496h6.724c.395.884.638 1.741.638 2.496C11 12.117 9.182 14 7 14s-4-1.883-4-4.267z"/>
                    </svg> 
                    <figcaption class="text-dark smaller mt-0 fw-bold">${data.currently.humidity}</figcaption>
                </figure>
            </div>
            <div class="col">
                <figure>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-rain" viewBox="0 0 16 16">
                        <path d="M4.158 12.025a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm3 0a.5.5 0 0 1 .316.633l-1 3a.5.5 0 0 1-.948-.316l1-3a.5.5 0 0 1 .632-.317zm3 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm3 0a.5.5 0 0 1 .316.633l-1 3a.5.5 0 1 1-.948-.316l1-3a.5.5 0 0 1 .632-.317zm.247-6.998a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 11H13a3 3 0 0 0 .405-5.973zM8.5 2a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1 0 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4.002 4.002 0 0 1 8.5 2z"/>
                    </svg> 
                    <figcaption class="text-dark smaller mt-0 fw-bold">${data.currently.precipProbability}%</figcaption>
                </figure>
            </div>           
        </div>
    </li>
    `);
    $("#qree").append($listItem);
    populateWeatherDetails(data);
}
function populateWeatherDetails(data) {
    var cardbody = ""
    $.each(data.hourly.data.slice(0, 12), function (k, v) {
        var date = new Date(v.time * 1000);
        var hour = `${date.getHours()}:00`;
        var humidity = `${v.humidity * 100}%`;
        var wind = `${v.windSpeed}`;
        var temp = `${Math.round((((v.temperature) - 32) * 5 / 9))} &degC`;
        var icon = `https://duckduckgo.com/assets/weather/icons/${v.icon}.svg`
        cardbody = cardbody.concat(`        
            <div class="col mb-4 bg-light">${hour}<br><img src="${icon}" alt="" width="32" height:"32"><br><strong>${temp}</strong></div>       
        `);
        // if(!isEven(k)){

        // }        
    });
    $("#qree").append(`
    <div class="col-12 mt-4">
        <div class="card bg-light border">
            <div class="card-header bg-light">                
                <h5 class="my-0">Hourly Predictions</h5>
                <p class="mt-0 fw-bold text-yellow">${data.hourly.summary}</p>
            </div>
            <div class="card-body bg-light">                
                <p class="card-text bg-light">
                    <div class="container bg-light">
                    <div class="row row-cols-3 bg-light">
                        ${cardbody}
                    </div>
                    </div>
                </p>
            </div>  
        </div>
    </div>
    `);
    cardbody = "";
    $.each(data.daily.data, function (k, v) {
        var date = new Date(v.time * 1000);
        date = `${date.getDate() + 1}/${date.getMonth() + 1}`;
        var tempMax = `${Math.round((((v.temperatureMax) - 32) * 5 / 9))}&degC`;
        var tempMin = `${Math.round((((v.temperatureMin) - 32) * 5 / 9))}&degC`;
        var icon = `https://duckduckgo.com/assets/weather/icons/${v.icon}.svg`
        cardbody = cardbody.concat(`        
            <div class="col mb-4 bg-light">${date}<br><img src="${icon}" alt="" width="32" height:"32"><br><strong>${tempMax}</strong><br>${tempMin}</div>       
        `);
        // if(!isEven(k)){

        // }        
    });
    $("#qree").append(`
    <div class="col-12 mt-2 mx-auto">
        <div class="card bg-light border">
            <div class="card-header bg-light">                
                <h5 class="my-0">Daily Predictions</h5>
                <p class="mt-0 fw-bold text-yellow">${data.daily.summary}</p>
            </div>
            <div class="card-body bg-light">                
                <p class="card-text">
                    <div class="container">
                    <div class="row row-cols-3 bg-light">
                        ${cardbody}
                    </div>
                    </div>
                </p>
            </div>  
        </div>
    </div>
    `);
}

// Trending Locations
function populateTrendingLocations(data) {
    $("#qree").html(``);
    var $listItem = $(`<h4 class="mt-2 mb-2 fw-bold text-main ms-2">Trending Locations</h4>`);
    $("#qree").append($listItem);
    $.each(data, function (k, v) {
        var $listItem = $(`<h5 class="mt-4 mb-2 fw-bold text-main ms-2">${v.location}</h5>`);
        $("#qree").append($listItem);
        $.each(v.items.slice(0, 5), function (k, v) {
            var { hostname } = new URL(v.url);
            var $listItem = $(`                    
            <li class="list-group-item border-bottom mb-1 py-4"> 
                <div class="row">                
                    <div class="col">
                        <div class="d-flex gap-2 w-100 justify-content-between">
                            <div> 
                                <a class="navbar-brand" href="${v.url}" target="_blank">                                
                                    <span class="mb-0 mt-0 smaller fw-bold text-yellow">${hostname.replace("www.", "")}</span> 
                                </a>                                
                                <h6 class="mb-0">${v.title.split(":")[1]}</h6> 
                            </div>
                            <img src="${v.banner_image}" alt="" width="64" height="64" class="flex-shrink-0 sqimg rounded mt-2" onerror='imgError(this)' />
                        </div>
                    </div>
                </div>
            </li>
            `);
            $listItem.on("click", function (e) {
                window.open(v.url, '_blank');
            });

            $("#qree").append($listItem);
        })

    })
}

// Trending People
function populateTrendingPeople(data) {
    // console.log(data);
    $("#qree").html("");
    var iHtml = ""
    $.each(data.slice(0, 100), function (k, v) {
        if (v.name == "Also Read" || v.name == "Prophet Muhammad") {
            //do nothing
        } else {
            iHtml += `   
            <div class="col">
                <figure id="fig${k}" style="cursor:pointer" onclick="populateNewsResults('${v.name}')">               
                    <img src="https://emm.newsbrief.eu/emmMap/tunnel?sid=emmMap-1&?image=${v.id}" class="flex-shrink-0 sqimg rounded" width="64" height="64" alt="" onerror='imgErrorPeople(${k},"${v.name}")'>                
                    <figcaption class="text-black small mt-0 fw-bold">${v.name}</figcaption>
                </figure>
            </div>
                  `;
        }
    });
    $("#qree").html(`<div class="container bg-light mt-1" style="overflow-x: scroll; scrollbar-width: thin;">
                        <div class="row px-1">
                            <div class="col">
                                <div class="row flex-nowrap menuItems">${iHtml}</div>
                            </div>
                        </div>
                    </div>
                    <div class="container mt-0">
                        <div class="row">
                            <div class="col">
                                <ul class="list-group list-group-flush mt-1" id="trendsDetails" style="max-width:calc(100vw - 10px);">
                                </ul>
                            </div>
                        </div>
                    </div>
                    `);
    populateNewsResults(data[0].name);
}
function populateNewsResults(name) {
    $("#trendsDetails").html(``);
    var $listItem = $(`<h4 class="mt-4 fw-bold text-main ms-2">${name}</h4>`);
    $("#trendsDetails").append($listItem);
    getSearchResultsGDELT(name).then(data => {
        $.each(data, function (k, v) {
            var $listItem = $(` 
                <li class="list-group-item border-bottom py-4 bg-light mb-1">
                    <p class="small fw-bold mb-0"><span class="text-yellow">${new URL(v.url).hostname}</span></p>                                        
                    <div class="d-flex gap-2 w-100 justify-content-between">
                        <div>                               
                            <h6 class="mb-0 mt-0">${v.title}</h6>
                        </div>
                        <img src="${v.socialimage}" alt="" width="64" height="64" class="flex-shrink-0 sqimg rounded" onerror='replaceErrImg(this,"${new URL(v.url).hostname}")' />
                    </div>
                </li>
                `);
            $("#trendsDetails").append($listItem);
        })
    })
}

// Trending Quotes
function populateTrendingQuotes(data) {
    $("#qree").html("");
    $.each(data, function (k, v) {
        var $listItem = $(` 
            <li class="list-group-item border-bottom py-4 bg-light mb-1"> 
             <p class="small"><a href="${v.links[0].link}">${v.links[0].title}</a></p>                                       
                <div class="d-flex gap-2 mt-1 w-100 justify-content-between">
                    <div>
                        <blockquote class="blockquote">
                            <p class="smaller text-dark">${v.quote}</p>
                        </blockquote>                                                   
                        <figcaption class="blockquote-footer">
                            <cite title="${v.whoName}" class="text-main fw-bold">${v.verb} ${v.whoName}</cite>
                        </figcaption>                        
                    </div>
                    <img src="https://emm.newsbrief.eu/emmMap/tunnel?sid=emmMap-1&?image=${v.who}" class="flex-shrink-0 sqimg rounded" width="64" height="64" alt="" onerror='imgError(this)'>
                </div>                
            </li>
            `);
        $("#qree").append($listItem);
    })
}

// Trending Hashtags
function populateHashtags(data) {
    $("#qree").html(``);
    var $listItem = $(`<h4 class="mt-4 fw-bold text-main ms-2"Trending Hashtags</h4>`);
    $("#qree").append($listItem);
    $.each(data, function (k, v) {
        let link = v.name.includes("#") ? `%23${v.name.replace("#", "")}` : v.name
        var $listItem = $(` 
            <li class="list-group-item border-bottom py-4 bg-light mb-1">
                <h6 class="mb-0 mt-0">${v.name}</h6>
                <p class=" fw-bold mb-0"><span class="text-yellow">${new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(v.volume)}</span></p>
                <p><a href="https://twitter.com/search?q=${link}&vertical=trends" target="_blank">See on twitter</a>
            </li>
            `);
        $("#qree").append($listItem);
    })
}

// Trending Startups
function populateCB(data) {
    $("#qree").html(``);
    var $listItem = $(`<h4 class="mt-4 fw-bold text-main ms-2">Trending Companies, Acquisitions, Fundings, and Events</h4>`);
    $("#qree").append($listItem);
    $("#qree").append(`
    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link active" id="TrendingCB-tab" data-bs-toggle="tab" data-bs-target="#TrendingCB" type="button" role="tab" aria-controls="TrendingCB" aria-selected="false">Trending</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="Acquisitions-tab" data-bs-toggle="tab" data-bs-target="#Acquisitions" type="button" role="tab" aria-controls="Acquisitions" aria-selected="true">Acquisitions</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="Fundings-tab" data-bs-toggle="tab" data-bs-target="#Fundings" type="button" role="tab" aria-controls="Fundings" aria-selected="false">Fundings</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="EventsCB-tab" data-bs-toggle="tab" data-bs-target="#EventsCB" type="button" role="tab" aria-controls="EventsCB" aria-selected="false">Events</button>
        </li>        
    </ul>
    <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="TrendingCB" role="tabpanel" aria-labelledby="TrendingCB-tab"></div>
        <div class="tab-pane fade" id="Acquisitions" role="tabpanel" aria-labelledby="Acquisitions-tab"></div>
        <div class="tab-pane fade" id="Fundings" role="tabpanel" aria-labelledby="Fundings-tab"></div>  
        <div class="tab-pane fade" id="EventsCB" role="tabpanel" aria-labelledby="EventsCB-tab"></div>
    </div>
    `);
    $("#qree").append($listItem);
    $.each(data.trending, function (k, v) {
        v = v.entity.properties;
        var $listItem = $(`
                        <li class="list-group-item border-0 border-bottom py-2 bg-light mb-1" >  
                            <div class="d-flex gap-2 w-100 justify-content-between">
                                <div> 
                                    <h6 class="mb-0 mt-0 fw-bold text-main">${v.identifier.value}, ${v.location}</h6> 
                                    <p class="small">${v.short_description}</p>
                                </div>
                                <img src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/${v.identifier.image_id}" alt="" width="64" height="64" class="flex-shrink-0 sqimg rounded mt-2" onerror='imgError(this)' />
                            </div>     
                        </li>
                        `);
        $("#TrendingCB").append($listItem);
    });
    $.each(data.acquisitions.entities, function (k, v) {
        v = v.properties;
        pricetext = ""
        // console.log(v.price);
        if (v.price == 0) {
            pricetext = "for an undisclosed amount."
        } else {
            pricetext = `for <span class="fw-bold">USD ${new Intl.NumberFormat('en-GB', { maximumSignificantDigits: 3 }).format(v.price.value_usd)}</span>.`;
        }
        var $listItem = $(`
                        <li class="list-group-item border-bottom py-4 bg-light mb-1">								
                            <div><p class="mb-0 small text-main">${v.announced_on.value}</p>
                            <p class="mb-0"><a href="#" onclick="javascript:front.send('get-org','${v.acquirer_identifier.permalink}');">${v.acquirer_identifier.value}</a> acquired <a href="#" onclick="javascript:front.send('get-org','${v.acquiree_identifier.permalink}');">${v.acquiree_identifier.value}</a> ${pricetext}</p></div>												
                        </li>
                        `);
        $("#Acquisitions").append($listItem);
    });
    $.each(data.funding_rounds.entities, function (k, v) {
        v = v.properties;
        pricetext = ""
        if (v.money_raised == 0) {
            pricetext = "raised an undisclosed amount."
        } else {
            pricetext = `raised <span class="fw-bold">USD ${new Intl.NumberFormat('en-GB', { maximumSignificantDigits: 3 }).format(v.money_raised.value_usd)}</span>.`;
        }
        var $listItem = $(`
                        <li class="list-group-item border-bottom py-4 bg-light mb-1">									
                            <div><p class="mb-0 text-muted small">${v.announced_on}</p>
                            <p class="mb-0 small">Led by <a href="#" onclick="javascript:front.send('get-org','${v.lead_investor_identifiers[0].permalink}');">${v.lead_investor_identifiers[0].value}</a>, <a href="#" onclick="javascript:front.send('get-org','${v.funded_organization_identifier.permalink}');">${v.funded_organization_identifier.value}</a> ${pricetext} in a ${v.investment_type.replace("_", " ").toUpperCase()} funding.</p></div>												
                        </li>
                        `);
        $("#Fundings").append($listItem);
    });
    $.each(data.events.entities, function (k, v) {
        v = v.properties;
        pricetext = "";
        var $listItem = $(`
                        <li class="list-group-item border-bottom py-4 bg-light mb-1">									
                           <h6>${v.identifier.value} at ${v.location_identifiers[0].value} starts on 
                           <span class="fw-bold text-yellow">${v.starts_on}</span> and ends on <span class="fw-bold text-yellow">${v.ends_on}<span></h6>											
                        </li>
                        `);
        $("#EventsCB").append($listItem);
    });
}

// Trending Videos
function populateYT(data) {
    $("#qree").html(``);
    var $listItem = $(`<h4 class="mt-4 mt-2 fw-bold text-main ms-2">Trending Videos</h4>`);
    $("#qree").append($listItem);
    $("#qree").append(`
    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link active" id="trending-tab" data-bs-toggle="tab" data-bs-target="#trending" type="button" role="tab" aria-controls="trending" aria-selected="false">Trending</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="mv-tab" data-bs-toggle="tab" data-bs-target="#mv" type="button" role="tab" aria-controls="mv" aria-selected="true">Most Viewed</button>
        </li>               
    </ul>
    <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="trending" role="tabpanel" aria-labelledby="trending-tab"></div>
        <div class="tab-pane fade" id="mv" role="tabpanel" aria-labelledby="mv-tab"></div>      
    </div>
    `);
    $.each(data.trending.slice(0, 50), function (k, v) {
        var $listItem = $(`
        <li class="list-group-item border-bottom py-2 bg-light mb-1" style="cursor:pointer" id="${k}-hour">               
            <div class="d-flex gap-2 w-100 justify-content-between">
                <div class="ratio ratio-16x9 video-wrapper">
                    <lite-youtube videoid="${v}"></lite-youtube>                              
                </div>                    
            </div>	
            <div>
            </div>
        </li>
        `);
        $("#trending").append($listItem);
    })
    $.each(data.mostviewed.slice(0, 50), function (k, v) {
        var $listItem = $(`
        <li class="list-group-item border-bottom py-2 bg-light mb-1" style="cursor:pointer" id="${k}-hour">               
            <div class="d-flex gap-2 w-100 justify-content-between">
                <div class="ratio ratio-16x9 video-wrapper">
                    <lite-youtube videoid="${v}"></lite-youtube>                              
                </div>                    
            </div>	
            <div>
            </div>
        </li>
        `);
        $("#mv").append($listItem);
    })
}

// Trending Stocks
function populateStocks(data) {
    $("#qree").html(``);
    var $listItem = $(`<h4 class="mt-4 mt-2 fw-bold text-main ms-2">Trending Stocks</h4>`);
    $("#qree").append($listItem);
    $.each(data[0].results.slice(1), function (k, v) {
        let imgsrc = v.imageUrl ? v.imageUrl : ``
        let summary = v.summary ? v.summary : ``
        let details = v.companies[0].livePriceDto ? v.companies[0].livePriceDto : ``
        let companyName = v.companies[0].companyName ? v.companies[0].companyName : ``
        let nseScriptCode = v.companies[0].nseScripCode ? v.companies[0].nseScripCode : ``
        let daychangeicon = details.dayChangePerc > 0 ? `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="me-0 text-success bi bi-arrow-up-short" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"/>
      </svg>` : `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="text-danger bi bi-arrow-down-short me-0" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"/>
    </svg>`
        var $listItem = $(`
            <li class="list-group-item border-bottom py-4 mb-1 bg-light" style="cursor:pointer" id="${k}-stocks">
                <div class="small fw-bold">${companyName} (${nseScriptCode}) ${daychangeicon} ${details.dayChangePerc.toFixed(2)}%</div>                      
                <div><p class="mb-4 small"><strong>Open</strong>: ${details.open}, <strong>High</strong>: ${details.high}, <strong>Low</strong>: ${details.low},<strong>Close</strong>: ${details.close}</p></div>
                <div class="d-flex gap-2 w-100 justify-content-between">
                    <div>
                        <p class="mb-0 small fw-bold">${v.title}</p>
                        <p class="mb-2 small">${summary.slice(0, 100)}...</p>
                    </div>
                    <img src="${imgsrc}" alt="" width="64" height="64" class="sqimg mt-1" onerror='imgError(this)'>
                </div>	
                <div><span class="small opacity-50 text-nowrap">Source: ${v.source}</span></div>
            </li>
            `);
        $("#qree").append($listItem);
    });
}

function getArticleExtract(url) {    
    async.tryEach([
        (next) => {
            fetchURL(`https://api-panda.com/v2/feeds/story/full?url=${url}`).then(data => {
                if (data.success) {
                    // console.clear()
                    data = data.data;
                    // console.log(data.data.data.title);
                    let title = data.data.title ? data.data.title : ``;
                    let content = data.data.html ? data.data.html : ``;
                    let pageUrl = data.data.pageUrl ? data.data.pageUrl : ``;
                    let icon = data.data.icon ? data.data.icon : ``;
                    let author = data.data.author ? data.data.author : ``;
                    let authorUrl = data.data.authorUrl ? data.data.authorUrl : ``;
                    let siteName = data.data.siteName ? data.data.siteName : ``;
                    let date = data.data.date ? new Date(data.data.date).toLocaleString("en-GB") : ``;
                    $('#myModal').on('shown.bs.modal', function(){                    
                        $("#modalTitle").html(``);
                        $("#modalBody").html(``);
                        $("#modalTitle").html(`${title}`);
                        $("#modalBody").html(`<img src ="${data.lead_image_url} alt="" width='100%' height="auto" style="object-fit:cover" onerror='imgError(this)'/>`);                       
                        $("#modalBody").append(`<p class="small">${content}<p>`);
                        $("#modalBody").append(`<p class="small d-flex-justify-content-center">Extract Via: UsePanda.com<p>`);
                        $('#myModal img').each(function () {
                            $(this).removeAttr('style');
                            $(this).removeAttr('class');
                            $(this).removeAttr('width');
                            $(this).removeAttr('height');
                        });
                    })
                    $('#myModal').modal('show');                  
                } else {
                    console.log(`Pandas did not work`);
                    return next(new Error('Cannot get Data'))
                }
            }).catch(err => {
                console.log(err);
                return next(new Error('Cannot get Data'))
            })
        },
        (next) => {
            fetchURL(`https://api.outline.com/v3/parse_article?source_url=${url}`).then(data => {
                if (data.success) {
                    data = data.data;
                    if (data.data.site_name == "Outline") {
                        return next(new Error('Cannot get Data'))
                    } else {
                        // console.clear()
                        let title = data.data.title ? data.data.title : ``;
                        let content = data.data.html ? data.data.html : ``;
                        let pageUrl = data.data.article_url ? data.data.article_url : ``;
                        let icon = data.data.icon ? data.data.icon : ``;
                        let author = data.data.author ? data.data.author : ``;
                        let siteName = data.data.site_name ? data.data.site_name : ``;
                        let date = data.data.date ? data.data.date : ``;                       
                        $('#myModal').on('shown.bs.modal', function(){  
                            $("#modalTitle").html(``);
                            $("#modalBody").html(``);                  
                            $("#modalTitle").html(`${title}`);
                            $("#modalBody").html(`<img src ="${data.lead_image_url} alt="" width='100%' height="auto" style="object-fit:cover" onerror='imgError(this)'/>`);                            
                            $("#modalBody").append(`<p class="small">${content}<p>`);
                            $("#modalBody").append(`<p class="small d-flex-justify-content-center">Extract Via: Outline.com<p>`);
                            $('#myModal img').each(function () {
                                $(this).removeAttr('style');
                                $(this).removeAttr('class');
                                $(this).removeAttr('width');
                                $(this).removeAttr('height');
                            });
                        })
                        $('#myModal').modal('show');
                        
                    }

                } else {
                    console.log(`Outline did not work`);
                    return next(new Error('Cannot get Data'))
                }
            }).catch(err => {
                console.log(err);
                return next(new Error('Cannot get Data'))
            })
        },        
        (next) => {
            Parse(`${url}`).then(data => {
                if (data.title) {
                    console.clear()
                    $("#modalTitle").html(``);
                    $("#modalBody").html(``);
                    $('#myModal').on('shown.bs.modal', function(){      
                        $("#modalTitle").html(``);
                        $("#modalBody").html(``);                    
                        $("#modalTitle").html(`${data.title}`);                       
                        $("#modalBody").html(`<h1>${data.title}</h1>`);                        
                        $("#modalBody").html(`<img src ="${data.lead_image_url} alt="" width='100%' height="auto" style="object-fit:cover" onerror='imgError(this)'/>`);
                        $("#modalBody").append(`<p class="small">${data.content}<p>`);
                        $("#modalBody").append(`<p class="small d-flex-justify-content-center">Extract Via: Normal Parse<p>`);
                        $('#myModal img').each(function () {
                            $(this).removeAttr('style');
                            $(this).removeAttr('class');
                            $(this).removeAttr('width');
                            $(this).removeAttr('height');
                        });
                    })
                    $('#myModal').modal('show');
                } else {
                    console.log(`Simple parsing did not work`);
                    return next(new Error('Cannot get Data'))
                }
            }).catch(err => {
                console.log(err);
                return next(new Error('Cannot get Data'))
            })
        },
        (next) => {
            Parse(`https://sbcors.herokuapp.com/${url}`).then(data => {
                if (data.title) {
                    console.clear()                    
                    $('#myModal').on('shown.bs.modal', function(){  
                        $("#modalTitle").html(``);
                        $("#modalBody").html(``);                  
                        $("#modalTitle").html(`${data.title}`);
                        $("#modalBody").html(`<img src ="${data.lead_image_url} alt="" width='100%' height="auto" style="object-fit:cover" onerror='imgError(this)'/>`);                                                
                        $("#modalBody").append(`<p class="small">${data.content}<p>`);
                        $("#modalBody").append(`<p class="small d-flex-justify-content-center">Extract Via: Proxy server<p>`);
                        $('#myModal img').each(function () {
                            $(this).removeAttr('style');
                            $(this).removeAttr('class');
                            $(this).removeAttr('width');
                            $(this).removeAttr('height');
                        });
                    })
                    $('#myModal').modal('show');
                    
                } else {
                    console.log(`CORS did not work`);
                    return next(new Error('Cannot get Data'))
                }
            }).catch(err => {
                console.log(err);
                return next(new Error('Cannot get Data'))
            })
        },
        (next) => {
            fetchURL(`https://txtify.it/${url}`).then(data => {
                    // console.clear()
                    $("#modalTitle").html(``);
                    $("#modalBody").html(``);
                    $('#myModal').on('shown.bs.modal', function(){
                        $("#modalBody").append(data.response);
                        $("#modalBody").append(`<p class="small d-flex-justify-content-center">Extract Via: txtify.it<p>`);                        
                    })
                    $('#myModal').modal('show');   
            }).catch(err => {
                console.log(err);
                return next(new Error('Cannot get Data'))
            })
        },
    ])

}

