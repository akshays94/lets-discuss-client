const endpoints = {
  register: {
    method: 'post',
    url: '/api/v1/users/'
  },
  login: {
    method: 'post',
    url: '/login/'
  },
  questions: {
    method: 'get',
    url: '/api/v1/questions/'
  },
  createQuestion: {
    method: 'post',
    url: '/api/v1/questions/'
  },
  getQuestion: {
    method: 'get',
    url: '/api/v1/questions/:questionId/'
  },
  getAnswers: {
    method: 'get',
    url: '/api/v1/questions/:questionId/answers/'
  },
  createAnswer: {
    method: 'post',
    url: '/api/v1/questions/:questionId/answers/'
  },
  upvoteQuestion: {
    method: 'post',
    url: '/api/v1/questions/:questionId/upvote/'
  },
  downvoteQuestion: {
    method: 'post',
    url: '/api/v1/questions/:questionId/downvote/'
  },
  revokeVoteQuestion: {
    method: 'post',
    url: '/api/v1/questions/:questionId/revoke-vote/'
  },
  getQuestionVotes: {
    method: 'get',
    url: '/api/v1/questions/:questionId/votes/'
  },
  markAnswerAsCorrect: {
    method: 'post',
    url: '/api/v1/answers/:answerId/mark-as-correct/'
  },
  upvoteAnswer: {
    method: 'post',
    url: '/api/v1/answers/:answerId/upvote/'
  },
  downvoteAnswer: {
    method: 'post',
    url: '/api/v1/answers/:answerId/downvote/'
  },
  revokeVoteAnswer: {
    method: 'post',
    url: '/api/v1/answers/:answerId/revoke-vote/'
  }
}

export default endpoints
