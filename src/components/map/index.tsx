import React, { useState, useRef, useEffect } from "react";
import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";
import petHand from "../../img/petHand.svg";
import { MainButton } from "../../ui/buttons";
import { TextField } from "../../ui/text-field";
import { MainText } from "../../ui/text-font";
import css from "./index.css";
//pk.35bc3411252dafff1ecbc7a3338da82f

type PropsMap = {
  onChange?;
};

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZ2lhY3VzYWoiLCJhIjoiY2t6aGxpdGxxMDU4djMxbnl5aWpvdnZ5cyJ9.KQi6_aWaxCKOPDU4KMu3YQ",
});

export function MapBoxEl(props: PropsMap) {
  const [marker, setMarker] = useState(false);
  const [cords, setCords] = useState([-60.7151117, -31.6441985]);
  const [lastSeen, setLastSeen] = useState("");

  function onClickMap(map, evt) {
    const lat = evt.lngLat.lat;
    const lng = evt.lngLat.lng;
    setCords([lng, lat]);
    setMarker(true);
    searcByCoord(lat.toString(), lng.toString());
  }

  useEffect(() => {
    props.onChange({ cords, lastSeen });
  }, [lastSeen]);

  async function searcByCoord(lat, lng) {
    try {
      const res = await fetch(
        "https://us1.locationiq.com/v1/reverse.php?key=pk.35bc3411252dafff1ecbc7a3338da82f&lat=" +
          lat +
          "&lon=" +
          lng +
          "&format=json"
      );

      const data = await res.json();

      const lastSeen = data.display_name;
      setLastSeen(lastSeen);
    } catch (e) {
      console.log(e);
    }
  }

  async function searcByString(search) {
    try {
      const res = await fetch(
        "https://us1.locationiq.com/v1/search.php?key=pk.35bc3411252dafff1ecbc7a3338da82f&q=" +
          search +
          "&format=json"
      );
      const data = await res.json();
      const lastSeen = data[0].display_name;
      const lng = data[0].lon;
      const lat = data[0].lat;
      setLastSeen(lastSeen);
      setCords([lng, lat]);
    } catch {
      window.alert("Ubicacion no encontrada");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const search = e.target.search.value;
    setMarker(true);
    searcByString(search);
  }
  return (
    <div className={css.root}>
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        center={[cords[0], cords[1]]}
        containerStyle={{
          height: "240px",
          width: "335px",
        }}
        onClick={onClickMap}
      >
        <Layer
          type="symbol"
          id="marker"
          layout={{ "icon-image": "marker-15" }}
        ></Layer>
        <div>
          {marker && (
            <Marker coordinates={cords} anchor="bottom">
              <img src={petHand} />
            </Marker>
          )}
        </div>
      </Map>
      <form className={css.formSearch} onSubmit={handleSubmit}>
        <MainText>
          Buscá un punto de referencia para reportar a tu mascota. Puede ser una
          dirección, un barrio o una ciudad. Tambien puedes marcarlo en el mapa
          haciendo click.
        </MainText>
        <div className={css.inputContainer}>
          <TextField inputType="text" inputName="search"></TextField>
        </div>
        <MainButton>
          <MainText>Buscar</MainText>
        </MainButton>
      </form>
    </div>
  );
}