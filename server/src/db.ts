import { DataSource, DataSourceOptions } from "typeorm";
import { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER, LOGGING } from "./data/config";
import { File } from "./models/file.entity";
import { Link } from "./models/link.entity";
import { User } from "./models/user.entity";

const options: DataSourceOptions =
	DB_HOST && DB_NAME && DB_PORT && DB_USER && DB_PASS
		? {
				type: "postgres",
				host: DB_HOST,
				port: DB_PORT,
				username: DB_USER,
				password: DB_PASS,
				database: DB_NAME,
		  }
		: {
				type: "sqlite",
				database: `${DB_NAME}.sqlite3`,
		  };

const AppDataSource = new DataSource({
	...options,
	entities: [File, Link, User],
	synchronize: true,
	logging: LOGGING,
});

AppDataSource.initialize()
	.then(() => {
		console.log("Data Source has been initialized!");
	})
	.catch((err) => {
		console.error("Error during Data Source initialization", err);
	});

export default AppDataSource;
