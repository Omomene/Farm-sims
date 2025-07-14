const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const fieldsRoutes = require('./routes/fields');
app.use('/fields', fieldsRoutes);

const storageRoutes = require('./routes/storage');
app.use('/storage', storageRoutes);

const warehouseRoutes = require('./routes/warehouse');
app.use('/warehouse', warehouseRoutes);

const factoriesRoutes = require('./routes/factories');
app.use("/factories", factoriesRoutes);

const machinesRoutes = require('./routes/machines');
app.use('/machines', machinesRoutes);

const reservoirRoutes = require('./routes/reservoir');
app.use('/reservoir', reservoirRoutes);

const greenhouseRoutes = require('./routes/greenhouse');
app.use('/greenhouse', greenhouseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
