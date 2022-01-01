
function normalizeRedditData(results){
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

function getHomeTrendingNews() {
    return new Promise((resolve, reject) => {
        try {
            if (!getLocalStorage("HomeTrendingNews")) {
                urls = [`https://www.reddit.com/r/worldnews/top/.json?sort=top&t=hour&limit=5`]
                async.mapLimit(urls, 1, async function (url) { try { const response = await fetch(url); return response.json() } catch (err) { return {} } }, (err, results) => { response = normalizeRedditData(results); setLocalStorage("HomeTrendingNews", response, 60 * 60000); resolve(response)})
            } else {
                resolve(getLocalStorage("HomeTrendingNews"));
            }
        } catch (err) { reject(err) }
    })
}

function normalizeGDELT(results){
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
function getHomeTopStories(){
    return new Promise((resolve, reject)=>{
        try{
            if(!getLocalStorage("HomeTopStories")){
                urls = ["https://api.gdeltproject.org/api/v2/doc/doc?mode=artlist&sort=datedesc&format=json&maxrecords=1&query=sourcelang:eng%20domainis:bbc.com",
                        "https://api.gdeltproject.org/api/v2/doc/doc?mode=artlist&sort=datedesc&format=json&maxrecords=1&query=sourcelang:eng%20domainis:foxnews.com",
                        "https://api.gdeltproject.org/api/v2/doc/doc?mode=artlist&sort=datedesc&format=json&maxrecords=1&query=sourcelang:eng%20domainis:cnn.com",
                        "https://api.gdeltproject.org/api/v2/doc/doc?mode=artlist&sort=datedesc&format=json&maxrecords=1&query=sourcelang:eng%20domainis:ndtv.com",
                        "https://api.gdeltproject.org/api/v2/doc/doc?mode=artlist&sort=datedesc&format=json&maxrecords=1&query=sourcelang:eng%20domainis:scroll.in",
                        "https://api.gdeltproject.org/api/v2/doc/doc?mode=artlist&sort=datedesc&format=json&maxrecords=1&query=sourcelang:eng%20domainis:dailymail.co.uk",
                        "https://api.gdeltproject.org/api/v2/doc/doc?mode=artlist&sort=datedesc&format=json&maxrecords=1&query=sourcelang:eng%20domainis:zeenews.india.com",
                        "https://api.gdeltproject.org/api/v2/doc/doc?mode=artlist&sort=datedesc&format=json&maxrecords=1&query=sourcelang:eng%20domainis:techradar.com",
                        "https://api.gdeltproject.org/api/v2/doc/doc?mode=artlist&sort=datedesc&format=json&maxrecords=1&query=sourcelang:eng%20domainis:telegraph.co.uk",
                        "https://api.gdeltproject.org/api/v2/doc/doc?mode=artlist&sort=datedesc&format=json&maxrecords=1&query=sourcelang:eng%20domainis:timesofindia.indiatimes.com",
                        "https://api.gdeltproject.org/api/v2/doc/doc?mode=artlist&sort=datedesc&format=json&maxrecords=1&query=sourcelang:eng%20domainis:thehindu.com",
                        ]
                async.mapLimit(urls, 11, async function(url){try{const response = await fetch(url);return response.json()}catch (err) {return {}}}, (err, results) => { response = normalizeGDELT(results); setLocalStorage("HomeTopStories",response, 15 * 60000);resolve(response)})       
            }else{
                resolve(getLocalStorage("HomeTopStories"));
            }
        }catch(err){reject(err)}        
    })    
}
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
                            "thumbnail":results[0].image.thumbnail.source,
                            "artist": results[0].image.artist.text,
                            "description": results[0].image.description.text,
                        }
                        wiki.tfa = {
                            "title":results[0].tfa.displaytitle,
                            "thumbnail":results[0].tfa.thumbnail.source,
                            "content": results[0].tfa.extract,
                            "description": results[0].tfa.description.text,
                            "link":results[0].tfa.content_urls.desktop.page,
                        }
                        setLocalStorage("WikiData", wiki, 15 * 60000);                        
                        resolve(wiki)
                    }

                })
            } else {
                resolve(getLocalStorage("WikiData"));
            }
        } catch (err) { reject(err) }
    })
}
function skeleton(){
    return new Promise((resolve, reject)=>{
        try{
            if(!getLocalStorage("")){


            }else{
                resolve(getLocalStorage(""));
            }
        }catch(err){reject(err)}        
    })   
}
function getGoogleTrends(){
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
function getGoogleSearchTrends(){
    return new Promise((resolve, reject)=>{
        try{
            if (!getLocalStorage("GoogleSearchTrends")) {
                urls = ["https://trends.google.com/trends/api/dailytrends?hl=en-IN&geo=IN&ns=15",
                    "https://trends.google.com/trends/api/dailytrends?hl=en-GB&geo=GB&ns=15",
                    "https://trends.google.com/trends/api/dailytrends?hl=en-US&geo=US&ns=15"
                ]
                async.mapLimit(urls, 3, async function (url) {
                    try {
                        const response = await fetch("https://sbcors.herokuapp.com/" + url)
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
        }catch(err){reject(err)}        
    })   
}

function groupBy(xs, f) {
    return xs.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
}

function getEvents(){
    return new Promise((resolve, reject)=>{
        try{
            if(!getLocalStorage("EventsData")){
                urls = ["https://sbcors.herokuapp.com/https://rsoe-edis.org/gateway/webapi/events/"]
                async.map(urls, async function (url) {
                    try {
                        const response = await fetch(url)
                        return response.json()
                    } catch (err) {
                        return {}
                    }            
                }, (err, results) => {                   
                    var arr = groupBy(results[0].features, (c) => c.properties.categoryName) 
                    setLocalStorage("EventsData", "", 60 * 60000);
                    setLocalStorage("EventsData", JSON.stringify(arr), 60 * 60000);
                    resolve(arr);
                })    

            }else{
                resolve(getLocalStorage("EventsData"));
            }
        }catch(err){reject(err)}        
    })   
}

function getWikiEvents(){
    return new Promise((resolve, reject)=>{      
        var MyDate = new Date();       
        month = ('0' + (MyDate.getMonth() + 1)).slice(-2);
        day = ('0' + (MyDate.getDate())).slice(-2);
        try{           
                urls = [`https://en.wikipedia.org/api/rest_v1/feed/onthisday/holidays/${month}/${day}`,
                `https://en.wikipedia.org/api/rest_v1/feed/onthisday/births/${month}/${day}`,
                `https://en.wikipedia.org/api/rest_v1/feed/onthisday/deaths/${month}/${day}`,
            ]
            async.mapLimit(urls, 3, async function (url) {
                try {
                    const response = await fetch(url)
                    return response.json()
                } catch (err) {
                    return ""
                }
            }, (err, results) => {
                WikiEvents = {}
                arr = []
                $.each(results,function(k,v){
                    if(v.births){
                        $.each(v.births, function (i,j){
                            pages = []
                            $.each(j.pages, function (a, b) {
                                let thumbnail = b.thumbnail ? b.thumbnail.source : ``
                                pages.push({
                                    title: b.displaytitle,
                                    thumbnail: thumbnail,
                                    extract: b.extract,
                                    description: b.description,
                                    link: b.content_urls.desktop.page
                                })
                            });
                            arr.push({
                                title: j.text,
                                year: j.year,
                                pages: pages
                            });
                        })
                        WikiEvents.births = arr;
                        arr=[];
                    }
                    if(v.deaths){
                        $.each(v.deaths, function (i,j){
                            pages = []
                            $.each(j.pages, function (a, b) {
                                let thumbnail = b.thumbnail ? b.thumbnail.source : ``
                                pages.push({
                                    title: b.displaytitle,
                                    thumbnail: thumbnail,
                                    extract: b.extract,
                                    description: b.description,
                                    link: b.content_urls.desktop.page
                                })
                            });
                            arr.push({
                                title: j.text,
                                year: j.year,
                                pages: pages
                            });
                        })
                        WikiEvents.deaths = arr;
                        arr=[];
                    }
                    if(v.holidays){
                        $.each(v.holidays, function (i,j){
                            pages = []
                            $.each(j.pages, function (a, b) {
                                let thumbnail = b.thumbnail ? b.thumbnail.source : ``
                                pages.push({
                                    title: b.displaytitle,
                                    thumbnail: thumbnail,
                                    extract: b.extract,
                                    description: b.description,
                                    link: b.content_urls.desktop.page
                                })
                            });
                            arr.push({
                                title: j.text,                                
                                pages: pages
                            });
                        })
                        WikiEvents.holidays = arr;
                        arr=[];
                    }
                }) 
                resolve(WikiEvents);
            })            
        }catch(err){reject(err)}        
    })   
}

function getTopNews() {
    var n = 2;
    return new Promise((resolve, reject)=>{
        try{
            if(!getLocalStorage("TopNews")){
                urls = [
                    `https://variety.com/wp-json/wp/v2/posts?per_page=${n}&context=view`
                    `https://time.com//wp-json/wp/v2/posts?per_page=${n}&context=view`,
                    `https://thewire.in/wp-json/wp/v2/posts?per_page=${n}&context=view`,
                    `https://www.thestatesman.com/wp-json/wp/v2/posts?per_page=${n}&context=view`,
                    `https://www.hollywoodreporter.com/wp-json/wp/v2/posts?per_page=${n}&context=view`,
                    `https://deadline.com//wp-json/wp/v2/posts?per_page=${n}&context=view`,
                    `https://techcrunch.com/wp-json/wp/v2/posts?per_page=${n}&context=view`,
                    `https://observer.com/wp-json/wp/v2/posts?per_page=${n}&context=view`,
                    `https://metro.co.uk/wp-json/wp/v2/posts?per_page=${n}&context=view`,
                    `https://thesun.co.uk/wp-json/wp/v2/posts?per_page=${n}&context=view`,                    
                    // "https://www.siasat.com/wp-json/wp/v2/posts?per_page=5&context=view",
                    `https://public-api.wordpress.com/rest/v1.2/sites/197693856/posts/?&number=${n}`,
                    `https://public-api.wordpress.com/rest/v1.2/sites/26599698/posts/?&number=${n}`,
                    `https://public-api.wordpress.com/rest/v1.2/sites/198147347/posts/?&number=${n}`,
                    `https://public-api.wordpress.com/rest/v1.2/sites/190074382/posts/?&number=${n}`,
                    `https://public-api.wordpress.com/rest/v1.2/sites/176892389/posts/?&number=${n}`,
                    `https://public-api.wordpress.com/rest/v1.2/sites/126020344/posts/?&number=${n}`,
                    `https://public-api.wordpress.com/rest/v1.2/sites/136451602/posts/?&number=${n}`,
                    `https://public-api.wordpress.com/rest/v1.2/sites/177646860/posts/?&number=${n}`,
                    `https://public-api.wordpress.com/rest/v1.2/sites/189127649/posts/?&number=${n}`,
                ]
                async.map(urls, async function (url) {
                    try {
                        const response = await fetch(url)
                        return response.json()
                    } catch (err) {
                        return {}
                    }
            
                }, (err, results) => {
                    if (err) { console.log(err); } else {
                        arr = [];
                        for (index in results) {
                            if (index < 10) {
                                results[index].forEach(item => {
                                    arr.push({
                                        "title": item.title.rendered,
                                        "date": `${new Date(item.date.toString()).toLocaleString()}`,
                                        "link": item.link,
                                        "content": item.content.rendered,
                                        "excerpt": item.excerpt.rendered,
                                        "media": item.jetpack_featured_media_url,
                                        "created": Date.parse(item.date),                                        
                                    })
            
                                });
            
                            } else {
                                results[index].posts.forEach(item => {
                                    arr.push({
                                        "title": item.title,
                                        "date": `${new Date(item.date.toString()).toLocaleString()}`,
                                        "link": item.URL,
                                        "content": item.content,
                                        "excerpt": item.excerpt,
                                        "media": item.featured_image,
                                        "created": Date.parse(item.date)
                                    })
                                });
            
                            }
            
                        }
                        arrr = arr.sort(function (a, b) {
                            return b.created - a.created;
                        });            
                        setLocalStorage("TopNews", arrr, 60 * 60000);                       
                        resolve(getLocalStorage(arrr));
                    }
            
                })
            }else{
                resolve(getLocalStorage("TopNews"));
            }
        }catch(err){reject(err)}        
    })   
  
   
}

function getAllTrendingNews(){
    return new Promise((resolve, reject)=>{
        try{
            if(!getLocalStorage("AllTrendingNews")){
                
            urls = ["https://www.reddit.com/r/worldnews/top/.json?sort=top&t=hour&limit=10",
                "https://www.reddit.com/r/worldnews/top/.json?sort=top&t=day&limit=10",
                "https://www.reddit.com/r/worldnews/hot/.json?&limit=10",
                "https://www.reddit.com/r/technology/top/.json?sort=top&t=day&limit=10",
                "https://www.reddit.com/r/technews/top/.json?sort=top&t=day&limit=10",
                "https://www.reddit.com/r/business/top/.json?sort=top&t=day&limit=10",
                "https://www.reddit.com/r/economics/top/.json?sort=top&t=day&limit=10",
                "https://www.reddit.com/r/economy/top/.json?sort=top&t=day&limit=10",
                "https://www.reddit.com/r/finance/top/.json?sort=top&t=day&limit=10",
                "https://www.reddit.com/r/science/top/.json?sort=top&t=day&limit=10",
                "https://www.reddit.com/r/news/top/.json?sort=top&t=day&limit=10",
            ]
            async.mapLimit(urls, 11, async function (url) {
                try {
                    const response = await fetch(url);
                    return response.json()
                } catch (err) {
                    return {}
                }
            }, (err, results) => {
                response = normalizeRedditData(results);
                setLocalStorage("AllTrendingNews", response, 60 * 60000);
                resolve(response);
            })

            }else{
                resolve(getLocalStorage("AllTrendingNews"));
            }
        }catch(err){reject(err)}        
    })   
}

function getNearbyNews(latitude, longitude){
    return new Promise((resolve, reject)=>{
        var c=""
        try {
            if(latitude&&longitude){
                urls = [`https://api.gdeltproject.org/api/v2/geo/geo?query=near:${latitude},${longitude},50%20sourcelang:eng&format=JSONFeed&MAXPOINTS=10`]
            }else{
                if(country=="GB"){
                    c="%20sourcecountry:UK"
                }
                urls = [`https://api.gdeltproject.org/api/v2/geo/geo?query=%20sourcelang:eng${c}&format=JSONFeed&MAXPOINTS=10`]
            }            
            async.mapLimit(urls, 3, async function (url) {
                try {
                    const response = await fetch(url)
                    return response.json()
                } catch (err) {
                    return {}
                }
            }, (err, results) => {
                resolve (results[0])
            })           
        } catch (err) {
            reject(err);
        }     
    })
}

function getTrendingPosts() {
    return new Promise((resolve, reject) => {
        if(!getLocalStorage("TrendingPosts")){
            try {
                urls = ["https://public-api.wordpress.com/rest/v1/read/tags/art/posts?number=1&http_envelope=1",
                    "https://public-api.wordpress.com/rest/v1/read/tags/photography/posts?number=1&http_envelope=1",
                    "https://public-api.wordpress.com/rest/v1/read/tags/travel/posts?number=1&http_envelope=1",
                    "https://public-api.wordpress.com/rest/v1/read/tags/blogging/posts?number=1&http_envelope=1",
                    "https://public-api.wordpress.com/rest/v1/read/tags/postaday/posts?number=1&http_envelope=1",
                    "https://public-api.wordpress.com/rest/v1/read/tags/life/posts?number=1&http_envelope=1",
                    "https://public-api.wordpress.com/rest/v1/read/tags/books/posts?number=1&http_envelope=1",
                    "https://public-api.wordpress.com/rest/v1/read/tags/entertainment/posts?number=1&http_envelope=1",
                    "https://public-api.wordpress.com/rest/v1/read/tags/business/posts?number=1&http_envelope=1",
                    "https://public-api.wordpress.com/rest/v1/read/tags/humor/posts?number=1&http_envelope=1",
                    "https://public-api.wordpress.com/rest/v1/read/tags/technology/posts?number=1&http_envelope=1",
                ]
                async.mapLimit(urls, 11, async function (url) {
                    try {
                        const response = await fetch(url);
                        return response.json()
                    } catch (err) {
                        return {}
                    }
                }, (err, results) => {
                    var arr=[]
                    $.each(results, function(k,data){
                        if(data.code==200){
                            if(data.body.posts.length>0){
                                $.each(data.body.posts, function (k, item) {
                                    arr.push({
                                        "hostname":new URL(item.URL).hostname,
                                        "date": new Date(item.date.toString()).toLocaleString(),
                                        "title": item.title,
                                        "excerpt": item.excerpt,
                                        "content": item.content,
                                        "image": item.featured_media.uri
                                    });                                
                                });
                            } 
                        }
                    });
                    setLocalStorage("TrendingPosts", arr, 60 * 60000);
                    resolve(arr)
                })
    
            } catch (err) { reject(err) }
        }
        else{
            resolve(getLocalStorage("TrendingPosts"));
        }

        

    })
}

function getLongReads() {
    return new Promise((resolve, reject) => {
        if(!getLocalStorage("LongReads")){
            try {
                urls = [                    
                    "https://public-api.wordpress.com/rest/v1/read/tags/long-reads/posts?number=20&http_envelope=1",                   
                ]
                async.mapLimit(urls, 11, async function (url) {
                    try {
                        const response = await fetch(url);
                        return response.json()
                    } catch (err) {
                        return {}
                    }
                }, (err, results) => {
                    var arr=[]
                    $.each(results, function(k,data){
                        if(data.code==200){
                            if(data.body.posts.length>0){
                                $.each(data.body.posts, function (k, item) {
                                    arr.push({
                                        "hostname":new URL(item.URL).hostname,
                                        "date": new Date(item.date.toString()).toLocaleString(),
                                        "title": item.title,
                                        "excerpt": item.excerpt,
                                        "content": item.content,
                                        "image": item.featured_media.uri
                                    });                                
                                });
                            } 
                        }
                    });
                    setLocalStorage("LongReads", arr, 60 * 60000);
                    resolve(arr)
                })
    
            } catch (err) { reject(err) }
        }
        else{
            resolve(getLocalStorage("LongReads"));
        }

        

    })
}

function getTrendingStreams(){
    return new Promise((resolve, reject) => {
        if(!getLocalStorage("TrendingStreams")){
            try {
                urls = [                    
                    "https://api.reelgood.com/v3.0/content/browse/curated/trending-picks?availability=onAnySource&content_kind=both&hide_seen=false&hide_tracked=false&hide_watchlisted=false&imdb_end=10&imdb_start=0&rg_end=100&rg_start=0&skip=0&sort=0&take=50&year_start=1900",
                    "https://api.reelgood.com/v3.0/content/browse/curated/popular-movies?availability=onAnySource&content_kind=both&hide_seen=false&hide_tracked=false&hide_watchlisted=false&imdb_end=10&imdb_start=0&rg_end=100&rg_start=0&skip=0&sort=0&take=50&year_start=1900",                ]
                async.mapLimit(urls, 2, async function (url) {
                    try {
                        const response = await fetch("https://sbcors.herokuapp.com/" + url)
                        return response.json()
                    } catch (err) {
                        return {}
                    }
                }, (err, results) => {
                    var arr=[]
                    $.each(results, function(i,data){
                        arr.push(data.results)
                    });
                    setLocalStorage("TrendingStreams", arr, 4 * 60 * 60000);
                    resolve(arr)
                })
    
            } catch (err) { reject(err) }
        }
        else{
            resolve(getLocalStorage("TrendingStreams"));
        }

        

    })
}

function getNewsImagery(){
    return new Promise((resolve, reject) => {
        var c=""
        try {
           urls=["https://api.gdeltproject.org/api/v2/doc/doc?query=ImageWebCount%3E5&mode=ImageCollageInfo&timespan=1h&sort=DateDesc&format=json"]          
            async.mapLimit(urls, 1, async function (url) {
                try {
                    const response = await fetch(url)
                    return response.json()
                } catch (err) {
                    return {}
                }
            }, (err, results) => {
                arrr = results[0].imagecollage.sort(function (a, b) {
                    return b.imagewebcount - a.imagewebcount;
                });
                resolve (arrr)
            })           
        } catch (err) {
            reject(err);
        }     
    })
}

function normalizeRedditImageData(results){
    arr = []
    for (index in results) {
        results[index].data.children.forEach(item => {
            var item_index = arr.findIndex(x => x.link == item.data.url);
            if (item_index === -1) {
                if(item.data.url_overridden_by_dest.includes("https://www.reddit.com/gallery/")){
                    arr.push({
                        "title": item.data.title,
                        "created": item.data.created,
                        "link": item.data.url,
                        "source": item.data.domain,
                        "thumbnail": item.data.thumbnail, 
                         "author":item.data.author, 
                        
                    })
                }else{
                    arr.push({
                        "title": item.data.title,
                        "created": item.data.created,
                        "link": item.data.url,
                        "source": item.data.domain,
                        "thumbnail": item.data.url_overridden_by_dest,
                        "author":item.data.author, 
                                                
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

function getTrendingImages(){
    return new Promise((resolve, reject)=>{
        try{
            if(!getLocalStorage("TrendingImages")){
                
            urls = ["https://www.reddit.com/r/pics/top/.json?sort=top&t=day&limit=10",
                "https://www.reddit.com/r/OldPhotosInRealLife/top/.json?sort=top&t=day&limit=10",                
                "https://www.reddit.com/r/wildlifephotography/top/.json?sort=top&t=day&limit=10",
                "https://www.reddit.com/r/streetphotography/top/.json?sort=top&t=day&limit=10",              
            ]
            async.mapLimit(urls, 5, async function (url) {
                try {
                    const response = await fetch(url);
                    return response.json()
                } catch (err) {
                    return {}
                }
            }, (err, results) => {
                response = normalizeRedditImageData(results);
                setLocalStorage("TrendingImages", response, 60 * 60000);
                resolve(response);
            })

            }else{
                resolve(getLocalStorage("TrendingImages"));
            }
        }catch(err){reject(err)}        
    })   
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


