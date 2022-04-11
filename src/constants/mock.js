import audi from 'src/assets/png/audi.png'
import bmw from 'src/assets/png/bmw.png'
import hyundai from 'src/assets/png/hyundai.png'
import mazda from 'src/assets/png/mazda.png'
import mercedes from 'src/assets/png/mercedes.png'
import mitsubishi from 'src/assets/png/mitsubishi.png'

export const details = [
  'battery',
  'accumulator',
  'bonnet',
  'boot',
  'carburettor',
  'absorber',
  'accelerator',
  'body',
  'brake',
  'bulbs',
]

export const autos = [
  { name: 'Hyundai', icon: hyundai },
  { name: 'Mercedes', icon: mercedes },
  { name: 'Mazda', icon: mazda },
  { name: 'Mitsubishi', icon: mitsubishi },
  { name: 'Audi', icon: audi },
  { name: 'Bmw', icon: bmw },
]

export const regExpGovernmentNumber =
  /^[a-zA-Z]\d{3}(?<!000)[a-zA-Z]{2}\d{2,3}$/iu
