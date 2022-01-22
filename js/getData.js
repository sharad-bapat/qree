
// Helper Functions
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
function groupBy(xs, f) {
    return xs.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
}
function normalizeRedditImageData(results){
    arr = []
    for (index in results) {
        results[index].data.children.forEach(item => {
            console.log(item);
            var item_index = arr.findIndex(x => x.link == item.data.url);
            if (item_index === -1) {
                if(item.data.url.includes("https://www.reddit.com/gallery/")){
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
function getDDGInfobox(query){
    return new Promise((resolve, reject)=>{
        try{
            urls = [
                `https://api.duckduckgo.com/?q=${query}&format=json&t=DDGTest`,
            ]
            async.map(urls, async function (url) {
                try {
                    const response = await fetch(url)
                    return response.text()
                } catch (err) {
                    return {}
                }
            }, (err, results) => {
                try{
                    response = JSON.parse(results[0])
                }catch(err){
                    response = results[0]
                }
                console.log(response);
                resolve(response);
            })
           
        }catch(err){reject(err)}
    })
}
var getFromBetween = {
    results: [],
    string: "",
    getFromBetween: function(sub1, sub2) {
       if (this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return false;
       var SP = this.string.indexOf(sub1) + sub1.length;
       var string1 = this.string.substr(0, SP);
       var string2 = this.string.substr(SP);
       var TP = string1.length + string2.indexOf(sub2);
       return this.string.substring(SP, TP);
    },
    removeFromBetween: function(sub1, sub2) {
       if (this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return false;
       var removal = sub1 + this.getFromBetween(sub1, sub2) + sub2;
       this.string = this.string.replace(removal, "");
    },
    getAllResults: function(sub1, sub2) {
       // first check to see if we do have both substrings
       if (this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return;
 
       // find one result
       var result = this.getFromBetween(sub1, sub2);
       // push it to the results array
       this.results.push(result);
       // remove the most recently found one from the string
       this.removeFromBetween(sub1, sub2);
 
       // if there's more substrings
       if (this.string.indexOf(sub1) > -1 && this.string.indexOf(sub2) > -1) {
          this.getAllResults(sub1, sub2);
       } else return;
    },
    get: function(string, sub1, sub2) {
       this.results = [];
       this.string = string;
       this.getAllResults(sub1, sub2);
       return this.results;
    }
 };
function getLocation() {    
    return new Promise((resolve, reject)=>{
        try{
            var options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            };
            navigator.geolocation.getCurrentPosition(success, error, options);
            function success(pos) {
                var crd = pos.coords;
                console.log('Your current position is:');
                console.log(`Latitude : ${crd.latitude}`);
                console.log(`Longitude: ${crd.longitude}`);
                console.log(`More or less ${crd.accuracy} meters.`);       
                resolve({"latitude":crd.latitude, "longitude":crd.longitude});
            }
            function error(err) {
                console.log(err);;
                console.log(`ERROR(${err.code}): ${err.message}`);
                reject(err);
            }
        }catch(err){reject(err)}
    })
   
    
}

 


//Home Page
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
function getHomeTopStories() {
    return new Promise((resolve, reject) => {
        try {
            urls = ["https://api.gdeltproject.org/api/v2/doc/doc?mode=artlist&sort=hybridrel&format=json&maxrecords=15&query=sourcelang:eng%20sourcecountry:UK&timespan=1h",
                "https://api.gdeltproject.org/api/v2/doc/doc?mode=artlist&sort=hybridrel&format=json&maxrecords=15&query=sourcelang:eng%20sourcecountry:India&timespan=1h",
                "https://api.gdeltproject.org/api/v2/doc/doc?mode=artlist&sort=datedesc&format=json&maxrecords=5&query=sourcelang:eng%20domainis:foxnews.com",
                "https://api.gdeltproject.org/api/v2/doc/doc?mode=artlist&sort=datedesc&format=json&maxrecords=5&query=sourcelang:eng%20domainis:cnn.com",
                "https://api.gdeltproject.org/api/v2/doc/doc?mode=artlist&sort=datedesc&format=json&maxrecords=5&query=sourcelang:eng%20domainis:forbes.com",
                "https://api.gdeltproject.org/api/v2/doc/doc?mode=artlist&sort=datedesc&format=json&maxrecords=5&query=sourcelang:eng%20domainis:yahoo.com",
                "https://api.gdeltproject.org/api/v2/doc/doc?mode=artlist&sort=datedesc&format=json&maxrecords=5&query=sourcelang:eng%20domainis:thediplomat.com",
            ]
            async.mapLimit(urls, 11, async function (url) { try { const response = await fetch(url); return response.json() } catch (err) { return {} } }, (err, results) => { response = normalizeGDELT(results); resolve(response) })

        } catch (err) { reject(err) }
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
                            "thumbnail":results[0].image.thumbnail.source,
                            "artist": results[0].image.artist.text,
                            "description": results[0].image.description.text,
                        }
                        var thumbnail = results[0].tfa.thumbnail ? results[0].tfa.thumbnail.source : ``
                        wiki.tfa = {
                            "title":results[0].tfa.displaytitle,
                            "thumbnail":thumbnail,
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

// Realtime Trends
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

// Trending Searches
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

//Emergency Events
function getEvents(){
    return new Promise((resolve, reject)=>{
        try{
            urls = ["https://sbcors.herokuapp.com/https://rsoe-edis.org/gateway/webapi/events/"]
                async.map(urls, async function (url) {
                    try {
                        const response = await fetch(url)
                        return response.json()
                    } catch (err) {
                        return {}
                    }
                }, (err, results) => {
                    var arr = []
                    // var arr = groupBy(results[0].features, (c) => c.properties.categoryName)
                    $.each(results[0].features, function(k,v){
                        if(v.properties.updates){
                            v = v.properties.updates[v.properties.updates.length-1]
                        }                                                                   
                        arr.push({
                            "title":v.properties.title,
                            "details": v.properties.details,
                            "address": v.properties.address,
                            "source" : v.properties.source,
                            "category": v.properties.categoryName,
                            "severity": v.properties.severity,
                            "date": v.properties.lastUpdate,
                            "impact": v.properties.impactAreaName,
                        });
                    })
                    arr = arr.sort(function (a, b) {
                        return b.date - a.date;
                    });                    
                    resolve(arr);
                })
        }catch(err){reject(err)}
    })
}

// HBD Today
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

// Top news
function getTopNews() {
    var n = 5;
    return new Promise((resolve, reject)=>{
        try{
            urls = [
                `https://variety.com/wp-json/wp/v2/posts?per_page=${n}&context=view`,
                `https://time.com//wp-json/wp/v2/posts?per_page=${n}&context=view`,
                // `https://thewire.in/wp-json/wp/v2/posts?per_page=${n}&context=view`,
                // `https://www.thestatesman.com/wp-json/wp/v2/posts?per_page=${n}&context=view`,
                `https://www.hollywoodreporter.com/wp-json/wp/v2/posts?per_page=${n}&context=view`,
                `https://deadline.com//wp-json/wp/v2/posts?per_page=${n}&context=view`,
                `https://techcrunch.com/wp-json/wp/v2/posts?per_page=${n}&context=view`,
                // `https://observer.com/wp-json/wp/v2/posts?per_page=${n}&context=view`,
                `https://metro.co.uk/wp-json/wp/v2/posts?per_page=${n}&context=view`,
                // `https://thesun.co.uk/wp-json/wp/v2/posts?per_page=${n}&context=view`,
                // "https://www.siasat.com/wp-json/wp/v2/posts?per_page=5&context=view",
                `https://public-api.wordpress.com/rest/v1.2/sites/197693856/posts/?&number=${n}`,
                // `https://public-api.wordpress.com/rest/v1.2/sites/26599698/posts/?&number=${n}`,
                `https://public-api.wordpress.com/rest/v1.2/sites/198147347/posts/?&number=${n}`,
                `https://public-api.wordpress.com/rest/v1.2/sites/190074382/posts/?&number=${n}`,
                `https://public-api.wordpress.com/rest/v1.2/sites/176892389/posts/?&number=${n}`,
                `https://public-api.wordpress.com/rest/v1.2/sites/126020344/posts/?&number=${n}`,
                // `https://public-api.wordpress.com/rest/v1.2/sites/136451602/posts/?&number=${n}`,
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
                        if (index < 6) {
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
                    resolve(arrr);
                }

            })
        }catch(err){reject(err)}
    })


}

// Trending News
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

// Nearby News
function getNearbyNews(latitude, longitude){
    return new Promise((resolve, reject)=>{
        var c=""
        try {
            if(latitude && longitude){
                urls = [`https://api.gdeltproject.org/api/v2/geo/geo?query=near:${latitude},${longitude},50%20sourcelang:eng&format=JSONFeed&TIMESPAN=2h`]
            }else{
                if(country=="GB"){
                    c="%20sourcecountry:UK"
                }
                urls = [`https://api.gdeltproject.org/api/v2/geo/geo?query=%20sourcelang:eng${c}&format=JSONFeed&TIMESPAN=2h`]
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

// Trendig WP Posts
function getTrendingPosts() {
    var n =2
    return new Promise((resolve, reject) => {
        try {
            urls = [
                `https://public-api.wordpress.com/rest/v1/read/tags/art/posts?number=${n}&http_envelope=1`,
                `https://public-api.wordpress.com/rest/v1/read/tags/photography/posts?number=${n}&http_envelope=1`,
                `https://public-api.wordpress.com/rest/v1/read/tags/travel/posts?number=${n}&http_envelope=1`,
                `https://public-api.wordpress.com/rest/v1/read/tags/blogging/posts?number=${n}&http_envelope=1`,
                `https://public-api.wordpress.com/rest/v1/read/tags/postaday/posts?number=${n}&http_envelope=1`,
                `https://public-api.wordpress.com/rest/v1/read/tags/life/posts?number=${n}&http_envelope=1`,
                `https://public-api.wordpress.com/rest/v1/read/tags/books/posts?number=${n}&http_envelope=1`,
                `https://public-api.wordpress.com/rest/v1/read/tags/entertainment/posts?number=${n}&http_envelope=1`,
                `https://public-api.wordpress.com/rest/v1/read/tags/business/posts?number=${n}&http_envelope=1`,
                `https://public-api.wordpress.com/rest/v1/read/tags/humor/posts?number=1&http_envelope=1`,
                `https://public-api.wordpress.com/rest/v1/read/tags/technology/posts?number=${n}&http_envelope=1`,
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
                resolve(arr)
            })

        } catch (err) { reject(err) }
    })
}

// Long Reads
function getLongReads() {
    return new Promise((resolve, reject) => {
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
                resolve(arr)
            })

        } catch (err) { reject(err) }
    })
}

// Trending Streams
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

// Trending News Imagery
function getNewsImagery(){
    return new Promise((resolve, reject) => {
        var c=""
        try {
           urls=["https://api.gdeltproject.org/api/v2/doc/doc?query=ImageWebCount%3E10%20sourcelang:eng&mode=ImageCollageInfo&sort=DateDesc&format=json"]
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

// Trending Social Media Images
function getTrendingImages(){
    return new Promise((resolve, reject)=>{
        try{
            if(!getLocalStorage("TrendingImages")){

            urls = ["https://www.reddit.com/r/itookapicture/top/.json?sort=top&t=day&limit=20",
                "https://www.reddit.com/r/OldPhotosInRealLife/top/.json?sort=top&t=day&limit=20",
                "https://www.reddit.com/r/wildlifephotography/top/.json?sort=top&t=day&limit=20",
                "https://www.reddit.com/r/streetphotography/top/.json?sort=top&t=day&limit=20",
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

//Your Weather
function getWeather(latitude,longitude){
    return new Promise((resolve, reject)=>{
        try{
            if(latitude && longitude) {
                DDG_Forecast(latitude,longitude).then((data=>resolve(data)));   
            }else{
                if(navigator.languages)
                DDG_Forecast(`London, UK`).then(data=>resolve(data));
            }                         
        }catch(err){reject(err)}
    })
}

// Trending Locations
function getTrendingLocations(){
    return new Promise((resolve, reject)=>{
        try{
            urls = ["https://api.gdeltproject.org/api/v2/geo/geo?query=-sourcecountry:US%20sourcelang:eng&mode=pointdata&format=JSONfeed&TIMESPAN=6h"]
            async.map(urls, async function (url) {
                try {
                    const response = await fetch(url)
                    return response.json()
                } catch (err) {
                    return {}
                }
            }, (err, results) => {
                var arr = groupBy(results[0].items, (c) => c.title.split(":")[0].split(",")[0]);
                var arrr= []
                for (const [ key, value ] of Object.entries(arr)) {
                    arrr.push({length:value.length,location:key,items:value})
                }
                arrr = arrr.sort(function (a, b) {
                    return b.length - a.length;
                });
                resolve(arrr.slice(0,50));
            })
           
        }catch(err){reject(err)}
    })
}

// Trending Locations
function getPeople(){
    return new Promise((resolve, reject)=>{
        try{
            urls = [
                    // "https://emm.newsbrief.eu/emmMap/tunnel?sid=emmMap&?stories=events&language=en",
                    "https://emm.newsbrief.eu/emmMap/tunnel?sid=emmMap&?stories=top&language=en",
                ]
            async.map(urls, async function (url) {
                try {
                    const response = await fetch(url)
                    return response.json()
                } catch (err) {
                    return {}
                }
            }, (err, results) => {              
                var arr=[]                 
                $.each(results, function(i,j){
                    $.each(j.items, function (k, v) {
                        if (v.entityCount > 0) {					
                            $.each(v.entities, function (k, value) {					
                                if (value.type == "p") {
                                    if(value.count){
                                        var index = arr.findIndex(x => x.name == value.name);                                
                                        if(index === -1){
                                            arr.push({name:value.name, id:value.id,count:value.count})
                                        }else{
                                            arr[index].count = arr[index].count + value.count;
                                        }  
                                    }                                                            
                                }
                            });
                        }                  
                    });
                }) 
                arr = arr.sort(function (a, b) {
                    return b.count - a.count;
                });                
                resolve(arr);
            })
           
        }catch(err){reject(err)}
    })
}

// Trending Organizations
function getOrgs(){
    return new Promise((resolve, reject)=>{
        try{
            urls = [
                    // "https://emm.newsbrief.eu/emmMap/tunnel?sid=emmMap&?stories=events&language=en",
                    "https://emm.newsbrief.eu/emmMap/tunnel?sid=emmMap&?stories=top&language=en",
                ]
            async.map(urls, async function (url) {
                try {
                    const response = await fetch(url)
                    return response.json()
                } catch (err) {
                    return {}
                }
            }, (err, results) => {                
                var arr=[]                    
                $.each(results, function(i,j){
                    $.each(j.items, function (k, v) {
                        if (v.entityCount > 0) {					
                            $.each(v.entities, function (k, value) {					
                                if (value.type == "o") {
                                    if(value.count){
                                        var index = arr.findIndex(x => x.name == value.name);                                
                                        if(index === -1){
                                            arr.push({name:value.name, id:value.id,links:[{link:v.mainItemLink,title:v.title,description:v.description}], count:value.count})
                                        }else{
                                            arr[index].count = arr[index].count + value.count;
                                            arr[index].links.push({link:v.mainItemLink,title:v.title,description:v.description})
                                        }  
                                    }                                                            
                                }
                            });
                        }                  
                    });
                }) 
                arr = arr.sort(function (a, b) {
                    return b.count - a.count;
                });               
                resolve(arr);
            })
           
        }catch(err){reject(err)}
    })
}

// Trending Quotes
function getQuotes(){
    return new Promise((resolve, reject)=>{
        try{
            urls = [
                "https://emm.newsbrief.eu/emmMap/tunnel?sid=emmMap&?stories=events&language=en",
                "https://emm.newsbrief.eu/emmMap/tunnel?sid=emmMap&?stories=top&language=en",
            ]
            async.map(urls, async function (url) {
                try {
                    const response = await fetch(url)
                    return response.json()
                } catch (err) {
                    return {}
                }
            }, (err, results) => {                        
               var quotes_arr=[]
               $.each(results, function(i,j){
                $.each(j.items, function (k, v) {                  
                    if (v.quoteCount > 0) {					
                        $.each(v.quotes, function (k, value) {					
                            var index = quotes_arr.findIndex(x => x.whoName == value.whoName);  
                            if(index == -1){
                                quotes_arr.push({
                                    "who":value.who,
                                    "whoName":value.whoName,
                                    "verb":value.verb,
                                    "quote":value.value,
                                    links:[{link:v.mainItemLink,title:v.title,description:v.description}]});
                            }                            
                        });
                    }
                });
               })            
                resolve(quotes_arr);
            })
           
        }catch(err){reject(err)}
    })
}


function getSearchResultsGDELT(query){
    return new Promise((resolve, reject)=>{
        try{
            urls = [
                `https://api.gdeltproject.org/api/v2/doc/doc?query="${query}"%20sourcelang:eng&mode=artlist&maxrecords=50&sort=hybridrel&format=json&timespan=6h`,
            ]
            async.map(urls, async function (url) {
                try {
                    const response = await fetch(url)
                    return response.json()
                } catch (err) {
                    return {}
                }
            }, (err, results) => {               
                // console.log(results[0].articles);
                resolve(results[0].articles);
            })
           
        }catch(err){reject(err)}
    })
}

function replaceErrImg(image, hostname){
    $(image).attr("src", `https://icon.horse/icon/${hostname.replace("www.", "")}`);
}

function getTrendingHashtags(){
    return new Promise((resolve, reject)=>{
        try{
            const start = Date.now()
            var MyDate = new Date();
            year = MyDate.getFullYear();
            month = ('0' + (MyDate.getMonth() + 1)).slice(-2);
            day= ('0' + (MyDate.getDate())).slice(-2);	
            urls = [`https://api.exportdata.io/trends/locations/worldwide?date=${year}-${month}-${day}`,
                    `https://api.exportdata.io/trends/locations/in?date=${year}-${month}-${day}`,
                    `https://api.exportdata.io/trends/locations/gb?date=${year}-${month}-${day}`,
                    `https://api.exportdata.io/trends/locations/us?date=${year}-${month}-${day}`,]
            async.mapLimit(urls, 4, async function (url) {
                try {
                    const response = await fetch("https://sbcors.herokuapp.com/" + url)
                    return response.json()
                } catch (err) {
                    console.log(err.response);
                }
        
            }, (err, results) => {
                if (err) {console.log(err);} 
                else{	
                    twitterTrends = {}
                    trends=[]	
                    for (index in results) {
                        for(i in results[index]){
                            var item_index = trends.findIndex(x => x.name == results[index][i].name);
                            if(item_index==-1){
                                trends.push({name:results[index][i].name, volume:results[index][i].tweet_volume})
                            }
                        }				
                    }
                    trends = trends.sort(function (a, b) {
                        return b.volume - a.volume;
                    });	
                    const stop = Date.now()
                    console.log(`Time Taken to execute hashtags = ${(stop - start) / 1000} seconds`);
                    resolve(trends);
                }; 
            })
        }catch(err){reject(err)}
    })
}

// Trending Startups
function getCB() {
    return new Promise((resolve, reject) => {
        try {
            const start = Date.now()
            urls = ["https://www.crunchbase.com/v4/data/applications/crunchbase/homepage",]
            async.mapLimit(urls, 1, async function (url) {
                try {
                    const response = await fetch("https://sbcors.herokuapp.com/" + url, {
                        method: 'get',
                        headers: { 'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36' }
                    })
                    return response.json();
                } catch (err) {
                    console.log(err.response);
                }

            }, (err, results) => {
                if (err) { console.log(err); back.send("cb", err) }
                else {
                    const stop = Date.now()
                    console.log(`Time Taken to execute CB = ${(stop - start) / 1000} seconds`);
                    resolve(results[0])
                };
            })

        } catch (err) { reject(err) }
    })
}

// Trending Youtube
function getYTTrends(){
    return new Promise((resolve, reject) => {
        try {
            const start = Date.now()
            urls = ["https://kworb.net/youtube/","https://kworb.net/youtube/trending.html"]
            async.mapLimit(urls, 2, async function (url) {
                try {
                    const response = await fetch("https://sbcors.herokuapp.com/" + url, {
                        method: 'get',
                        headers: { 'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36' }
                    })
                    return response.text();
                } catch (err) {
                    return ""
                }

            }, (err, results) => {
                if (err) { console.log(err);  }
                else {
                    const stop = Date.now()
                    console.log(`Time Taken to execute YT = ${(stop - start) / 1000} seconds`);
                    str = getFromBetween.get(results[0], '<table', '</table>');
                    YT={}                   
                    YT.mostviewed = getFromBetween.get(results[0], 'href="video/', '.html">');
                    YT.trending = getFromBetween.get(results[1], 'href="/youtube/trending/video/', '.html">');                    
                    resolve(YT);
                };
            })

        } catch (err) { reject(err) }
    })
}

// Trending Stocks
function getStocks(){
    return new Promise((resolve, reject)=>{
        try{
            const start = Date.now()
            urls = ["https://groww.in/v1/api/groww_news/v1/stocks_news/news?page=0&size=50",
            // "https://groww.in/v1/api/stocks_data/v2/explore/list/top?discoveryFilterTypes=TOP_GAINERS&page=0&size=20",
            //  "https://groww.in/v1/api/stocks_data/v2/explore/list/top?discoveryFilterTypes=TOP_LOSERS&page=0&size=20", 
            //  "https://groww.in/slr/v1/search/derived/scheme?page=0&size=100&doc_type=scheme&plan_type=Direct&sort_by=0&available_for_investment=true&sub_sub_category=TopCompaniesHp",
            //  "https://groww.in/v1/api/us_stocks_data/v1/company/all?closePriceHigh=10000&closePriceLow=0&isETF=false&marketCapHigh=5000000&marketCapLow=0&pageNo=0&pageSize=50&sortCategory=MARKET_CAP&sortOrderType=DESC",
            //  "https://groww.in/v1/api/stocks_ipo/v2/listing/user"
            ]
            async.mapLimit(urls, 6, async function (url) {
                try {
                    const response = await fetch("https://sbcors.herokuapp.com/" + url)
                    return response.json();
                } catch (err) {
                    console.log(err.response);
                }
        
            }, (err, results) => {
                if (err) {console.log(err);back.send("stocks", err)} 
                else{
                    // arr = []
                    // results.forEach(item => {
                    // 	arr.push(JSON.parse(item.replace(")]}',", "")))
                    // });
                    const stop = Date.now()
                    console.log(`Time Taken to execute STOCKS = ${(stop - start) / 1000} seconds`);
                    console.log(results);
                    resolve(results);
                    
                }; 
            })	
        }catch(err){reject(err)}
    })
}


// Get Top Stories from Google RSS

function getHomeTopStoriesGoogle(){
    return new Promise((resolve, reject)=>{
        try {
            const start = Date.now()
            urls = ["https://feedly.com/v3/streams/contents?streamId=feed%2Fhttps%3A%2F%2Fnews.google.com%2Frss%3Fhl%3Den-IN%26gl%3DIN%26ceid%3DIN%3Aen&count=20&ranked=newest&similar=true&findUrlDuplicates=true&ct=feedly.desktop&cv=31.0.1494",
                    "https://feedly.com/v3/streams/contents?streamId=feed%2Fhttps%3A%2F%2Fnews.google.com%2Frss%3Fhl%3Den-GB%26gl%3DGB%26ceid%3DGB%3Aen&count=20&ranked=newest&similar=true&findUrlDuplicates=true&ct=feedly.desktop&cv=31.0.1494",
                    "https://feedly.com/v3/streams/contents?streamId=feed%2Fhttps%3A%2F%2Fnews.google.com%2Frss%3Fhl%3Den-US%26gl%3DUS%26ceid%3DUS%3Aen&count=20&ranked=newest&similar=true&findUrlDuplicates=true&ct=feedly.desktop&cv=31.0.1494"
                ]
            async.mapLimit(urls, 3, async function (url) {
                try {
                    const response = await fetch("https://sbcors.herokuapp.com/" + url, {
                        method: 'get',
                        headers: { 'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36' }
                    })
                    return response.json();
                } catch (err) {
                    return {}
                }

            }, (err, results) => {
                if (err) { console.log(err);  }
                else {
                    response = []
                    const stop = Date.now()
                    console.log(`Time Taken to get Top RSS = ${(stop - start) / 1000} seconds`);
                    // console.log(results);
                    $.each(results,function(k,v){
                        $.each(v.items, function(index,value){
                            let link = value.canonicalUrl ? value.canonicalUrl : ``
                            let visualurl = value.visual ? value.visual.url : ``
                            let edgeCacheUrl = value.visual ? value.visual.edgeCacheUrl : ``
                            let alturl = value.originId.includes("news.google.com") ? a2b(value.originId.replace("https://news.google.com/__i/rss/rd/articles/","").replace("?oc=5","")).replace("Ò","").replace('"{','') : value.canonicalUrl
                            console.log(value.originId)
                            console.log("https:" + alturl.replace(/[\x00-\x08\x0E-\x1F\x7F-\uFFFF]/g, '').split('https:')[1])
                            response.push({
                                "title":value.title,
                                "published":value.published,
                                "summary": value.summary.content,
                                "visual": visualurl,
                                "alt_visual": edgeCacheUrl,
                                "link": link,
                                "alturl":"https:" + alturl.replace(/[\x00-\x08\x0E-\x1F\x7F-\uFFFF]/g, '').split('https:')[1]
                            })
                        })
                    }) 
                    response = response.sort(function (a, b) {
                        return b.published - a.published;
                    });                   
                    resolve(response);
                };
            })

        } catch (err) { reject(err) }
    })
}


function a2b(a) {
    var b, c, d, e = {}, f = 0, g = 0, h = "", i = String.fromCharCode, j = a.length;
    for (b = 0; 64 > b; b++) e["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(b)] = b;
    for (c = 0; j > c; c++) for (b = e[a.charAt(c)], f = (f << 6) + b, g += 6; g >= 8; ) ((d = 255 & f >>> (g -= 8)) || j - 2 > c) && (h += i(d));
    return h;
  }

  function b2a(a) {
    var c, d, e, f, g, h, i, j, o, b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", k = 0, l = 0, m = "", n = [];
    if (!a) return a;
    do c = a.charCodeAt(k++), d = a.charCodeAt(k++), e = a.charCodeAt(k++), j = c << 16 | d << 8 | e, 
    f = 63 & j >> 18, g = 63 & j >> 12, h = 63 & j >> 6, i = 63 & j, n[l++] = b.charAt(f) + b.charAt(g) + b.charAt(h) + b.charAt(i); while (k < a.length);
    return m = n.join(""), o = a.length % 3, (o ? m.slice(0, o - 3) :m) + "===".slice(o || 3);
  }