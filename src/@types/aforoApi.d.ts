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
