// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.blog.redberryinternship.ge",
        port: "",
        pathname: "/**", // Adjust the pathname as needed
      },
    ],
  },
};
