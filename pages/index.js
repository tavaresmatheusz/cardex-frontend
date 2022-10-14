import Head from "next/head";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export async function getServerSideProps(context) {
  let cars;
  await axios.get(`${process.env.API_URL}/car`).then((res) => cars = res.data);
  return { props: { cars: cars.content}};
}


export default function Home(props) {
  const [carMode, setCarMode]  = useState(false);
  const [selectedCar, setCar] = useState(null);
  const [cars, setCars] = useState(props.cars);
  function handleClick(car){
      setCar(car);
      setCarMode(car != null);
  }

  return (
    <>
      <header>
        <Image src={"/CarDex_blacklogo.png"} alt={"CarDex Logo"} width={126} height={57}/>
        
        <div className="finder">
          <input className="finder-input" placeholder="Pesquisar" onChange={(event) => { 
            if (event.target.value === "") {
              setCars(props.cars);
            } else {
              setCars(props.cars.filter((car) => car.modelCar.toLowerCase().startsWith(event.target.value.toLowerCase())));
              console.log(props.cars.filter((car) => car.modelCar.toLowerCase().startsWith(event.target.value.toLowerCase())))
            }
           }}/>
        </div>
      </header>

      <section className="cards">
        <div className="container card-container">
          {selectedCar === null ? cars.map((car) => {
            return (
            <div className="card" key={car.modelCar}>
            <Image src={`/${car.images.directory}`} width={262} height={157} className="card-image"/>
            <div className="card-espec-container">
              <div className="card-espec">
                <h4 className="card-espec-name">Modelo</h4>
                <p className="card-espec-content">{car.modelCar}</p>
              </div>
              <div className="card-espec">
                <h4 className="card-espec-name">Fabricante</h4>
                <p className="card-espec-content">{car.manufacturer.name}</p>
              </div>
              <div className="card-espec">
                <h4 className="card-espec-name">Top Speed</h4>
                <p className="card-espec-content">{`${car.maxSpeed} mp/h`}</p>
              </div>
            </div>
            
            <div className="card-espec-button-container">
              <button className="card-espec-button" type="button" onClick={() => {handleClick(car)}}>VER MAIS</button>
            </div>
          </div>
          )}) : (
          <div className="specs-container">
            <div className="specs">
              <Image src={`/${selectedCar.images.directory}`} width={621} height={432} className="spec-image"/>
              <div className="spec-content-container">
                <div className="spec-contents">
                  <div className="spec-content">
                    <h4 className="spec-content-title">Modelo</h4>
                    <p className="spec-content-text">{selectedCar.modelCar}</p>
                  </div>
                  <div className="spec-content">
                    <h4 className="spec-content-title">Fabricante</h4>
                    <p className="spec-content-text">{selectedCar.manufacturer.name}</p>
                  </div>
                  <div className="spec-content">
                    <h4 className="spec-content-title">Início da produção</h4>
                    <p className="spec-content-text">{selectedCar.startOfProduction}</p>
                  </div>
                  <div className="spec-content">
                    <h4 className="spec-content-title">Fim da produção</h4>
                    <p className="spec-content-text">{selectedCar.endOfProduction}</p>
                  </div>
                  <div className="spec-content">
                    <h4 className="spec-content-title">Câmbio</h4>
                    <p className="spec-content-text">{selectedCar.exchange}</p>
                  </div>
                  <div className="spec-content">
                    <h4 className="spec-content-title">Tração</h4>
                    <p className="spec-content-text">{selectedCar.traction}</p>
                  </div>
                  <div className="spec-content">
                    <h4 className="spec-content-title">Motor</h4>
                    <p className="spec-content-text">{selectedCar.engine.name}</p>
                  </div>
                  <div className="spec-content">
                    <h4 className="spec-content-title">Cilindros</h4>
                    <p className="spec-content-text">{selectedCar.engine.cylinders}</p>
                  </div>
                  <div className="spec-content">
                    <h4 className="spec-content-title">Combustível</h4>
                    <p className="spec-content-text">{selectedCar.engine.fuel}</p>
                  </div>
                  <div className="spec-content">
                    <h4 className="spec-content-title">0 - 100</h4>
                    <p className="spec-content-text">{selectedCar.zeroToAHundred}</p>
                  </div>
                  <div className="spec-content">
                    <h4 className="spec-content-title">Unidades produzidas</h4>
                    <p className="spec-content-text">{selectedCar.unitsProduced}</p>
                  </div>
                  <div className="spec-content">
                    <h4 className="spec-content-title">Posição do motor</h4>
                    <p className="spec-content-text">{selectedCar.enginePosition}</p>
                  </div>
                </div>
                <div className="spec-button-container">
                  <button type="button" className="spec-button" onClick={() => handleClick(null)}>FECHAR</button>
                </div>
              </div>
            </div>
          </div>)}
        </div>
      </section>
      <footer>
        <div className="container">
          <div className="footer-container">
            <a className="footer-api" href={"https://github.com/Vinidiesel/CarDex_api"}>
              <div className="footer-logo">
                <Image src={"/CarDex_whitelogo.png"} alt={"CarDex Logo"} width={127} height={59}/>
                <p className="footer-link">API</p>
              </div>
            </a>

            <div className="footer-dev">
              <Image src={"/matheus.png"} alt={"CarDex Logo"} width={139} height={54}/>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}
