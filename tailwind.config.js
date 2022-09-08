const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  variants: ["responsive", "group-hover", "hover", "focus","active"],
  theme: {
    extend: {
      
    },
  },
  plugins: [],
});