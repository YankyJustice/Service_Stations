import hyundai from 'src/assets/png/hyundai.png'
import mercedes from 'src/assets/png/mercedes.png'

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
]

export const regExpGovernmentNumber =
  /^[a-zA-Z]\d{3}(?<!000)[a-zA-Z]{2}\d{2,3}$/iu
