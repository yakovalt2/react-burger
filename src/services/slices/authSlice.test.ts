import reducer, {
  logout,
  setAuthChecked,
  loginUser,
  logoutUser,
  getUser,
  initialState,
} from "./authSlice";

// константы
const LOGIN_USER_FULFILLED = loginUser.fulfilled.type;
const LOGIN_USER_REJECTED = loginUser.rejected.type;
const GET_USER_FULFILLED = getUser.fulfilled.type;
const GET_USER_REJECTED = getUser.rejected.type;

describe("authSlice", () => {
  it("должен возвращать initialState по умолчанию", () => {
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

  it("loginUser.fulfilled обновляет user и токены", () => {
    const action = {
      type: LOGIN_USER_FULFILLED,
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
    const action = {
      type: LOGIN_USER_REJECTED,
      payload: "Ошибка",
    };

    const state = reducer(initialState, action);

    expect(state.error).toBe("Ошибка");
  });

  it("getUser.fulfilled устанавливает user и isAuthChecked", () => {
    const action = {
      type: GET_USER_FULFILLED,
      payload: { email: "b@b.com", name: "Bob" },
    };

    const state = reducer(initialState, action);

    expect(state.user).toEqual({ email: "b@b.com", name: "Bob" });
    expect(state.isAuthChecked).toBe(true);
  });

  it("getUser.rejected обнуляет user и устанавливает isAuthChecked", () => {
    const action = {
      type: GET_USER_REJECTED,
    };

    const state = reducer(initialState, action);

    expect(state.user).toBeNull();
    expect(state.isAuthChecked).toBe(true);
  });
});
