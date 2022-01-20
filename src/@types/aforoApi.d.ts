type TBodyAforo = {
  signIn: {
    user: TLogin
  }
  signUp: {
    user: TSingUp
  }
  busReport: {
    plate: string
    date: string
  }
  flowByGeoZones: {
    flow: 'enters' | 'exits'
    date: string
  }
  topGeoZones: {
    date: string
    top: number
  }
}

type TResponseAforo = {
  error:
    | string
    | {
        errors: {
          detail: string
        }
      }
  signIn: {
    token: string
  }
  signUp: {
    data: {
      email: string
      firstname: string
      id: number
      lastname: string
    }
  }
  busReport: Array<{
    date: string
    geozone: string
    pasajeros: number
  }>
  flowByGeoZones: Array<{
    date: string
    geozone: string
    plate: string
    entradas_pasajeros?: number
    salidas_pasajeros?: number
  }>
  topGeoZones: Array<{
    entradas: number
    geozone: string
  }>
}
