type TBodyAforo = {
  busReport: {
    plate: string
    date: string
  }
}

type TResponseAforo = {
  busReport: Array<{
    date: string
    geozone: string
    pasajeros: number
  }>
}

type TGeoZone = {
  date: string
  time: string
  route?: string
  geozone: string
  pasajeros: number
}
