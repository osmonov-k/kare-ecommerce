// middlewares/cors.js
const allowedOrigins = [
  "https://kare.kanatosmon.com",
  "http://kare.kanatosmon.com",
  "http://admin.kanatosmon.com",
  "https://admin.kare.kanatosmon.com",
  "http://localhost:5173",
  "http://localhost:5174",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "token"],
};

export default corsOptions;
