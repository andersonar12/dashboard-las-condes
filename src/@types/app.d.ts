type TTableOptions = {
  sortDirection: import('@angular/material/sort').SortDirection
  pageSize: number
}

type TTableField = {
  label: string
  key: string
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
  route: string
  geozone: string
  pasajeros: string
}

type TMachineModalData = {
  machine: import('@ENTITIES/interfaces').MachineGPS
}

// DECLARATIONS ________________________________________________________________________________________________________

declare var Pushbar: any
