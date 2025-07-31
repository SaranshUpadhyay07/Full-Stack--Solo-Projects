import { tweetsData } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

let localArray = tweetsData


document.addEventListener('click', function(e){
    if(e.target.dataset.like){
       handleLikeClick(e.target.dataset.like) 
    }
    else if(e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet)
    }
    else if(e.target.dataset.reply){
        handleReplyClick(e.target.dataset.reply)
    }
    else if(e.target.dataset.deleting){
        handleDeletingTweet(e.target.dataset.deleting)
    }
    else if(e.target.id === 'tweet-btn'){
        handleTweetBtnClick()
    }else if(e.target.dataset.comment){
        handleComment(e.target.dataset.comment)
    }
})
 
function handleLikeClick(tweetId){ 
    const targetTweetObj = localArray.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]

    if (targetTweetObj.isLiked){
        targetTweetObj.likes--
    }
    else{
        targetTweetObj.likes++ 
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked
    render()
}
function handleComment(tweetId){
    let newComment = {
                handle: `@Scrimba`,
                profilePic: `images/scrimbalogo.png`,
                tweetText: document.getElementById(`comments-${tweetId}`).value,
    }
   const targetTweetObj = localArray.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]
    
    targetTweetObj.replies.push(newComment);
    render()
}
function handleRetweetClick(tweetId){
    const targetTweetObj = localArray.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]
    
    if(targetTweetObj.isRetweeted){
        targetTweetObj.retweets--
    }
    else{
        targetTweetObj.retweets++
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
    render() 
}
function handleDeletingTweet(tweetId){
    
    const targetTweetObj = localArray.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]
    
    
    localArray = localArray.filter(function(tweet){
        return tweet !== targetTweetObj 
    })
    render()
}
function handleReplyClick(replyId){
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden')
}

function handleTweetBtnClick(){
    const tweetInput = document.getElementById('tweet-input')

    if(tweetInput.value){
        localArray.unshift({
            handle: `@Scrimba`,
            profilePic: `images/scrimbalogo.png`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4()
        })
    render()
    tweetInput.value = ''
    }

}

function getFeedHtml(){
    let feedHtml = ``
    
    localArray.forEach(function(tweet){
        
        let likeIconClass = ''
        let deleteTweet = ''
        if (tweet.isLiked){
            likeIconClass = 'liked'
        }
        
        let retweetIconClass = ''
        
        if (tweet.isRetweeted){
            retweetIconClass = 'retweeted'
        }
        if(tweet.handle==='@Scrimba'){
            deleteTweet = `<div><i class="fa-solid fa-trash" data-deleting="${tweet.uuid}"></i></div>`
        }
        let repliesHtml = `
            <div class="hidden-modal">
                <textarea placeholder="Comment here" id="comments-${tweet.uuid}"></textarea>
            <button class="comment-btn" id="comment-btn-${tweet.uuid}" data-comment="${tweet.uuid}">Add your Thoughts</button>
            </div>
        `
        
        if(tweet.replies.length >= 0){
            tweet.replies.forEach(function(reply){
                repliesHtml+=`
<div class="tweet-reply">
    <div class="tweet-inner">
        <img src="${reply.profilePic}" class="profile-pic">
            <div>
                <p class="handle">${reply.handle}</p>
                <p class="tweet-text">${reply.tweetText}</p>
            </div>
        </div>
</div>
`
            })
        }
        
          
        feedHtml += `
<div class="tweet">
    <div class="tweet-inner">
        <img src="${tweet.profilePic}" class="profile-pic">
        <div>
            <div class="tweet-top">
                <p class="handle">${tweet.handle}</p>
                ${deleteTweet}
            </div>
            <p class="tweet-text">${tweet.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                    <i class="fa-regular fa-comment-dots"
                    data-reply="${tweet.uuid}"
                    ></i>
                    ${tweet.replies.length}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-heart ${likeIconClass}"
                    data-like="${tweet.uuid}"
                    ></i>
                    ${tweet.likes}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-retweet ${retweetIconClass}"
                    data-retweet="${tweet.uuid}"
                    ></i>
                    ${tweet.retweets}
                </span>
            </div>   
        </div>            
    </div>
    <div class="hidden" id="replies-${tweet.uuid}">
        ${repliesHtml}
    </div>   
</div>
`
   })
   return feedHtml 
}

function render(){
    document.getElementById('feed').innerHTML = getFeedHtml()
}

render()

