import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// 获取当前文件的绝对路径目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Load the module dependencies
import config from './index.js';
import express from 'express';
import morgan from 'morgan';
import compress from 'compression';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import ejs from 'ejs';

import indexRoutes from '../app/routes/index.server.routes.js';
import userRoutes from '../app/routes/users.server.routes.js';
import articleRoutes from '../app/routes/articles.server.routes.js';
import siteRoutes from '../app/routes/site.server.routes.js';

export default function () {
  //Create the Express application object
  var app = express();
  //the process.env property allows you to access predefined environment variables
  //such as NODE_ENV
  // Use the 'NODE_ENV' variable to activate the 'morgan' logger or 'compress' middleware
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production') {
    app.use(compress());
  }
  // Use the 'body-parser' and 'method-override' middleware functions
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(bodyParser.json()); //use middleware that only parses json
  app.use(cookieParser());
  app.use(cors());
  //
  app.use(methodOverride()); // use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
  //handle the use of PUT or DELETE methods
  //override with POST having ?_method=DELETE or
  // ?_method=PUT
  app.use(methodOverride('_method'));
  //saveUninitialized - orces a session that is "uninitialized" to be saved to the store
  //resave - forces the session to be saved back to the session store
  // Configure the 'session' middleware
  app.use(
    session({
      saveUninitialized: true,
      resave: true,
      secret: config.sessionSecret,
    })
  );
  //Configure Express to use EJS module as the default template engine
  // Set the application view engine and 'views' folder
  app.set('views', join(__dirname, './app/views'));
  app.engine('html', ejs.renderFile);
  app.set('view engine', 'html');
  //bootstrap the app using the controller and routing modules
  // Load the routing files
  indexRoutes(app);
  userRoutes(app);
  articleRoutes(app);
  siteRoutes(app);
  //The express.static() middleware takes one argument
  //to determine the location of the static folder
  //Configure static file serving
  app.use(express.static(join(__dirname, './public')));
  return app;
}
