const { Pool } = require('pg')

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "apartamentosDB",
    database: "apartamentos",
    port: '5432' 
});

const getTenant = async (req, res) => {
    const response = await pool.query('SELECT * FROM public."Inquilino"');
    res.status(200).json(response.rows);
};

const getTenantById = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM public."Inquilino" WHERE ci = $1', [id]);
    res.json(response.rows);
};

const createTenant = async (req, res) => {
    const { id, name, phone, mail, account_num } = req.body;

    const response = await pool.query('INSERT INTO public."Inquilino" (ci, nombre, celular, mail, num_cuenta) VALUES ($1, $2, $3, $4, $5)', [id, name, phone, mail, account_num]);
    console.log(response);
    res.status(200).json({
        message: 'task created succesfully',
        body: {
            task: {id, name, phone, mail, account_num }
        }
    });
};

const deleteTenant = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('DELETE FROM public."Inquilino" WHERE ci = $1', [id]);
    res.status(200).json({
        message: 'task deleted succesfully',
        body: {
            task: {id}
        }
    });
}

const updateTenant = async (req, res) => {
    const { id, name, phone, mail, account_num } = req.body;
    const response = await pool.query('UPDATE public."Inquilino" SET nombre = $2, celular = $3, mail = $4, num_cuenta = $5  WHERE ci = $1', [id, name, phone, mail, account_num]);
    res.status(200).json({
        message: 'task created succesfully',
        body: {
            task: {id, name, phone, mail, account_num }
        }
    });
}

module.exports = {
    getTenant,
    getTenantById,
    createTenant,
    deleteTenant,
    updateTenant  
};