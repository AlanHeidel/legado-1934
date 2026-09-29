const V = 'https://videos.pexels.com/video-files'
const I = 'https://images.pexels.com'

export const pxVideo = (id: number | string, file: string) => `${V}/${id}/${file}`

export const pxPhoto = (id: number, w = 1600, h = 1000, crop = true) =>
  `${I}/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}&h=${h}${crop ? '&fit=crop' : ''}&dpr=1`

export const pxVideoPoster = (id: number, w = 1200) =>
  `${I}/videos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}&dpr=1`

export const HERO_VIDEO = {
  src: `${V}/29564707/12725926_1280_720_30fps.mp4`,
  poster: pxVideoPoster(29564707, 1920),
}

export interface PizzaStage {
  id: string
  step: string
  caption: string
  src: string
  poster: string
  range: [number, number]
}

export const PIZZA_STAGES: PizzaStage[] = [
  {
    id: 'masa',
    step: 'Masa',
    caption: '48 horas de leudado en frío',
    src: `${V}/5898644/5898644-hd_1366_720_30fps.mp4`,
    poster: pxVideoPoster(5898644),
    range: [0, 0.2],
  },
  {
    id: 'salsa',
    step: 'Salsa y queso',
    caption: 'Tomate del día y muzzarella doble',
    src: `${V}/5898380/5898380-hd_1366_720_30fps.mp4`,
    poster: pxVideoPoster(5898380),
    range: [0.2, 0.44],
  },
  {
    id: 'toppings',
    step: 'Toppings',
    caption: 'Pepperoni, oliva y albahaca',
    src: `${V}/6093199/6093199-hd_720_1366_30fps.mp4`,
    poster: pxVideoPoster(6093199),
    range: [0.44, 0.7],
  },
  {
    id: 'horno',
    step: 'Horno',
    caption: 'Barro, a 350 grados',
    src: `${V}/5898642/5898642-hd_720_1366_30fps.mp4`,
    poster: pxVideoPoster(5898642),
    range: [0.7, 0.88],
  },
]

export const COURTS_PHOTOS = {
  main: pxPhoto(399187, 1100, 1400),
  turf: pxPhoto(33267122, 800, 620),
  altMain: pxPhoto(33267122, 1100, 1400),
  altTurf: pxPhoto(399187, 800, 620),
}

export const CANTINA_PHOTOS = {
  main: pxPhoto(33763649, 1000, 1250),
  fallback: pxPhoto(13031243, 1000, 1250),
}

export const MENU_IMAGES = {
  muzzarella: pxPhoto(35759992, 880, 660),
  fugazzeta: pxPhoto(31094811, 880, 660),
  calabresa: pxPhoto(5903323, 880, 660),
  picada: pxPhoto(5732759, 880, 660),
  chopper: pxPhoto(34574547, 880, 660),
}