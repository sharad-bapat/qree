
class X {
    trendingNewsSection() {        
        $("#sectionName").html("Trending News")
        $("#trendingNews").html("");       
        if (getLocalStorage("trendingNews")) {
            $.each(getLocalStorage("trendingNews"), function (k, v) {
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
                var { hostname } = new URL(v.link);
                var $listItem = $(`
                                <li class="list-group-item border-bottom py-4 bg-light mb-1" style="cursor:pointer">
                                    <div class="d-flex gap-2 w-100 justify-content-between">
                                        <div>        
                                            <h5 class="mb-0 mt-0 fw-bold">${v.title}</h5>
                                            <p class="mb-0 mt-1 opacity-75 small">${hostname}, ${timediff}</p>
                                        </div>
                                        <img src="https://www.google.com/s2/favicons?sz=32&domain=${hostname}" alt="" width="32" height="32" class="rounded-circle flex-shrink-0 mb-1">
                                    </div>  
                                </li>                               
                                `);
                $listItem.on("click", function (e) {
                    window.open(v.link, '_blank');                   
                });
                $("#trendingNews").append($listItem);
            });
        } else {
            $("body").css({ "opacity": "0.2" });
            $("body").css({"cursor": "wait"});
            getTrendingNews();
        }
    }
    topNewsSection() {
        $("#sectionName").html("Top News")
        $("#topNews").html("");       
        if (getLocalStorage("topNews")) {
            $.each(getLocalStorage("topNews"), function (k, v) {
                var unixtime = v.created;
                var currTime = Date.now();
                var timediff = Math.round(currTime / 1000 - unixtime / 1000);
                if (timediff / 60 / 60 < 1) {
                    timediff = Math.round(timediff / 60) + " minutes ago";
                } else if (Math.round(timediff / 60 / 60) === 1) {
                    timediff = Math.round(timediff / 60 / 60) + " hour ago";
                } else {
                    timediff = Math.round(timediff / 60 / 60) + " hours ago";
                }
                var { hostname } = new URL(v.link);
                let desc = v.description ? v.description : ``
                var $listItem = $(`
                                <li class="list-group-item border-bottom py-4 bg-light mb-1" style="cursor:pointer">                                        
                                    <div class="d-flex gap-2 w-100 justify-content-between">
                                        <div>
                                            <h5 class="mb-0 mt-0 fw-bold">${v.title}</h5>                                            
                                            <p class="mb-0 mt-1 opacity-50 small">${hostname}, ${timediff}</p>
                                            <p class="mb-0 mt-1 opacity-75 small">${desc}</p>
                                        </div>
                                        <img src="https://www.google.com/s2/favicons?sz=32&domain=${hostname}" alt="" width="32" height="32" class="rounded-circle flex-shrink-0 mb-1">
                                    </div>	
                                </li>                               
                                `);
                $listItem.on("click", function (e) {
                    window.open(v.link, '_blank'); 
                });
                $("#topNews").append($listItem);
            });
        } else {
            $("body").css({ "opacity": "0.2" });
            $("body").css({"cursor": "wait"});
            getTopNews();
        }
    }
    eventNewsSection() {
        $("#sectionName").html("Latest Events")
        $("#eventNews").html("");
        if (getLocalStorage("eventNews")) {
            $.each(getLocalStorage("eventNews"), function (k, v) {
                var unixtime = v.created;
                var currTime = Date.now();
                var timediff = Math.round(currTime / 1000 - unixtime / 1000);
                if (timediff / 60 / 60 < 1) {
                    timediff = Math.round(timediff / 60) + " minutes ago";
                } else if (Math.round(timediff / 60 / 60) === 1) {
                    timediff = Math.round(timediff / 60 / 60) + " hour ago";
                } else {
                    timediff = Math.round(timediff / 60 / 60) + " hours ago";
                }
                var { hostname } = new URL(v.link);
                let desc = v.description ? v.description : ``
                var $listItem = $(`
                                <li class="list-group-item border-bottom py-4 bg-light mb-1" style="cursor:pointer" id="${k}-hour">                                        
                                    <div class="d-flex gap-2 w-100 justify-content-between">
                                        <div>
                                            <h5 class="mb-0 mt-0 fw-bold">${v.title}</h5>                                            
                                            <p class="mb-0 mt-1 opacity-50 small">${hostname}, ${timediff}</p>
                                            <p class="mb-0 mt-1 opacity-50 small">${desc}</p>
                                        </div>
                                        <img src="https://www.google.com/s2/favicons?sz=32&domain=${hostname}" alt="" width="32" height="32" class="rounded-circle flex-shrink-0 mb-1">
                                    </div>	
                                </li>                               
                                `);
                $listItem.on("click", function (e) {
                    window.open(v.link, '_blank'); 
                });
                $("#eventNews").append($listItem);
            });
        } else {
            $("body").css({ "opacity": "0.2" });
            $("body").css({"cursor": "wait"});
            getEventsNews();
        }
    }
    techNewsSection() {
        $("#sectionName").html("Tech News")
        $("#techNews").html("");       
        if (getLocalStorage("techNews")) {
            $.each(getLocalStorage("techNews"), function (k, v) {
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
                    let imgsrc = v.thumbnail ? v.thumbnail : ``
                    var $listItem = $(`                    
                    <li class="list-group-item border-bottom py-4 bg-light mb-1" style="cursor:pointer">                                        
                        <div class="d-flex gap-2 w-100 justify-content-between">
                            <div>
                                <img src="https://www.google.com/s2/favicons?sz=16&domain=${hostname}" alt="" width="16" height="16" class="rounded-circle flex-shrink-0">                                
                                <h5 class="mb-0 mt-0 fw-bold">${v.title}</h5> 
                                <p class="mb-0 mt-1 opacity-50 small">${hostname}, ${timediff}</p>                                                             
                            </div>
                            <img src="${imgsrc}" alt="" width="64" height="64" class="flex-shrink-0 sqimg mt-4 rounded">
                        </div>	
                       
                    </li>
                    `);
                    $listItem.on("click", function (e) {
                        window.open(v.link, '_blank'); 
                    });
                    $("#techNews").append($listItem);
                } catch (err) {
                    // console.log(v.link, err);
                }
            });
        } else {
            $("body").css({ "opacity": "0.2" });
            $("body").css({"cursor": "wait"});
            getTechNews();
        }

    }
    entNewsSection() {
        $("#sectionName").html("Entertainment News")
        $("#entNews").html("");
        if (getLocalStorage("entNews")) {
            $.each(getLocalStorage("entNews"), function (k, v) {
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
                    let imgsrc = v.thumbnail ? v.thumbnail : ``
                    var $listItem = $(`                    
                    <li class="list-group-item border-bottom py-4 bg-light mb-1" style="cursor:pointer">                                        
                        <div class="d-flex gap-2 w-100 justify-content-between">
                            <div>
                                <img src="https://www.google.com/s2/favicons?sz=16&domain=${hostname}" alt="" width="16" height="16" class="rounded-circle flex-shrink-0">                                
                                <h5 class="mb-0 mt-0 fw-bold">${v.title}</h5> 
                                <p class="mb-0 mt-1 opacity-50 small">${hostname}, ${timediff}</p>                                                             
                            </div>
                            <img src="${imgsrc}" alt="" width="64" height="64" class="flex-shrink-0 sqimg mt-4 rounded">
                        </div>	
                       
                    </li>
                    `);
                    $listItem.on("click", function (e) {
                        window.open(v.link, '_blank'); 
                    });
                    $("#entNews").append($listItem);
                } catch (err) {
                    // console.log(v.link, err);
                }
            });
        } else {
            $("body").css({ "opacity": "0.2" });
            $("body").css({"cursor": "wait"});
            getEntertainmentNews();
        }

    }
    businessNewsSection() {
        $("#sectionName").html("Business News")
        $("#businessNews").html("");
        if (getLocalStorage("businessNews")) {
            $.each(getLocalStorage("businessNews"), function (k, v) {
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
                    let imgsrc = v.thumbnail ? v.thumbnail : ``
                    if (imgsrc == "") {
                        var $listItem = $(`                    
                        <li class="list-group-item border-bottom py-4 bg-light mb-1" style="cursor:pointer">                                        
                            <div class="d-flex gap-2 w-100 justify-content-between">
                                <div>
                                    <h5 class="mb-0 mt-0 fw-bold">${v.title}</h5> 
                                    <p class="mb-0 mt-1 opacity-50 small">${hostname}, ${timediff}</p>                                                             
                                </div>
                                <img src="https://www.google.com/s2/favicons?sz=32&domain=${hostname}" alt="" width="32" height="32" class="rounded-circle flex-shrink-0 mb-1">                               
                            </div>	
                           
                        </li>
                        `);
                        $listItem.on("click", function (e) {
                            window.open(v.link, '_blank'); 
                        });
                        $("#businessNews").append($listItem);
                    } else {
                        var $listItem = $(`                    
                    <li class="list-group-item border-bottom py-4 bg-light mb-1" style="cursor:pointer">                                        
                        <div class="d-flex gap-2 w-100 justify-content-between">
                            <div>
                                <img src="https://www.google.com/s2/favicons?sz=16&domain=${hostname}" alt="" width="16" height="16" class="rounded-circle flex-shrink-0">                                
                                <h5 class="mb-0 mt-0 fw-bold">${v.title}</h5> 
                                <p class="mb-0 mt-1 opacity-50 small">${hostname}, ${timediff}</p>                                                             
                            </div>
                            <img src="${imgsrc}" alt="" width="64" height="64" class="flex-shrink-0 sqimg mt-4 rounded">
                        </div>	
                       
                    </li>
                    `);
                        $listItem.on("click", function (e) {
                            window.open(v.link, '_blank');
                        });
                        $("#businessNews").append($listItem);
                    }
                } catch (err) {
                    // console.log(v.link, err);
                }
            });
        } else {
            $("body").css({ "opacity": "0.2" });
            $("body").css({"cursor": "wait"});
            getBusinessNews();
        }
        if (getLocalStorage("rss")) {
            $.each(getLocalStorage("rss"),business, function (k, v) {                
                try {
                    var { hostname } = new URL(v.link);
                    let imgsrc = v.thumbnail ? v.thumbnail : ``
                    if (imgsrc == "") {
                        var $listItem = $(`                    
                        <li class="list-group-item border-bottom py-4 bg-light mb-1" style="cursor:pointer">                                        
                            <div class="d-flex gap-2 w-100 justify-content-between">
                                <div>
                                    <p class="mb-0 mt-1 opacity-50 small">${hostname}, ${v.created}</p>     
                                    <h5 class="mb-0 mt-0 fw-bold">${v.title}</h5>           
                                </div>
                                <img src="https://www.google.com/s2/favicons?sz=32&domain=${hostname}" alt="" width="32" height="32" class="rounded-circle flex-shrink-0 mb-1">                               
                            </div>	
                           
                        </li>
                        `);
                        $listItem.on("click", function (e) {
                            window.open(v.link, '_blank'); 
                        });
                        $("#businessNews").append($listItem);
                    } else {
                        var $listItem = $(`                    
                    <li class="list-group-item border-bottom py-4 bg-light mb-1" style="cursor:pointer">                                        
                        <div class="d-flex gap-2 w-100 justify-content-between">
                            <div>
                                <img src="https://www.google.com/s2/favicons?sz=16&domain=${hostname}" alt="" width="16" height="16" class="rounded-circle flex-shrink-0">                                
                                <h5 class="mb-0 mt-0 fw-bold">${v.title}</h5> 
                                <p class="mb-0 mt-1 opacity-50 small">${hostname}, ${timediff}</p>                                                             
                            </div>
                            <img src="${imgsrc}" alt="" width="64" height="64" class="flex-shrink-0 sqimg mt-4 rounded">
                        </div>	
                       
                    </li>
                    `);
                        $listItem.on("click", function (e) {
                            window.open(v.link, '_blank');
                        });
                        $("#businessNews").append($listItem);
                    }
                } catch (err) {
                    // console.log(v.link, err);
                }
            });
        } else {
            // $("body").css({ "opacity": "0.2" });
            // $("body").css({"cursor": "wait"});
            // getRSS();
        }

    }   
    wikiSection() {
        $("#sectionName").html("Trending Articles")
        $("#wikiArticles").html(""); 
        if (getLocalStorage("wiki")) {
            $.each(getLocalStorage("wiki").mostread, function (k, v) {
                let imgsrc = v.thumbnail ? v.thumbnail.source : ``
                var $listItem = $(`                    
                <li class="list-group-item border-bottom py-4 bg-light mb-1" >                                        
                    <div class="d-flex gap-2 w-100 justify-content-between">
                        <div>
                            <details class="top-details" style="cursor:pointer"><summary><h5 class="mb-0 mt-0 fw-bold">${v.title}&nbsp;<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                          </svg></h5>
                            <p class="mb-0 mt-1 small">${v.description}</p>                            
                            </summary>
                            <p class="mb-0 mt-1 small">${v.extract}</p>  
                            <p class="mb-0 mt-1 small"><a href="${v.link}" target="_blank">Read full article on Wikipedia</a></p>   
                            </details>                                                        
                        </div>
                        <img src="${imgsrc}" alt="" width="64" height="64" class="flex-shrink-0 sqimg mt-0 rounded">
                    </div>	
                   
                </li>
                `);               
                $("#wikiArticles").append($listItem);
            });
        } else {
            $("body").css({"opacity": "0.2"});     
            $("body").css({"cursor": "wait"});
            getWiki();            
        }
    }
    risingNewsSection(){
        $("#sectionName").html("Rising News")
        $("body").css({"opacity": "0.2"});     
        $("body").css({"cursor": "wait"});
        getTimeline();
    }
    homeSection() {$("#sectionName").html("Home")}
    newsSection(){}
    countryNewsSection() {getCountryNews();}
    languageNewsSection() {getLanguageNews();}
    searchNewsSection(){$("#sectionName").html("Search News")}
    trendingTrendsSection() {    
        $("#trendingTrends").html("");
        if (getLocalStorage("trends")) {           
            $.each(getLocalStorage("trends"), function (k, v) {                
                let imgsrc = v.image.imgUrl ? `<img src="http:${v.image.imgUrl}" alt="" width="64" height="64" class="rounded sqimg d-flex justify-content-end">` : ``               
                var $listItem = $(`
                <li class="list-group-item border-bottom py-4 bg-light mb-0" style="cursor:pointer">                
                    <details class="top-details"><summary>  
                    <div class="d-flex gap-2 w-100 justify-content-between">
                            <div>
                                <h5 class="mb-0 mt-0 fw-bold">${v.title}</h5>             
                            </div>
                            ${imgsrc}
                     </div>
                    </summary>
                    <ul class="list-group list-group-flush mt-3" id="${k}trendingTrends">
                    </ul>
                </li>`);               
                $("#trendingTrends").append($listItem);
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
                    $(`#${k}trendingTrends`).append($listItem);
                });
            })
        } else {
            $("body").css({ "opacity": "0.2" });
            getTrendingsTrends();
        }
    }
}
countryVal = "IN";
languageVal = "ENG";
window.addEventListener('hashchange', function () {
    try{
        $("#offcanvasMenu").offcanvas('hide');
    }catch(err){}    
    let x = new X();
    x[location.hash.replace("#", "")]();
    $(`section:not("${location.hash}")`).hide();
    $(`${location.hash}`).show();
    topFunction();
    try{        
        document.title = location.hash.replace("#", "").replace("News", " News").replace("Section", " Section");
    }catch(err){
    //    console.log(err);
    }
}, false);
onPageLoad();
function onPageLoad() {
    if (!location.hash || location.hash == "#") {
        window.location = "#homeSection";
    }
    let x = new X();
    x[location.hash.replace("#", "")]();
    $(`section:not("${location.hash.replace("#", ".")}")`).hide();
    $(`${location.hash}`).show();
    document.title = location.hash.replace("#", "").replace("News", " News").replace("Section", " Section");
    topFunction();
}
function p() {
    let x = new X();
    x[location.hash.replace("#", "")]();
    $(`section:not("${location.hash}")`).hide();
    $(`${location.hash}`).show();
    topFunction();
}
function getTrendingNews() {    
    urls = ["https://www.reddit.com/r/worldnews/top/.json?sort=top&t=hour",
        "https://www.reddit.com/r/worldnews/top/.json?sort=top&t=day",
        "https://www.reddit.com/r/worldnews/new/.json",
        "https://www.reddit.com/r/worldnews/hot/.json"
    ]
    async.mapLimit(urls, 4, async function (url) {
        try {
            const response = await fetch(url)
            return response.json()
        } catch (err) {
            // console.log(err.response);
        }

    }, (err, results) => {
        // if (err) { console.log(err); }
        arr = []
        for (index in results) {
            results[index].data.children.forEach(item => {
                var item_index = arr.findIndex(x => x.link == item.data.url);
                if (item_index === -1) {
                    arr.push({ "title": item.data.title, "created": item.data.created, "link": item.data.url, "source": item.data.domain })
                }
            });
        }
        arrr = arr.sort(function (a, b) {
            return b.created - a.created;
        });       
        setLocalStorage("trendingNews", arrr, 15 * 60000);
        p();
        $("body").css({ "opacity": "1" });
        $("body").css({"cursor": ""});
    })
}
function getTopNews() {
    urls = ["https://emm.newsbrief.eu/emmMap/tunnel?sid=emmMap&?stories=top&language=en",
    ]
    async.mapLimit(urls, 1, async function (url) {
        try {
            const response = await fetch(url)
            return response.json()
        } catch (err) {
            // console.trace(err);
        }

    }, (err, results) => {
        // if (err) { console.log(err); }
        arr = []
        for (index in results) {
            results[index].items.forEach(item => {
                var item_index = arr.findIndex(x => x.link == item.url);
                if (item_index === -1) {
                    arr.push({ "title": item.title, "created": Date.parse(item.startDate), "link": item.mainItemLink, "source": item.mainItemSource.url,"description": item.description })
                }
            });
        }
        arrr = arr.sort(function (a, b) {
            return b.created - a.created;
        });
        const stop = Date.now()        
        setLocalStorage("topNews", arrr, 15 * 60000);
        p();
        $("body").css({ "opacity": "1" });
        $("body").css({"cursor": ""});
    })
}
function getEventsNews() {
    urls = ["https://emm.newsbrief.eu/emmMap/tunnel?sid=emmMap&?stories=events&language=en",
    ]
    async.mapLimit(urls, 1, async function (url) {
        try {
            const response = await fetch(url)
            return response.json()
        } catch (err) {
            // console.trace(err);
        }

    }, (err, results) => {
        // if (err) { console.log(err); }
        arr = []
        for (index in results) {
            results[index].items.forEach(item => {
                var item_index = arr.findIndex(x => x.link == item.url);
                if (item_index === -1) {
                    arr.push({ "title": item.title, "created": Date.parse(item.startDate), "link": item.mainItemLink, "source": item.mainItemSource.url, "description": item.description, "snippet": item.event.snippet })
                }
            });
        }
        arrr = arr.sort(function (a, b) {
            return b.created - a.created;
        });
        setLocalStorage("eventNews", arrr, 15 * 60000);
        p();
        $("body").css({ "opacity": "1" });
        $("body").css({"cursor": ""});
    })
}
function getTechNews() {
    const start = Date.now()
    urls = ["https://www.reddit.com/r/technews/top/.json?sort=top&t=day&limit=10",
        "https://www.reddit.com/r/technology/top/.json?sort=top&t=day&limit=10",
        "https://www.reddit.com/r/gadgets/top/.json?sort=top&t=day&limit=10",
        "https://www.reddit.com/r/google/top/.json?sort=top&t=day&limit=10",
        "https://www.reddit.com/r/apple/top/.json?sort=top&t=day&limit=10",
        "https://www.reddit.com/r/technews/hot/.json?sort=top&t=day&limit=20",
        "https://www.reddit.com/r/technology/hot/.json?sort=top&t=day&limit=20",
    ]
    async.mapLimit(urls, 10, async function (url) {
        try {
            const response = await fetch(url)
            return response.json()
        } catch (err) {
            // console.log(err.response);
        }

    }, (err, results) => {
        // if (err) { console.log(err); }
        arr = []
        for (index in results) {
            results[index].data.children.forEach(item => {
                var item_index = arr.findIndex(x => x.link == item.data.url);
                if (item.data.url.includes("redd.it") || item.data.url.includes("reddit.com") || item.data.url.includes("imgur.com") || item.data.url.includes("gfycat.com")) {
                    //do nothing
                } else {
                    if (item_index === -1) {
                        arr.push({ "title": item.data.title, "created": item.data.created, "link": item.data.url, "source": item.data.domain, "thumbnail": item.data.thumbnail })
                    }
                }
            });
        }
        arrr = arr.sort(function (a, b) {
            return b.created - a.created;
        });
        const stop = Date.now()
        // console.log(`Time Taken to execute TechNews = ${(stop - start) / 1000} seconds`);
        setLocalStorage("techNews", arrr, 15 * 60000);
        p();
        $("body").css({ "opacity": "1" });
        $("body").css({"cursor": ""});
    })
}
function getEntertainmentNews() {
    urls = ["https://www.reddit.com/r/entertainment/top/.json?sort=top&t=day&limit=10",
        "https://www.reddit.com/r/entertainment/hot/.json?sort=top&t=day&limit=10",
        "https://www.reddit.com/r/boxoffice/top/.json?sort=top&t=day&limit=10",
        "https://www.reddit.com/r/boxoffice/hot/.json?sort=top&t=day&limit=10",
        "https://www.reddit.com/r/television/top/.json?sort=top&t=day&limit=10",
        "https://www.reddit.com/r/television/hot/.json?sort=top&t=day&limit=10",
    ]
    async.mapLimit(urls, 10, async function (url) {
        try {
            const response = await fetch(url)
            return response.json()
        } catch (err) {
            // console.log(err.response);
        }

    }, (err, results) => {
        // if (err) { console.log(err); }
        arr = []
        for (index in results) {
            results[index].data.children.forEach(item => {
                var item_index = arr.findIndex(x => x.link == item.data.url);
                if (item.data.url.includes("youtube") || item.data.url.includes("youtu.be") || item.data.url.includes("twitter.com") || item.data.url.includes("redd.it") || item.data.url.includes("reddit.com") || item.data.url.includes("imgur.com") || item.data.url.includes("gfycat.com")) {
                    //do nothing
                } else {
                    if (item_index === -1) {
                        arr.push({ "title": item.data.title, "created": item.data.created, "link": item.data.url, "source": item.data.domain, "thumbnail": item.data.thumbnail })
                    }
                }
            });
        }
        arrr = arr.sort(function (a, b) {
            return b.created - a.created;
        });
        const stop = Date.now()
        // console.log(`Time Taken to execute TechNews = ${(stop - start) / 1000} seconds`);
        setLocalStorage("entNews", arrr, 15 * 60000);
        p();
        $("body").css({ "opacity": "1" });
        $("body").css({"cursor": ""});
    })
}
function getBusinessNews() {
    urls = ["https://www.reddit.com/r/business/top/.json?sort=top&t=day&limit=10",
        "https://www.reddit.com/r/business/hot/.json?sort=top&t=day&limit=10",
        "https://www.reddit.com/r/economics/top/.json?sort=top&t=day&limit=10",
        "https://www.reddit.com/r/economics/hot/.json?sort=top&t=day&limit=10",
        "https://www.reddit.com/r/economy/top/.json?sort=top&t=day&limit=10",
        "https://www.reddit.com/r/economy/hot/.json?sort=top&t=day&limit=10",
        "https://www.reddit.com/r/finance/top/.json?sort=top&t=day&limit=10",
        "https://www.reddit.com/r/finance/hot/.json?sort=top&t=day&limit=10",
    ]
    async.mapLimit(urls, 10, async function (url) {
        try {
            const response = await fetch(url)
            return response.json()
        } catch (err) {
            // console.log(err.response);
        }

    }, (err, results) => {
        // if (err) { console.log(err); }
        arr = []
        for (index in results) {
            results[index].data.children.forEach(item => {
                var item_index = arr.findIndex(x => x.link == item.data.url);
                if (item.data.url.includes("youtube") || item.data.url.includes("youtu.be") || item.data.url.includes("twitter.com") || item.data.url.includes("redd.it") || item.data.url.includes("reddit.com") || item.data.url.includes("imgur.com") || item.data.url.includes("gfycat.com")) {
                    //do nothing
                } else {
                    if (item_index === -1) {
                        arr.push({ "title": item.data.title, "created": item.data.created, "link": item.data.url, "source": item.data.domain, "thumbnail": item.data.thumbnail })
                    }
                }
            });
        }
        arrr = arr.sort(function (a, b) {
            return b.created - a.created;
        });
        // const stop = Date.now()
        // console.log(`Time Taken to execute TechNews = ${(stop - start) / 1000} seconds`);
        setLocalStorage("businessNews", arrr, 15 * 60000);
        p();
        $("body").css({ "opacity": "1" });
        $("body").css({"cursor": ""});
    })
}
function getCountryNews() {    
    urls = [
    "https://api.gdeltproject.org/api/v2/doc/doc?timespan=6h&mode=artlist&sort=hybridrel&format=json&maxrecords=10&query=sourcelang:eng%20domain:businesstoday.in",
    "https://api.gdeltproject.org/api/v2/doc/doc?timespan=6h&mode=artlist&sort=hybridrel&format=json&maxrecords=10&query=sourcelang:eng%20domain:freepressjournal.in",
    "https://api.gdeltproject.org/api/v2/doc/doc?timespan=6h&mode=artlist&sort=hybridrel&format=json&maxrecords=10&query=sourcelang:eng%20domain:livemint.com",
    "https://api.gdeltproject.org/api/v2/doc/doc?timespan=6h&mode=artlist&sort=hybridrel&format=json&maxrecords=10&query=sourcelang:eng%20domain:thehindu.com",
    "https://api.gdeltproject.org/api/v2/doc/doc?timespan=6h&mode=artlist&sort=hybridrel&format=json&maxrecords=10&query=sourcelang:eng%20domain:india.com",
    "https://api.gdeltproject.org/api/v2/doc/doc?timespan=6h&mode=artlist&sort=hybridrel&format=json&maxrecords=10&query=sourcelang:eng%20domain:business-standard.com",
    "https://api.gdeltproject.org/api/v2/doc/doc?timespan=6h&mode=artlist&sort=hybridrel&format=json&maxrecords=10&query=sourcelang:eng%20domain:indiatoday.in",
    "https://api.gdeltproject.org/api/v2/doc/doc?timespan=6h&mode=artlist&sort=hybridrel&format=json&maxrecords=10&query=sourcelang:eng%20domain:ndtv.com",
    "https://api.gdeltproject.org/api/v2/doc/doc?timespan=6h&mode=artlist&sort=hybridrel&format=json&maxrecords=10&query=sourcelang:eng%20domain:latestly.com",
    "https://api.gdeltproject.org/api/v2/doc/doc?timespan=6h&mode=artlist&sort=hybridrel&format=json&maxrecords=10&query=sourcelang:eng%20domain:netindia123.com",
    "https://api.gdeltproject.org/api/v2/doc/doc?timespan=6h&mode=artlist&sort=hybridrel&format=json&maxrecords=10&query=sourcelang:eng%20domain:bloombergquint.com",
    "https://api.gdeltproject.org/api/v2/doc/doc?timespan=6h&mode=artlist&sort=hybridrel&format=json&maxrecords=10&query=sourcelang:eng%20domain:indiatimes.com",
    "https://api.gdeltproject.org/api/v2/doc/doc?timespan=6h&mode=artlist&sort=hybridrel&format=json&maxrecords=10&query=sourcelang:eng%20domain:hindustantimes.com",
    "https://api.gdeltproject.org/api/v2/doc/doc?timespan=6h&mode=artlist&sort=hybridrel&format=json&maxrecords=10&query=sourcelang:eng%20domain:deccanherald.com",
    "https://api.gdeltproject.org/api/v2/doc/doc?timespan=6h&mode=artlist&sort=hybridrel&format=json&maxrecords=10&query=sourcelang:eng%20domain:in.investing.com",
    "https://api.gdeltproject.org/api/v2/doc/doc?timespan=6h&mode=artlist&sort=hybridrel&format=json&maxrecords=10&query=sourcelang:eng%20domain:dnaindia.com",
    "https://api.gdeltproject.org/api/v2/doc/doc?timespan=6h&mode=artlist&sort=hybridrel&format=json&maxrecords=10&query=sourcelang:eng%20domain:pinkvilla.com",
    "https://api.gdeltproject.org/api/v2/doc/doc?timespan=6h&mode=artlist&sort=hybridrel&format=json&maxrecords=10&query=sourcelang:eng%20domain:koimoi.com",
    "https://api.gdeltproject.org/api/v2/doc/doc?timespan=6h&mode=artlist&sort=hybridrel&format=json&maxrecords=10&query=sourcelang:eng%20domain:bollywoodhungama.com",



    ]
    async.mapLimit(urls, 50, async function (url) {
        try {
            const response = await fetch(url)
            return response.json()
        } catch (err) {
            // console.trace(err);
        }

    }, (err, results) => {
        if (err) { console.log(err); } else{              
            arr = [];                 
            for (index in results) {
                let leng = results[index].articles ? results[index].articles.length : 0
                console.log(leng);
                if(results[index].articles){
                    results[index].articles.forEach(item => {
                        var item_index = arr.findIndex(x => x.link == item.url);
                        var similarity_index = arr.findIndex(x => stringSimilarity(x.title, item.title)>0);
                        if(similarity_index >0){
                            console.log(similarity_index, item.title);
                        }                        
                        // console.log(item.title,arr[item_index],stringSimilarity(item.title, arr[item_index]))                                                                       
                        if (item_index === -1) { 
                            var mDate = item.seendate.slice(0, 4) + "-" + item.seendate.slice(4, 6) + "-" + item.seendate.slice(6, 8)
                            + " " + item.seendate.slice(9, 11) + ":" + item.seendate.slice(11, 13)
                            + ":" + item.seendate.slice(13, 15);
                            var unixtime = Date.parse(mDate);                       
                            arr.push({ "title": item.title.replaceAll(" - ","-").replaceAll(" %", "%").replaceAll(" .", "."), "created": unixtime, "link": item.url, "source": item.domain, "thumbnail": item.socialimage })
                        }
                    });
                }                
            }
            arrr = arr.sort(function (a, b) {
                return b.created - a.created;
            });  
            console.log(arrr.length);
            $("#countryNews").html("");
            $.each(arrr, function (k, v) {                
                // var mDate = v.created.slice(0, 4) + "-" + v.created.slice(4, 6) + "-" + v.created.slice(6, 8)
                //     + " " + v.created.slice(9, 11) + ":" + v.created.slice(11, 13)
                //     + ":" + v.created.slice(13, 15);
                // var unixtime = v.created;
                var currTime = Date.now();
                var timediff = Math.round(currTime / 1000 -  v.created / 1000);
                if (timediff / 60 / 60 < 1) {
                    timediff = Math.round(timediff / 60) + " mins ago";
                } else if (Math.round(timediff / 60 / 60) === 1) {
                    timediff = Math.round(timediff / 60 / 60) + " hour ago";
                } else {
                    timediff = Math.round(timediff / 60 / 60) + " hours ago";
                }
                try {
                    var { hostname } = new URL(v.link);
                    let imgsrc = v.thumbnail ? v.thumbnail : ``
                    var $listItem = $(`                    
                    <li class="list-group-item border-bottom py-4 bg-light mb-1" style="cursor:pointer">                                        
                        <div class="d-flex gap-2 w-100 justify-content-between">
                            <div>
                                <img src="https://www.google.com/s2/favicons?sz=16&domain=${hostname}" alt="" width="16" height="16" class="rounded-circle">                                
                                <h5 class="mb-0 mt-0 fw-bold">${v.title}</h5> 
                                <p class="mb-0 mt-1 opacity-50 small">${hostname}, ${timediff}</p>                                                             
                            </div>
                            <img src="${imgsrc}" alt="" width="64" height="64" class="flex-shrink-0 sqimg mt-4 rounded">
                        </div>	
                       
                    </li>
                    `);
                    $listItem.on("click", function (e) {
                        window.open(v.link, '_blank');
                    });
                    $("#countryNews").append($listItem);
                } catch (err) {
                    // console.log(v.link, err);
                }
            });        
            $("body").css({ "opacity": "1" });
            $("body").css({"cursor": ""});
            $("#countryNews").focus();
        }
       
    })
}
function getLanguageNews() {    
    urls = [
    "https://api.gdeltproject.org/api/v2/doc/doc?timespan=6h&mode=artlist&sort=hybridrel&format=json&maxrecords=50&query=sourcelang:hindi",
    "https://api.gdeltproject.org/api/v2/doc/doc?timespan=6h&mode=artlist&sort=hybridrel&format=json&maxrecords=50&query=sourcelang:marathi",   
    ]
    async.mapLimit(urls, 50, async function (url) {
        try {
            const response = await fetch(url)
            return response.json()
        } catch (err) {
            // console.trace(err);
        }

    }, (err, results) => {
        if (err) { console.log(err); } else{              
            arr = [];                 
            for (index in results) {
                let leng = results[index].articles ? results[index].articles.length : 0
                console.log(leng);
                if(results[index].articles){
                    results[index].articles.forEach(item => {
                        var item_index = arr.findIndex(x => x.link == item.url);
                        var similarity_index = arr.findIndex(x => stringSimilarity(x.title, item.title)>0.75);
                        if(similarity_index>0){
                            console.group()
                            console.log(similarity_index);
                            console.log(item.title, item.domain);
                            console.log(arr[similarity_index].title,arr[similarity_index].source);
                            console.log(stringSimilarity(item.title, arr[similarity_index].title));
                            console.groupEnd()
                        }                        
                        // console.log(item.title,arr[item_index],stringSimilarity(item.title, arr[item_index]))                                                                       
                        if (item_index === -1) { 
                            var mDate = item.seendate.slice(0, 4) + "-" + item.seendate.slice(4, 6) + "-" + item.seendate.slice(6, 8)
                            + " " + item.seendate.slice(9, 11) + ":" + item.seendate.slice(11, 13)
                            + ":" + item.seendate.slice(13, 15);
                            var unixtime = Date.parse(mDate);                       
                            arr.push({ "title": item.title.replaceAll(" - ","-").replaceAll(" %", "%").replaceAll(" .", "."), "created": unixtime, "link": item.url, "source": item.domain, "thumbnail": item.socialimage })
                        }
                    });
                }                
            }
            arrr = arr.sort(function (a, b) {
                return b.created - a.created;
            });  
            console.log(arrr.length);
            $("#languageNews").html("");
            $.each(arrr, function (k, v) {                
                // var mDate = v.created.slice(0, 4) + "-" + v.created.slice(4, 6) + "-" + v.created.slice(6, 8)
                //     + " " + v.created.slice(9, 11) + ":" + v.created.slice(11, 13)
                //     + ":" + v.created.slice(13, 15);
                // var unixtime = v.created;
                var currTime = Date.now();
                var timediff = Math.round(currTime / 1000 -  v.created / 1000);
                if (timediff / 60 / 60 < 1) {
                    timediff = Math.round(timediff / 60) + " mins ago";
                } else if (Math.round(timediff / 60 / 60) === 1) {
                    timediff = Math.round(timediff / 60 / 60) + " hour ago";
                } else {
                    timediff = Math.round(timediff / 60 / 60) + " hours ago";
                }
                try {
                    var { hostname } = new URL(v.link);
                    let imgsrc = v.thumbnail ? v.thumbnail : ``
                    var $listItem = $(`                    
                    <li class="list-group-item border-bottom py-4 bg-light mb-1" style="cursor:pointer">                                        
                        <div class="d-flex gap-2 w-100 justify-content-between">
                            <div>
                                <img src="https://www.google.com/s2/favicons?sz=16&domain=${hostname}" alt="" width="16" height="16" class="rounded-circle">                                
                                <h5 class="mb-0 mt-0 fw-bold">${v.title}</h5> 
                                <p class="mb-0 mt-1 opacity-50 small">${hostname}, ${timediff}</p>                                                             
                            </div>
                            <img src="${imgsrc}" alt="" width="64" height="64" class="flex-shrink-0 sqimg mt-4 rounded">
                        </div>	
                       
                    </li>
                    `);
                    $listItem.on("click", function (e) {
                        window.open(v.link, '_blank');
                    });
                    $("#languageNews").append($listItem);
                } catch (err) {
                    // console.log(v.link, err);
                }
            });        
            $("body").css({ "opacity": "1" });
            $("body").css({"cursor": ""});
            $("#languageNews").focus();
        }
       
    })
}
$("#button-keyword").on("click", function(){    
    $("body").css({ "opacity": "0.2" });    
    getKeywordNews($("#keyword").val());
})
function getKeywordNews(hash) {
    document.title = hash.toUpperCase() + " - " + location.hash.replace("#", "").replace("NewsSection", " News Section");
    urls = ["https://api.gdeltproject.org/api/v2/doc/doc?query=" + $.trim(hash) + "%20sourcelang:eng&mode=artlist&format=json&maxrecords=75&sort=datedesc"]
    async.mapLimit(urls, 1, async function (url) {
        try {
            const response = await fetch(url)
            return response.json()
        } catch (err) {
            // console.trace(err);
        }

    }, (err, results) => {
        // if (err) { console.log(err); }
        arr = []
        // console.log(results);
        for (index in results) {
            results[index].articles.forEach(item => {
                var item_index = arr.findIndex(x => x.link == item.url);
                if (item_index === -1) {
                    arr.push({ "title": item.title, "created": item.seendate, "link": item.url, "source": item.domain, "thumbnail": item.socialimage })
                }
            });
        }
        arrr = arr.sort(function (a, b) {
            return b.created - a.created;
        });
        // console.log(arrr);
        $("#searchNews").html(``);
        $.each(arrr, function (k, v) {
            var mDate = v.created.slice(0, 4) + "-" + v.created.slice(4, 6) + "-" + v.created.slice(6, 8)
                + " " + v.created.slice(9, 11) + ":" + v.created.slice(11, 13)
                + ":" + v.created.slice(13, 15);
            var unixtime = Date.parse(mDate);
            var currTime = Date.now();
            var timediff = Math.round(currTime / 1000 - unixtime / 1000);
            if (timediff / 60 / 60 < 1) {
                timediff = Math.round(timediff / 60) + " minutes ago";
            } else if (Math.round(timediff / 60 / 60) === 1) {
                timediff = Math.round(timediff / 60 / 60) + " hour ago";
            } else {
                timediff = Math.round(timediff / 60 / 60) + " hours ago";
            }
            try {
                var { hostname } = new URL(v.link);
                let imgsrc = v.thumbnail ? v.thumbnail : ``
                var $listItem = $(`                    
        <li class="list-group-item border-bottom py-4 bg-light mb-1" style="cursor:pointer">                                        
            <div class="d-flex gap-2 w-100 justify-content-between">
                <div>
                    <img src="https://www.google.com/s2/favicons?sz=16&domain=${hostname}" alt="" width="16" height="16" class="rounded-circle flex-shrink-0">                                
                    <h5 class="mb-0 mt-0 fw-bold">${v.title}</h5> 
                    <p class="mb-0 mt-1 opacity-50 small">${hostname}, ${timediff}</p>                                                             
                </div>
                <img src="${imgsrc}" alt="" width="64" height="64" class="flex-shrink-0 sqimg mt-2 rounded">
            </div>	
           
        </li>
        `);
                $listItem.on("click", function (e) {
                    window.open(v.link, '_blank');
                });
                $("#searchNews").append($listItem);
            } catch (err) {
                // console.log(v.link, err);
            }
        });
        // p();
        $("body").css({ "opacity": "1" });
        $("body").css({ "cursor": "" });

    })
}
function getTimeline() {
    urls = ["https://api.gdeltproject.org/api/v2/doc/doc?timespan=1h&query=sourcelang:eng%20(domain:bbc.com%20OR%20domain:cnn.com%20OR%20domain:economictimes.indiatimes.com%20OR%20domain:theguardian.com)&mode=TimelineVolInfo&sort=hybridrel&format=json",
            "https://api.gdeltproject.org/api/v2/doc/doc?timespan=3h&query=sourcelang:eng%20(domain:news18.com%20OR%20domain:theprint.in%20OR%20domain:livemint.com%20OR%20domain:thehindu.com)&mode=TimelineVolInfo&sort=hybridrel&format=json"
           ]   
    async.mapLimit(urls, 1, async function (url) {
        try {
            const response = await fetch(url)
            return response.json()
        } catch (err) {
            // console.trace(err);
        }

    }, (err, results) => {
        // if (err) { console.log(err); }
        arr = []        
        for (index in results) {
            results[index].timeline[0].data.forEach(item => {
                arr.push({"created": item.date.replace("T","").replace("Z",""), "articles": item.toparts})
            });
        }
        arrr = arr.sort(function (a, b) {
            return b.created - a.created;
        });              
        $("#risingNews").html(``);
        $.each(arrr, function (k, v) {                       
            $.each(v.articles,function(k,v){    
                var { hostname } = new URL(v.url);
                var $listItem = $(`
                <li class="list-group-item border-bottom py-4 bg-light mb-1" style="cursor:pointer">
                    <div class="d-flex gap-2 w-100 justify-content-between">
                        <div>        
                            <h5 class="mb-0 mt-0 fw-bold">${v.title}</h5>
                            <p class="mb-0 mt-1 opacity-75 small">${hostname}</p>
                        </div>
                        <img src="https://www.google.com/s2/favicons?sz=32&domain=${hostname}" alt="" width="32" height="32" class="rounded-circle flex-shrink-0 mb-1">
                    </div>  
                                                                                                         
                </li>                               
                `);
                $listItem.on("click", function (e) {
                    window.open(v.url, '_blank');                   
                });
                $("#risingNews").append($listItem);
            })
        });
        
        $("body").css({ "opacity": "1" });
        $("body").css({"cursor": ""});
    })
}
function getWiki() {
    const start = Date.now()
    var MyDate = new Date();
    year = MyDate.getFullYear();
    month = ('0' + (MyDate.getMonth() + 1)).slice(-2);
    day = ('0' + (MyDate.getDate())).slice(-2);
    let url = `https://api.wikimedia.org/feed/v1/wikipedia/en/featured/${year}/${month}/${day}`;
    console.log(url);
    urls = [url]
    async.mapLimit(urls, 1, async function (url) {
        try {
            const response = await fetch(url)
            return response.json()
        } catch (err) {
            // console.log(err.response);
        }

    }, (err, results) => {
        if (err) { console.log(err); } else{
            wiki = {}
            arr = []
            $.each(results[0].mostread.articles, function (k, v) {
                arr.push({ title: v.displaytitle, thumbnail: v.thumbnail, extract: v.extract, description: v.description, views: v.views, link: v.content_urls.desktop.page });
            });
            wiki.mostread = arr;
            setLocalStorage("wiki", wiki, 15 * 60000);
            p();
            $("body").css({"opacity": "1"});
            $("body").css({"cursor": ""});
        }
        
    })
}
function getRSS(){
    const start = Date.now()   
    urls = [
		"https://sbcors.herokuapp.com/https://news.google.com/rss/search?q=(site:india.com+OR+site:business-standard.com+OR+site:livemint.com+OR+site:hindustantimes.com+OR+site:moneycontrol.com+OR+site:indianexpress.com+OR+site:tribuneindia.com+OR+site:hindustantimes.com+OR+site:ndtv.com+OR+site:indiatimes.com+OR+site:thehindu.com+OR+site:news18.com+OR+site:thewire.in)+when:1h&hl=en&gl=IN&ceid=IN:en",
		"https://sbcors.herokuapp.com/https://news.google.com/rss/search?q=(site:amarujala.com+OR+site:hindi.news18.com+OR+site:livehindustan.com+OR+site:m.patrika.com+OR+site:bhaskar.com+OR+site:jagran.com+OR+site:navbharattimes.indiatimes.com)+when:1h&hl=hi&gl=IN&ceid=IN:hi",
		"https://sbcors.herokuapp.com/https://news.google.com/rss/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNREpxYW5RU0JXVnVMVWRDR2dKSlRpZ0FQAQ?&gl=IN&hl=en-IN&ceid=IN:en",		
		"https://sbcors.herokuapp.com/https://news.google.com/rss/search?q=(site:cnbc.com+OR+site:fortune.com+OR+site:ft.com+OR+site:investing.com+OR+site:seekingalpha.com+OR+site:financialexpress.com+OR+site:bloombergquint.com+OR+site:forbes.com+OR+site:bloomberg.com+OR+site:businessinsider.com+OR+site:marketwatch.com+OR+site:entrepreneur.com+OR+site:wsj.com)+when:1h&hl=en-IN&gl=IN&ceid=IN:en"
    ]
    async.mapLimit(urls, 5, async function (url) {
        try {			
            const response = await rss(url)
            return response
        } catch (err) {
            console.log(err);
            return err;
        }

    }, (err, results) => {
		const stop = Date.now()        
        if (err) {console.log(err);back.send("rss", err)}               
		else{
			rss = {}
			for (index in results) {
				if (index == 0) {
					arr = []                
					results[index].items.forEach(item => {
						arr.push({ "title": item.title, "created": Date.parse(item.isoDate)/1000, "link": item.link})
					})
					arrr = arr.sort(function (a, b) {
						return b.created - a.created;
					});
					rss.india = arrr;
				}else if (index == 1){
					arr = []                
					results[index].items.forEach(item => {
						arr.push({ "title": item.title, "created": Date.parse(item.isoDate)/1000, "link": item.link})
					})
					arrr = arr.sort(function (a, b) {
						return b.created - a.created;
					});
					rss.hindi = arrr;	
				}
				else if (index == 2){
					arr = []                
					results[index].items.forEach(item => {
						arr.push({ "title": item.title, "created": Date.parse(item.isoDate)/1000, "link": item.link})
					})
					arrr = arr.sort(function (a, b) {
						return b.created - a.created;
					});
					rss.entertainment = arrr;	
				}				
				else if (index == 3){
					arr = []                
					results[index].items.forEach(item => {
						arr.push({ "title": item.title, "created": Date.parse(item.isoDate)/1000, "link": item.link})
					})
					arrr = arr.sort(function (a, b) {
						return b.created - a.created;
					});
					rss.business = arrr;	
				}
			}			
			const stop = Date.now()
			console.log(`Time Taken to execute RSS News = ${(stop - start) / 1000} seconds`);
            setLocalStorage("rss", rss, 60 * 60000);
            p();
            $("body").css({ "opacity": "1" });
            $("body").css({"cursor": ""});
			
		};
    })
}
function getTrendingsTrends(){
    const start = Date.now()    
    urls = [
		"https://trends.google.com/trends/api/realtimetrends?hl=en-IN&tz=0&cat=h&fi=0&fs=0&geo=IN&ri=300&rs=20&sort=0",
		"https://trends.google.com/trends/api/realtimetrends?hl=en-IN&tz=0&cat=e&fi=0&fs=0&geo=IN&ri=300&rs=20&sort=0",
		"https://trends.google.com/trends/api/realtimetrends?hl=en-IN&tz=0&cat=t&fi=0&fs=0&geo=IN&ri=300&rs=20&sort=0",
		"https://trends.google.com/trends/api/realtimetrends?hl=en-IN&tz=0&cat=b&fi=0&fs=0&geo=IN&ri=300&rs=20&sort=0",
		"https://trends.google.com/trends/api/realtimetrends?hl=en-IN&tz=0&cat=s&fi=0&fs=0&geo=IN&ri=300&rs=20&sort=0",
		"https://trends.google.com/trends/api/realtimetrends?hl=en-IN&tz=0&cat=m&fi=0&fs=0&geo=IN&ri=300&rs=20&sort=0",
	]
    async.mapLimit(urls, 21, async function (url) {
        try {
            const response = await fetch("https://sbcors.herokuapp.com/" + url)
            return response.text()
        } catch (err) {
            console.log(err);            
        }

    }, (err, results) => {
        if (err) {console.log(err);back.send("trends", err);} 
		else{
			// all = [];
			arr = [];
            articles = []
			for(index in results){
				try{
					if(results[index]){	
						response = JSON.parse(results[index].replace(")]}'", ""));
                        response.storySummaries.trendingStories.forEach(item => {arr.push(item)});
					}else{
						console.log("did not work");
					}	
				}catch (err){
					console.trace(err);
				}							
			}			
			const stop = Date.now();
			console.log(`Time Taken to execute TRENDS = ${(stop - start) / 1000} seconds`);
			// back.send("trends", all.filter((v,i,a)=>a.findIndex(t=>(t.title === v.title))===i), arr.filter((v,i,a)=>a.findIndex(t=>(t.title === v.title))===i));			
			console.log("trends", arr.filter((v,i,a)=>a.findIndex(t=>(t.title === v.title))===i));		
            setLocalStorage("trends", arr.filter((v,i,a)=>a.findIndex(t=>(t.title === v.title))===i), 60 * 60000);
            p();
            $("body").css({ "opacity": "1" });
            $("body").css({"cursor": ""});	

		}; 
    })
}
// function getTrendingsTrends(){
//     const start = Date.now()    
//     urls = [
// 		"https://trends.google.com/trends/api/realtimetrends?hl=en-IN&tz=0&cat=h&fi=0&fs=0&geo=IN&ri=300&rs=20&sort=0",
// 		"https://trends.google.com/trends/api/realtimetrends?hl=en-GB&tz=0&cat=h&fi=0&fs=0&geo=GB&ri=300&rs=20&sort=0",
// 		"https://trends.google.com/trends/api/realtimetrends?hl=en-US&tz=0&cat=h&fi=0&fs=0&geo=US&ri=300&rs=20&sort=0",

// 		"https://trends.google.com/trends/api/realtimetrends?hl=en-IN&tz=0&cat=e&fi=0&fs=0&geo=IN&ri=300&rs=20&sort=0",
// 		"https://trends.google.com/trends/api/realtimetrends?hl=en-GB&tz=0&cat=e&fi=0&fs=0&geo=GB&ri=300&rs=20&sort=0",
		

// 		"https://trends.google.com/trends/api/realtimetrends?hl=en-IN&tz=0&cat=t&fi=0&fs=0&geo=IN&ri=300&rs=20&sort=0",
// 		"https://trends.google.com/trends/api/realtimetrends?hl=en-GB&tz=0&cat=t&fi=0&fs=0&geo=GB&ri=300&rs=20&sort=0",
// 		"https://trends.google.com/trends/api/realtimetrends?hl=en-US&tz=0&cat=t&fi=0&fs=0&geo=US&ri=300&rs=20&sort=0",

// 		"https://trends.google.com/trends/api/realtimetrends?hl=en-IN&tz=0&cat=b&fi=0&fs=0&geo=IN&ri=300&rs=20&sort=0",
// 		"https://trends.google.com/trends/api/realtimetrends?hl=en-GB&tz=0&cat=b&fi=0&fs=0&geo=GB&ri=300&rs=20&sort=0",
// 		"https://trends.google.com/trends/api/realtimetrends?hl=en-US&tz=0&cat=b&fi=0&fs=0&geo=US&ri=300&rs=20&sort=0",

// 		"https://trends.google.com/trends/api/realtimetrends?hl=en-IN&tz=0&cat=s&fi=0&fs=0&geo=IN&ri=300&rs=20&sort=0",
// 		"https://trends.google.com/trends/api/realtimetrends?hl=en-GB&tz=0&cat=s&fi=0&fs=0&geo=GB&ri=300&rs=20&sort=0",
// 		"https://trends.google.com/trends/api/realtimetrends?hl=en-US&tz=0&cat=s&fi=0&fs=0&geo=US&ri=300&rs=20&sort=0",
		
		
// 		"https://trends.google.com/trends/api/realtimetrends?hl=en-IN&tz=0&cat=m&fi=0&fs=0&geo=IN&ri=300&rs=20&sort=0",	
// 		"https://trends.google.com/trends/api/realtimetrends?hl=en-GB&tz=0&cat=m&fi=0&fs=0&geo=GB&ri=300&rs=20&sort=0",
// 		"https://trends.google.com/trends/api/realtimetrends?hl=en-US&tz=0&cat=m&fi=0&fs=0&geo=US&ri=300&rs=20&sort=0",
	
// 	]
//     async.mapLimit(urls, 21, async function (url) {
//         try {
//             const response = await fetch("https://sbcors.herokuapp.com/" + url)
//             return response.text()
//         } catch (err) {
//             console.log(err);            
//         }

//     }, (err, results) => {
//         if (err) {console.log(err);back.send("trends", err);} 
// 		else{
// 			// all = [];
// 			arr = [];
//             articles = []
// 			for(index in results){
// 				try{
// 					if(results[index]){	
// 						if(index==0){
// 							response = JSON.parse(results[index].replace(")]}'", ""));
// 							response.storySummaries.trendingStories.forEach(item => {item.category = "top";item.country = "India";arr.push(item);});
// 						}
// 						else if(index==1){
// 							response = JSON.parse(results[index].replace(")]}'", ""));
// 							response.storySummaries.trendingStories.forEach(item => {item.category = "top";item.country = "UK";arr.push(item);});
// 						}
// 						else if(index==2){
// 							response = JSON.parse(results[index].replace(")]}'", ""));
// 							response.storySummaries.trendingStories.forEach(item => {item.category = "top";item.country = "US";arr.push(item);});
// 						}
// 						else if(index==3){
// 							response = JSON.parse(results[index].replace(")]}'", ""));
// 							response.storySummaries.trendingStories.forEach(item => {item.category = "entertainment";item.country = "India";arr.push(item);});
// 						}
// 						else if(index==4){
// 							response = JSON.parse(results[index].replace(")]}'", ""));
// 							response.storySummaries.trendingStories.forEach(item => {item.category = "entertainment";item.country = "UK";arr.push(item);});
// 						}
// 						else if(index==5){
// 							response = JSON.parse(results[index].replace(")]}'", ""));
// 							response.storySummaries.trendingStories.forEach(item => {item.category = "entertainment";item.country = "US";arr.push(item);});
// 						}
// 						else if(index==6){
// 							response = JSON.parse(results[index].replace(")]}'", ""));
// 							response.storySummaries.trendingStories.forEach(item => {item.category = "technology";item.country = "India";arr.push(item);});
// 						}
// 						else if(index==7){
// 							response = JSON.parse(results[index].replace(")]}'", ""));
// 							response.storySummaries.trendingStories.forEach(item => {item.category = "technology";item.country = "UK";arr.push(item);});
// 						}
// 						else if(index==8){
// 							response = JSON.parse(results[index].replace(")]}'", ""));
// 							response.storySummaries.trendingStories.forEach(item => {item.category = "technology";item.country = "US";arr.push(item);});
// 						}
// 						else if(index==9){
// 							response = JSON.parse(results[index].replace(")]}'", ""));
// 							response.storySummaries.trendingStories.forEach(item => {item.category = "business";item.country = "India";arr.push(item);});
// 						}
// 						else if(index==10){
// 							response = JSON.parse(results[index].replace(")]}'", ""));
// 							response.storySummaries.trendingStories.forEach(item => {item.category = "business";item.country = "UK";arr.push(item);});
// 						}
// 						else if(index==11){
// 							response = JSON.parse(results[index].replace(")]}'", ""));
// 							response.storySummaries.trendingStories.forEach(item => {item.category = "business";item.country = "US";arr.push(item);});
// 						}
// 						else if(index==12){
// 							response = JSON.parse(results[index].replace(")]}'", ""));
// 							response.storySummaries.trendingStories.forEach(item => {item.category = "sports";item.country = "India";arr.push(item);});
// 						}
// 						else if(index==13){
// 							response = JSON.parse(results[index].replace(")]}'", ""));
// 							response.storySummaries.trendingStories.forEach(item => {item.category = "sports";item.country = "UK";arr.push(item);});
// 						}
// 						else if(index==14){
// 							response = JSON.parse(results[index].replace(")]}'", ""));
// 							response.storySummaries.trendingStories.forEach(item => {item.category = "sports";item.country = "US";arr.push(item);});
// 						}
// 						else if(index==15){
// 							response = JSON.parse(results[index].replace(")]}'", ""));
// 							response.storySummaries.trendingStories.forEach(item => {item.category = "health";item.country = "India";arr.push(item);});
// 						}
// 						else if(index==16){
// 							response = JSON.parse(results[index].replace(")]}'", ""));
// 							response.storySummaries.trendingStories.forEach(item => {item.category = "health";item.country = "UK";arr.push(item);});
// 						}
// 						else if(index==17){
// 							response = JSON.parse(results[index].replace(")]}'", ""));
// 							response.storySummaries.trendingStories.forEach(item => {item.category = "health";item.country = "US";arr.push(item);});
// 						}else{
// 							//do nothing
// 						}
// 					}else{
// 						console.log("did not work");
// 					}	
// 				}catch (err){
// 					console.trace(err);
// 				}							
// 			}			
// 			const stop = Date.now();
// 			console.log(`Time Taken to execute TRENDS = ${(stop - start) / 1000} seconds`);
// 			// back.send("trends", all.filter((v,i,a)=>a.findIndex(t=>(t.title === v.title))===i), arr.filter((v,i,a)=>a.findIndex(t=>(t.title === v.title))===i));			
// 			console.log("trends", arr.filter((v,i,a)=>a.findIndex(t=>(t.title === v.title))===i));		
//             setLocalStorage("trends", arr.filter((v,i,a)=>a.findIndex(t=>(t.title === v.title))===i), 60 * 60000);
//             p();
//             $("body").css({ "opacity": "1" });
//             $("body").css({"cursor": ""});	

// 		}; 
//     })
// }


const stringSimilarity = (a, b) =>
  _stringSimilarity (prep (a), prep (b))

const _stringSimilarity = (a, b) => {
  const bg1 = bigrams (a)
  const bg2 = bigrams (b)
  const c1 = count (bg1)
  const c2 = count (bg2)
  const combined = uniq ([... bg1, ... bg2]) 
    .reduce ((t, k) => t + (Math .min (c1 [k] || 0, c2 [k] || 0)), 0)
  return 2 * combined / (bg1 .length + bg2 .length)
}

const prep = (str) => // TODO: unicode support?
  str .toLowerCase () .replace (/[^\w\s]/g, ' ') .replace (/\s+/g, ' ')

const bigrams = (str) => 
  [...str] .slice (0, -1) .map ((c, i) => c + str [i + 1])

const count = (xs) => 
  xs .reduce ((a, x) => ((a [x] = (a [x] || 0) + 1), a), {})

const uniq = (xs) => 
  [... new Set (xs)]

// urlTest("https://sbcors.herokuapp.com/https://txtify.it/https://indianexpress.com/article/india/rape-heinous-crime-priyanka-gandhi-slams-karnataka-cong-mla-7677995/")
// urlTest("https://sbcors.herokuapp.com/https://feedly.com/v3/feeds/feed%2Fhttp%3A%2F%2Fwww.forbes.com%2Fbusiness%2Findex.xml?numRecentEntries=50&ck=1620410511531&ct=feedly.desktop&cv=31.0.1225")
async function urlTest(url){
    try{       
        const response =  await fetch(url);
        console.log(await response.json())
    }catch(err){
        console.log(err);
    }
   }

// Example POST method implementation:
async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.      
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached      
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  
//   postData('https://api.law.cornell.edu/lii/search', {"term":"tax","filters":{"collection":[]},"limit":10})
//     .then(data => {
//       console.log(data); // JSON data parsed by `data.json()` call
//     });
  