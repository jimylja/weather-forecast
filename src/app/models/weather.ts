export interface Weather {
  dt: number;
  dt_txt: string;
  main: {
    temp: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    sea_level: number,
    grnd_level: number,
    humidity: number,
    temp_kf: number
  };
  weather: [{
    id: number,
    main: string,
    description: string,
    icon: string
  }];
  clouds: {
    all: number
  };
  wind: {
    speed: number,
    deg: number
  };
}
