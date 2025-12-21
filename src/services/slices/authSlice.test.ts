import reducer, { logout, setAuthChecked } from "./authSlice";
import { loginUser, logoutUser, getUser } from "./authSlice";

describe("authSlice", () => {
  const initialState = {
    user: null,
    accessToken: null,
    refreshToken: null,
    loading: false,
    error: null,
    isAuthChecked: false,
  };

  it("должен возвращать начальное состояние по умолчанию", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("setAuthChecked устанавливает isAuthChecked в true", () => {
    const state = reducer(initialState, setAuthChecked());
    expect(state.isAuthChecked).toBe(true);
  });

  it("logout обнуляет user, accessToken и refreshToken", () => {
    const prevState = {
      ...initialState,
      user: { email: "a@a.com", name: "Alex" },
      accessToken: "token",
      refreshToken: "refresh",
    };
    const state = reducer(prevState, logout());
    expect(state.user).toBeNull();
    expect(state.accessToken).toBeNull();
    expect(state.refreshToken).toBeNull();
  });

  it("loginUser.fulfilled обновляет state с user и токенами", () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: {
        user: { email: "a@a.com", name: "Alex" },
        accessToken: "access",
        refreshToken: "refresh",
      },
    };
    const state = reducer(initialState, action);
    expect(state.user).toEqual({ email: "a@a.com", name: "Alex" });
    expect(state.accessToken).toBe("access");
    expect(state.refreshToken).toBe("refresh");
    expect(state.error).toBeNull();
  });

  it("loginUser.rejected устанавливает error", () => {
    const action = { type: loginUser.rejected.type, payload: "Ошибка" };
    const state = reducer(initialState, action);
    expect(state.error).toBe("Ошибка");
  });

  it("getUser.fulfilled устанавливает user и isAuthChecked", () => {
    const action = {
      type: getUser.fulfilled.type,
      payload: { email: "b@b.com", name: "Bob" },
    };
    const state = reducer(initialState, action);
    expect(state.user).toEqual({ email: "b@b.com", name: "Bob" });
    expect(state.isAuthChecked).toBe(true);
  });

  it("getUser.rejected обнуляет user и устанавливает isAuthChecked", () => {
    const action = { type: getUser.rejected.type };
    const state = reducer(initialState, action);
    expect(state.user).toBeNull();
    expect(state.isAuthChecked).toBe(true);
  });
});
