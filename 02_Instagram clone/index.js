const posts = [
    {
        name: "Vincent van Gogh",
        username: "vincey1853",
        location: "Zundert, Netherlands",
        avatar: "images/avatar-vangogh.jpg",
        post: "images/post-vangogh.jpg",
        comment: "just took a few mushrooms lol",
        likes: 21
    },
    {
        name: "Gustave Courbet",
        username: "gus1819",
        location: "Ornans, France",
        avatar: "images/avatar-courbet.jpg",
        post: "images/post-courbet.jpg",
        comment: "i'm feelin a bit stressed tbh",
        likes: 4
    },
        {
        name: "Joseph Ducreux",
        username: "jd1735",
        location: "Paris, France",
        avatar: "images/avatar-ducreux.jpg",
        post: "images/post-ducreux.jpg",
        comment: "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
        likes: 152
    }
]

const postsSec = document.getElementById("postsList");
let count1 =posts[0].likes;
let count2=posts[1].likes
let count3=posts[2].likes;

function renderPosts(){
    for(let i =0;i<posts.length;i++){
        postsSec.innerHTML += `
                    <li>
                        <div class="Postcontainer">
                            <div class="userName">
                                    <img src="${posts[i].avatar}" class="user-avatar"/>
                                <div>
                                    <p class="user-info" id="user-name">${posts[i].name}</p>
                                    <p class="user-info">${posts[i].location}</p>
                                </div>
                            </div>
                            <div>
                                <img class="peoplePosts" src="${posts[i].post}" alt="${posts[i].name+"'s posts"}"/>
                            </div>
                            <div class="icons">
                                <img src="images/icon-heart.png"/ id="heart${i}">
                                <img src="images/icon-comment.png"/>
                                <img src="images/icon-dm.png"/>
                            </div>
                            <div class="description">
                                <p><span class="highlight" id="span${i}">${posts[i].likes} likes</span></p>
                                <p><span class="highlight">${posts[i].username}</span>: ${posts[i].comment}</p>
                            </div>
                        </div>
                    </li>
        `
    }
}
renderPosts();

document.getElementById("heart0").addEventListener('click',function(){
    count1++;
    document.getElementById("span0").textContent = count1+" likes";
})
document.getElementById("heart1").addEventListener('click',function(){
    count2++;
    document.getElementById("span1").textContent = count2 +" likes";
})
document.getElementById("heart2").addEventListener('click',function(){
    count3++;
    document.getElementById("span2").textContent = count3 +" likes";
})

