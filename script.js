var nav=document.createElement("nav")
nav.setAttribute("class","navbar")

var div=document.createElement("div");
div.setAttribute("class","toggle-btn")
var span1=document.createElement("span")
var span2=document.createElement("span")
var span3=document.createElement("span")
div.append(span1,span2,span3)
var img=document.createElement("img")
img.setAttribute("src","Y-T_logo.png")
img.setAttribute("class","logo")
img.setAttribute("alt","")
nav.append(div)
nav.append(img)

var div1=document.createElement("div")
div1.setAttribute("class","search-box")

var input=document.createElement("input")
input.setAttribute("type","text")
input.setAttribute("class","search-bar")
input.setAttribute("placeholder","search")

var button=document.createElement("button");
button.setAttribute("class","search-btn")
var img1=document.createElement("img")
img1.setAttribute("src","Search-btn.png")
img1.setAttribute("class","btn")
img1.setAttribute("alt","")

button.append(img1);

div1.append(input,button)
nav.append(div1)
document.body.append(nav)

var div2=document.createElement("div")
div2.setAttribute("class","videoContainer")
document.body.append(div2)
//vedio-container


//api

const videoCardContainer=document.querySelector('.videoContainer');
var api_key="AIzaSyD1uDcMsxWjZLQJPbRBzrei97M4DSxB988";
var  video_http="https://www.googleapis.com/youtube/v3/videos?";
var channel_http="https://www.googleapis.com/youtube/v3/channels?"

fetch(video_http + new URLSearchParams({
    key:api_key,
    part:'snippet',
    chart:'mostPopular',
    maxResults: 4,
    regionCode: 'US',
    info:'contactDetails'

}))
.then(res=>res.json())
.then(data=>{
    console.log(data);
    data.items.forEach(item => {
        getChannelIcon(item);
    });
}).catch(err=>console.log(err))

const getChannelIcon=(video_data)=>{
    fetch(channel_http + new URLSearchParams({
        key: api_key,
        part: 'snippet,contactDetails',
        id: video_data.snippet.channelId
    }))
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        video_data.channelThumbnail=data.items[0].snippet.thumbnails.default.url;
        //console.log(video_data)
        makeVideoCard(video_data);
    })
}

const makeVideoCard=(data)=>{
    videoCardContainer.innerHTML +=`
    <div class="video" onclick="location.href='http://youtube.com/watch?v=${data.id}'">
    <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt=" ">
    <div class="content">
        <img src="${data.channelThumbnail}" class="channel" alt="">
        <div class="info">
            <h4 class="title">${data.snippet.title}</h4>
            <p class="channel-name">${data.snippet.channelTitle}</p>
        </div>
    </div>
</div>`
}


// seach bar

const searchInput=document.querySelector('.search-bar');
const searchBtn=document.querySelector('.search-btn')
let searchLink="https://www.youtube.com/results?search_query=";

searchBtn.addEventListener('click',()=>{
    if(searchInput.value.length){
        location.href=searchLink + searchInput.value;
    }
})