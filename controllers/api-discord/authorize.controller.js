/*import axios from "axios";

const baseUrl = 'https://discord.com/api/v10';
const redirectUri = 'http://localhost:3001/authorize-acount/login';

// const authorize = async (req, res)=> {
//   const { CLIENT_ID } = process.env;
//   const params = `?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${redirectUri}&scope=identify`
//   const urlRedirectAuthDc = `${baseUrl}${params}`;
//   res.redirect(urlRedirectAuthDc);
// }

const exchangeCode = async (code) => {
  const { CLIENT_ID, CLIENT_SECRET } = process.env;
  try {
    const data = new URLSearchParams({
      'grant_type': 'authorization_code',
      'code': code,
      'redirect_uri': redirectUri
    });

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    const response = await axios.post(`${baseUrl}/oauth2/token`, data, { headers, auth: { username: CLIENT_ID, password: CLIENT_SECRET } });
    console.log(response);

    return response.data;
  } catch (error) {
    throw error;
  }
};


const login = async (req, res) => {
  try {
    const { code } = req.query;
    const tokenResponse = await exchangeCode(code);
    
    res.status(200).json(tokenResponse);
  } catch (error) {
    console.error('Error al intercambiar el código de autorización:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


export { login };*/