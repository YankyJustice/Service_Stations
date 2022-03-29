import Card from 'src/components/Card'

import styles from './styles.module.scss'

const stations = [
  { name: 'tiny airlanes', id: 1, AcceptableCard: ['Huyndai', 'BMW'] },
  { name: 'tiny airlanes', id: 1, AcceptableCard: ['Huyndai', 'BMW'] },
  { name: 'tiny airlanes', id: 1, AcceptableCard: ['Huyndai', 'BMW'] },
]

const ServiceStations = () => {
  const qwe = ''
  return (
    <div className={styles.wrapper}>
      {stations.map((station) => (
        <Card name={station.name} />
      ))}
    </div>
  )
}

export default ServiceStations
