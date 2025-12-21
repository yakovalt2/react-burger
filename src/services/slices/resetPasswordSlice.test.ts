import reducer, {
  allowResetPassword,
  denyResetPassword,
} from "./resetPasswordSlice";

describe("resetPasswordSlice", () => {
  const initialState = {
    canReset: false,
  };

  it("должен возвращать начальное состояние", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("allowResetPassword устанавливает canReset в true", () => {
    const state = reducer(initialState, allowResetPassword());
    expect(state.canReset).toBe(true);
  });

  it("denyResetPassword устанавливает canReset в false", () => {
    const state = reducer({ canReset: true }, denyResetPassword());
    expect(state.canReset).toBe(false);
  });
});
