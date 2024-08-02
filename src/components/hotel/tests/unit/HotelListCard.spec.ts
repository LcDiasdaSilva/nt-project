import { shallowMount } from "@vue/test-utils";
import HotelListCard from "../../HotelListCard.vue";
import { createTestingPinia } from "@pinia/testing";

describe("HotelListCard.vue", () => {
  it("matches snapshot", () => {
    const wrapper = shallowMount(HotelListCard, {
      global: {
        plugins: [createTestingPinia()],
      },
      props: {
        id: 1,
        name: "Hotel Exemplo",
        address: "Rua dos Exemplos, 123",
        description: "Descrição do hotel de exemplo.",
        value: "R$ 300",
        reviewNote: 4,
        reviewNumbers: 123,
        travelers: 2,
        bedrooms: 1,
        totalValue: "R$ 900",
        daily: 3,
        image: "hotel-exemplo",
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
