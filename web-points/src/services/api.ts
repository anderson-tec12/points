import axios from 'axios'

class ApiData {

  private api = axios.create({
    baseURL: 'http://localhost:3333'
  })


  async getResume() {
    return this.api.get('/points/resume')
  }

  async addPoint(payload: {
    "description": string,
    "userId": string
    "value": number
  }) {
    return this.api.post('/points', payload)
  }
}


export const api = new ApiData()