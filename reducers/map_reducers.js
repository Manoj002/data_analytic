import {
  GETINITSTATE,
  CHANGESTATE,
  CHANGEDISEASE,
  SELECTSTATE,
  SELECTDISEASE
} from "../actions/types";

const INITIAL_STATE = {
  lat: 22.3899266,
  lng: 77.3968277,
  latitudeDelta: 0.09,
  longitudeDelta: 0.04,
  _state: "",
  state_id: "",
  disease: "",
  disease_id: ""
};

INITIAL_STATE.state_lists = [
  { name: "Andhra Pradesh", id: "0" },
  { name: "Arunachal Pradesh", id: "1" },
  { name: "Assam", id: "2" },
  { name: "Bihar", id: "3" },
  { name: "Chhattisgarh", id: "4" },
  { name: "Goa", id: "5" },
  { name: "Gujarat", id: "6" },
  { name: "Haryana", id: "7" },
  { name: "Himachal Pradesh", id: "8" },
  { name: "Jammu & Kashmir", id: "9" },
  { name: "Jharkhand", id: "10" },
  { name: "Karnataka", id: "11" },
  { name: "Kerala", id: "12" },
  { name: "Madhya Pradesh", id: "13" },
  { name: "Maharashtra", id: "14" },
  { name: "Manipur", id: "15" },
  { name: "Meghalaya", id: "16" },
  { name: "Mizoram", id: "17" },
  { name: "Nagaland", id: "18" },
  { name: "Odisha", id: "19" },
  { name: "Punjab", id: "20" },
  { name: "Rajasthan", id: "21" },
  { name: "Sikkim", id: "22" },
  { name: "Tamil Nadu", id: "23" },
  { name: "Telangana", id: "24" },
  { name: "Tripura", id: "25" },
  { name: "Uttarakhand", id: "26" },
  { name: "Uttar Pradesh", id: "27" },
  { name: "West Bengal", id: "28" }
];

INITIAL_STATE.disease_lists = [
  { name: "Alcohol and health", id: "0" },
  { name: "Child health", id: "1" },
  { name: "Cholera", id: "2" },
  { name: "Environmental health", id: "3" },
  { name: "Global influenza virological surveillance", id: "4" },
  { name: "HIV/AIDS", id: "5" },
  { name: "International Health Regulations (2005)", id: "6" },
  { name: "Malaria", id: "7" },
  { name: "Maternal and reproductive health", id: "8" },
  { name: "Medical devices", id: "9" },
  { name: "Meningococcal meningitis", id: "10" },
  { name: "Mental health", id: "11" },
  { name: "Mortality and Global Burden of Disease (GBD)", id: "12" },
  { name: "Neglected tropical diseases", id: "13" },
  { name: "Noncommunicable diseases", id: "14" },
  {
    name:
      "Resources for the prevention and treatment of substance use disorders",
    id: "15"
  },
  { name: "Road safety", id: "16" },
  { name: "Sexually Transmitted Infections (STIs)", id: "17" },
  { name: "Tobacco control", id: "18" },
  { name: "Tuberculosis", id: "19" },
  { name: "Violence prevention", id: "20" },
  { name: "Violence against women", id: "21" }
];

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {

    case GETINITSTATE:
      return {
        ...state,
        lat: action.payload.coords.latitude,
        lng: action.payload.coords.longitude
      };

    case CHANGESTATE:
      return {
        ...state,
        _state: state.state_lists[action.payload].name,
        state_id: action.payload.id
      };

    case CHANGEDISEASE:
      return {
        ...state,
        disease: state.disease_lists[action.payload].name,
        disease_id: action.payload.id
      };

    case SELECTSTATE:
      return { ...state };

    case SELECTDISEASE:
      return { ...state };
      
    default:
      return state;
  }
}
