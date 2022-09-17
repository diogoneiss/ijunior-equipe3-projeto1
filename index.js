const app = require('./config/expressConfig');
require('dotenv').config();


const port = process.env.PORT;

if (port === undefined) {
	throw Error('Necessario criar arquivo .env na raiz e ter alguma porta. Exemplo: PORT = \'3030\'');
}


app.listen(port, () => {
	console.log(`server is running on port ${port}`);
});