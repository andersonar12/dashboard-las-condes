type TBodyAforo = {
  busReport: {
    plate: string
    date: string
  }

  flowByGeoZone: {
    flow: 'enters' | 'exits'
    date: string
  }
}

type TResponseAforo = {
  busReport: Array<{
    date: string
    geozone: string
    pasajeros: number
  }>

  flowByGeoZone: Array<{
    date: string
    geozone: string
    plate: string
    entradas_pasajeros?: number
    salidas_pasajeros?: number
  }>
}
