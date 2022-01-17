type TBodyAforo = {
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
