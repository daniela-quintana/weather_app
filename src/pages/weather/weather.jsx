import React, { useState } from 'react';
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle, Container, CardImg
} from 'reactstrap';
import './weather.css';

function Weather() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selected, setSelected] = useState('Arica');
  const [items, setItems] = useState([]);
  const [image, setImage] = useState('');

  const regiones = [
    {
      name: 'Arica',
      value: 'Arica',
      img1: '',
      img2: '',
      img3: ''
    },
    {
      name: 'Iquique',
      value: 'Iquique',
      img: 'Iquique'
    },
    {
      name: 'Antofagasta',
      value: 'Antofagasta',
      img: 'Antofagasta'

    },
    {
      name: 'Copiapo',
      value: 'Copiapo',
      img: 'Copiapo'
    },
    {
      name: 'La Serena',
      value: 'La Serena',
      img: 'La Serena'
    },
    {
      name: 'Valparaiso',
      value: 'Valparaiso',
      img: 'Valparaiso'
    },
    {
      name: 'Santiago',
      value: 'Santiago',
      img: 'Santiago'
    },
    {
      name: 'Rancagua',
      value: 'Rancagua',
      img: 'Rancagua'
    },
    {
      name: 'Talca',
      value: 'Talca',
      img: 'Talca'
    },
    {
      name: 'Chillán',
      value: 'Chillán',
      img: 'Chillán'
    },
    {
      name: 'Concepción',
      value: 'Concepción',
      img: 'Concepción'
    },
    {
      name: 'Temuco',
      value: 'Temuco',
      img: 'Temuco'
    },
    {
      name: 'Valdivia',
      value: 'Valdivia',
      img: 'Valdivia'
    },
    {
      name: 'Puerto Montt',
      value: 'Puerto Montt',
      img: 'Puerto Montt'
    },
    {
      name: 'Coyhaique',
      value: 'Coyhaique',
      img: 'Coyhaique'
    },
    {
      name: 'Punta Arenas',
      value: 'Punta Arenas',
      img: 'Punta Arenas'
    },
  ]

  React.useEffect(() => {
    fetch(`http://api.weatherbit.io/v2.0/current?city=${selected}&country=CL&key=10faa6e7b2e54a9a998043df30568a15`, {
      // fetch(`http://api.weatherbit.io/v2.0/current?city=Arica&country=CL&key=10faa6e7b2e54a9a998043df30568a15`, {
      method: 'GET',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      mode: 'cors',
      cache: 'default'
    })
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.data);
          console.log(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [
    selected,
  ])

  const handleSelected = (params) => {
    setSelected(params.target.value);

    Object.entries(regiones).forEach(([key, value]) => {
      if (selected === value.name) {
        // return setImage(value.img);
        console.log('value.img', value.img)
        console.log('selected', selected)
      }
    });
  }

  console.log('image', image)


  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {

    return (
      <Container>
        <select key={regiones[0]} onChange={handleSelected}>
          {regiones.map(region => (
            <option value={region.value}>{region.name}
            </option>
          ))}
        </select>

        {items.map(item => (
          <Card key={item.name}>
            <CardBody>
              <CardTitle tag="h5">{item.city_name}</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">Radiación Solar {item.solar_rad}</CardSubtitle>
            </CardBody>
            <div class="row">
              <div className="col-sm text-center">
                <img width="90%" src={regiones[0].img1} alt="Card image cap" />
              </div>
              <div className="col-sm text-center">
                <img width="90%" src={regiones[0].img2} alt="Card image cap" />
              </div>
              <div className="col-sm text-center">
                <img width="90%" src={regiones[0].img3} alt="Card image cap" />
              </div>
            </div>
            <CardBody>
            <CardText>
                <h3>{item.app_temp}°C</h3>
                {item.weather.description}
                <br />
                <b>Latitud: {item.lat}</b>
                <br />
                <b>Longitud: {item.lon}</b>
              </CardText>
            </CardBody>
          </Card>
        ))}
      </Container>
    );
  }
}

export default Weather;
