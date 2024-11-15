import { createSlice } from "@reduxjs/toolkit";
import ENDPOINTS from "@/network/endPoints";
import actionFactory from "@/utils/actionFactory";

const initialState = {
  allCars: [],
  selectedCar: null,
};

const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {
    setCars: (state, action) => {
      state.allCars = action.payload;
    },
    setSelectedCar: (state, action) => {
      state.selectedCar = action.payload;
    },
    updateCar: (state, action) => {
      const index = state.allCars.findIndex(
        (car) => car.id === action.payload.id
      );
      if (index !== -1) {
        state.allCars[index] = action.payload;
      } else {
        console.warn("Car not found in state for update:", action.payload.id);
      }
    },
    deleteCar: (state, action) => {
      state.allCars = state.allCars.filter((car) => car.id !== action.payload);
    },
    clearSelectedCar: (state) => {
      state.selectedCar = null;
    },
  },
});

export const { setCars, setSelectedCar, updateCar, deleteCar } =
  carSlice.actions;

export default carSlice.reducer;

// action

export const fetchAllCarsAction = () => {
  const action = actionFactory();
  action.payload = {
    method: "POST",
    url: ENDPOINTS.GETALLCARS,
    onSuccess: setCars.type,
  };
  return action;
};

export const searchCarsAction = (keyword) => {
  const action = actionFactory();
  action.payload = {
    method: "GET",
    url: `${ENDPOINTS.SEARCH_CARS}?q=${keyword}`,
    onSuccess: setCars.type,
  };
  return action;
};

export const updateCarAction = (carId, carData) => {
  const action = actionFactory();
  action.payload = {
    method: "PUT",
    url: `${ENDPOINTS.UPDATE_CARS}/${carId}`,
    data: carData,
    onSuccess: updateCar.type,
  };
  return action;
};

export const deleteCarAction = (carId) => {
  const action = actionFactory();
  action.payload = {
    method: "DELETE",
    url: `${ENDPOINTS.DELETE_CARS}/${carId}`,
    onSuccess: deleteCar.type,
  };
  return action;
};

export const fetchCarDetailsAction = (carId) => {
  const action = actionFactory();
  action.payload = {
    method: "GET",
    url: `${ENDPOINTS.GET_CAR_DETAILS}/${carId}`,
    onSuccess: setSelectedCar.type,
  };
  return action;
};
