import { mount } from "@vue/test-utils";
import TableHotelCompare from "../../HotelTableCompare.vue";


jest.mock("vue-progressive-image", () => ({
  ProgressiveImage: {
    template: '<img :src="src" />',
  },
}));

describe("TableHotelCompare", () => {
  it("matches the snapshot", () => {
   
    const hotels = [
      {
        id: 1,
        name: "Hotel A",
        image: "hotel-a",
        description: "Description of Hotel A",
        address: { street: "Street A", city: "City A" },
        price: 100,
      },
      {
        id: 2,
        name: "Hotel B",
        image: "hotel-b",
        description: "Description of Hotel B",
        address: { street: "Street B", city: "City B" },
        price: 200,
      },
    ];

    const wrapper = mount(TableHotelCompare, {
      props: {
        hotels,
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
