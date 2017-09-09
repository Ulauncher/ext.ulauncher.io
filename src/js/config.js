export const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;

export const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;

export const API_ENDPOINT = process.env.API_ENDPOINT;

export const menuLinks = {
  user: [
    {
      title: "Browse extensions",
      path: "/"
    },
    {
      title: "Submit new",
      path: "/submit"
    },
    {
      title: "Your extensions",
      path: "/my-extensions"
    },
  ],
  guest: [
    {
      title: "Browse extensions",
      path: "/"
    }
  ]
};