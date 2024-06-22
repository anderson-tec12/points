import axios from 'axios'

class ApiData {

  private api = axios.create({
    baseURL: 'https://08e6-191-233-136-140.ngrok-free.app'
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

  async getPointsByUser(idUser: string) {
    return this.api.get(`/points/${idUser}`)
  }
}


export const api = new ApiData()