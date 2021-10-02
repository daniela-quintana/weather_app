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
      img: 'data:image/jpeg;base64,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'
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
            {/* <CardImg top width="10%" src={regiones[0].img} alt="Card image cap" />  */}
            <img width="30%" src={image} alt="Card image cap" />
            <CardBody>
              <CardText>
                <b>{item.app_temp}°C</b>
                <br></br>
                {item.weather.description}
              </CardText>
              <CardText>{item.lon}</CardText>
              <CardText>{item.lat}</CardText>
            </CardBody>
          </Card>
        ))}
      </Container>
    );
  }
}

export default Weather;
