const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const latitude = urlParams.get('latitude');
const longitude = urlParams.get('longitude');
console.log(latitude, longitude);
var country = "";
var language = ""
getCountry();
if (country && language) {
    console.log(`Country:${country}, Language: ${language}`);
}
function getCountry() {
    country = navigator.languages[0].split("-")[1]
    language = navigator.languages[0].split("-")[0]
}
window.addEventListener('hashchange', function () {
    $('#navbarToggleExternalContent').removeClass('show');
    if (!location.hash || location.hash == "#" || location.hash == "") {
        window.location = "#homeSection";
    }
    console.log(location.hash);
    load();
}, false);
onPageLoad();
function onPageLoad() {
    if (!location.hash || location.hash == "#" || location.hash == "") {
        window.location = "#homeSection";
    }
    load();
}

function getBGData() {
    getHomeTopStories();
    getHomeTrendingNews();
    getGoogleTrends();
    getAllTrendingNews();
    getGoogleSearchTrends();
}

function load() {
    if (location.hash == "#homeSection") {
        loading();
        getHomeTopStories()
            .then(data => {
                populateHomeTopNews(data);
                getHomeTrendingNews().then(data => {
                    populateHomeTrendingNews(data);
                })
            });
    }
    if (location.hash == "#wikiSection") {
        loading();
        getWikiData().then((data => { populateWiki(data) }));
    }
    if (location.hash == "#googleTrendsSection") {
        loading();
        getGoogleTrends().then((data => { populateGoogleTrends(data) }));
    }
    if (location.hash == "#eventsSection") {
        loading();
        getEvents().then((data => { populateEvents(data) }));
    }
    if (location.hash == "#GoogleSearchTrendsSection") {
        loading();
        getGoogleSearchTrends().then(data => { populateGoogleSearchTrends(data) });
    }
    if (location.hash == "#HBDSection") {
        loading();
        getWikiEvents().then(data => { populateWikiEvents(data) });
    }
    if (location.hash == "#topNewsSection") {
        loading();
        getTopNews().then(data => { populateTopNews(data) });
    }
    if (location.hash == "#trendingNewsSection") {
        loading();
        getAllTrendingNews().then(data => { populateTrendingNews(data) });
    }
    if (location.hash == "#newsNearMeSection") {
        loading();
        if (latitude && longitude) {
            getNearbyNews(latitude, longitude).then(data => { populateNearbyNews(data) });
        } else {
            getNearbyNews().then(data => { populateNearbyNews(data) });
        }
    }
    if (location.hash == "#trendingLocations") {
        loading();
        getTrendingLocations().then(data => {populateTrendingLocations(data) });
    }
    if (location.hash == "#TrendingWPSection") {
        getTrendingPosts().then(data => { populateTrendingPosts(data) });
    }
    if (location.hash == "#LongReadsSection") {
        loading();
        getLongReads().then(data => { populateLongReads(data) });
    }
    if (location.hash == "#trendingStreamsSection") {
        loading();
        getTrendingStreams().then((data => {populateStreams(data) }));
    }
    if (location.hash == "#newsImagerySection") {
        loading();
        // populateImagery();
        getNewsImagery().then((data => {populateImagery(data) }));
    }
    if (location.hash == "#TrendingImagesSection") {
        loading();
        getTrendingImages().then((data => { populateTrendingImages(data) }));
    }
    if (location.hash == "#WeatherSection") {
        loading();
        if (latitude && longitude) {
            console.log(`"${latitude}, ${longitude}"`);
            getWeather(`${latitude}, ${longitude}`).then(data => { console.log(data); populateWeather(data) });
        } else {
            getWeather().then(data => { console.log(data);populateWeather(data) });
        }
    }
    if (location.hash == "#trendingPeople") {
        loading();
        getPeople().then((data => { populateTrendingPeople(data); }));
    }
    if (location.hash == "#trendingEntities") {
        loading();
        getOrgs().then((data => {populateTrendingPeople(data) }));
    }
    if (location.hash == "#trendingQuotes") {
        loading();
        getQuotes().then((data => { populateTrendingQuotes(data) }));
    }
    if (location.hash == "#trendingHashtags") {
        loading();
        getTrendingHashtags().then((data => { populateHashtags(data) }));
    }
    if (location.hash == "#trendingAQs") {
        loading();
        getCB().then((data => { populateCB(data) }));
    }
    if (location.hash == "#trendingYT") {
        loading();
        getYTTrends().then((data => { populateYT(data) }));
    }
    if (location.hash == "#trendingStocks") {
        loading();
        getStocks().then((data => { populateStocks(data) }));
    }
    setInterval(getBGData, 15 * 60000);
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
async function urlTest(url) {
    try {
        const response = await fetch(url);
        console.log(await response.json())
    } catch (err) {
        console.log(err);
    }
}
