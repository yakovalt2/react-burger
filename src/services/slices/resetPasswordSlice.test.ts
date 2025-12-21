import reducer, {
  allowResetPassword,
  denyResetPassword,
  initialState,
} from "./resetPasswordSlice";

describe("resetPasswordSlice", () => {
  it("должен возвращать initialState", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("allowResetPassword устанавливает canReset в true", () => {
    const state = reducer(initialState, allowResetPassword());
    expect(state.canReset).toBe(true);
  });

  it("denyResetPassword устанавливает canReset в false", () => {
    const stateWithTrue = { ...initialState, canReset: true };
    const state = reducer(stateWithTrue, denyResetPassword());
    expect(state.canReset).toBe(false);
  });
});
