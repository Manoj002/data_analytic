import { 
    GETINITSTATE, 
    CHANGESTATE, 
    CHANGEDISEASE,
    SELECTSTATE,
    SELECTDISEASE 
} from "./types";

export const changeState = (id) => {
  return {
    type: CHANGESTATE,
    payload: id
  };
  // let response = await axios.post(
  //     `https://nominatim.openstreetmap.org/search.php?q=${
  //       this.state.state
  //     }&polygon_geojson=1&format=json`
  //   );
  //   let res = response.data;
  //   let data = res[0].geojson.coordinates[0];
};

export const changeDisease = id => {
  return {
    type: CHANGEDISEASE,
    payload: id
  };
};

export const selectState = (text) => {
  console.warn(text);
};

export const selectDisease = ({ text }) => {
  console.warn(text);
};

export const getInitState = ({ position }) => {
  return {
    type: GETINITSTATE,
    payload: position
  };
};
