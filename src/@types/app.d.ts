type TTableOptions = {
  sortDirection: import('@angular/material/sort').SortDirection
  pageSize: number
}

type TTableField = {
  key: string
  label: string
  wch: number
}

type TTableChanges<T> = import('@angular/core').SimpleChanges & {
  items: {
    previousValue: T
    currentValue: T
  }
  fields: TTableField[]
  name: string
}

type TGeoZone = {
  date: string
  time: string
  // route: string
  geozone: string
  passengers: string
}

type TGeozoneByPassengerFlow = {
  time: string
  machine: string
  // route: string
  geozone: string
  passengers: string
}

type TMachineModalData = {
  machine: import('@ENTITIES/interfaces').MachineGPS
}

// DECLARATIONS ________________________________________________________________________________________________________

declare var Pushbar: any
