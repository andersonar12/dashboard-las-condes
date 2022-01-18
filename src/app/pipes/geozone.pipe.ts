import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'geozone'
})
export class GeozonePipe implements PipeTransform {
  transform(geozone: string, query: 'code' | 'name'): string {
    const strList = geozone.split('-')

    const descomponentGeoZone = <TGeoZone>{
      code: strList[0].trim(),
      name: strList[1] || ''
    }

    return descomponentGeoZone[query]
  }
}
