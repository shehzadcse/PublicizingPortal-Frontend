(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [190],
  {
    8086: function (a, b, c) {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/cart",
        function () {
          return c(3530);
        },
      ]);
    },
    8373: function (a, b, c) {
      "use strict";
      c.d(b, {
        Z: function () {
          return l;
        },
      });
      var d = c(5893),
        e = c(7294),
        f = { src: "/assets/media/cart.56c8221d.svg", height: 259, width: 259 },
        g = {
          src: "/assets/media/login.1c8ce0ae.svg",
          height: 482,
          width: 482,
        },
        h = { src: "/assets/media/user.8b1c1ab6.svg", height: 459, width: 459 },
        i = c(5675),
        j = c.n(i),
        k = c(1163);
      function l() {
        var a = (0, e.useState)(!1),
          b = a[0],
          c = a[1],
          i = (0, e.useState)(!1),
          l = i[0],
          m = i[1],
          n = (0, e.useState)(!1),
          o = n[0],
          p = n[1],
          q = (0, e.useState)(""),
          r = q[0],
          s = q[1],
          t = (0, e.useState)(""),
          u = t[0],
          v = t[1],
          w = (0, k.useRouter)(),
          x = function (a) {
            a.preventDefault(),
              "1234" == u && "test@gmail.com" == r && (p(!0), c(!1));
          };
        return (0, d.jsx)("div", {
          className: "header-wrapper container-fluid",
          children: (0, d.jsxs)("div", {
            className: "container",
            children: [
              (0, d.jsx)("div", {
                className: "logo-wrapper",
                onClick: function () {
                  return w.push("/");
                },
                children: "COMPANY",
              }),
              (0, d.jsxs)("div", {
                className: "search-wrapper",
                children: [
                  (0, d.jsxs)("select", {
                    className: "location-dropdown",
                    children: [
                      (0, d.jsx)("option", { children: "Delhi" }),
                      (0, d.jsx)("option", { children: "Mumbai" }),
                      (0, d.jsx)("option", { children: "Pune" }),
                    ],
                  }),
                  (0, d.jsx)("input", {
                    type: "text",
                    placeholder: "Search for area, street name...",
                  }),
                ],
              }),
              (0, d.jsxs)("div", {
                className: "icons-wrapper",
                children: [
                  (0, d.jsx)("div", {
                    className: "cart-icon me-4",
                    children: (0, d.jsx)(j(), {
                      src: f,
                      height: "30",
                      width: "30",
                      onClick: function () {
                        return w.push("/cart");
                      },
                    }),
                  }),
                  (0, d.jsx)("div", {
                    className: "profile-icon",
                    children: o
                      ? (0, d.jsx)(j(), {
                          src: h,
                          height: "30",
                          width: "30",
                          onClick: function () {
                            return m(!l);
                          },
                        })
                      : (0, d.jsx)(j(), {
                          src: g,
                          height: "30",
                          width: "30",
                          onClick: function () {
                            return c(!b);
                          },
                        }),
                  }),
                ],
              }),
              b &&
                (0, d.jsx)("div", {
                  className: "nav-sign-in-box",
                  children: (0, d.jsx)("div", {
                    className: "login-wrapper",
                    children: (0, d.jsxs)("form", {
                      onSubmit: x,
                      children: [
                        (0, d.jsxs)("div", {
                          className: "s_input-wrapper ",
                          children: [
                            (0, d.jsxs)("label", {
                              className: "text-label",
                              children: [
                                "Email",
                                (0, d.jsx)("span", {
                                  className: "required-field",
                                  children: " *",
                                }),
                              ],
                            }),
                            (0, d.jsx)("input", {
                              type: "email",
                              className: "text-input",
                              value: r,
                              onChange: function (a) {
                                return s(a.target.value);
                              },
                              autoComplete: "on",
                            }),
                          ],
                        }),
                        (0, d.jsxs)("div", {
                          className: "s_input-wrapper my-3",
                          children: [
                            (0, d.jsxs)("div", {
                              className: "d-flex justify-content-between",
                              children: [
                                (0, d.jsxs)("label", {
                                  className: "text-label",
                                  children: [
                                    "Password",
                                    (0, d.jsx)("span", {
                                      className: "required-field",
                                      children: " *",
                                    }),
                                  ],
                                }),
                                (0, d.jsx)("label", {
                                  className: "text-label-forgot",
                                  children: "Forgot?",
                                }),
                              ],
                            }),
                            (0, d.jsx)("input", {
                              type: "password",
                              autoComplete: "new-password",
                              className: "text-input",
                              value: u,
                              onChange: function (a) {
                                return v(a.target.value);
                              },
                            }),
                          ],
                        }),
                        (0, d.jsxs)("div", {
                          className:
                            "s_input-wrapper my-3 d-flex align-items-center",
                          children: [
                            (0, d.jsx)("input", { type: "checkbox" }),
                            (0, d.jsx)("label", {
                              className: "text-label ms-2",
                              children: "Show password",
                            }),
                          ],
                        }),
                        (0, d.jsx)("div", {
                          className: "d-flex justify-content-start mb-3",
                          children: (0, d.jsx)("button", {
                            className: "login_btn",
                            type: "submit",
                            children: (0, d.jsx)("span", {
                              children: "SIGN IN",
                            }),
                          }),
                        }),
                      ],
                    }),
                  }),
                }),
              l &&
                (0, d.jsxs)("div", {
                  className: "profile-content-wrapper",
                  children: [
                    l
                      ? (0, d.jsxs)("div", {
                          className:
                            "user d-flex flex-column align-items-start",
                          children: [
                            (0, d.jsx)("div", {
                              className: "text-username",
                              children: "John Kido",
                            }),
                            (0, d.jsx)("div", {
                              className: "text-email",
                              children: "test@gmail.com",
                            }),
                          ],
                        })
                      : null,
                    (0, d.jsxs)("div", {
                      className: "content",
                      children: [
                        (0, d.jsxs)("div", {
                          className: "content-wrapper cursor-pointer",
                          onClick: function () {
                            return w.push("/create-ad");
                          },
                          children: [
                            (0, d.jsx)("div", {
                              children: (0, d.jsx)("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                width: "16",
                                height: "16",
                                viewBox: "0 0 36.857 29.897",
                                children: (0, d.jsxs)("g", {
                                  id: "up",
                                  transform: "translate(0 0)",
                                  children: [
                                    (0, d.jsx)("path", {
                                      id: "Path_18",
                                      "data-name": "Path 18",
                                      d: "M15.749,14.5l1.817-3.956L21.5,8.749,17.566,6.956,15.749,3,14,6.956,10,8.749l4,1.794Z",
                                      transform: "translate(8.443 -3)",
                                      fill: "#000000",
                                    }),
                                    (0, d.jsx)("path", {
                                      id: "Path_19",
                                      "data-name": "Path 19",
                                      d: "M6.6,15.2l.92-3.68,3.68-.92-3.68-.92L6.6,6,5.68,9.68,2,10.6l3.68.92Z",
                                      transform: "translate(-2 0.899)",
                                      fill: "#000000",
                                    }),
                                    (0, d.jsx)("path", {
                                      id: "Path_20",
                                      "data-name": "Path 20",
                                      d: "M35.4,6a3.437,3.437,0,0,0-3.11,4.922l-6.934,6.922a3.4,3.4,0,0,0-2.972,0L20.06,15.521a3.167,3.167,0,0,0,.369-1.472,3.456,3.456,0,1,0-6.565,1.472L6.93,22.443a3.491,3.491,0,1,0,1.636,1.633L15.5,17.154a3.4,3.4,0,0,0,2.972,0L20.8,19.477a3.167,3.167,0,0,0-.369,1.472,3.456,3.456,0,1,0,6.565-1.472l6.934-6.922A3.445,3.445,0,1,0,35.4,6Z",
                                      transform: "translate(-2 0.899)",
                                      fill: "#000000",
                                    }),
                                  ],
                                }),
                              }),
                            }),
                            (0, d.jsx)("div", {
                              className: "account-text",
                              children: "Post new ads",
                            }),
                          ],
                        }),
                        (0, d.jsxs)("div", {
                          className: "content-wrapper",
                          onClick: function () {
                            p(!1), m(!1);
                          },
                          children: [
                            (0, d.jsx)("div", {
                              children: (0, d.jsx)("svg", {
                                width: "16",
                                height: "16",
                                viewBox: "0 0 32 32",
                                id: "i-signout",
                                xmlns: "http://www.w3.org/2000/svg",
                                fill: "none",
                                stroke: "#000000",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: "2",
                                children: (0, d.jsx)("path", {
                                  d: "M28 16 L8 16 M20 8 L28 16 20 24 M11 28 L3 28 3 4 11 4",
                                }),
                              }),
                            }),
                            (0, d.jsx)("div", {
                              className: "account-text",
                              children: "Sign out",
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
            ],
          }),
        });
      }
    },
    3530: function (a, b, c) {
      "use strict";
      c.r(b),
        c.d(b, {
          default: function () {
            return o;
          },
        });
      var d = c(5893),
        e = c(9008),
        f = c.n(e);
      c(7294);
      var g = {
          src: "/assets/media/back.80f9a51d.svg",
          height: 385,
          width: 385,
        },
        h = c(5675),
        i = c.n(h),
        j = c(1163);
      function k() {
        var a = (0, j.useRouter)();
        return (0, d.jsx)("div", {
          className: "cart-wrapper container",
          children: (0, d.jsxs)("div", {
            className: "row",
            children: [
              (0, d.jsx)("div", {
                className: "col-8 cart-summary",
                children: (0, d.jsx)("form", {
                  children: (0, d.jsxs)("div", {
                    className: "cart-box",
                    children: [
                      (0, d.jsx)("div", {
                        className: "img-wrapper mb-3",
                        children: (0, d.jsx)(i(), {
                          src: g,
                          height: "30",
                          width: "30",
                          onClick: function () {
                            return a.push("/create-ad");
                          },
                        }),
                      }),
                      (0, d.jsx)("h2", { children: "ADS DETAILS" }),
                      (0, d.jsxs)("div", {
                        className: "row",
                        children: [
                          (0, d.jsxs)("div", {
                            className: "input-details col-lg-6",
                            children: [
                              (0, d.jsx)("label", { children: "Name" }),
                              (0, d.jsx)("input", { type: "text" }),
                            ],
                          }),
                          (0, d.jsxs)("div", {
                            className: "input-details col-lg-6",
                            children: [
                              (0, d.jsx)("label", { children: "Email" }),
                              (0, d.jsx)("input", { type: "text" }),
                            ],
                          }),
                          (0, d.jsxs)("div", {
                            className: "input-details col-lg-6",
                            children: [
                              (0, d.jsx)("label", { children: "Company Name" }),
                              (0, d.jsx)("input", { type: "text" }),
                            ],
                          }),
                          (0, d.jsxs)("div", {
                            className: "input-details col-lg-6",
                            children: [
                              (0, d.jsx)("label", { children: "Ads Tagline" }),
                              (0, d.jsx)("input", { type: "text" }),
                            ],
                          }),
                          (0, d.jsxs)("div", {
                            className: "input-details col-lg-6",
                            children: [
                              (0, d.jsx)("label", {
                                children: "Address line 1",
                              }),
                              (0, d.jsx)("input", { type: "text" }),
                            ],
                          }),
                          (0, d.jsxs)("div", {
                            className: "input-details col-lg-6",
                            children: [
                              (0, d.jsx)("label", {
                                children: "Address line 2",
                              }),
                              (0, d.jsx)("input", { type: "text" }),
                            ],
                          }),
                          (0, d.jsxs)("div", {
                            className: "input-details col-lg-6",
                            children: [
                              (0, d.jsx)("label", { children: "City" }),
                              (0, d.jsx)("input", { type: "text" }),
                            ],
                          }),
                          (0, d.jsxs)("div", {
                            className: "input-details col-lg-6",
                            children: [
                              (0, d.jsx)("label", { children: "PIN code" }),
                              (0, d.jsx)("input", { type: "text" }),
                            ],
                          }),
                          (0, d.jsxs)("div", {
                            className: "input-details col-lg-6",
                            children: [
                              (0, d.jsx)("label", { children: "State" }),
                              (0, d.jsx)("input", { type: "text" }),
                            ],
                          }),
                          (0, d.jsxs)("div", {
                            className: "input-details col-lg-6",
                            children: [
                              (0, d.jsx)("label", { children: "Country" }),
                              (0, d.jsx)("input", { type: "text" }),
                            ],
                          }),
                          (0, d.jsxs)("div", {
                            className: "input-details col-lg-6",
                            children: [
                              (0, d.jsx)("label", { children: "Phone" }),
                              (0, d.jsx)("input", { type: "text" }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
              }),
              (0, d.jsx)("div", {
                className: "col-4 cart-summary",
                children: (0, d.jsxs)("div", {
                  className: "cart-box",
                  children: [
                    (0, d.jsx)("h2", { children: "ADVERTISEMENT SUMMARY" }),
                    (0, d.jsxs)("div", {
                      className: "details",
                      children: [
                        (0, d.jsx)("label", { children: "Purchased blocks" }),
                        (0, d.jsx)("p", { children: "5 Unit" }),
                      ],
                    }),
                    (0, d.jsxs)("div", {
                      className: "details",
                      children: [
                        (0, d.jsx)("label", { children: "Price per block" }),
                        (0, d.jsx)("p", { children: "500/-" }),
                      ],
                    }),
                    (0, d.jsxs)("div", {
                      className: "details",
                      children: [
                        (0, d.jsx)("label", { children: "Service fees" }),
                        (0, d.jsx)("p", { children: "80/-" }),
                      ],
                    }),
                    (0, d.jsx)("hr", {}),
                    (0, d.jsxs)("div", {
                      className: "details",
                      children: [
                        (0, d.jsx)("label", { children: "Total purchased" }),
                        (0, d.jsx)("p", { children: "2580/-" }),
                      ],
                    }),
                    (0, d.jsxs)("div", {
                      className: "button-wrapper text-center",
                      children: [
                        (0, d.jsx)("button", { children: "Preview" }),
                        (0, d.jsx)("button", {
                          className: "ms-2",
                          children: "Buy Now",
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            ],
          }),
        });
      }
      var l = c(8373),
        m = c(214),
        n = c.n(m);
      function o() {
        return (0, d.jsxs)("div", {
          className: n().container,
          children: [
            (0, d.jsxs)(f(), {
              children: [
                (0, d.jsx)("title", { children: "Publicizing Portal" }),
                (0, d.jsx)("meta", {
                  name: "description",
                  content: "Generated by create next app",
                }),
                (0, d.jsx)("link", { rel: "icon", href: "/favicon.ico" }),
              ],
            }),
            (0, d.jsx)(l.Z, {}),
            (0, d.jsx)(k, {}),
          ],
        });
      }
    },
    214: function (a) {
      a.exports = {
        container: "Home_container__bCOhY",
        main: "Home_main__nLjiQ",
        footer: "Home_footer____T7K",
        title: "Home_title__T09hD",
        description: "Home_description__41Owk",
        code: "Home_code__suPER",
        grid: "Home_grid__GxQ85",
        card: "Home_card___LpL1",
        logo: "Home_logo__27_tb",
      };
    },
  },
  function (a) {
    a.O(0, [345, 774, 888, 179], function () {
      var b;
      return a((a.s = 8086));
    }),
      (_N_E = a.O());
  },
]);
