export interface ResponseAuthLiveGps {
    access_token: string;
    expires_in: number;
    id_token: string;
    refresh_token: string;
    scope: string;
    token_type: string;
}

export interface TotalPorHoraDeHoy {
    hour: number;
    pasajeros: number;
}

export interface TotalPorDia {
    date: string;
    enters: number;
}

export interface TotalPasajeros {
    total_pasajeros: number;
}

export interface PromedioPasajeros {
    date?:string;
    hour?: number;
    promedio_pasajeros: string;
}

export interface PasajerosActualesPorBus {
    enters: number;
    exits: number;
    plate: string;
}


////////////////// Dispositivos Buses LiveGPS ////////////////////
export interface AreaNegocio {
    description: string;
    id: number;
}

export interface CentroCosto {
    description: string;
    id: number;
}

export interface Company {
    geotab_group_id?: any;
    id: number;
    name: string;
}

export interface FuelEfficiency {
    city: string;
    loaded: string;
    mixed: string;
    road: string;
}

export interface Group {
    company_id: number;
    id: number;
    name: string;
}

export interface Lpf {
    altitude: number;
    bearing: number;
    company_id: number;
    device_id: number;
    device_type: string;
    event_id: number;
    fuel_level: number;
    geofence_id?: any;
    geofence_name?: any;
    gps_date: Date;
    ignition: boolean;
    lat: number;
    lng: number;
    name: string;
    odometer: number;
    speed: number;
}

export interface MachineGPS {
    area_negocio: AreaNegocio;
    brand: string;
    centro_costo: CentroCosto;
    color: string;
    marker?:string;
    company: Company;
    contract?: any;
    current_passengers?:PasajerosActualesPorBus
    dev_brand: string;
    dev_model: string;
    engine_type: string;
    event_ids: any[];
    fuel_efficiency: FuelEfficiency;
    fuel_tank_capacity?: number;
    group: Group;
    hardware_id?: any;
    icc: string;
    icon: string;
    id: number;
    imei: string;
    lpf: Lpf;
    model: string;
    name: string;
    obs?: any;
    phone?: any;
    place_id?: number;
    plate: string;
    remote_id: string;
    sensors?: any;
    serial: string;
    status_id?: number;
    vin?: any;
    year: number;
}
