
import { get } from "env-var";

export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    MONGO_URL: get('MONGO_URL').required().asString(),
    MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString(),
    // NEW_RELIC_LICENSE_KEY: get('NEW_RELIC_LICENSE_KEY').required().asString(),
    // NEW_RELIC_APP_NAME: get('NEW_RELIC_APP_NAME').required().asString(),
}
