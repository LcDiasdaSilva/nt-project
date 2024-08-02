import { shallowMount } from "@vue/test-utils";
import HotelList from "../../HotelList.vue";

const mockHotels = [
  {
    id: "1",
    name: "Hotel Bacana",
    description:
      "Este hotel à beira mar possui um spa e fica perto de Praia de Ipanema.",
    image: "/hotel1",
    address: {
      street: "Avenida Vieira Souto, 200",
      city: "Rio de Janeiro",
      state: "RJ",
      zip: "22420-002",
      country: "Brasil",
    },
    travelers: 1,
    bedrooms: 1,
    price: 900,
    reviews: [
      { note: 5 },
      { note: 2 },
      { note: 4 },
      { note: 3 },
      { note: 2 },
    ],
  },
  {
    id: "2",
    name: "Hotel Serenidade",
    image: "/hotel2",
    description:
      "Situado em uma área tranquila, este hotel oferece uma vista panorâmica para o campo.",
    address: {
      street: "Rua das Flores, 34",
      city: "Campos do Jordão",
      state: "SP",
      zip: "12460-000",
      country: "Brasil",
    },
    travelers: 2,
    bedrooms: 1,
    price: 600,
    reviews: [
      { note: 4 },
      { note: 5 },
      { note: 4 },
      { note: 4 },
      { note: 5 },
    ],
  },
];

describe("HotelList.vue", () => {
  it("matches snapshot when hotels list is not empty", () => {
    const wrapper = shallowMount(HotelList, {
      props: {
        hotels: mockHotels,
      },
      slots: {
        item: `<template #item="{ hotel }">
                 <div>{{ hotel.name }}</div>
               </template>`,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("matches snapshot when hotels list is empty", () => {
    const wrapper = shallowMount(HotelList, {
      props: {
        hotels: [],
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
