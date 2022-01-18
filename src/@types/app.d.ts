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

type TMachineModalData = {
  machine: import('@ENTITIES/interfaces').MachineGPS
}

type TGeoZoneByBus = {
  date: string
  time: string
  // route: string
  geozone: string
  passengers: string
}

type TGeoZoneByPassengerFlow = {
  time: string
  machine: string
  // route: string
  geozone: string
  passengers: string
}

type TTopGeoZone = {
  geozone: string
  passengers: string
}

type TGeoZone = {
  code: string
  name: string
}

// DECLARATIONS ________________________________________________________________________________________________________

declare var Pushbar: any
