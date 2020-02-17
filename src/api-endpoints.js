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
  }
}

export default endpoints
