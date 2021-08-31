export function formatDate (timestamp) {
    const d = new Date(timestamp)
    const time = d.toLocaleTimeString('en-US')
    return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}
  
export function formatQuestion (question, author, authedUser) {
    const { id, optionOne, optionTwo, timestamp } = question
    const { name, avatarURL } = author

    return {
        id,
        timestamp,
        name,
        avatar: avatarURL,
        optionOne,
        optionTwo,
        hasVoted: optionOne.votes.includes(authedUser) || optionTwo.votes.includes(authedUser),
    }
}
  
export function formatUser (users, questions, user) {
    const { id, name, avatarURL } = user
    const askedQuestions = Object.values(questions).filter((q) => q.author === id).length
    const answeredQuestions =  Object.keys(users[id].answers).length
    const score = askedQuestions + answeredQuestions

    return {
        id,
        name,
        avatar: avatarURL,
        askedQuestions: askedQuestions,
        answeredQuestions,
        score
    }
}
  
export function formatAuthedUser (users, authedUser) {
    const { id, name, avatarURL } = users[authedUser]

    return {
        id,
        name,
        avatar: avatarURL,
    }
}
