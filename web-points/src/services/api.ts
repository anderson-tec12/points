import axios from 'axios'

class ApiData {

  private api = axios.create({
    baseURL: 'https://5a59-191-233-136-140.ngrok-free.app'
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

  async getPointsByUser(idUser: string, month: string) {
    return this.api.get(`/points/${idUser}`, {
      params: {
        range: `${month}/2024`
      }
    })
  }
}


export const api = new ApiData()