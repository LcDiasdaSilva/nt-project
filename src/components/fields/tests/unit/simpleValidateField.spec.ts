import SimpleValidateField from "../../SimpleValidateField.vue";
import { mount } from "@vue/test-utils";

let wrapper: any;
const id = "field-login-email";
const label = "E-mail";
const type = "email";
const placeholder = "Insira seu e-mail";
const dataTest = "field-login-email";

describe("SimpleValidateField", () => {
  beforeEach(() => {
    wrapper = mount(SimpleValidateField, {
      props: {
        id,
        label,
        type,
        placeholder,
        dataTest,
      },
    });
  });
  it("Deve renderizar componente com props passadas", async () => {
    expect(wrapper.text()).toMatch(label);
    expect(
      wrapper.get(`[data-test=${dataTest}]`).element.tagName.toLowerCase()
    ).toBe("input");
    const input = wrapper.get(`[data-test=${dataTest}]`);
    expect(input.element).toBeTruthy();
    expect(input.element.id).toBe(id);
    expect(input.attributes("type")).toBe(type);
    expect(input.attributes("placeholder")).toBe(placeholder);
    expect(input.element.value).toBe("");
    await input.setValue("my@mail.com");
    expect(input.element.value).toBe("my@mail.com");
    expect(wrapper.emitted("update:modelValue")).toHaveLength(1);
    expect(wrapper.emitted("update:modelValue")[0]).toEqual(["my@mail.com"]);
  });

  it("Deve renderizar componente desabilitado", async () => {
    await wrapper.setProps({ isDisabled: true });
    const input = wrapper.get(`[data-test=${dataTest}]`);
    expect(input.attributes()).toHaveProperty("disabled");
  });

  it("Deve exibir mensagem de erro quando valor for menor que minValidator ", async () => {
    const label = "Nome";
    const minValidator = 3;
    await wrapper.setProps({
      label,
      type: "text",
      placeholder: "Insira seu nome",
      minValidator,
    });
    const messageError = `${label} deve ter no mínimo ${minValidator} caracteres`;
    const input = wrapper.get(`[data-test=${dataTest}]`);
    await input.setValue("Lu");
    expect(wrapper.text()).toContain(messageError);
  });

  it("Não eve exibir mensagem de erro quando valor for maior que minValidator  ", async () => {
    const label = "Nome";
    const minValidator = 3;
    await wrapper.setProps({
      label,
      type: "text",
      placeholder: "Insira seu nome",
      minValidator,
    });
    const messageError = `${label} deve ter no mínimo ${minValidator} caracteres`;
    const input = wrapper.get(`[data-test=${dataTest}]`);
    await input.setValue("Tai");
    expect(wrapper.text()).not.toContain(messageError);
  });

  it("Deve exibir mensagem de erro quando valor for maior que maxValidator ", async () => {
    const label = "Nome";
    const maxValidator = 6;
    await wrapper.setProps({
      label,
      type: "text",
      placeholder: "Insira seu nome",
      maxValidator,
    });
    const messageError = `${label} deve ter no máximo ${maxValidator} caracteres`;
    const input = wrapper.get(`[data-test=${dataTest}]`);
    await input.setValue("Luis Carlos Dias");
    expect(wrapper.text()).toContain(messageError);
  });

  it("Não eve exibir mensagem de erro quando valor for menor que maxValidator  ", async () => {
    const label = "Nome";
    const maxValidator = 6;
    await wrapper.setProps({
      label,
      type: "text",
      placeholder: "Insira seu nome",
      maxValidator,
    });
    const messageError = `${label} deve ter no mínimo ${maxValidator} caracteres`;
    const input = wrapper.get(`[data-test=${dataTest}]`);
    await input.setValue("Luis");
    expect(wrapper.text()).not.toContain(messageError);
  });
});