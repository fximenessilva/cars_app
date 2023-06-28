const NAMESPACES = {
  theme: "auto_connect-theme",
  cars: "carsList",
  users: "usersList",
  user: "logged_user",
};

const FOOTER_ICONS_LIST = [
  {
    href: "https://www.facebook.com/",
    className: "fa-brands fa-facebook",
  },
  {
    href: "https://www.instagram.com/",
    className: "fa-brands fa-instagram",
  },
  { href: "https://twitter.com/", className: "fa-brands fa-twitter" },
];

const ROUTES_LINKS = [
  { page: "Cars", href: "/cars", icon: "fa-solid fa-car" },
  { page: "Users", href: "/users", icon: "fa-solid fa-users" },
];

export { NAMESPACES, FOOTER_ICONS_LIST, ROUTES_LINKS };
