import passport from "passport";
import User from "./src/models/User";

passport.use(User.createStrategy());

passport.serializeUser((User as any).serializeUser());
passport.deserializeUser(User.deserializeUser());
