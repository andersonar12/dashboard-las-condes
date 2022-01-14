type TTableOptions = {
  sortDirection: import('@angular/material/sort').SortDirection
  pageSize: number
}

type TTableField = {
  label: string
  key: string
}

type TChanges<T> = {
  items: import('@angular/core').SimpleChange & {
    previousValue: T
    currentValue: T
  }
  fields: TTableField[]
  name: string
}
