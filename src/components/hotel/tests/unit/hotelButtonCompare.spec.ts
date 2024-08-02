import { shallowMount } from "@vue/test-utils";
import HotelButtonCompare from "../../HotelButtonCompare.vue";
import { createTestingPinia } from "@pinia/testing";


describe("HotelButtonCompare.vue", () => {
  it("matches snapshot when total hotels to compare is less than 2", () => {
    const wrapper = shallowMount(HotelButtonCompare, {
      global: {
        plugins: [createTestingPinia({ 
          initialState: {
            hotelCompareStore: {
              getStateHotelsCompare: []
            }
          }
        })],
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("matches snapshot when total hotels to compare is 2 or more", () => {
    const wrapper = shallowMount(HotelButtonCompare, {
      global: {
        plugins: [createTestingPinia({
          initialState: {
            hotelCompareStore: {
              getStateHotelsCompare: [{}, {}]
            }
          }
        })],
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
