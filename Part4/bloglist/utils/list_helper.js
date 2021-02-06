const dummy = (blogs) => {
    if(blogs.length === 0) return 1;
    const reducer = (acc,curr) => {
        return acc+curr;
    }
    return blogs.reduce(reducer,0)/blogs.length
}

const totalLikes = (list) => {
    const no = list.map((x) => x=x.likes)
    //console.log(no)
    const reducer = (acc,curr) => {
        return acc+curr;
    }
    return no.length===0 ? 0 : no.reduce(reducer,0)
}

const mostLikes = (blogs) => {
    if ( blogs.length===0) {
      return null
    }
  
    const withMostVotes = (best, current) => {
      if ( !best ) {
        return current
      }
  
      return best.likes > current.likes ? best : current
    }
  
    return blogs.reduce(withMostVotes , null)
}


module.exports ={
    dummy,
    totalLikes,
    mostLikes
}