const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const latitude = urlParams.get('latitude');
const latitude = urlParams.get('longitude');
console.log(latitude, latitude);
var country = "";
var language = ""
getCountry();
// getLocation();
if(country && language){
    console.log(`Country:${country}, Language: ${language}`);
}
function getCountry(){    
    country = navigator.languages[0].split("-")[1]  
    language = navigator.languages[0].split("-")[0] 
}
window.addEventListener('hashchange', function () {
    $('#navbarToggleExternalContent').removeClass('show');
    if (!location.hash || location.hash == "#" || location.hash == "") {
        window.location = "#homeSection";        
    }
    console.log(location.hash );
    load();    
}, false);
onPageLoad();
function onPageLoad() {
    if (!location.hash || location.hash == "#" || location.hash == "") {
        window.location = "#homeSection";        
    }   
    load();   
}

function getBGData(){
    getHomeTopStories();
    getHomeTrendingNews();
    getWikiData();
    getGoogleTrends();
    getEvents();
    getAllTrendingNews();    
}

function load(){
    if (location.hash == "#homeSection") {        
        getHomeTopStories()
            .then(data => {
                populateHomeTopNews(data);
                getHomeTrendingNews().then(data => {
                    populateHomeTrendingNews(data);
                })
            });
    }  
    if(location.hash=="#wikiSection")  {
        getWikiData().then((data=>{ populateWiki(data)}));
    }
    if(location.hash=="#googleTrendsSection")  {
        getGoogleTrends().then((data=>{ populateGoogleTrends(data)}));
    }
    if(location.hash=="#eventsSection")  {
        getEvents().then((data=>{ populateEvents(data)}));
    }
    if(location.hash=="#GoogleSearchTrendsSection")  {
        getGoogleSearchTrends().then(data=>{ populateGoogleSearchTrends(data)});
    }
    if(location.hash=="#HBDSection")  {        
        getWikiEvents().then(data=>{populateWikiEvents(data)});
    }  
    if(location.hash=="#topNewsSection")  {
        getTopNews().then(data=>{populateTopNews(data)});
    }
    if(location.hash=="#trendingNewsSection")  {
        getAllTrendingNews().then(data=>{ populateTrendingNews(data)});
    }
    if(location.hash=="#newsNearMeSection")  {
        getNearbyNews().then(data=>{populateNearbyNews(data)});
    }
    if(location.hash=="#TrendingWPSection")  {
        getTrendingPosts().then(data=>{populateTrendingPosts(data)});
    }
    if(location.hash=="#LongReadsSection")  {
        getLongReads().then(data=>{populateLongReads(data)});
    }
    if(location.hash=="#trendingStreamsSection")  {
        getTrendingStreams().then((data=>{ console.log(data);populateStreams(data)}));
    }    
    if(location.hash=="#newsImagerySection")  {
        getNewsImagery().then((data=>{ console.log(data);populateImagery(data)}));
    }
    if(location.hash=="#TrendingImagesSection")  {
        getTrendingImages().then((data=>{ console.log(data);populateTrendingImages(data)}));
    }
   
    setInterval(getBGData, 15 * 60000);    
}


async function getLocation() {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
    async function success(pos) {       
        var crd = pos.coords;
        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
        clatitude = crd.latitude;
        clongitude = crd.longitude;       
    }
    function error(err) {
        console.log(err);;
        console.log(`ERROR(${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
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
// getRSS();
function getRSSviaFeedly(){
    const start = Date.now()   
    var start_url = `https://feedly.com/v3/feeds/feed%2F`;
    var end_url = `?numRecentEntries=50&ck=1620410511531&ct=feedly.desktop&cv=31.0.1225`;
    var gTopicurl = `https%3A%2F%2Fnews.google.com%2Frss%2Ftopics%2F`;
    var gSearchurl = `https%3A%2F%2Fnews.google.com%2Frss%2Fsearch%3Fq%3D`
    // (site:.firstpost.com+OR+site:bloombergquint.com+OR+site:thequint.com)
    // top sites :  (site:.reuters.com+OR+site:npr.org+OR+site:nytimes.com+OR+site:cnn.com+OR+site:foxnews.com+OR+site:apnews.com+OR+site:wsj.com)
    // https://apnews.com/771a653ce572cb67ad60c1343bca1e2f/
    var param = "";    
		// "https://sbcors.herokuapp.com/https://news.google.com/rss/search?q=(site:india.com+OR+site:business-standard.com+OR+site:livemint.com+OR+site:hindustantimes.com+OR+site:moneycontrol.com+OR+site:indianexpress.com+OR+site:tribuneindia.com+OR+site:hindustantimes.com+OR+site:ndtv.com+OR+site:indiatimes.com+OR+site:thehindu.com+OR+site:news18.com+OR+site:thewire.in)+when:1h&hl=en&gl=IN&ceid=IN:en",
    urls = [
        `${start_url}${gTopicurl}CAAqKggKIiRDQkFTRlFvSUwyMHZNRGx1YlY4U0JXVnVMVWRDR2dKSFFpZ0FQAQ${end_url}`,
        `${start_url}${gTopicurl}CAAqKggKIiRDQkFTRlFvSUwyMHZNRGx6TVdZU0JXVnVMVWRDR2dKSFFpZ0FQAQ${end_url}`,
        `${start_url}${gTopicurl}CAAqKggKIiRDQkFTRlFvSUwyMHZNRGRqTVhZU0JXVnVMVWRDR2dKSFFpZ0FQAQ${end_url}`,
        `${start_url}${gTopicurl}CAAqKggKIiRDQkFTRlFvSUwyMHZNREpxYW5RU0JXVnVMVWRDR2dKSFFpZ0FQAQ${end_url}`,
        `${start_url}${gTopicurl}CAAqKggKIiRDQkFTRlFvSUwyMHZNRFp1ZEdvU0JXVnVMVWRDR2dKSFFpZ0FQAQ${end_url}`,
        `${start_url}${gSearchurl}omicron${end_url}`,
        `${start_url}${gSearchurl}%28site%3Abusiness-standard.com%2BOR%2Bsite%3Alivemint.com%2BOR%2Bsite%3Ahindustantimes.com%2BOR%2Bsite%3Amoneycontrol.com%2BOR%2Bsite%3Aindianexpress.com%2BOR%2Bsite%3Andtv.com%2BOR%2Bsite%3Aindiatimes.com%2BOR%2Bsite%3Athehindu.com%2BOR%2Bsite%3Anews18.com%2BOR%2Bsite%3Athewire.in%29%2Bwhen%3A6h${end_url}`
    ]
    async.mapLimit(urls, 5, async function (url) {
        try {			
            const response = await fetch(url)
            return response.json()
        } catch (err) {
            console.log(err);
            return {};
        }

    }, (err, results) => {
		const stop = Date.now()        
        if (err) {console.log(err);}               
		else{
			// rss = {}
			// for (index in results) {
			// 	if (index == 0) {
			// 		arr = []                
			// 		results[index].items.forEach(item => {
			// 			arr.push({ "title": item.title, "created": Date.parse(item.isoDate)/1000, "link": item.link})
			// 		})
			// 		arrr = arr.sort(function (a, b) {
			// 			return b.created - a.created;
			// 		});
			// 		rss.india = arrr;
			// 	}else if (index == 1){
			// 		arr = []                
			// 		results[index].items.forEach(item => {
			// 			arr.push({ "title": item.title, "created": Date.parse(item.isoDate)/1000, "link": item.link})
			// 		})
			// 		arrr = arr.sort(function (a, b) {
			// 			return b.created - a.created;
			// 		});
			// 		rss.hindi = arrr;	
			// 	}
			// 	else if (index == 2){
			// 		arr = []                
			// 		results[index].items.forEach(item => {
			// 			arr.push({ "title": item.title, "created": Date.parse(item.isoDate)/1000, "link": item.link})
			// 		})
			// 		arrr = arr.sort(function (a, b) {
			// 			return b.created - a.created;
			// 		});
			// 		rss.entertainment = arrr;	
			// 	}				
			// 	else if (index == 3){
			// 		arr = []                
			// 		results[index].items.forEach(item => {
			// 			arr.push({ "title": item.title, "created": Date.parse(item.isoDate)/1000, "link": item.link})
			// 		})
			// 		arrr = arr.sort(function (a, b) {
			// 			return b.created - a.created;
			// 		});
			// 		rss.business = arrr;	
			// 	}
			// }			
			const stop = Date.now()
			console.log(`Time Taken to execute RSS News = ${(stop - start) / 1000} seconds`);
            console.log(results);           
            setLocalStorage("rss", results, 60 * 60000);
            $("body").css({ "opacity": "1" });
            $("body").css({"cursor": ""});
			
		};
    })
}

function getRSS(){
    const start = Date.now()   
      urls = [
        // `https://api-panda.com/v4/articles/rss?feedId=61cda14cc7fc328dd9bf0e43`,
        // `https://api-panda.com/v4/articles/rss?feedId=61cda34bc7fc3277dabf1a9c`
        `` 
        `${start_url}${gTopicurl}CAAqKggKIiRDQkFTRlFvSUwyMHZNRGx6TVdZU0JXVnVMVWRDR2dKSFFpZ0FQAQ${end_url}`,
        `${start_url}${gTopicurl}CAAqKggKIiRDQkFTRlFvSUwyMHZNRGRqTVhZU0JXVnVMVWRDR2dKSFFpZ0FQAQ${end_url}`,
        `${start_url}${gTopicurl}CAAqKggKIiRDQkFTRlFvSUwyMHZNREpxYW5RU0JXVnVMVWRDR2dKSFFpZ0FQAQ${end_url}`,
        `${start_url}${gTopicurl}CAAqKggKIiRDQkFTRlFvSUwyMHZNRFp1ZEdvU0JXVnVMVWRDR2dKSFFpZ0FQAQ${end_url}`,
        `${start_url}${gSearchurl}omicron${end_url}`,
        `${start_url}${gSearchurl}%28site%3Abusiness-standard.com%2BOR%2Bsite%3Alivemint.com%2BOR%2Bsite%3Ahindustantimes.com%2BOR%2Bsite%3Amoneycontrol.com%2BOR%2Bsite%3Aindianexpress.com%2BOR%2Bsite%3Andtv.com%2BOR%2Bsite%3Aindiatimes.com%2BOR%2Bsite%3Athehindu.com%2BOR%2Bsite%3Anews18.com%2BOR%2Bsite%3Athewire.in%29%2Bwhen%3A6h${end_url}`
    ]
    async.mapLimit(urls, 5, async function (url) {
        try {			
            const response = await fetch(url)
            return response.json()
        } catch (err) {
            console.log(err);
            return {};
        }

    }, (err, results) => {
		const stop = Date.now()        
        if (err) {console.log(err);}               
		else{
			// rss = {}
			// for (index in results) {
			// 	if (index == 0) {
			// 		arr = []                
			// 		results[index].items.forEach(item => {
			// 			arr.push({ "title": item.title, "created": Date.parse(item.isoDate)/1000, "link": item.link})
			// 		})
			// 		arrr = arr.sort(function (a, b) {
			// 			return b.created - a.created;
			// 		});
			// 		rss.india = arrr;
			// 	}else if (index == 1){
			// 		arr = []                
			// 		results[index].items.forEach(item => {
			// 			arr.push({ "title": item.title, "created": Date.parse(item.isoDate)/1000, "link": item.link})
			// 		})
			// 		arrr = arr.sort(function (a, b) {
			// 			return b.created - a.created;
			// 		});
			// 		rss.hindi = arrr;	
			// 	}
			// 	else if (index == 2){
			// 		arr = []                
			// 		results[index].items.forEach(item => {
			// 			arr.push({ "title": item.title, "created": Date.parse(item.isoDate)/1000, "link": item.link})
			// 		})
			// 		arrr = arr.sort(function (a, b) {
			// 			return b.created - a.created;
			// 		});
			// 		rss.entertainment = arrr;	
			// 	}				
			// 	else if (index == 3){
			// 		arr = []                
			// 		results[index].items.forEach(item => {
			// 			arr.push({ "title": item.title, "created": Date.parse(item.isoDate)/1000, "link": item.link})
			// 		})
			// 		arrr = arr.sort(function (a, b) {
			// 			return b.created - a.created;
			// 		});
			// 		rss.business = arrr;	
			// 	}
			// }			
			const stop = Date.now()
			console.log(`Time Taken to execute RSS News = ${(stop - start) / 1000} seconds`);
            console.log(results);           
            setLocalStorage("rss", results, 60 * 60000);
            $("body").css({ "opacity": "1" });
            $("body").css({"cursor": ""});
			
		};
    })
}

function imgError(image) {
    $(image).hide(); 
 }

 function getArticleExtract(url) {
    $("#wpContent").html(``);
    async.tryEach([
        (next) => {
            Parse(`${url}`).then(data => {
                if (data.title) {
                    console.clear()           
                    $("#wpContent").append(`<h1>${data.title}</h1>`);
                    $("#wpContent").append(`<h2>${data.date_published}</h2>`);
                    $("#wpContent").append(`<img src ="${data.lead_image_url} alt="" width='100%' height="auto" style="object-fit:cover" onerror='imgError(this)'/>`);
                    $("#wpContent").append(`<p class="small">${data.content}<p>`);
                    $("#wpContent").append(`<p class="small d-flex-justify-content-center">Via: Normal Parse/<p>`);
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
            fetchURL(`https://api.outline.com/v3/parse_article?source_url=${url}`).then(data => {
                if (data.success) {
                    data = data.data;
                    if (data.data.site_name == "Outline") {
                        return next(new Error('Cannot get Data'))
                    } else {
                        console.clear()
                        let title = data.data.title ? data.data.title : ``;
                        let content = data.data.html ? data.data.html : ``;
                        let pageUrl = data.data.article_url ? data.data.article_url : ``;
                        let icon = data.data.icon ? data.data.icon : ``;
                        let author = data.data.author ? data.data.author : ``;
                        let siteName = data.data.site_name ? data.data.site_name : ``;
                        let date = data.data.date ? data.data.date : ``;
                        $("#wpContent").append(`<h1>${title}</h1>`);
                        $("#wpContent").append(`<h2>${date}</h2>`);
                        $("#wpContent").append(`<p class="small">${content}<p>`);
                        $("#wpContent").append(`<p class="small d-flex-justify-content-center">Via: Outline.com/<p>`);
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
            fetchURL(`https://api-panda.com/v2/feeds/story/full?url=${url}`).then(data => { 
                if (data.success) {
                    console.clear()
                    data =  data.data;
                    // console.log(data.data.data.title);
                    let title = data.data.title ? data.data.title : ``;
                    let content = data.data.html ? data.data.html : ``;
                    let pageUrl = data.data.pageUrl ? data.data.pageUrl : ``;
                    let icon = data.data.icon ? data.data.icon : ``;
                    let author = data.data.author ? data.data.author : ``;
                    let authorUrl = data.data.authorUrl ? data.data.authorUrl : ``;
                    let siteName = data.data.siteName ? data.data.siteName : ``;
                    let date = data.data.date ? new Date(data.data.date).toLocaleString("en-GB") : ``;                   
                    $("#wpContent").append(`<h1>${title}</h1>`);
                    $("#wpContent").append(`<h2>${date}</h2>`);
                    $("#wpContent").append(`<p class="small">${content}<p>`);
                    $("#wpContent").append(`<p class="small d-flex-justify-content-center">Via: UsePanda.com/<p>`);
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
            Parse(`https://sbcors.herokuapp.com/${url}`).then(data => {                
                if (data.title) {   
                    console.clear()           
                    $("#wpContent").append(`<h1>${data.title}</h1>`);
                    $("#wpContent").append(`<h2>${data.date_published}</h2>`);
                    $("#wpContent").append(`<img src ="${data.lead_image_url} alt="" width='100%' height="auto" style="object-fit:cover" onerror='imgError(this)'/>`);
                    $("#wpContent").append(`<p class="small">${data.content}<p>`);
                    $("#wpContent").append(`<p class="small d-flex-justify-content-center">Via: Proxy server/<p>`);
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
                if (data.success) {
                    
                } else {
                    console.clear()
                    $("#wpContent").append(data.response);
                    $("#wpContent").append(`<p class="small d-flex-justify-content-center">Via: txtify.it/<p>`);
                }
            }).catch(err => { 
                console.log(err); 
                return next(new Error('Cannot get Data')) 
            })
        },
    ])

}


async function fetchURL(url) {
    const response = await fetch(url);
    const text = await response.text();
    try {
        const data = JSON.parse(text);
        return { success: 1, urlfetched: url, data: data }
    } catch (err) {
        return { success: 0, urlfetched: url, error: err, response: text }
    }
}


// urlTest(`https://sbcors.herokuapp.com/https://api.reelgood.com/v3.0/content/browse/curated/top-10-movies-tv-streaming?availability=onAnySource&content_kind=both&hide_seen=false&hide_tracked=false&hide_user_listed=false&hide_watchlisted=false&imdb_end=10&imdb_start=0&region=gb&rg_end=100&rg_start=0&skip=0&sort=0&take=50&year_end=2021&year_start=1900`)

// https://www.cnbc.com/markets/ for stock market
// https://en.wikipedia.org/w/rest.php/v1/search/page?q=digital%20services%20tax&limit=10 for wiki search
// https://sbcors.herokuapp.com/
// urlTest("https://quote.cnbc.com/quote-html-webservice/restQuote/symbolType/symbol?noform=1&partnerId=2&fund=1&exthrs=0&output=json&requestMethod=quick&symbols=.SPX%7C.IXIC%7C.DJI%7C.FTSE%7C.N225%7C.HSI%7C.SSEC%7C.VIX%7C.GDAXI")
// urlTest("https://www.gdacs.org/gdacsapi/api/events/geteventlist/MAP")
// TestGroupBy("https://sbcors.herokuapp.com/https://rsoe-edis.org/gateway/webapi/events/")
async function urlTest(url){
    try{       
        const response =  await fetch(url);
        console.log(await response.json())
    }catch(err){
        console.log(err);
    }
   }

async function TestGroupBy(url){
    try{       
        const response =  await fetch(url);
        const data = await response.json();
        console.log(groupBy(data.features, (c) => c.properties.categoryName));

    }catch(err){
        console.log(err);
    }
   }

function groupBy(xs, f) {
    return xs.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
  }

  





 

   





