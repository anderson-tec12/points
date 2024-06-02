import axios from 'axios'

class ApiData {

  private api = axios.create({
    baseURL: 'http://192.168.1.102:3333'
  })


  async getResume() {
    return this.api.get('/points/resume')
  }
}


export const api = new ApiData()