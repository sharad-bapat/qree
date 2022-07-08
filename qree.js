var country = "";
var language = "";
getCountry();
function getCountry() {
    country = navigator.languages[0].split("-")[1]
    language = navigator.languages[0].split("-")[0]
}
onPageLoad();
window.addEventListener('hashchange', function () {
    loading();
    if (!location.hash || location.hash == "#" || location.hash == "") {
        window.location = "#worldnews";
    }
    load();
}, false);

function onPageLoad() {
    loading();
    if (!location.hash || location.hash == "#" || location.hash == "") {
        window.location = "#worldnews";
    }
    load();
}

function load() {   
    loading();
    if (location.hash == "#worldnews") {
        getWorldNewsRSS().then(data => { populateRSS(data); })
        //getData().then(data => { populate(data); })
        // getTrendingNews().then(data => { populateTrendingNews(data); });
        // getGoogleSearchTrends().then(data => { populateGoogleSearchTrends(data); });
        // getWikiData().then(data => { populateWiki(data); });
        // getIndiaData().then(data => { populateIndiaData(data); });
    }
    else if (location.hash == "#trendingNewsSection") {
        getTrendingNews().then(data => { populateTrendingNews(data); })
    }
    else if (location.hash == "#GoogleSearchTrendsSection") {
        getGoogleSearchTrends().then(data => { populateGoogleSearchTrends(data); });
    }
    else if(location.hash =="#wikiSection"){
        getWikiData().then(data => { populateWiki(data); });
    }
    else if(location.hash=="#RealTimeTrends"){
        getRealTimeTrends().then(data => { populateRealTimeTrends(data); });
    }
    else if (location.hash == "#trendingIndia") {
        getIndiaNewsRSS().then((data => { populateRSS(data); }));
    }
    else if (location.hash == "#trendingBusinessNews") {
        getBusinessNewsRSS().then((data => { populateRSS(data); }));
    }
    else if (location.hash == "#bollywood") {
        //getBollywoodNewsRSS().then((data => { populateRSS(data); }));
    }
    else if (location.hash == "#techNews") {
        getTechNews().then((data => { populateRSS(data); }));
    }
    else if (location.hash == "#other") {
        getOtherData().then((data => { populate(data); }));
    }
    else {
        getHomeData().then(data => { populate(data); })
    }

}

function loading() {
    $("#qree").html("");
    $("#qree").html(`
        <div class="d-flex align-items-center">
            <strong>Loading...</strong>
            <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
        </div>
    `);
}

function imgError(image) {
    //  $(image).hide();    
    $(image).attr("src", `placeholder.jpg`);
    // $(image).unwrap();
    //$(image).parent().remove();
}

function getHomeData() {
    loading();
    var n = 2;
    return new Promise((resolve, reject) => {
        try {
            if (!getLocalStorage("HomeData")) {
                var urls = [
                    `https://feedly.com/v3/feeds/feed%2Fhttp%3A%2F%2Fnewsrss.bbc.co.uk%2Frss%2Fnewsonline_world_edition%2Ffront_page%2Frss.xml?numRecentEntries=5&ck=1656168529130&ct=feedly.desktop&cv=31.0.1621`,
                    `https://feedly.com/v3/feeds/feed%2Fhttp%3A%2F%2Fwww.nytimes.com%2Fservices%2Fxml%2Frss%2Fnyt%2FHomePage.xml?numRecentEntries=5&ck=1656168529132&ct=feedly.desktop&cv=31.0.1621`,
                    `https://feedly.com/v3/feeds/feed%2Fhttp%3A%2F%2Frss.cnn.com%2Frss%2Fcnn_topstories.rss?numRecentEntries=5&ck=1656168529133&ct=feedly.desktop&cv=31.0.1621`,
                    `https://feedly.com/v3/feeds/feed%2Fhttp%3A%2F%2Fwww.npr.org%2Frss%2Frss.php%3Fid%3D1001?numRecentEntries=5&ck=1656168529134&ct=feedly.desktop&cv=31.0.1621`,
                    `https://feedly.com/v3/feeds/feed%2Fhttp%3A%2F%2Fwww.guardian.co.uk%2Frssfeed%2F0%2C%2C1%2C00.xml?numRecentEntries=5&ck=1656168529135&ct=feedly.desktop&cv=31.0.1621`,
                    `https://feedly.com/v3/feeds/feed%2Fhttp%3A%2F%2Frss.time.com%2Fweb%2Ftime%2Frss%2Ftop%2Findex.xml?numRecentEntries=5&ck=1656168529137&ct=feedly.desktop&cv=31.0.1621`,
                    `https://feedly.com/v3/feeds/feed%2Fhttp%3A%2F%2Ffeeds.abcnews.com%2Fabcnews%2Ftopstories?numRecentEntries=5&ck=1656168529138&ct=feedly.desktop&cv=31.0.1621`

                ]
                async.map(urls, async function (url) {
                    try {
                        const response = await fetch(`https://sbcors.herokuapp.com/${url}`)
                        return response.json()
                    } catch (err) {
                        return {}
                    }

                }, (err, results) => {
                    if (err) { console.log(err); } else {
                        setLocalStorage("HomeData", results, 30 * 60000);
                        resolve(results);
                    }
                })
            } else {
                resolve(getLocalStorage("HomeData"));
            }

        } catch (err) { reject(err) }
    })
}


function normalizeGDELT(results) {
    arr = []
    for (index in results) {
        if (results[index].articles) {
            results[index].articles.forEach(item => {
                var item_index = arr.findIndex(x => x.link == item.url);
                if (item_index === -1) {
                    var mDate = item.seendate.slice(0, 4) + "-" + item.seendate.slice(4, 6) + "-" + item.seendate.slice(6, 8)
                        + " " + item.seendate.slice(9, 11) + ":" + item.seendate.slice(11, 13)
                        + ":" + item.seendate.slice(13, 15);
                    var unixtime = Date.parse(mDate);
                    arr.push({ "title": item.title.replaceAll(" - ", "-").replaceAll(" %", "%").replaceAll(" .", "."), "created": unixtime, "link": item.url, "source": item.domain, "thumbnail": item.socialimage })
                }
            });
        }
    }
    arrr = arr.sort(function (a, b) {
        return b.created - a.created;
    });
    return arrr
}

//RSS
function normalizeRSS(results){
    var arr=[];
    $.each(results, function(k,v){
        var item_arr = [];
        $.each(v.items, function(i,j){
            let content = j.content ? j.content : ""
            item_arr.push({
                "link":j.link,
                "title":j.title,
                "content": content,
            })
        })
        arr.push({
            "feed_link":v.link,
            "feed_description":v.description,
            "feed_title": v.title,
            "items": item_arr
        })
    });
    return arr;
}
function getWorldNewsRSS() {
    return new Promise((resolve, reject) => {
        if (!getLocalStorage("WorldNews")) {
            try {
                // var urls = [
                //     `https://www.reddit.com/r/worldnews/top.rss?t=hour`,   
                //     `https://www.reddit.com/r/worldnews/top.rss?t=week`,            
                // ]
                var urls = [
                    //`https://trends.google.com/trends/trendingsearches/daily/rss?geo=IN`,
                   
                    `https://feeds.npr.org/1001/rss.xml`,
                    `http://feeds.bbci.co.uk/news/world/rss.xml`,
                    `https://feeds.a.dj.com/rss/RSSWorldNews.xml`,
                    `http://rss.cnn.com/rss/edition_world.rss`,
                    `https://rss.nytimes.com/services/xml/rss/nyt/World.xml`,
                    `http://www.aljazeera.com/xml/rss/all.xml`,
                    `https://timesofindia.indiatimes.com/rssfeeds/296589292.cms`,
                    `https://www.cnbc.com/id/100727362/device/rss/rss.html`,
                    `https://www.rt.com/rss/news/`,
                    `https://cms.qz.com/feed/`,
                    
                ]
                async.map(urls, async function (url) {
                    try {
                        const response = await rss(`https://sbcors.herokuapp.com/${url}`)
                        //const response = await rss(`${url}`)
                        return response
                    } catch (err) {
                        console.log(err);
                        return {}
                    }
                }, (err, results) => {
                    if (err) { console.log(err); } else {
                        response = normalizeRSS(results)
                        setLocalStorage("WorldNews", response, 60 * 60000);
                        resolve(response);
                    }
                })
    
            } catch (err) { reject(err) }
        }
        else{
            resolve(getLocalStorage("WorldNews"))
        }
        
    })
}
function populateRSS(data) {
    console.log(data);        
    $("#qree").html("");
    $.each(data, function (i, j) {       
        var { hostname } = data[i].items[0] ? new URL(data[i].items[0].link) : ``;
        let description = data[i].feed_description ? data[i].feed_description : ``
        if(hostname){
            $("#qree").append(`
            <div class="card mb-3">
                <div class="card-body">
                    <div class="d-flex gap-2 w-100 justify-content-start">               
                        <img src="https://icon.horse/icon/${hostname.replace("www.", "")}" alt="${hostname}" width="56" height="56" class="flex-shrink-0 rounded" />
                        <div class="border-bottom">                               
                            <h6 class="small mb-0 mt-0 fw-bold">${data[i].feed_title}</h6> 
                            <p class="mt-0 smaller">${description}</p> 
                        </div>                
                    </div>
                    <ul class="newsItems${i} list-group-flush mt-2"></ul>
                </div>
            </div>
            `);
        }        
        if(data[i].items.length>0){
            $.each(data[i].items.slice(0,5), function (k, v) {
                try {
                    let content_snippet = v.content ? v.content : ""
                    var $listItem = $(`<li class="py-3 list-group-item newslink" style="cursor:pointer">
                        <h6 class="small fw-bold">${v.title}</h6>
                        <!--<p class="smaller contentSnippet">${content_snippet}</p>-->
                    </li>`);
                    $listItem.on("click", function (e) {
                        console.log(v.link);
                        getArticleExtract(v.link);
                    });
                    $(`.newsItems${i}`).append($listItem);
                } catch (err) {
                    //$( "#qree").html("<strong class='text-danger'>Sorry! This RSS did not return a valid response</strong>");
                    console.clear();
                }
            });
        }
       
    });

}


//Trending News Reddit
function normalizeRedditData(results) {
    arr = []
    for (index in results) {
        results[index].data.children.forEach(item => {
            var item_index = arr.findIndex(x => x.link == item.data.url);
            if (item.data.url.includes("youtube") || item.data.url.includes("youtu.be") || item.data.url.includes("twitter.com") || item.data.url.includes("redd.it") || item.data.url.includes("reddit.com") || item.data.url.includes("imgur.com") || item.data.url.includes("gfycat.com")) {
                //do nothing
            } else {
                if (item_index === -1) {
                    arr.push({
                        "title": item.data.title,
                        "created": item.data.created,
                        "link": item.data.url,
                        "source": item.data.domain,
                        "thumbnail": item.data.thumbnail,
                    })
                }
            }
        });
    }
    arrr = arr.sort(function (a, b) {
        return b.created - a.created;
    });
    return arrr;
}
function getTrendingNews() {
    return new Promise((resolve, reject) => {
        try {
            if (!getLocalStorage("TrendingNews")) {
                urls = [`https://www.reddit.com/r/worldnews+technology+business+finance+technews+economy/top/.json?t=day&limit=25`,
                    'https://www.reddit.com/r/worldnews+technology+business+finance+technews+economy/top/.json?t=hour&limit=25',
                    'https://www.reddit.com/r/worldnews+technology+business+finance+technews+economy/hot/.json?&t=day&limit=25',
                    'https://www.reddit.com/r/worldnews+technology+business+finance+technews+economy/hot/.json?&t=hour&limit=25']
                async.mapLimit(urls, 4, async function (url) { try { const response = await fetch(url); return response.json() } catch (err) { return {} } }, (err, results) => { response = normalizeRedditData(results); setLocalStorage("TrendingNews", response, 15 * 60000); resolve(response) })
            } else {
                resolve(getLocalStorage("TrendingNews"));
            }
        } catch (err) { reject(err) }
    })
}
function populateTrendingNews(data) {
    $("#qree").html("");
    $.each(data, function (k, v) {
        let imgsrc = v.thumbnail != "default" ? `<img src="${v.thumbnail}" alt="" width="72" height="72" class="rounded sqimg d-flex justify-content-start mt-1" onerror='imgError(this)' />` : `<img src="placeholder.jpg" alt="" width="72" height="72" class="rounded sqimg d-flex justify-content-start mt-1" onerror='imgError(this)' />`;
        var $listItem = $(`                    
        <li class="px-2 py-3 list-group-item mb-1 newslink" style="cursor:pointer">
        <div class="d-flex gap-2 w-100 justify-content-start">
                    ${imgsrc}
                    <div>  
                        <p class="mb-0 smaller">${v.source}</p>
                        <h6 class="small fw-bold mb-0 mt-0">${v.title}</h6>                        
                    </div>                  
                </div>  
        </li>
        `);
        $listItem.on("click", function (e) {
            document.getElementById("overlay").style.display = "block";
            on(v.link);
        });
        $("#qree").append($listItem);
    })
}

// Trending Searches
function getGoogleSearchTrends() {
    return new Promise((resolve, reject) => {
        try {
            if (!getLocalStorage("GoogleSearchTrends")) {
                urls = ["https://trends.google.com/trends/api/dailytrends?hl=en-IN&geo=IN&ns=15",
                    "https://trends.google.com/trends/api/dailytrends?hl=en-US&geo=US&ns=15",
                    "https://trends.google.com/trends/api/dailytrends?hl=en-GB&geo=GB&ns=15",
                ]
                async.mapLimit(urls, 1, async function (url) {
                    try {
                        const response = await fetch("https://sbcors.herokuapp.com/" + url)
                        //const response = await fetch(url)
                        return response.text()
                    } catch (err) {
                        return ")]}',"
                    }
                }, (err, results) => {
                    // all = [];
                    arr = [];
                    results.forEach(item => {
                        arr.push(JSON.parse(item.replace(")]}',", "")))
                    })
                    // response = 	arr.filter((v,i,a)=>a.findIndex(t=>(t.title === v.title))===i)
                    setLocalStorage("GoogleSearchTrends", arr, 60 * 60000);
                    resolve(arr);
                })

            } else {
                resolve(getLocalStorage("GoogleSearchTrends"));
            }
        } catch (err) { reject(err) }
    })
}
function populateGoogleSearchTrends(data) {
    console.log(data)
    $(" #qree").html(``);
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

    $.each(arr, function (k, v) {
        let imgsrc = v.image ? `<img src="${v.image}" alt="" width="72" height="72" class="rounded sqimg d-flex justify-content-start mt-1" onerror='imgError(this)' />` : `<img src="placeholder.jpg" alt="" width="72" height="72" class="rounded sqimg d-flex justify-content-start mt-1" onerror='imgError(this)' />`
        let article0imgsrc = v.articles[0].image ? v.articles[0].image.imageUrl : ``
        var $listItem = $(`
        <li class="mb-2 list-group-item px-2 py-3"> 
                <div class="d-flex gap-2 w-100 justify-content-start">
                    ${imgsrc}
                    <div>  
                        <h6 class="small mb-0 mt-0 fw-bold">${v.title.query}</h6>
                        <p class="mt-0 mb-0 smaller">${v.articles[0].snippet}</p>
                    </div>                  
                </div>  
                <div>
                <details>
                <summary><span class="mt-0 color-main small">Explore</span></summary>
                <ul class="list-group list-group-flush mt-3 ms-3" id="${k}GoogleSearchTrends">
                </ul> 
            </details>   
                </div> 
        </li>`);
        $(" #qree").append($listItem);
        $.each(v.articles.slice(1), function (a, b) {
            let imgsrc1 = b.image ? b.image.imageUrl : ``
            var $listItem = $(
                `<div class="d-flex gap-2 w-100 justify-content-between mb-2">
                    <details>
                        <summary><span class="small">${b.title}</span></summary>
                        <div class="d-flex gap-2 w-100 justify-content-between mb-2 mt-2">
                            <p class="small fw-bold small">${b.snippet} <span class="text-muted"><a href="${b.url}" target="_blank" style="color:blue;text-decoration:underline">Read full article at ${b.source}</span></p>                                      
                        </div>                                                                           
                    </details>
                </div>`);
            $(`#${k}GoogleSearchTrends`).append($listItem);
        });
    })
}

// Trending Wiki
function getWikiData() {
    return new Promise((resolve, reject) => {
        try {
            if (!getLocalStorage("WikiData")) {
                const start = Date.now()
                var MyDate = new Date();
                year = MyDate.getFullYear();
                month = ('0' + (MyDate.getMonth() + 1)).slice(-2);
                day = ('0' + (MyDate.getDate())).slice(-2);
                let url = `https://api.wikimedia.org/feed/v1/wikipedia/en/featured/${year}/${month}/${day}`;
                urls = [url]
                async.mapLimit(urls, 1, async function (url) {
                    try {
                        const response = await fetch(url)
                        return response.json()
                    } catch (err) {
                        return {}
                    }

                }, (err, results) => {
                    if (err) { console.log(err); } else {
                        wiki = {}
                        arr = []
                        $.each(results[0].mostread.articles, function (k, v) {
                            arr.push({ title: v.displaytitle, thumbnail: v.thumbnail, extract: v.extract, description: v.description, views: v.views, link: v.content_urls.desktop.page });
                        });
                        wiki.mostread = arr;
                        otd = []
                        $.each(results[0].onthisday, function (k, v) {
                            pages = []
                            $.each(v.pages, function (i, j) {
                                let thumbnail = j.thumbnail ? j.thumbnail.source : ``
                                pages.push({
                                    title: j.displaytitle,
                                    thumbnail: thumbnail,
                                    extract: j.extract,
                                    description: j.description,
                                    link: j.content_urls.desktop.page
                                })
                            });
                            otd.push({
                                title: v.text,
                                year: v.year,
                                pages: pages
                            });
                        });
                        wiki.otd = otd;
                        wiki.image = {
                            "thumbnail": results[0].image.thumbnail.source,
                            "artist": results[0].image.artist.text,
                            "description": results[0].image.description.text,
                        }
                        var thumbnail = results[0].tfa.thumbnail ? results[0].tfa.thumbnail.source : ``
                        wiki.tfa = {
                            "title": results[0].tfa.displaytitle,
                            "thumbnail": thumbnail,
                            "content": results[0].tfa.extract,
                            "description": results[0].tfa.description.text,
                            "link": results[0].tfa.content_urls.desktop.page,
                        }
                        setLocalStorage("WikiData", wiki, 60 * 60000);
                        resolve(wiki)
                    }

                })
            } else {
                resolve(getLocalStorage("WikiData"));
            }
        } catch (err) { reject(err) }
    })
}
function populateWiki(data) {
    $("#qree").html(``);
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
        let imgsrc = v.thumbnail ? `<img src="${v.thumbnail.source}" alt="" width="56" height="56" class="rounded sqimg d-flex justify-content-start mt-1" onerror='imgError(this)' />` : `<img src="placeholder.jpg" alt="" width="72" height="72" class="rounded sqimg d-flex justify-content-start mt-1" onerror='imgError(this)' />`

        var $listItem = $(`                    
        <li class="list-group-item p-2 mb-2" >                                        
            <div class="d-flex gap-2 w-100 justify-content-start">
                ${imgsrc}
                <div>
                    <p class="mb-0 mt-1 small">Views: ${v.views.toLocaleString("en-GB")}</p>
                    <p class="mb-0 mt-0 fw-bold small">${v.title} <span class="small">(${v.description})</span></p>
                </div>
            </div>
            <div>
                <details>
                    <summary><span class="smaller">Read more about ${v.title}</span></summary>
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
                    <li class="list-group-item  mt-4 mb-1">   
                        <div class="card" style="width:100%;">                            
                            <div class="card-body">
                                <p class="mt-0 fw-bold">${image.description}</p> 
                                <p class="mt-1 mb-0 small fw-bold">Artist: ${image.artist}</p>
                            </div>
                            <img src="${imgsrc}" class="card-img-top" alt="" onerror='imgError(this)' />                                   
                            </div>                            
                        </div>
                    </li>
                    `);
    $("#featured").append($listItem);
    var tfa = data.tfa
    let taimgsrc = tfa.thumbnail ? tfa.thumbnail : ``
    var $listItem = $(`                    
                    <li class="list-group-item mb-1">   
                        <div class="card mt-4" style="width:100%;">  
                            <div class="card-body"> 
                                <h5 class="mt-0 fw-bold">${tfa.title}</h5> 
                                <p class="mt-1 mb-0 small fw-bold">${tfa.content}</p>
                            </div> 
                            <img src="${taimgsrc}" class="card-img-top" alt="" onerror='imgError(this)' />
                            </div>
                        </div>
                    </li>
                    `);
    $("#featured").append($listItem);


    $.each(data.otd, function (k, v) {
        var details = ""
        $.each(v.pages, function (i, j) {
            details += `<div class="d-flex gap-2 w-100 justify-content-between my-1">
            <div>
                <details class="ms-4" style="cursor:pointer"><summary class="mb-0 mt-0">${j.title} (<small>${j.description}</small>)                          
                </summary>
                <p class="mb-0 mt-0 small">${j.extract}</p>  
                <p class="mb-0 mt-0 small"><a href="${j.link}" target="_blank">Read full article on Wikipedia</a></p>   
                </details>                                                        
            </div>           
        </div>`
        });
        var $listItem = $(`                    
        <li class="list-group-item p-2 mb-2" >                                        
            <div class="d-flex gap-2 w-100 justify-content-between">
                <div>
                    <p class="mb-0 mt-1">${v.year}</p> 
                    <details class="top-details" style="cursor:pointer"><summary class="mb-0 mt-0 fw-bold">${v.title}             
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

// Realtime Trends
function getRealTimeTrends(){
    return new Promise((resolve, reject)=>{
        try{
            if(!getLocalStorage("GoogleTrends")){
                const start = Date.now()
                var param= ""  ;
                if(country && language){
                    param = `hl=${language}-${country}&tz=0&fi=0&fs=0&geo=${country}&ri=300&rs=20&sort=0`
                    urls = [
                        `https://trends.google.com/trends/api/realtimetrends?${param}&cat=h`,
                        `https://trends.google.com/trends/api/realtimetrends?${param}&cat=e`,
                        `https://trends.google.com/trends/api/realtimetrends?${param}&cat=t`,
                        `https://trends.google.com/trends/api/realtimetrends?${param}&cat=b`,
                        `https://trends.google.com/trends/api/realtimetrends?${param}&cat=s`,
                        `https://trends.google.com/trends/api/realtimetrends?${param}&cat=m`,
                    ]
                } else{
                    urls = [
                        "https://trends.google.com/trends/api/realtimetrends?cat=h",
                        "https://trends.google.com/trends/api/realtimetrends?cat=e",
                        "https://trends.google.com/trends/api/realtimetrends?cat=t",
                        "https://trends.google.com/trends/api/realtimetrends?cat=b",
                        "https://trends.google.com/trends/api/realtimetrends?cat=s",
                        "https://trends.google.com/trends/api/realtimetrends?cat=m",
                    ]
                }
                async.mapLimit(urls, 6, async function (url) {
                    try {
                        const response = await fetch("https://sbcors.herokuapp.com/" + url)
                        return response.text()
                    } catch (err) {
                        return "{)]}'}"
                    }

                }, (err, results) => {
                    if (err) {console.log(err);}
                    else{
                        // all = [];
                        arr = [];
                        articles = []
                        for(index in results){
                            try{
                                if(results[index]){
                                    response = JSON.parse(results[index].replace(")]}'", ""));
                                    response.storySummaries.trendingStories.forEach(item => {arr.push(item)});
                                }
                            }catch (err){
                                console.trace(err);
                            }
                        }
                        response = 	arr.filter((v,i,a)=>a.findIndex(t=>(t.title === v.title))===i)
                        setLocalStorage("GoogleTrends",response , 60 * 60000);
                        resolve(response);
                    };
                })

            }else{
                resolve(getLocalStorage("GoogleTrends"));
            }
        }catch(err){reject(err)}
    })
}
function populateRealTimeTrends(data) {    
    $("#qree").html(``);
    $.each(data, function (k, v) {
        let imgsrc = v.image.imgUrl ? `<img src="http:${v.image.imgUrl}" alt="" width="56" height="56" class="rounded sqimg d-flex justify-content-end" onerror='imgError(this)' />` : ``
        var $listItem = $(`
        <li class="list-group-item py-4 mb-0" style="cursor:pointer"> 
                <div class="d-flex gap-2 w-100 justify-content-start">
                    ${imgsrc}
                    <div>    
                        <h6 class="small mb-0 mt-0 fw-bold">${v.title}</h6>
                    </div>
                </div> 
                <div>
                    <details>
                        <summary class="text-main">Explore</summary>
                        <ul class="list-group list-group-flush mt-3 ms-3" id="${k}googleTrends">
                        </ul> 
                    </details>
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

//India News Trends
function getIndiaNewsRSS() {
    return new Promise((resolve, reject) => {
        if (!getLocalStorage("IndiaNews")) {
            try {
               
                var urls = [                                      
                    `http://feeds.feedburner.com/NDTV-LatestNews`,
                    `https://www.indiatoday.in/rss/1206578`,
                    `https://indianexpress.com/feed/`,
                    `https://www.thehindu.com/news/national/?service=rss`,
                    `http://www.news18.com/rss/india.xml`,
                    `https://www.dnaindia.com/feeds/india.xml`,
                    `https://www.deccanchronicle.com/rss_feed/`,
                    `http://feeds.feedburner.com/ScrollinArticles.rss`,
                    `https://prod-qt-images.s3.amazonaws.com/production/thequint/feed.xml`,
                    `https://telanganatoday.com/feed`,
                    `https://cms.qz.com/feed/edition/india/`,                    
                ]
                async.map(urls, async function (url) {
                    try {
                        const response = await rss(`https://sbcors.herokuapp.com/${url}`)                        
                        return response
                    } catch (err) {
                        console.log(err);
                        return {}
                    }
                }, (err, results) => {
                    if (err) { console.log(err); } else {
                        response = normalizeRSS(results)
                        setLocalStorage("IndiaNews", response, 60 * 60000);
                        resolve(response);
                    }
                })
    
            } catch (err) { reject(err) }
        }
        else{
            resolve(getLocalStorage("IndiaNews"))
        }
        
    })
}

//Business News Trends
function getBusinessNewsRSS() {
    return new Promise((resolve, reject) => {
        if (!getLocalStorage("BusinessNews")) {
            try {
               
                var urls = [                                      
                    `https://www.entrepreneur.com/latest.rss`,                    
                    `https://www.inc.com/rss/`,                                    
                    `http://venturebeat.com/feed/`,    
                    `https://feeds.a.dj.com/rss/WSJcomUSBusiness.xml`,
                ]
                async.map(urls, async function (url) {
                    try {
                        const response = await rss(`https://sbcors.herokuapp.com/${url}`)                        
                        return response
                    } catch (err) {
                        console.log(err);
                        return {}
                    }
                }, (err, results) => {
                    if (err) { console.log(err); } else {
                        response = normalizeRSS(results)
                        setLocalStorage("BusinessNews", response, 60 * 60000);
                        resolve(response);
                    }
                })
    
            } catch (err) { reject(err) }
        }
        else{
            resolve(getLocalStorage("BusinessNews"))
        }
        
    })
}

//Bollywood News Trends
function getBollywoodNewsRSS() {
    return new Promise((resolve, reject) => {
        if (!getLocalStorage("BollywoodNews")) {
            try {
               
                var urls = [        
                    `http://feeds.feedburner.com/missmalini`,
                    `http://www.pinkvilla.com/rss.xml`,
                    `http://www.rediff.com/rss/moviesrss.xml`,
                    `http://www.koimoi.com/feed/`,
                ]
                async.map(urls, async function (url) {
                    try {
                        const response = await rss(`https://sbcors.herokuapp.com/${url}`)                        
                        return response
                    } catch (err) {
                        console.log(err);
                        return {}
                    }
                }, (err, results) => {
                    if (err) { console.log(err); } else {
                        response = normalizeRSS(results)
                        setLocalStorage("BollywoodNews", response, 60 * 60000);
                        resolve(response);
                    }
                })
    
            } catch (err) { reject(err) }
        }
        else{
            resolve(getLocalStorage("BollywoodNews"))
        }
        
    })
}

//Bollywood News Trends
function getTechNews() {
    return new Promise((resolve, reject) => {
        if (!getLocalStorage("TechNews")) {
            try {
               
                var urls = [        
                    `https://www.techmeme.com/feed.xml?x=1`,
                    `https://www.wired.com/feed/rss`,
                    `https://techcrunch.com/feed/`,
                    `https://www.technologyreview.com/topnews.rss`,
                    `http://www.theverge.com/rss/frontpage`,
                    `http://feeds.feedburner.com/venturebeat/SZYF`,
                    `http://feeds.arstechnica.com/arstechnica/technology-lab`,
                ]
                async.map(urls, async function (url) {
                    try {
                        const response = await rss(`https://sbcors.herokuapp.com/${url}`)                        
                        return response
                    } catch (err) {
                        console.log(err);
                        return {}
                    }
                }, (err, results) => {
                    if (err) { console.log(err); } else {
                        response = normalizeRSS(results)
                        setLocalStorage("TechNews", response, 60 * 60000);
                        resolve(response);
                    }
                })
    
            } catch (err) { reject(err) }
        }
        else{
            resolve(getLocalStorage("TechNews"))
        }
        
    })
}

function on(url) {
    getArticleExtract(url);
}

function off() {
    document.getElementById("overlay").style.display = "none";
}






function groupBy(xs, f) {
    return xs.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
}

function getDataGDELT() {
    return new Promise((resolve, reject) => {
        try {
            var urls = [
                //`https://api.gdeltproject.org/api/v2/doc/doc?query=(domain:india.com%20OR%20domain:indiatimes.com)&mode=artlist&maxrecords=250&sort=datedesc&format=json&timespan=3h`,
                // `https://api.gdeltproject.org/api/v2/doc/doc?query=-domainis:beautypageants.indiatimes.com%20-domain:cartoq.com%20-domain:mouthshut.com%20-domain:nagpurtoday.in%20-domain:uniindia.com%20-domain:ifp.co.in%20-domain:dinamalar.com%20-domain:indianewengland.com%20-domain:mathrubhumi.com%20-domain:ptinews.com%20sourcecountry:india%20sourcelang:eng&mode=artlist&maxrecords=250&sort=datedesc&format=json&timespan=3h`,
                `https://api.gdeltproject.org/api/v2/doc/doc?query=-domain:cartoq.com%20-domain:mouthshut.com%20-domain:nagpurtoday.in%20-domain:uniindia.com%20-domain:ifp.co.in%20-domain:dinamalar.com%20-domain:indianewengland.com%20-domain:mathrubhumi.com%20-domain:ptinews.com%20sourcecountry:india%20sourcelang:eng&mode=artlist&maxrecords=50&sort=datedesc&format=json&timespan=3h`,
                //`https://api.gdeltproject.org/api/v2/doc/doc?query=sourcecountry:us%20sourcelang:eng&mode=artlist&maxrecords=150&sort=datedesc&format=json`,
                //`https://api.gdeltproject.org/api/v2/doc/doc?query=sourcecountry:uk%20sourcelang:eng&mode=artlist&maxrecords=150&sort=datedesc&format=json`,

            ]
            async.map(urls, async function (url) {
                try {
                    const response = await fetch(`${url}`)
                    //const response = await rss(`${url}`)
                    return response.json()
                } catch (err) {
                    console.log(err);
                    return {}
                }
            }, (err, results) => {
                if (err) { console.log(err); } else {
                    resolve(results);
                }
            })

        } catch (err) { reject(err) }
    })
}
function populateGDELT(data) {
    $("#qree").html("");
    $.each(data, function (i, j) {
        var arr = groupBy(data[i].articles, (c) => c.domain);
        for (const [key, value] of Object.entries(arr)) {
            //console.log(key, value);
            var { hostname } = new URL(`https://www.${key}`);
            //console.log(hostname);
            $("#qree").append(`
            <div class="card mb-3">
                <div class="card-body">
                    <div class="d-flex gap-2 w-100 justify-content-start">               
                        <img src="https://icon.horse/icon/${hostname.replace("www.", "")}" alt="${hostname}" width="28" height="28" class="flex-shrink-0 rounded" />
                        <div class="border-bottom">                               
                            <h6 class="small mb-0 mt-0 fw-bold" style="overflow:hidden;text-overflow: ellipsis; max-width:calc(100vw - 90px) !important;">${hostname}</h6>                         
                        </div>                
                    </div>
                    <ul class="newsItems${hostname.replace("www.", "").replaceAll(".", "")} mt-2 list-group list-group-flush"></ul>
                </div>
            </div>
            `);
            $.each(value.slice(0, 5), function (k, v) {
                try {
                    //var { hostname } = new URL(v.link);
                    // let imgsrc = v.media ? v.media : `https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi1.wp.com%2Fpieceartura.pl%2Fwp-content%2Fuploads%2Fwoocommerce-placeholder.png%3Ffit%3D960%252C960%26ssl%3D1&f=1&nofb=1`
                    var $listItem = $(`<li class="py-2 list-group-item newslink" style="cursor:pointer">
                        ${v.title}                   
                    </li>`);
                    $listItem.on("click", function (e) {
                        console.log(v.url);
                        getArticleExtract(v.url);
                    });
                    $(`.newsItems${hostname.replace("www.", "").replaceAll(".", "")}`).append($listItem);
                } catch (err) {
                    //$( "#qree").html("<strong class='text-danger'>Sorry! This RSS did not return a valid response</strong>");
                    console.clear();
                }
            });

        }
    })

}


$(".scroll").scroll(function () {
    var mybutton = document.getElementById("gotop");
    if ($(".scroll")[0].scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
});
// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    $(".scroll").animate({ scrollTop: 0 }, "fast");
}
function getArticleExtract(url) {
    $("#wpContent").html(``);
    async.tryEach([
        (next) => {
            Parse(`${url}`).then(data => {
                if (data.title) {
                    console.log(data);
                    source_url = new URL(url);
                    update_HTML(data, source_url);
                } else {
                    console.log(`Simple parsing did not work`);
                    return next(new Error('Cannot get Data'))
                }
            }).catch(err => {
                console.log(err);
                document.getElementById("overlay").style.display = "none";
                return next(new Error('Cannot get Data'))
            })
        },

        (next) => {

            Parse(`https://sbcors.herokuapp.com/${url}`).then(data => {
                if (data.title) {
                    console.log(data);
                    source_url = new URL(url);
                    update_HTML(data, source_url);

                } else {
                    console.log(`CORS did not work`);
                    document.getElementById("overlay").style.display = "none";
                    return next(new Error('Cannot get Data'))
                }
            }).catch(err => {
                console.log(err);
                document.getElementById("overlay").style.display = "none";
                return next(new Error('Cannot get Data'))
            })
        },
    ])


}

function update_HTML(data, source_url) {
    document.getElementById("overlay").style.display = "block";
    $("#wpContent").append(`<div class="mb-2 ms-0 d-flex"><a href="#" onclick="off()"><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-x-lg text-dark fw-bold" viewBox="0 0 16 16">
    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
  </svg></a></div>`);
    $("#wpContent").append(`<img alt="${source_url.hostname}" class="mt-1 mb-3" src="https://www.google.com/s2/favicons?domain=${source_url.hostname}" /><span class="small"> ${source_url.hostname.replace("http://", "").replace("https://", "").replace("www.", "")}</span>`);
    $("#wpContent").append(`<h1>${data.title}</h1>`);
    if (data.date_published) {
        $("#wpContent").append(`<p class="small m-2">${data.date_published.split('T')[0]}</p>`);
    }
    $("#wpContent").append(`<hr class="my-3"></hr>`);
    //$("#wpContent").append(`<img src ="${data.lead_image_url}" alt="" width='80%' height="auto" style="object-fit:cover; margin:auto" onerror='imgError(this)'/>`);
    $("#wpContent").append(`<p class="small">${data.content}<p>`);
    $("#wpContent").append(`<div class="mb-2 ms-0 d-flex"><a href="#" onclick="off()"><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-x-lg text-dark fw-bold" viewBox="0 0 16 16">
    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
  </svg></a></div>`);
    $("#loader").attr("style", "display:none");
    $("#wpContent").show();


}


